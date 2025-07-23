import BookForm from "@/module/book/BookForm";
import { Separator } from "@/components/ui/separator";
import BookListTable from "@/module/book/BookListTable";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

export function Book() {
  // const books = useAppSelector(selectBook);

  const { data, isLoading, isError,refetch } = useGetBooksQuery(undefined);
  // console.log(data.books);

  if (isLoading) {
    return (<p>Loading....</p>)
  }
  if (isError) {
    return (<p>Error....</p>)
  }

  console.log(data.books)
  return (
    <div className="w-10/12 mx-auto py-10 space-y-8">
      <h1 className="text-center text-2xl font-bold">Book Management</h1>

      <div>
        <BookForm />
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading && data.books.map((book: IBook) => (
          <BookListTable book={book} key={book.id} onDeleteSuccess={refetch}  />))}
      </div>
    </div>
  );
}