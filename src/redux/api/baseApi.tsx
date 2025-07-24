import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({ page = 1, limit = 10 }) =>({
                 url: '/books',
                 params:{ page,limit}
            }),
            providesTags: ['Book'],
        }),
        
        getSingleBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: (id) => [{ type: 'Book', id }],
        }),
        
        createBooks: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
             invalidatesTags: ['Book'],
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
        }),
        borrowBook: builder.mutation({
            query: ({ bookId, borrowNumber }) => ({
                url: `/borrow`,
                method: "POST",
                body: {
                    bookid: bookId,
                    borrowNumber,
                },
            }),
            invalidatesTags: ['Book'],
        }),
        getBorrow: builder.query({
            query: () => '/borrow',
            providesTags: ['Book'],
        }),

    })
})

export const { useGetBooksQuery, useCreateBooksMutation, useDeleteBookMutation, useUpdateBookMutation,useBorrowBookMutation,useGetBorrowQuery,useGetSingleBookQuery } = baseApi;