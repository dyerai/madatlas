import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // // The `getPosts` endpoint is a "query" operation that returns data
    // getPosts: builder.query({
    //   // The URL for the request is '/fakeApi/posts'
    //   query: () => "/posts",
    // }),
    getSubjects: builder.query({
        query: () => "/getSubjects"
    }),
    getNumCourses: builder.query({
        query: () => "/getNumCourses"
    }),
    getCourses: builder.query({
        url: "/search/"
    })
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
// export const { useGetPostsQuery } = apiSlice;
