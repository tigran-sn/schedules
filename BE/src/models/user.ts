export interface User {
  id: number;
  email: string;
  password_hash: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  user_role: number;
}
