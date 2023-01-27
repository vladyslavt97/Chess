import { configureStore } from '@reduxjs/toolkit';
import moveFromSlice from './moveFromSlice';
import boardSlice from './boardSlice';
import legalMovesSlice from './legalmovesSlice';

export const store = configureStore({
    reducer: { 
        moveFrom: moveFromSlice,
        board: boardSlice,
        legalmoves: legalMovesSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch