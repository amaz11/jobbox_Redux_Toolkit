import apiSlice from "../api/apiSlice";

const jobapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/job",
        body: data,
      }),
    }),
    getJob: builder.query({
      query: () => ({
        url: "/jobs",
      }),
    }),
    getJobID: builder.query({
        query: (id) => ({
          url: `/job/${id}`,
        }),
      }),
  }),
});

export const { usePostJobMutation, useGetJobQuery } = jobapi;
