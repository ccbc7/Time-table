import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";

export const UseRequireLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        router.push("/SignIn");
      }
    });

    return () => unsubscribe();
  }, []);
};

export default UseRequireLogin;
