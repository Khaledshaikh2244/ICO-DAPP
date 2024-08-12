import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import "../styles/globals.css";


// INTERNAL IMPORTS
import {StateContextProvider} from "../Context/index";


export default function App({ Component, pageProps }) {
  return (
    <>
      <h1>HElllo</h1>
      <StateContextProvider>
      <Component {...pageProps} />
      <Toaster />
      </StateContextProvider>
    </>
  );
}
