import { AllCarsProps } from "@/types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface rootSliceType {
  allCars: AllCarsProps | null;
}

const initialState: rootSliceType = {
  allCars: null,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addAllCars: (state, action: PayloadAction<AllCarsProps>) => {
      state.allCars = action.payload;
    },
  },
});

export const rootActions = rootSlice.actions;
export const rootReducer = rootSlice.reducer;
