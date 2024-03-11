import React from "react";
import SearchBar from "../components/SearchBar";
import ProductsList from "../components/ProductList";
import { useSearchProductsQuery } from "../redux/api/productApi";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [params] = useSearchParams();

  const searchString = params.get("searchString");

  const {
    data: productsList,
    isFetching: productsIsFetching,
    isSuccess,
    isLoading,
    isError,
  } = useSearchProductsQuery("searchString");

  console.log("Search String:", searchString);

  return (
    <main>
      <section className="search_section">
        <SearchBar initialSearchString={params.get("searchString")} />
      </section>
      <section className="product_section">
        <ProductsList
          productsList={productsList}
          productsIsFetching={productsIsFetching}
        />
      </section>
    </main>
  );
};

export default Search;
