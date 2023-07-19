import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getVendorProducts } from "../../utils/getVendorProducts";
import ProductCard from "../Cards/ProductCard";
import Spinner from "../Spinner";

const ShowVendorProduct = () => {
  let count = 0;
  const [flag, setflag] = useState(true);
  const [products, setproducts] = useState([]);
  const user = useSelector((state) => state.data);
  useEffect(() => {
    getVendorProducts(setproducts, user.token);
    // eslint-disable-next-line
  }, [flag]);
  const handleCount = () => {
    count++;
  };
  return (
    <div style={{ minHeight: "80vh" }}>
      {products.length ? (
        products.map((pro, idx) => {
          return (
            pro.isDraft === false && (
              <>
                {handleCount()}
                <ProductCard
                  key={idx}
                  setflag={setflag}
                  product={pro}
                  draft={false}
                />
              </>
            )
          );
        })
      ) : (
        <h1>No Product Found</h1>
      )}
      {products.length === 0 ? (
        <></>
      ) : (
        count === 0 && <h1>No Published Products found</h1>
      )}
    </div>
  );
};

export default ShowVendorProduct;
