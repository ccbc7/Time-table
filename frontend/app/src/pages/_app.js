import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import axios from "axios";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; //.envで設定した環境変数を参照
axios.defaults.withCredentials = true;

