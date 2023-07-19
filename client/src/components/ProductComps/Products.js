import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../utils/getAllProducts";
import VertProdCard from "../Cards/VertProdCard";
import Spinner from "../Spinner";
import { Menu } from "antd";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

const Products = () => {
  const items2 = ["UserOutline", "LaptopOutlined", "NotificationOutlined"].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );
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
            {products ? (
              products.map((pro, idx) => {
                console.log(pro.category);
                return (
                  pro.category?.name === name && (
                    <VertProdCard key={idx} name={name} product={pro} />
                  )
                );
              })
            ) : (
              <Spinner />
            )}
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Products;
