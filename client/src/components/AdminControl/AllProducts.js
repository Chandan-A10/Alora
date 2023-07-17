import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import Spinner from "../Spinner";
import { getAllProducts } from "../../utils/getAllProducts";

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [flag, setflag] = useState(true)
  useEffect(() => {
    getAllProducts(setproducts);
    //eslint-disable-next-line
  }, [flag]);
  return (
    <div style={{ minHeight: "80vh" }}>
      {products.length ? (
        products.map((pro, idx) => {
            console.log(pro)
          return <ProductCard key={idx} setflag={setflag} product={pro} isAdmin={true}/>;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AllProducts;
