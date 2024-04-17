import React, { useState, useEffect } from "react";
import { useLazySearchProductsQuery } from "../../redux/api/productApi";
import Product from "../../components/Product/Product";
import Section from "../../components/layout/Section";
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminProduct = () => {
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchProducts, { data: products, isFetching: productsIsFetching }] =
    useLazySearchProductsQuery();

  useEffect(() => {
    const fetchData = async () => {
      await searchProducts({ searchString, page: currentPage });
    };
    fetchData();
  }, [searchProducts, searchString, currentPage]);

  const pagesArray = [];
  for (let i = 1; i <= products?.totalPages; i++) {
    pagesArray.push(i);
  }

  const handleSearch = async () => {
    await searchProducts({ searchString, page: currentPage });
  };

  return (
    <main>
      <Section>
        <div>
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </Section>

      <Section>
        {!productsIsFetching ? (
          <div className="products_admin_list">
            {products?.data?.map((prod) => (
              <Product key={prod._id} product={prod} isAdmin />
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Section>

      <Section>
        <div className="pagination">
          {products?.totalPages > 1 &&
            pagesArray.map((page) => (
              <button
                className="pagination_btn"
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
        </div>
      </Section>

      <Link className="admin_product" to="/admin/create">
        Go to Admin Create Product
      </Link>
    </main>
  );
};

export default AdminProduct;
