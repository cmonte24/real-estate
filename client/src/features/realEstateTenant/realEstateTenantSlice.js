import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetch from "../../utils/axiosCreate";

export const getAllRealEstate = createAsyncThunk(
  "getAllRealEstate",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axiosFetch.get("/tenant/real-estate");
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getSingleRealEstate = createAsyncThunk(
  "getSingleRealEstate",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.get(`/tenant/real-estate/${id}`);
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const realEstateTenantSlice = createSlice({
  name: "realEstateTenant",
  initialState: {
    allRealEstate: null,
    realEstate: null,
    isLoading: false,
    alertFlag: false,
    alertMsg: "",
    alertType: null,
  },
  reducers: {
    clearAlert: (state) => {
      state.alertFlag = false;
      state.alertMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllRealEstate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRealEstate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRealEstate = action.payload.allRealEstate;
        state.alertFlag = false;
      })
      .addCase(getAllRealEstate.rejected, (state, action) => {
        state.isLoading = false;
        state.alertFlag = true;
        state.alertMsg = action.payload;
        state.alertType = "error";
      })
      .addCase(getSingleRealEstate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRealEstate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.realEstate = action.payload.realEstate;
        state.alertFlag = false;
      })
      .addCase(getSingleRealEstate.rejected, (state, action) => {
        state.isLoading = false;
        state.alertFlag = true;
        state.alertMsg = action.payload;
        state.alertType = "error";
      });
  },
});

export const { clearAlert } = realEstateTenantSlice.actions;

export default realEstateTenantSlice.reducer;
