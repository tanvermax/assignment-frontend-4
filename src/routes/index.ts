import { BookDetails } from '@/module/book/BookDetails';

import App from "@/App";
import BorrowPage from "@/components/Borrow/BorrowPage";
import Home from "@/components/Home";

import { Book } from "@/pages/Books";

import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [{
            path: "/",
            Component: Home
        },
        {
            path: "/book",
            Component: Book,
        },
        {
            path: "/borrow",
            Component: BorrowPage
        },
        {
   
            path:"/bookdetails/:bookId",
            Component:BookDetails 
        }
        ]
    }
])


export default router;