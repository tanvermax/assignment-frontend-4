
import App from "@/App";
import { Book } from "@/pages/Books";

import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children:[
            {
                index:true,
                Component:Book,
            }
        ]
    }
])


export default router;