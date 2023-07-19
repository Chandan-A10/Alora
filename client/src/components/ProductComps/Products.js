import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../utils/getAllProducts";
import VertProdCard from "../Cards/VertProdCard";
import Spinner from "../Spinner";
import { Menu } from "antd";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

const Products = () => {
  let count = 0;
  const [search] = useSearchParams();
  const [products, setproducts] = useState([]);
  const name = search.get("category");
  const navigate = useNavigate();
  console.log(name);
  if (name === null) {
    navigate("/");
  }
  useEffect(() => {
    getAllProducts(setproducts);
  }, []);
  const handleCount=()=>{
    count++
  }
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "0fr 1fr", gap: "3rem" }}
    >
      <Menu
        mode="inline"
        //openKeys={openKeys}
        //onOpenChange={onOpenChange}
        style={{
          width: 256,
          minHeight: "80vh",
        }}
        // onSelect={(e) => setSelectedKey(e.key)}
        //selectedKeys={selectedKey}
      />
      <div>
        <MDBContainer fluid className="my-5">
          <MDBRow>
            {products.length !== 0 ? (
              products.map((pro, idx) => {
                return (
                  <>
                    {pro.category?.name === name && (
                      <>
                        {handleCount()}
                        <VertProdCard key={idx} name={name} product={pro} />
                      </>
                    )}
                  </>
                );
              })
            ) : (
              <Spinner />
            )}
          </MDBRow>
          {products.length===0?<></>:  count===0 && <h1>No product for this category Available</h1>}
        </MDBContainer>
      </div>
    </div>
  );
};

export default Products;
