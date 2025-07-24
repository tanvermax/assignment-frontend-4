import BookForm from "@/module/book/BookForm";
import { Separator } from "@/components/ui/separator";
import BookListTable from "@/module/book/BookListTable";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Book() {
    const [page, setPage] = useState(1);
  const limit = 5;
  // const books = useAppSelector(selectBook);

  const { data, isLoading, isError,refetch } = useGetBooksQuery({ page, limit });
  // console.log(data.books);
  if (isLoading) {
    return (<p>Loading....</p>)
  }
  if (isError) {
    return (<p>Error....</p>)
  }

    const books: IBook[] = data?.books || [];
  const pagination = data?.pagination;

  console.log(books)
  return (
    <div className="w-10/12 mx-auto py-10 space-y-8">
      <h1 className="text-center text-2xl font-bold">Book Management</h1>

      <div>
        <BookForm />
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading && books.map((book: IBook) => (
          <BookListTable book={book} key={book._id} onDeleteSuccess={refetch}  />))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page >= pagination.totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}