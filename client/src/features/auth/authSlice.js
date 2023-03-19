import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetch from "../../utils/axiosCreate";

const user = localStorage.getItem("user");

export const loginOwner = createAsyncThunk(
  "loginOwner",
  async ({ userInfo }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.post("/auth/login", userInfo);
      localStorage.setItem("user", JSON.stringify(data.owner));
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userType", data.userType);
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const registerOwner = createAsyncThunk(
  "registerOwner",
  async ({ formData }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(data.owner));
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userType", data.userType);
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginTenant = createAsyncThunk(
  "loginTenant",
  async ({ userInfo }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.post("/auth/login", userInfo);
      localStorage.setItem("user", JSON.stringify(data.tenant));
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userType", data.userType);
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const registerTenant = createAsyncThunk(
  "registerTenant",
  async ({ formData }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(data.tenant));
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userType", data.userType);
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ userInfo }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.post("/auth/forgot-password", userInfo);
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ resetInfo }, thunkAPI) => {
    try {
      const { data } = await axiosFetch.patch(
        "/auth/reset-password",
        resetInfo
      );
      return await data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const logOut = createAsyncThunk("logOut", async (arg, thunkAPI) => {
  try {
    await axiosFetch.post("/auth/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    thunkAPI.dispatch(stateClear());
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? JSON.parse(user) : null,
    token: localStorage.getItem("token") || "",
    userType: localStorage.getItem("userType") || "",
    isLoading: false,
    errorFlag: false,
    errorMsg: "",
    alertType: null,
    success: null,
  },
  reducers: {
    stateClear: (state) => {
      state.user = null;
      state.token = "";
      state.userType = "";
      state.success = null;
    },
    clearAlert: (state) => {
      state.errorFlag = false;
      state.errorMsg = "";
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.owner;
        state.token = action.payload.accessToken;
        state.userType = action.payload.userType;
      })
      .addCase(loginOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.errorMsg = action.payload;
        state.alertType = "error";
      })
      .addCase(registerOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.owner;
        state.token = action.payload.accessToken;
        state.userType = action.payload.userType;
      })
      .addCase(registerOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.errorMsg = action.payload;
        state.alertType = "error";
      })
      .addCase(loginTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginTenant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.tenant;
        state.token = action.payload.accessToken;
        state.userType = action.payload.userType;
      })
      .addCase(loginTenant.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.errorMsg = action.payload;
        state.alertType = "error";
      })
      .addCase(registerTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerTenant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.tenant;
        state.token = action.payload.accessToken;
        state.userType = action.payload.userType;
      })
      .addCase(registerTenant.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.errorMsg = action.payload;
        state.alertType = "error";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.alertType = "success";
        state.errorMsg = action.payload.msg;
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.errorMsg = action.payload;
        state.alertType = "error";
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.alertType = "success";
        state.errorMsg = action.payload.msg;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFlag = true;
        state.errorMsg = action.payload;
        state.alertType = "error";
      });
  },
});

export const { stateClear, clearAlert } = authSlice.actions;

export default authSlice.reducer;
