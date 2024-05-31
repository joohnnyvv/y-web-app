import { User } from "./UserModel";

export interface Comment {
  id: number;
  content: string;
  user: User;
  likesCount: number;
  isLikedByMe: boolean;
  date: string;
}