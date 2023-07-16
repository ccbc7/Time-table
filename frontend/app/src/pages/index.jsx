import Header from "@/components/Header";
import Link from "next/link";
import AllCalendar from "@/components/AllCalendar";
import { auth } from "@/utils/firebase";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import SubMenu from "@/components/SubMenu";
import HeaderWithSlider from "@/components/HeaderWithSlider";
import Head from "next/head";
import SliderComponent from "@/components/SliderComponent";

function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
        setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Time table</title>
      </Head>
      <div>
        <Header />
        <HeaderWithSlider />
      </div>
      <div className="h-ful">
        <main className="">
          {!user ? (
            <>
              <div className="bg-gradient-to-b from-white to-pink-50 flex justify-center items-center">
                <Link href="signIn">
                  <button className="my-5 text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-center py-4 px-16 rounded text-lg">
                    使ってみる
                  </button>
                </Link>
              </div>
              <SliderComponent />
            </>
          ) : (
            <>
              <SubMenu />
              <AllCalendar />
              <SliderComponent />
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Index;
