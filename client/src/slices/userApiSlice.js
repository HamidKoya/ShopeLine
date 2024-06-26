import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password/${data.resetToken}`,
        method: "PATCH",
        body: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        body:data
      })
    }),

    getUsers: builder.query({
      query : () => ({
        url:USERS_URL 
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: user => ({
        url: `${USERS_URL}/${user.id}`,
        method:"PUT",
        body:user
      })
    }),
    getUsersById: builder.query({
      query : (id) => ({
        url:`${USERS_URL}/${id}`, 
      }),
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        method:"DELETE",
        
      })
    }),

  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUsersByIdQuery,
  useDeleteUserMutation,
} = userApiSlice;
