import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function UserInfo() {
  const [user] = useAuthState(auth);

  const photoUrl = user
    ? user.photoURL || "/default_profile2.png"
    : "/default_profile2.png";
  const displayName = user ? user.displayName || "ユーザー" : "ユーザー"; //

  return (
    <div className="flex items-center space-x-4 justify-center">
      <img src={photoUrl} alt="user" className="h-10 w-10 rounded-full" />
      <p className="text-lg font-bold">ようこそ！ {displayName} さん</p>
    </div>
  );
}

export default UserInfo;
