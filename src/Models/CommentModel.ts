import { User } from "./UserModel";

export interface Comment {
  id: number;
  content: string;
  author: User;
  likesCount: number;
  isLikedByMe: boolean;
  date: string;
}

export interface CommentMessage {
  postId: number,
  commentResponse: Comment,
}