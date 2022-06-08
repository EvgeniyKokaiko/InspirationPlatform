export interface User {
  avatar: string;
  date_of_birth: string;
  description: string;
  email: string;
  full_name: string;
  gender: string;
  location: string;
  personal_site: string;
  username: string;
}
export interface Post {
  id: number;
  owner: string;
  type: number;
  image: string;
  video: string;
  caption: string;
  like_id: string;
  date_of_creation: string;
  data_count: number;
}
export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
}

export interface Requests {
  created_at: string;
  description: string;
  email: string;
  full_name: string;
  id: number;
  owner: string;
  status: number;
  subscriber: string;
  updated_at: string;
  username: string;
}

export interface PlainMessage {
  sender: string;
  companion: string;
  created_at: number;
  plain_message: string;
  status: number;
  type: number;
  message_hash?: string;
}

export interface Comment {
  creator: string;
  comment_hash: string;
  post_hash: string;
  comment_string: string;
  created_at: string;
  updated_at: string;
  location?: string;
  full_name?: string;
  username?: string;
}

export interface Notification {
  Id: number;
  holder: string;
  text: string;
  author: string;
  post_hash: string;
  status: number;
  createdAt: string;
}
