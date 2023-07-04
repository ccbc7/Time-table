import Header from "@/components/Header";
import Link from "next/link";
import AllCalendar from "@/pages/allCalendar";
import { auth } from "@/utils/firebase";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import SubMenu from "@/components/SubMenu";
import HeaderWithSlider from "@/components/HeaderWithSlider";

function Index() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div>
        <Header />
        <HeaderWithSlider />
      </div>
      <main>
        {!user ? (
          <div className="flex justify-center items-center">
            <Link href="SignIn">
              <button className="my-5 text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-center py-4 px-16 rounded  text-lg">
                使ってみる
              </button>
            </Link>
          </div>
        ) : (
          <>
            <SubMenu />
            <AllCalendar />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Index;
