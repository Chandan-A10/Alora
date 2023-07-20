import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getVendorProducts } from "../../utils/getVendorProducts";
import ProductCard from "../Cards/ProductCard";

const DraftedProducts = () => {
  let count = 0;
  const [products, setproducts] = useState([]);
  const [flag, setflag] = useState(true);
  const user = useSelector((state) => state.data);
  const handleCount = () => {
    count++;
  };
  useEffect(() => {
    getVendorProducts(setproducts, user.token);
    //eslint-disable-next-line
  }, [flag]);
  return (
    <div style={{ minHeight: "80vh" }}>
      {products.length ? (
        products.map((pro, idx) => {
          return (
            pro.isDraft && (
              <>
                {handleCount()}
                <ProductCard
                  key={idx}
                  setflag={setflag}
                  product={pro}
                  draft={true}
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
          <h1 style={{ opacity: "0.5" }}>Your Draft will show up here</h1>
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
        <h1 style={{ opacity: "0.5" }}>No Drafts in your Product List</h1>
      </div>
      )}
    </div>
  );
};

export default DraftedProducts;
