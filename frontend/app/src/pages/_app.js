import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import axios from "axios";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL; //.envで設定した環境変数を参照
axios.defaults.withCredentials = true;
