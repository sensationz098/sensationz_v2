export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      counsellor: {
        Row: {
          counsellor_id: string
          created_at: string | null
          gender: string
          id: string
          incentive: number
          name: string
          updated_at: string | null
        }
        Insert: {
          counsellor_id: string
          created_at?: string | null
          gender: string
          id?: string
          incentive?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          counsellor_id?: string
          created_at?: string | null
          gender?: string
          id?: string
          incentive?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      course: {
        Row: {
          class_days: string[] | null
          course_type: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          level: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          class_days?: string[] | null
          course_type: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          level?: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          class_days?: string[] | null
          course_type?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          level?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      course_duration_discount: {
        Row: {
          course_id: string
          discount_id: string
          duration_id: string
        }
        Insert: {
          course_id: string
          discount_id: string
          duration_id: string
        }
        Update: {
          course_id?: string
          discount_id?: string
          duration_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_duration_discount_course_id_course_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_duration_discount_discount_id_discount_id_fk"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_duration_discount_duration_id_duration_id_fk"
            columns: ["duration_id"]
            isOneToOne: false
            referencedRelation: "duration"
            referencedColumns: ["id"]
          },
        ]
      }
      course_teacher: {
        Row: {
          course_id: string
          teacher_id: string
        }
        Insert: {
          course_id: string
          teacher_id: string
        }
        Update: {
          course_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_teacher_course_id_course_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_teacher_teacher_id_teacher_id_fk"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      discount: {
        Row: {
          created_at: string | null
          description: string
          discount_code: string
          discount_value: number
          expired_at: string
          id: string
          is_active: boolean
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          discount_code: string
          discount_value: number
          expired_at?: string
          id?: string
          is_active?: boolean
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          discount_code?: string
          discount_value?: number
          expired_at?: string
          id?: string
          is_active?: boolean
          title?: string
        }
        Relationships: []
      }
      duration: {
        Row: {
          course_id: string | null
          created_at: string | null
          discounted_price: number
          id: string
          months: string
          price: number
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          discounted_price: number
          id?: string
          months: string
          price: number
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          discounted_price?: number
          id?: string
          months?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "duration_course_id_course_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      email_queue: {
        Row: {
          course_name: string
          created_at: string | null
          customer_name: string
          discounted_amount: number
          error_message: string | null
          id: string
          last_attempt_at: string | null
          payment_method: string
          retries: number
          status: string
          subject: string
          to_email: string
          transaction_id: string
        }
        Insert: {
          course_name: string
          created_at?: string | null
          customer_name: string
          discounted_amount: number
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          payment_method: string
          retries?: number
          status?: string
          subject: string
          to_email: string
          transaction_id: string
        }
        Update: {
          course_name?: string
          created_at?: string | null
          customer_name?: string
          discounted_amount?: number
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          payment_method?: string
          retries?: number
          status?: string
          subject?: string
          to_email?: string
          transaction_id?: string
        }
        Relationships: []
      }
      enquiry: {
        Row: {
          contact: string
          contact_time: string
          created_at: string | null
          email: string
          id: string
          name: string
        }
        Insert: {
          contact: string
          contact_time?: string
          created_at?: string | null
          email: string
          id?: string
          name: string
        }
        Update: {
          contact?: string
          contact_time?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      enrolled_course: {
        Row: {
          course_id: string
          created_at: string | null
          duration_id: string
          end_date: string
          id: string
          profile_id: string
          purchase_id: string | null
          schedule_id: string
          start_date: string
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          duration_id: string
          end_date: string
          id?: string
          profile_id: string
          purchase_id?: string | null
          schedule_id: string
          start_date: string
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          duration_id?: string
          end_date?: string
          id?: string
          profile_id?: string
          purchase_id?: string | null
          schedule_id?: string
          start_date?: string
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrolled_course_course_id_course_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrolled_course_duration_id_duration_id_fk"
            columns: ["duration_id"]
            isOneToOne: false
            referencedRelation: "duration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrolled_course_profile_id_profiles_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrolled_course_purchase_id_purchase_course_id_fk"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchase_course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrolled_course_schedule_id_schedule_id_fk"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrolled_course_teacher_id_teacher_id_fk"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          contact: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          id: string
          loyality_points: number | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          contact?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          loyality_points?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          contact?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          loyality_points?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      purchase_course: {
        Row: {
          amount: number
          counsellor_id: string
          course_id: string
          created_at: string | null
          date_of_payment: string
          discount_code: string
          id: string
          loyality_points: number | null
          payment_status: string
          profile_id: string
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
          transaction_created_status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          counsellor_id: string
          course_id: string
          created_at?: string | null
          date_of_payment: string
          discount_code: string
          id?: string
          loyality_points?: number | null
          payment_status: string
          profile_id: string
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
          transaction_created_status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          counsellor_id?: string
          course_id?: string
          created_at?: string | null
          date_of_payment?: string
          discount_code?: string
          id?: string
          loyality_points?: number | null
          payment_status?: string
          profile_id?: string
          razorpay_order_id?: string
          razorpay_payment_id?: string
          razorpay_signature?: string
          transaction_created_status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_course_counsellor_id_counsellor_id_fk"
            columns: ["counsellor_id"]
            isOneToOne: false
            referencedRelation: "counsellor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_course_course_id_course_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          meeting_link: string
          timing: string
          updated_at: string | null
          whatsapp_group_link: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          meeting_link: string
          timing: string
          updated_at?: string | null
          whatsapp_group_link: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          meeting_link?: string
          timing?: string
          updated_at?: string | null
          whatsapp_group_link?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_course_id_course_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher: {
        Row: {
          biography: string
          country: string
          created_at: string | null
          date_of_birth: string
          email: string
          gender: string
          id: string
          image_url: string | null
          language_proficiency: string | null
          name: string
          phone_no: string
          portfolio_url: string | null
          specialization: string | null
          state: string
          updated_at: string | null
        }
        Insert: {
          biography: string
          country?: string
          created_at?: string | null
          date_of_birth: string
          email: string
          gender: string
          id?: string
          image_url?: string | null
          language_proficiency?: string | null
          name: string
          phone_no: string
          portfolio_url?: string | null
          specialization?: string | null
          state?: string
          updated_at?: string | null
        }
        Update: {
          biography?: string
          country?: string
          created_at?: string | null
          date_of_birth?: string
          email?: string
          gender?: string
          id?: string
          image_url?: string | null
          language_proficiency?: string | null
          name?: string
          phone_no?: string
          portfolio_url?: string | null
          specialization?: string | null
          state?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trial_course: {
        Row: {
          course: string
          created_at: string | null
          expiry: string | null
          id: string
          profiles: string
          schedule: string
          start: string | null
          updated_at: string | null
        }
        Insert: {
          course: string
          created_at?: string | null
          expiry?: string | null
          id?: string
          profiles: string
          schedule: string
          start?: string | null
          updated_at?: string | null
        }
        Update: {
          course?: string
          created_at?: string | null
          expiry?: string | null
          id?: string
          profiles?: string
          schedule?: string
          start?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      auth0_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      auth0_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      auth0_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      cognito_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      cognito_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      cognito_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      hello_world_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      hello_world_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      hello_world_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      mssql_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      mssql_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      mssql_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      pgmq_read: {
        Args: { queue_name: string; vt: number; qty: number }
        Returns: Json
      }
      pgmq_send: {
        Args: { queue_name: string; message: Json }
        Returns: undefined
      }
      redis_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      redis_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      wasm_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      wasm_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      wasm_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
