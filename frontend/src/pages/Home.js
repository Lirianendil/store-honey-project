// import { useEffect } from "react";
import { useSearchProductsQuery } from "../redux/api/productApi";
import { useDispatch } from "react-redux";
// import { setLoading } from "../redux/slices/sessionSlice";
import SearchBar from "../components/SearchBar";
import Section from "../components/layout/Section";
import { useState } from "react";
import { useAddItemToCartMutation } from "../redux/api/usersApi";
import Product from "../components/Product/Product";


export const Home = () => {
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();

  const { data: products, isError } = useSearchProductsQuery({
    searchString: "",
    limit: 12,
  });

  const [addToCart] = useAddItemToCartMutation();

  if (isError) {
    return <div>Ошибка при загрузке продуктов</div>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Добавление продукта в корзину при клике на кнопку "Add to cart"
  };

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
              <Product
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
              />
          ))}
        </div>
      </main>
  );
};

export default Home;