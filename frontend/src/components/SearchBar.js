import { Link } from "react-router-dom";

const SearchBar = ({ isSearch, searchString, setSearchString }) => {
  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      {isSearch && (
        <Link to={`/search?searchString=${searchString || ""}&page=1`}>
          Search
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
