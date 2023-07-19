import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getVendorProducts } from "../../utils/getVendorProducts";
import ProductCard from "../Cards/ProductCard";
import Spinner from "../Spinner";

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
        <h1>Nothing Here as Well</h1>
      )}
      {products.length === 0 ? (
        <></>
      ) : (
        count === 0 && <h1>No Drafted Products found</h1>
      )}
    </div>
  );
};

export default DraftedProducts;
