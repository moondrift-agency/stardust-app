export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          user: string;
          title: string;
          attachment: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          user?: string;
          title: string;
          attachment: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          user?: string;
          title: string;
          attachment: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}