import { baseApi } from "../../api/baseApi";

type TAuthState = {
  user: null | object;
  token: null | string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TAuthState) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {useLoginMutation} = authApi
