export interface User {
    id: number,
    name: string,           
    lastName: string,
    password?: string,
    email?: string,       
    followersCount?: number,
    isFollowingCount?: number,
    avatarColor: UserAvatarColors,
    isActive: boolean,
    isFollowedByUser: boolean
}

export enum UserAvatarColors {
    gray = '#696c80',
    lightPink = '#fbacbe',
    lightGreen = '#c3dfe0',
    yellow = '#edb458',
    brown = '#7d6d61'
}
