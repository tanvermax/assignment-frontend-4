import BookForm from "@/module/book/BookForm";
import { selectBook } from "@/redux/features/book/bookSlice";
import { useAppSelector } from "@/redux/hook";

import { Separator } from "@/components/ui/separator";
import BookListTable from "@/module/book/BookListTable";

export function Book() {
  const books = useAppSelector(selectBook);

  return (
    <div className="w-10/12 mx-auto py-10 space-y-8">
      <h1 className="text-center text-2xl font-bold">Book Management</h1>
      
      <div>
        <BookForm />
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookListTable book={book}/>))}
      </div>
    </div>
  );
}