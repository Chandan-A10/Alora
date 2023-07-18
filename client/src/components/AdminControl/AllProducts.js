import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import Spinner from "../Spinner";
import { getAllProducts } from "../../utils/getAllProducts";

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [spin, setspin] = useState(true);
  const [flag, setflag] = useState(true);
  const spintime = () => {
    {
      setTimeout(() => {
        setspin(false);
      }, 3000);
    }
  };
  useEffect(() => {
    getAllProducts(setproducts);
    //eslint-disable-next-line
  }, [flag]);
  return (
    <div style={{ minHeight: "80vh" }}>
      {products.length ? (
        products.map((pro, idx) => {
          console.log(pro);
          return (
            <ProductCard
              key={idx}
              setflag={setflag}
              product={pro}
              isAdmin={true}
            />
          );
        })
      ) : (
        <>
          {spin && <Spinner />}
          {!spin && <h1>No product Found</h1>}
          {spintime()}
        </>
      )}
    </div>
  );
};

export default AllProducts;
