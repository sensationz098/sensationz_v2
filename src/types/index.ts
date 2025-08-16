export type TeacherType = {
  id: string;
  name: string;
  gender: string;
  biography: string;
  state: string;
  country: string;
  email: string;
  portfolio_url: string | null;
  image_url: string | null;
  language_proficiency: string | null;
  specialization: string | null;
};

export type CounsellorType = {
  id: string;
  name: string;
  counsellor_id: string;
};

export type GetAllCourseType = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
};

export type CreateUserProfileType = {
  user_id: string;
  contact: string;
  state: string;
  country: string;
  date_of_birth: Date | string;
};
