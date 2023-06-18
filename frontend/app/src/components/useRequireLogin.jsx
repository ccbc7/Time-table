import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";

export const useRequireLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // ユーザーはログインしている
      } else {
        // ユーザーはログインしていない
        router.push("/SignIn");
      }
    });

    // cleanup function
    return () => unsubscribe();
  }, []);
};

export default useRequireLogin;
