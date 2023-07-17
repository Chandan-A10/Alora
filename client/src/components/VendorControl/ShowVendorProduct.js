import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getVendorProducts } from "../../utils/getVendorProducts";
import ProductCard from "../Cards/ProductCard";
import Spinner from "../Spinner";

const ShowVendorProduct = () => {
  const [products, setproducts] = useState([]);
  const user = useSelector((state) => state.data);
  useEffect(() => {
    getVendorProducts(setproducts, user.token);
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{minHeight:'80vh'}}>
      {products.length?products.map((pro,idx)=>{
        return(
            pro.isDraft===false &&
            <ProductCard key={idx} product={pro} draft={false}/>
        )
      }):<Spinner/>}
    </div>
  );
};

export default ShowVendorProduct;
