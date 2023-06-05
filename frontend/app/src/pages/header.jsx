// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
//         <div className="relative flex items-center justify-between h-16">
//           {/* Company logo */}
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
//               aria-label="Main menu"
//               aria-expanded="false"
//             >
//               <svg
//                 className="block h-6 w-6"
//                 stroke="currentColor"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   className="menu-button"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex-shrink-0 flex items-center">
//               {/* Insert your logo here */}
//               <img
//                 className="block lg:hidden h-8 w-auto"
//                 src="/img/logos/workflow-mark-on-white.svg"
//                 alt="Workflow logo"
//               />
//               <img
//                 className="hidden lg:block h-8 w-auto"
//                 src="/img/logos/workflow-logo-on-white.svg"
//                 alt="Workflow logo"
//               />
//             </div>
//             <div className="hidden sm:ml-6 sm:flex">
//               {/* Insert navigation links here */}
//             </div>
//           </div>
//           {/* Show user info here */}
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <div className="ml-3 relative">
//               <div>
//                 <button
//                   className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
//                   id="user-menu"
//                   aria-label="User menu"
//                   aria-haspopup="true"
//                 >
//                   {/* User Avatar */}
//                   <img
//                     className="h-8 w-8 rounded-full"
//                     src="/img/user.jpg"
//                     alt=""
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
//         <div className="px-2 pt-2 pb-3">{/* Mobile Menu */}</div>
//       </div>
//     </nav>
//   );
// }


import { getAuth } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "./AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo section */}
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="/img/logos/workflow-mark.svg"
                alt="Logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="/img/logos/workflow-logo.svg"
                alt="Logo"
              />
            </div>
            {/* Main menu section on large screens */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* Insert navigation links here */}
            </div>
          </div>
          {/* User menu section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="flex sm:hidden">
              <button
                type="button"
                className="px-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                aria-label="toggle menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {/* User Avatar */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={auth.currentUser.photoURL}
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-4">
          {/* Insert mobile navigation links here */}
          <p>モバイル</p>
        </div>
      </div>
    </header>
  );
}
