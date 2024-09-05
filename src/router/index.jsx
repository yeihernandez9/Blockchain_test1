import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import LayoutPublic from "../layouts/LayoutPublic";
import NotFound from "../pages/notFound/NotFound";
import CounterPage from "../pages/counter/CounterPage";
import TokenPage from "../pages/token/TokenPage";
import NftPage from "../pages/nft/NftPage";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <LayoutPublic />,
        errorElement: <NotFound />,
        children:[
            {
                index: true,
                element: <Home />
            },{
                path : "/counter",
                element : <CounterPage />
            },{
                path : "/token",
                element : <TokenPage />
            },{
                path : "/nft",
                element : <NftPage/>
            }
            
        ]
        
    }
])