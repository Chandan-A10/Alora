import { Avatar, Button, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { getAllVendors } from "../../utils/getAllVendors";
import { useSelector } from "react-redux";
import DisableConfirmation from "../ConfirmationModals/DisableConfirm";
import ProductModals from "../ProductComps/ProductModals";
import { TextField } from "@mui/material";

const AllVendors = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [disableOpen, setdisableOpen] = useState(false);
  const [products, setproducts] = useState(false);
  const [name, setname] = useState("");
  const [merchant, setmerchant] = useState("")
  const [vendorid, setvendorid] = useState("");
  const [flag, setflag] = useState(true);
  const user = useSelector((state) => state?.data);
  const [list, setList] = useState([]);
  useEffect(() => {
    getAllVendors(user?.token, setList);
    setInitLoading(false);
    //eslint-disable-next-line
  }, [flag]);
  const handleDisable = (name, id) => {
    setname(name);
    setvendorid(id);
    setdisableOpen(true);
  };
  const handleShowProduct = (name, id) => {
    setname(name);
    setvendorid(id);
    setproducts(true);
  };
  return (
    <>
      <div>
      <TextField
        value={merchant}
        className="mt-3"
        autoComplete="off"
        label="Search vendor by name"
        size="small"
        style={{ width: "90%" }}
        onChange={(e) => setmerchant(e.target.value)}
        margin="dense"
        id="name"
        type="text"
        fullWidth
        color="info"
        variant="standard"
      />
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          style={{ width: "90%" }}
          renderItem={(item) => (
            merchant===""?
            <List.Item
              actions={[
                <Button
                  disabled={item?.isDisabled}
                  onClick={() => handleDisable(item?.name, item?._id)}
                  key="list-loadmore-disable"
                >
                  {item?.isDisabled ? "disabled" : "disable"}
                </Button>,
                <Button
                  onClick={() => handleShowProduct(item?.name, item?._id)}
                  key="list-loadmore-products"
                >
                  products
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item?.photo} />}
                  title={item?.name}
                  description={
                    <>
                      Email Address : {item?.email}
                      <br /> Contact number : {item?.phone || "not available"}
                      <br /> Address : {item?.address || "not available"}
                    </>
                  }
                />
              </Skeleton>
            </List.Item>
            :
            (
              item?.name.trim().includes(merchant.toLowerCase()) &&
            <List.Item
              actions={[
                <Button
                  disabled={item?.isDisabled}
                  onClick={() => handleDisable(item?.name, item?._id)}
                  key="list-loadmore-disable"
                >
                  {item?.isDisabled ? "disabled" : "disable"}
                </Button>,
                <Button
                  onClick={() => handleShowProduct(item?.name, item?._id)}
                  key="list-loadmore-products"
                >
                  products
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item?.photo} />}
                  title={item?.name}
                  description={
                    <>
                      Email Address : {item?.email}
                      <br /> Contact number : {item?.phone || "not available"}
                      <br /> Address : {item?.address || "not available"}
                    </>
                  }
                />
              </Skeleton>
            </List.Item>
            )
          )}
        />
        <br></br>
      </div>
      {disableOpen && (
        <DisableConfirmation
          name={name}
          setflag={setflag}
          ModalOpen={disableOpen}
          setModalOpen={setdisableOpen}
          vendoid={vendorid}
        />
      )}
      {products && (
        <ProductModals
          name={name}
          ModalOpen={products}
          setModalOpen={setproducts}
          id={vendorid}
        />
      )}
    </>
  );
};

export default AllVendors;
