export interface User {
    id: number,
    name: string,
    lastName: string,
    followersCount?: number,
    isFollowingCount?: number,
    avatarColor: UserAvatarColors
}

export enum UserAvatarColors {
    gray = '#696c80',
    lightPink = '#fbacbe',
    lightGreen = '#c3dfe0',
    yellow = '#edb458',
    brown = '#7d6d61'
}