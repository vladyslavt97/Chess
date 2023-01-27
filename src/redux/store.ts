import { configureStore } from '@reduxjs/toolkit';
import moveFromSlice from './moveFromSlice';
import boardSlice from './boardSlice';

export const store = configureStore({
    reducer: { 
        moveFrom: moveFromSlice,
        board: boardSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch