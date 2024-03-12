import Product from "../Product/Product";
import "./ProductList.css";

const ProductsList = ({ productsList, productsIsFetching }) => {
  if (productsIsFetching) return <div>Products list is loading...</div>;

  return (
    <div className="products_list">
      {productsList && productsList.length > 0 ? (
        <>
          {productsList?.map((productItem) => (
            <Product key={productItem._id} product={productItem} />
          ))}
        </>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default ProductsList;
