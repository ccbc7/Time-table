import Header from "@/components/Header";
import { useForm } from "react-hook-form";


function Profile() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
    };
  return (
    <>
      <div>
        <Header />
      </div>
      <h2>プロフィール</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="ユーザーネーム" />
        <input {...register("introduction")} placeholder="自己紹介" />
        <input {...register("image")} type="file" />
        <input type="submit" />
      </form>
    </>
  );
}

export default Profile;
