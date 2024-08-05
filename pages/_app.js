import Head from "next/head";
import toast from "react-hot-toast";
import "../styles/globals.css";


// INTERNAL IMPORTS
import {StateContextProvider} from "../Context/index.js"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
