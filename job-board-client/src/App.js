import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {RouterProvider} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import {AppRouter} from "./router/AppRouter";
import {Cookies, useCookies} from "react-cookie";
import {Circles} from "react-loader-spinner";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies["accessToken"]) {
      setIsAuth(true)
    }
    setLoading(false);
  }, [])


  return (
      <RouterProvider
          router={AppRouter}
      />


  )
}

export default App;