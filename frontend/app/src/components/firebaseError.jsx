// // firebaseError.js
// export default (e, method) => {
//   switch (e.code) {
//     case "auth/cancelled-popup-request":
//     case "auth/popup-closed-by-user":
//       return null;
//     case "auth/email-already-in-use":
//       if (method.indexOf("signup") !== -1) {
//         return "このメールアドレスは使用されています";
//       } else {
//         return "メールアドレスまたはパスワードが違います";
//       }
//     case "auth/invalid-email":
//       return "メールアドレスの形式が正しくありません";
//     case "auth/user-disabled":
//       return "サービスの利用が停止されています";
//     case "auth/user-not-found":
//       return "指定されたユーザーは登録されていません。";
//     case "auth/wrong-password":
//       return "パスワードが間違っています。";
//     case "auth/user-mismatch":
//       return "メールアドレスまたはパスワードが違います";
//     case "auth/weak-password":
//       return "パスワードは6文字以上にしてください";
//     case "auth/popup-blocked":
//       return "認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください";
//     case "auth/operation-not-supported-in-this-environment":
//     case "auth/auth-domain-config-required":
//     case "auth/operation-not-allowed":
//     case "auth/unauthorized-domain":
//       return "現在この認証方法はご利用頂けません";
//     case "auth/requires-recent-login":
//       return "認証の有効期限が切れています";
//     default:
//       if (method.indexOf("signin") !== -1) {
//         return "認証に失敗しました。しばらく時間をおいて再度お試しください";
//       } else {
//         return "エラーが発生しました。しばらく時間をおいてお試しください";
//       }
//   }
// };


import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

export default async (e, method) => {
  const auth = getAuth();
  const errorMessages = {
    "auth/cancelled-popup-request": null,
    "auth/popup-closed-by-user": null,
    "auth/email-already-in-use": async () => {
      if (method.indexOf("signup") !== -1) {
        return "このメールアドレスは使用されています";
      } else {
        const providers = await fetchSignInMethodsForEmail(auth, e.email);
        const providerNames = providers.map(providerName).join(", ");
        return `${e.email}は「${providerNames}」で認証されています。同じ認証方法でログインしてください`;
      }
    },
    "auth/invalid-email": "メールアドレスの形式が正しくありません",
    "auth/user-disabled": "サービスの利用が停止されています",
    "auth/user-not-found": "指定されたユーザーは登録されていません。",
    "auth/wrong-password": "パスワードが間違っています。",
    "auth/user-mismatch": "メールアドレスまたはパスワードが違います",
    "auth/weak-password": "パスワードは6文字以上にしてください",
    "auth/popup-blocked":
      "認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください",
    "auth/operation-not-supported-in-this-environment":
      "現在この認証方法はご利用頂けません",
    "auth/auth-domain-config-required": "現在この認証方法はご利用頂けません",
    "auth/operation-not-allowed": "現在この認証方法はご利用頂けません",
    "auth/unauthorized-domain": "現在この認証方法はご利用頂けません",
    // ...
    "auth/requires-recent-login": "認証の有効期限が切れています",
    default:
      method.indexOf("signin") !== -1
        ? "認証に失敗しました。しばらく時間をおいて再度お試しください"
        : "エラーが発生しました。しばらく時間をおいてお試しください",
  };

  const errorMessage = errorMessages[e.code] || errorMessages["default"];

  return typeof errorMessage === "function"
    ? await errorMessage()
    : errorMessage;
};

function providerName(name) {
  switch (name) {
    case "google.com":
      return "Google";
    case "twitter.com":
      return "Twitter";
    case "facebook.com":
      return "Facebook";
    case "password":
      return "メールアドレス＆パスワード";
    case "emailLink":
      return "メールリンク";
    default:
      return "";
  }
}

