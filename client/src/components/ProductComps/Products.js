import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../utils/getAllProducts";
import VertProdCard from "../Cards/VertProdCard";
import Spinner from "../Spinner";
import { Menu } from "antd";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

const Products = () => {
  let count = 0;
  const [search] = useSearchParams();
  const [products, setproducts] = useState([]);
  const user = useSelector((state) => state.data);
  const name = search.get("category");
  const navigate = useNavigate();
  if (name === null) {
    navigate("/");
  }
  useEffect(() => {
    getAllProducts(setproducts);
  }, []);
  const handleCount = () => {
    count++;
  };
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
                    {pro.category?.name === name &&
                      pro.owner.email !== user?.user?.email && (
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
          {products.length === 0 ? (
            <></>
          ) : (
            count === 0 && (
              <div
                style={{
                  minHeight: "80vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ opacity: "0.5" }}>
                  No products available for this category
                </h1>
              </div>
            )
          )}
        </MDBContainer>
      </div>
    </div>
  );
};

export default Products;
