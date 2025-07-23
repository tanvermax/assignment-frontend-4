import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBorrowBookMutation, useDeleteBookMutation, useUpdateBookMutation } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { IBook } from "@/types";
import { toast } from "react-toastify";

export default function BookListTable({ book, onDeleteSuccess }) {
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [borrowCount, setBorrowCount] = useState(1);
  const [postborrows] = useBorrowBookMutation();

  const form = useForm<IBook>();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await deleteBook(book._id).unwrap();
        if (onDeleteSuccess) onDeleteSuccess();
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const handleEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const available = data.copies > 0;

      const updatedBook = {
        id: book._id,
        ...data,
        available,
      };

      await updateBook(updatedBook).unwrap();
      setIsDialogOpen(false);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };


  const handleBorrow = async () => {
    if (book.copies <= 0) {
      alert("No copies available to borrow.");
      return;
    }

    try {
      const borrowBook = {
        bookId: book._id,
        borrowNumber: borrowCount,
      }
      console.log(borrowBook)
      await postborrows(borrowBook).unwrap();

      console.log(borrowBook)
      toast("Wow Borrows added!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("not added!");
    }
  }

  return (
    <div>
      <Card key={book.id} className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{book.title}</CardTitle>
            <div className="flex gap-2">
              <Badge variant={book.available ? "default" : "destructive"}>
                {book.available ? "Available" : "Checked Out"}
              </Badge>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-50">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Book Details</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" {...form.register("title")} defaultValue={book.title} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input id="author" {...form.register("author")} defaultValue={book.author} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Input id="genre" {...form.register("genre")} defaultValue={book.genre} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" {...form.register("description")} defaultValue={book.description} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="copies">Copies</Label>
                      <Input
                        id="copies"
                        type="number"
                        min={0}
                        defaultValue={book.copies}
                        {...form.register("copies", { valueAsNumber: true, min: 0 })}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="available"
                        disabled
                        checked={form.watch("copies") > 0}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="available">
                        {form.watch("copies") > 0 ? "Available" : "Checked Out"}
                      </Label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Update Changes</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Genre</span>
            <Badge variant="outline">{book.genre}</Badge>
          </div>
          <div className="justify-between">
            <span className="text-sm text-muted-foreground">Description</span>
            <p className="text-sm text-muted-foreground py-2">{book.description}</p>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Copies</span>
            <span>{book.copies}</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Input
              type="number"
              name="borrowbook"
              min={1}
              max={book.copies}
              value={borrowCount}
              onChange={(e) => setBorrowCount(Number(e.target.value))}
              className="w-20"
            />
            <Button
              onClick={handleBorrow}
              disabled={book.copies <= 0 || borrowCount < 1}
            >
              Borrow
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
