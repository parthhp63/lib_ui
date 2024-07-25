import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../../services/axios.service";
export const currUser = createAsyncThunk("authSlice/currUser", async (id) => {
  const res = await axios.get("/getuser");
  return res.data.success;
});

export const getUserById = createAsyncThunk(
  "authSlice/getUserById",
  async (id) => {
    const res = await axios.get(`/user/${id}`);
    return res.data.user;
  }
);

export const login = createAsyncThunk(
  "authSlice/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/login", data);
      console.log("in login");
      console.log(res.data, "uithsoignhsofhsdofnsdofnhs");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response?.data?.messages
      );
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  const res = await axiosGetRequest("/logout");
  return res.success;
});

const authSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: JSON.parse(localStorage.getItem("user")) || {},
    error: false,
    loading: false,
    LoggedIn: localStorage.getItem("user") ? true : false,
  },
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currUser.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(currUser.fulfilled, (state, action) => {
        state.loading = false;
        state.LoggedIn = action.payload;
      })
      .addCase(currUser.rejected, (state, action) => {
        state.loading = false;
        state.LoggedIn = false;
      });
    builder
      .addCase(getUserById.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(login.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.LoggedIn = true;
        console.log(action.payload, "payload of action");
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));

        console.log(state.user, "state.userstate.user");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

         builder
           .addCase(logout.pending, (state, action) => {
             state.error = false;
             state.loading = true;
           }) 
           .addCase(logout.fulfilled, (state, action) => {
             state.loading = false;
             localStorage.removeItem("token");
             localStorage.removeItem("user");
             state.user = {};
           })
           .addCase(logout.rejected, (state, action) => {
             state.loading = false;
             state.user = {};
             localStorage.removeItem("token");
             localStorage.removeItem("user");
             state.error = action.payload;
           });

  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
