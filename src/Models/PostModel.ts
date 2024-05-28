import { User } from "./UserModel"

 export interface Post {
    id: number,
     user: User,
     content: string,
     likesCount: number,
     commentsCount: number,
     isLikedByMe: boolean,
     imageUrl?: string,
     date: Date
 }