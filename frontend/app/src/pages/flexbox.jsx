import Image from "next/image";
import Link from "next/link";


function BBB() {
  return (
    <>
      <header>
        <div className="flex justify-center items-center m-4">
          <img src="/profile.png" className="rounded-full" />
        </div>
        <h1 className=""></h1>
      </header>
      <section className="m-4 text-xl text-center">
        <h2 className="text-2xl m-4 font-bold ">📝エンジニアのブログ</h2>
        <p>
          プログラミング勉強中です!Next.jsとrailsを勉強しています!ポテパンキャンプ卒業生
        </p>
      </section>
      <div class="flex justify-center flex-wrap text-center drop-shadow-2xl ">
        <div>
          <Link href="/">
            <img
              className="w-96 h-64 object-cover object-center mx-4 rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-105"
              src="/thumbnail01.jpg"
            />
            <p>SSGとSSRの違い</p>
          </Link>
        </div>
        <div>
          <Link href="/">
            <img
              className="w-96 h-64 object-cover object-center mx-4 rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-105"
              src="/thumbnail02.jpg"
            />
            <p>MACvsWINDOWS</p>
          </Link>
        </div>
        <div>
          <Link href="/">
            <img
              className="w-96 h-64 object-cover object-center mx-4 rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-105"
              src="/thumbnail03.jpg"
            />
            <p>Next.jsの使い方</p>
          </Link>
        </div>
        <div>
          <Link href="/">
            <img
              className="w-96 h-64 object-cover object-center mx-4 rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-105"
              src="/thumbnail04.jpg"
            />
            <p>MACvsWINDOWS</p>
          </Link>
        </div>
        <div>
          <Link href="/">
            <img
              className="w-96 h-64 object-cover object-center mx-4 rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-105"
              src="/bird.jpg"
            />
            <p>bird</p>
          </Link>
        </div>
        <div>
          <Link href="/">
            <img
              className="w-96 h-64 object-cover object-center mx-4 rounded-md hover:ring-4 ring-indigo-300 overflow-hidden transform transition-all duration-400 ease-in-out hover:scale-105"
              src="/door.jpg"
            />
            <p>door</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BBB;
