import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function UserInfo() {
  const [user] = useAuthState(auth);

  const photoUrl = user
    ? user.photoURL || "/default_profile2.png"
    : "/default_profile2.png"; //
  const displayName = user ? user.displayName || "ユーザー" : "ユーザー";

  return (
    <img src={photoUrl} alt="user" className="rounded-full h-28 w-28" />
  );
}

export default UserInfo;
