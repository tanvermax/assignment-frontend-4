import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BookListTable({book}) {
  return (
    <div>
      <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{book.title}</span>
                <Badge variant={book.available ? "default" : "destructive"}>
                  {book.available ? "Available" : "Checked Out"}
                </Badge>
              </CardTitle>
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
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Copies</span>
                <span>{book.copies}</span>
              </div>
            </CardContent>
          </Card>
    </div>
  )
}
