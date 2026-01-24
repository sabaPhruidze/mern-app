import type { User } from "../store/slices/authSlice";

export const getUserFromStorage = ():User | undefined | null => {
    const raw = localStorage.getItem('user');
    if(!raw) return null;
    try {
        return JSON.parse(raw) as User;
    } catch {
        return null;
    }
}

export const getTokenFromStorage = ():string | null => {
    return getUserFromStorage()?.token ?? null
}