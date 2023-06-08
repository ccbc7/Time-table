import Header from '@/components/Header';
import UserInfo from '@/components/UserInfo';
import Link from 'next/link';

function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="flex justify-center items-center bg-emerald-400 lg:px-0">
          <img
            className="object-contain max-h-64 mx-auto h-full w-full lg:max-h-64 lg:mx-0"
            src="/headerPanel.png"
            alt="header panel"
          />
        </div>
      </div>
      <main>
        <div className="flex justify-center items-center">
          <Link href="SignIn">
            <button className="mt-5 text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-center py-8 px-20 rounded  text-lg">
              使ってみる
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
