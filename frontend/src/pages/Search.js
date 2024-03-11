import SearchBar from "../components/SearchBar";
import ProductsList from "../components/ProductList";
import { useSearchProductsQuery } from "../redux/api/productApi";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import Section from "../components/layout/Section";

const SearchPage = () => {
  const [params] = useSearchParams();

  const [searchString, setSearchString] = useState(params.get("searchString"));

  console.log("searchString", searchString);

  const { data: products, isFetching: productsIsFetching } =
    useSearchProductsQuery({
      searchString: params.get("searchString"),
      page: params.get("page"),
    });

  console.log("productsIsFetching", products);

  return (
    <main>
      <Section id="search_section">
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
          isSearch
        />
      </Section>
      <Section id="product_section">
        <ProductsList
          productsList={products?.data}
          productsIsFetching={productsIsFetching}
        />
      </Section>
      <Pagination
        isSearch
        searchString={searchString}
        totalPages={products?.totalPages}
      />
    </main>
  );
};

export default SearchPage;
