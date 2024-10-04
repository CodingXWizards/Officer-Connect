import { User } from "@/types/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
};

const initialState: UserState = {
    user: null,
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        }
    }
});

export const { setIsAuthenticated, setUser } = userSlice.actions;
export default userSlice.reducer;
