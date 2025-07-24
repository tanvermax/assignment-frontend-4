import type { IBook } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';




export interface BorrowRecord {
  _id: string;
  borrowNumber: number;
  bookInfo: IBook;
}



export default function Borrowlist({ data }: { data: BorrowRecord[] }) {


  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Borrowed Books</CardTitle>
        <CardDescription>Currently borrowed books and their details</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Copies Borrowed</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           {data.map((record) => (
              <TableRow key={record._id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{record.bookInfo.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {record.bookInfo.description?.substring(0, 50)}...
                    </span>
                  </div>
                </TableCell>
                <TableCell>{record.bookInfo.author}</TableCell>
                <TableCell>
                  <Badge variant="outline">{record.bookInfo.genre}</Badge>
                </TableCell>
                <TableCell>{record.borrowNumber}</TableCell>
                <TableCell>
                  <Badge
                    variant={record.bookInfo.available ? "default" : "destructive"}
                  >
                    {record.bookInfo.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
