import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDeleteBookMutation, useUpdateBookMutation } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { IBook } from "@/types";


export default function BookListTable({ book, onDeleteSuccess }) {


  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<IBook>();


  const handleDelete = async () => {
    console.log("book.id", book._id)

    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {

      try {
        await deleteBook(book._id).unwrap();
        if (onDeleteSuccess) onDeleteSuccess();
        // You could also add toast notification here
      } catch (error) {
        console.error("Failed to delete book:", error);
        // Add error toast notification here
      }
    }
  };

  const handleEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(book)
    try {
      const updatedBook = {
        id:book._id,
        // title: data.title,  // or any fields being updated
        // author: data.author,
        // copies: data.copies,
        // description: data.description,
        // genre: data.genre,
        // isbn: data.isbn,
        // available: data.available,
        ...data
      };
      await updateBook(updatedBook).unwrap();
      setIsDialogOpen(false);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      console.error("Failed to update book:", error);
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
                        defaultValue={book.copies}
                        {...form.register("copies", { valueAsNumber: true })}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="available"
                        {...form.register("available")}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="available">Available</Label>
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
            <p className="text-sm text-muted-foreground py-2"> {book.description}</p>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Copies</span>
            <span>{book.copies}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
