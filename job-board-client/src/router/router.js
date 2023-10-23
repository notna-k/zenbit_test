import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Registration";


export const privateRoutes = [
    {path: '/about', element: <About/>, exact: true},
    {path: '/register', element: <Register/>, exact: true},
    {path: '/login', element: <Login/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/register', element: <Register/>, exact: true},
]