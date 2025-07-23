import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: ['Book'],
        }),
        createBooks: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            })
        }),
        updateBook: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Book']
        })

    })
})

export const { useGetBooksQuery, useCreateBooksMutation, useDeleteBookMutation, useUpdateBookMutation } = baseApi;