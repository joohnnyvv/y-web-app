export interface LoginRequestBody {
    email: string,
    password: string
}

export interface RegisterRequestBody extends LoginRequestBody {
    name: string,
    lastName: string,
    avatarColor: string
}

export interface AddCommentBody {
    userId: number,
    content: string,
}

export interface AddPostBody extends AddCommentBody {
    imageUrl?: string
}

export interface LikePostBody {
    userId: number,
    postId: number
}

export interface LikeCommentBody {
    userId: number,
    commentId: number
}