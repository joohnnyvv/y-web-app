 export interface Post {
    id: number,
     author: string,
     content: string,
     likesCount: number,
     commentsCount: number,
     isLikedByMe: boolean,
     date: Date
     localization?: string
 }