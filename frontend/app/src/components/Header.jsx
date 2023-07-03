import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "./SearchBox";
import Notice from "@/components/Notice";
import Popup from "@/components/Popup";

const navigation = [
  {
    name: "施設",
    href: "#",
    current: false,
    subMenu: [
      { name: "施設一覧", href: "/LocationAll" },
      { name: "施設登録", href: "/LocationCreate" },
      { name: "登録した施設", href: "/LocationShow" },
      { name: "コメントした施設", href: "/UserNotes" },
    ],
  },
  {
    name: "予約",
    href: "#",
    current: false,
    subMenu: [
      { name: "予約作成", href: "/LocationAll" },
      { name: "予約確認", href: "/ReservationAll" },
    ],
  },
];

const userNavigation = [
  { name: "プロフィール", href: "/ProfileEdit" },
  { name: "サインアウト", href: "#" },
];

const guestNavigation = [
  { name: "新規登録", href: "/SignUp" },
  { name: "サインイン", href: "/SignIn" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState(
    user && user.photoURL ? user.photoURL : "/default_profile2.png"
  );

  function Notifications() {
    const [show, setShow] = useState(false);
    const handleBellClick = () => {
      setShow((prevShow) => !prevShow);
    };

    return (
      <div>
        {/* <BellIcon onClick={handleBellClick} /> */}
        {show && (
          <div className="notification-list">
            <p>hello</p>
            <Notice />
          </div>
        )}
      </div>
    );
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("ログアウトエラー：", error);
      });
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let unSub;
    const fetchUsers = async (userId) => {
      const response = await axios.get(`/users?user_id=${userId}`);
      setUsers(response.data);
    };

    if (user) {
      fetchUsers(user.uid);
      setPhotoUrl(user.photoURL ? user.photoURL : "/default_profile2.png");
      unSub = auth.onAuthStateChanged((user) => {
        if (user) fetchUsers(user.uid);
      });
    }

    return () => {
      if (unSub) {
        unSub();
      }
    };
  }, [user]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-lime-50 border-b">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link
                        href="/"
                        className="text-black text-xl border-2 border-gray-700 rounded-lg px-4 py-2 font-medium"
                      >
                        Time table
                      </Link>
                    </div>
                  </div>
                  {user ? (
                    <>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <div className="flex-shrink-0">
                            <div className="hidden md:block">
                              <div className="flex items-center space-x-4 mr-10">
                                {navigation.map((item, index) => (
                                  <Menu
                                    key={index}
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <div>
                                      <Menu.Button className="rounded-md px-3 py-2 text-md font-medium bg-lime-200 hover:bg-lime-400 hover:text-gray-900 border">
                                        {item.name}
                                      </Menu.Button>
                                    </div>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                        {item.subMenu.map((subItem) => (
                                          <Menu.Item key={subItem.name}>
                                            {({ active }) => (
                                              <Link
                                                href={subItem.href}
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                {subItem.name}
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        ))}
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                ))}
                              </div>
                            </div>
                          </div>
                          <SearchBox />
                          <Popup />
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                {/* <Menu.Button> */}
                                <span className="sr-only">Open user menu</span>
                                {users.length > 0 ? ( //
                                  <ul>
                                    {users.map((user) => (
                                      <li key={user.id}>
                                        <img
                                          src={
                                            user.image_url ||
                                            "/default_profile2.png"
                                          }
                                          className="h-8 rounded-full"
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={photoUrl}
                                    alt="user"
                                  />
                                )}
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                        onClick={
                                          item.name === "サインアウト"
                                            ? handleSignOut
                                            : null
                                        }
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {guestNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="text-gray-900 hover:bg-gray-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-2 space-y-1 sm:px-3">
                  {navigation.map((item, itemIdx) =>
                    item.subMenu.length ? (
                      <Menu
                        as="div"
                        key={itemIdx}
                        className="relative text-left"
                      >
                        <div>
                          <Menu.Button className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-300 hover:text-gray-900">
                            {item.name}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            {item.subMenu.map((subItem) => (
                              <Menu.Item key={subItem.name}>
                                {({ active }) => (
                                  <Link
                                    href={subItem.href}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
                {/* User section */}
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {users.length > 0 ? (
                        <ul>
                          {users.map((user) => (
                            <li key={user.id}>
                              <img
                                src={user.image_url || "/default_profile2.png"}
                                className="h-8 w-8 rounded-full"
                                alt=""
                              />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={photoUrl}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {/* {user.name} */}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {/* {user.email} */}
                      </div>
                    </div>
                    <Notifications />
                    <button
                      type="button"
                      className="ml-auto rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={
                          item.name === "サインアウト" ? handleSignOut : null
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
