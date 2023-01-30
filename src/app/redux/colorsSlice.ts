// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// export interface ColorState {
//     color1: string
//     color2: string
// }

// const initialState: ColorState = {
//     color1: '',
//     color2: ''
// };

// export const colorsSlice = createSlice({
//   name: 'colorValue',
//   initialState,
//   reducers: {
//     setWhiteColor: (state, colorAction: PayloadAction<string>) => {
//       console.log('colorAction: ', colorAction);
//       state.color1 = colorAction.payload;
//     },
//     setBlackColor: (state, colorAction: PayloadAction<string>) => {
//         state.color2 = colorAction.payload;
//     },
//   }
// });
// export const { setWhiteColor, setBlackColor } = colorsSlice.actions
// export default colorsSlice.reducer
