import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getVendorProducts } from "../../utils/getVendorProducts";
import ProductCard from "../Cards/ProductCard";

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
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ opacity: "0.5" }}>Your Published Product will show up here</h1>
        </div>
      )}
      {products.length === 0 ? (
        <></>
      ) : (
        count === 0 && <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ opacity: "0.5" }}>You Don't have any Published Products yet</h1>
      </div>
      )}
    </div>
  );
};

export default ShowVendorProduct;
