import React, { useState } from "react";
import Router from "next/router";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    Router.push({
      pathname: "/locationAll",
      query: { q: searchQuery },
    });
  };

  return (
    <header>
      <nav className="mr-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
          placeholder="施設を検索"
        />
        <button className="ml-2 bg-blue-500 hover:bg-blue-600 rounded-lg py-1 px-2 text-white" onClick={handleSearch}>検索</button>
      </nav>
    </header>
  );
};

export default Header;
