import React, { useRef, useState } from "react";

function FormSearch({ loadMore, setItems }) {
  const [query, setQuery] = useState("");
  const searchRef = useRef();

  const changeSearch = () => {
    setQuery(searchRef.current.value);
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        setItems([]);
        loadMore(query);
      }}
      className="search"
    >
      <input
        type="search"
        name="searchQuery"
        style={{
          fontSize: "16px",
          padding: "5px",
        }}
        placeholder="Search..."
        ref={searchRef}
        value={query}
        onChange={changeSearch}
      />
    </form>
  );
}

export default FormSearch;
