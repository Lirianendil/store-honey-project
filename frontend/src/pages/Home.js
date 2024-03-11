import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/sessionSlice";
import { addToCart } from "../redux/slices/cartSlice";
import SearchBar from "../components/SearchBar";

import Product from "../components/Product/Product";
import ProductsList from "../components/ProductList";

export const Home = () => {
  const dispatch = useDispatch();
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Добавление продукта в корзину при клике на кнопку "Add to cart"
  };

  if (error) {
    return <div>Ошибка при загрузке продуктов</div>;
  }

  return (
    <main>
      <div className="d-flex mb-10px">
        <SearchBar />
      </div>
      <div className="d-flex gap-5">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.price} $</p>
              <button
                className="btn btn-warning"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductsList />
    </main>
  );
};

export default Home;
