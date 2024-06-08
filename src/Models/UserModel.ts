export interface User {
    id: number,
    name: string,           
    lastName: string,
    password?: string,
    email: string,       
    avatarColor: UserAvatarColors,
}

export enum UserAvatarColors {
    DARK_BLUE = "#0D47A1",
    DARK_RED = "#C62828",
    DARK_GREEN = "#2E7D32",
    DARK_YELLOW = "#F9A825",
    DARK_ORANGE = "#EF6C00",
    DARK_PURPLE = "#6A1B9A",
    DARK_PINK = "#AD1457",
    DARK_CYAN = "#00838F",
    DARK_MAGENTA = "#6A1B9A",
    DARK_BROWN = "#4E342E",
    DARK_GRAY = "#37474F",
    DARK_TEAL = "#00695C",

    LIGHT_BLUE = "#90CAF9",
    LIGHT_RED = "#EF9A9A",
    LIGHT_GREEN = "#A5D6A7",
    LIGHT_YELLOW = "#FFF59D",
    LIGHT_ORANGE = "#FFCC80",
    LIGHT_PURPLE = "#CE93D8",
    LIGHT_PINK = "#F48FB1",
    LIGHT_CYAN = "#80DEEA",
    LIGHT_MAGENTA = "#E1BEE7",
    LIGHT_BROWN = "#BCAAA4",
    LIGHT_GRAY = "#B0BEC5",
    LIGHT_TEAL = "#80CBC4"
}
