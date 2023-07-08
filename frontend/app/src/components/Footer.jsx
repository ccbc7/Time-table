import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className=" h-[50vh] "></div>
      <footer className="bg-gradient-to-r from-cyan-700 to-cyan-500 text-white w-full py-1 flex flex-col items-center justify-center bottom-0 ">
        <Link href="/">
          <div className="max-w-xl px-4">
            <h1 className="text-l font-bold mb-2 text-center">Time table</h1>
            <p className="text-center text-l">&copy; {currentYear}</p>
          </div>
        </Link>
      </footer>
    </>
  );
};

export default Footer;
