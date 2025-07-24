import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function BookShowcase() {
  // Sample book data
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fantasy",
      description: "Between life and death there is a library...",
      coverImage: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS5DZ1VXiTV1rhc-rpjw_II9gspMex_F0b2mF8XG_W2ubFvWmhn",
      available: true
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      description: "Tiny changes, remarkable results...",
      coverImage: "https://m.media-amazon.com/images/I/61M6KzUbf7L._UF1000,1000_QL80_.jpg",
      available: true
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Sci-Fi",
      description: "The epic saga of Arrakis and the spice melange...",
      coverImage: "https://cdn.kobo.com/book-images/85907506-e152-445e-b9ef-01c1b2a30a29/1200/1200/False/dune-13.jpg",
      available: false
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Discover Our Collection
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore handpicked titles from our library
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Available" : "Borrowed"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {book.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">{book.genre}</Badge>
                <Button variant="ghost" size="sm">
                  View details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Browse Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
}