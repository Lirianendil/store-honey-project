import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ initialSearchString }) => {
  const [searchString, setSearchString] = useState(initialSearchString);

  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Link to={`/search?searchString=${searchString}`}>Search</Link>
    </div>
  );
};

export default SearchBar;
