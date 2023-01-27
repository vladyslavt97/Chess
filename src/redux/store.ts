import { configureStore } from '@reduxjs/toolkit';
import moveFromSlice from './moveFromSlice';
import boardSlice from './boardSlice';
import checkMateSlice from './checkmateSlice';

export const store = configureStore({
    reducer: { 
        moveFrom: moveFromSlice,
        board: boardSlice,
        checkMate: checkMateSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch