import {Link} from "react-router-dom";

const SearchBar = ({isSearch, searchString, setSearchString}) => {
    return (
        <div className="mb-3 w-auto d-flex gap-4 justify-content-center align-items-center">
            <input
                type="text"
                className="form-control w-50"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Recipient's username">
            </input>
            <div className="input-group-append">
                {isSearch && (
                    <button className="btn btn-outline-warning">
                        <Link className="text-decoration-none text-black fw-bold"
                              to={`/search?searchString=${searchString || ""}&page=1`}>
                            Search
                        </Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
