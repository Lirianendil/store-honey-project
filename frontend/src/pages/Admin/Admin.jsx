import React, { useEffect, useState } from "react";
import { useLazySearchProductsQuery } from "../../redux/api/productApi";
import Product from "../../components/Product/Product";
import ProductForm from "../../components/ProductForm";
import Section from "../../components/layout/Section";
import Title from "../Title";
import { Link } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";

const Admin = () => {
  useAdmin();

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
      <Title title={"Admin"} />

      <Section>
        <ProductForm />
      </Section>

      <Link className="admin_product" to="/admin/product">
        Go to Admin Product
      </Link>
    </main>
  );
};

export default Admin;
