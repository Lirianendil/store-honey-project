// import { useEffect } from "react";
import { useSearchProductsQuery } from "../redux/api/productApi";
import { useDispatch } from "react-redux";
// import { setLoading } from "../redux/slices/sessionSlice";
import { addToCart } from "../redux/slices/cartSlice";
import SearchBar from "../components/SearchBar";
import ProductsList from "../components/ProductList/ProductList";
import Section from "../components/layout/Section";
import { useState } from "react";
import { useAddItemToCartMutation } from "../redux/api/usersApi";
import Product from "../components/Product/Product";

export const Home = () => {
  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();

  const {
    data: products,
    isFetching: productsIsFetching,
    isError,
  } = useSearchProductsQuery({ searchString: "", limit: 12 });

  // useEffect(() => {
  //   dispatch(setLoading(isLoading));
  // }, [isLoading, dispatch]);

  const [addToCart] = useAddItemToCartMutation();

  if (isError) {
    return <div>Ошибка при загрузке продуктов</div>;
  }

  return (
    <main>
      <div className="d-flex mb-10px">
        <Section>
          <SearchBar
            isSearch
            searchString={searchString}
            setSearchString={setSearchString}
          />
        </Section>
      </div>
      <div className="d-flex gap-5">
        {products?.data?.map((product) => (
          <Product product={product} />
        ))}
      </div>
      {/* <Section>
        <ProductsList
          productsList={products?.data}
          productsIsFetching={productsIsFetching}
        />
      </Section> */}
    </main>
  );
};

export default Home;
