import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";

export const useRequireLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        router.push("/signIn");
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useRequireLogin;
