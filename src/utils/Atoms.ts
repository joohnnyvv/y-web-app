import { atom } from "jotai";
import { User } from "../Models/UserModel";
import { Comment, CommentMessage } from "../Models/CommentModel";

export const commentFromWsAtom = atom<CommentMessage | null>(null)

export const themeAtom = atom<"dark" | "light">("light");

export const isLoggedInAtom = atom<boolean>(false);

export const loggedUserAtom = atom<User | null>(null);
