import Link from "next/link";

function SubMenu() {
  return (
    <>
      <div className="bg-gray-50 flex justify-center items-center py-3">
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-5xl">
          <div className="flex justify-evenly">
            <Link href="/locationCreate">
              <button className="px-6 py-4 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-lime-100 transition duration-200 ease-in-out shadow-md">
                施設を登録する
              </button>
            </Link>
            <Link href="/locationAll">
              <button className="px-6 py-4 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-lime-100 transition duration-200 ease-in-out shadow-md">
                施設を予約する
              </button>
            </Link>
            <Link href="/hours">
              <button className="px-6 py-4 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-violet-100 transition duration-200 ease-in-out shadow-md">
                時間設定
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubMenu;
