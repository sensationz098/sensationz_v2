import { create } from "zustand";
import { supabase } from "@/supabase/supabaseConfig";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { checkCourseTrial, checkUserProfile } from "@/supabase/dbQuery";

type CheckTrialCourseType = {
  numberOfTrial: number;
  isTrialAvailable: boolean;
};

type UserProfileType = {
  status: boolean;
  profile: {
    full_name: string;
    avatar_url: string;
    email: string;
    contact: string | null;
    state: string | null;
    country: string | null;
    date_of_birth: string | Date | null;
    loyality_point: number | null;
  } | null;
};

type AuthStore = {
  session: Session | null;
  loading: boolean;
  profile: UserProfileType | null;
  trial: CheckTrialCourseType | null;

  fetchSession: () => Promise<void>;
  checkUserProfile: (userId: string) => Promise<any>;
  fetchTrialStatus: (userId: string) => Promise<any>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  loading: false,
  profile: null,
  trial: null,

  checkUserProfile: async (userId) => await checkUserProfile(userId),

  fetchTrialStatus: async (userId) => {
    const trial = await checkCourseTrial(userId); // returns { numberOfTrial: number }

    const numberOfTrial = trial || 0;
    const isTrialAvailable = numberOfTrial < 3;

    set({
      trial: {
        numberOfTrial,
        isTrialAvailable,
      },
    });

    return { numberOfTrial, isTrialAvailable };
  },

  fetchSession: async () => {
    set({ loading: true });

    const { data } = await supabase.auth.getSession();
    const session = data.session;
    set({ session });

    if (session) {
      const profile = await useAuthStore
        .getState()
        .checkUserProfile(session.user.id);

      const trial = await useAuthStore
        .getState()
        .fetchTrialStatus(session.user.id);

      const hasCompleteProfile =
        profile?.contact &&
        profile?.state &&
        profile?.country &&
        profile?.date_of_birth;

      set({
        trial: {
          numberOfTrial: trial?.numberOfTrial || 0,
          isTrialAvailable: trial?.isTrialAvailable || false,
        },
      });
      set({
        profile: {
          status: true,
          profile: {
            full_name: profile?.full_name || "",
            avatar_url: profile?.avatar_url || "",
            email: profile?.email || "",
            contact: profile?.contact || "",
            state: profile?.state || "",
            country: profile?.country || "",
            date_of_birth: profile?.date_of_birth || "",
            loyality_point: profile?.loyality_points || 0,
          },
        },
      });

      if (!hasCompleteProfile) {
        set({ loading: false });
        return router.replace("/create-profile");
      }
    } else {
      set({ profile: { status: false, profile: null } });
    }

    set({ loading: false });
  },
}));
