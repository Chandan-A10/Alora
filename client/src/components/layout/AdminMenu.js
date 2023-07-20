import { Menu } from "antd";
import React, { useState } from "react";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import AllVendors from "../AdminControl/AllVendors";
import DisabledVendors from "../AdminControl/DisabledVendor";
import UpdateProfile from "../UpdateProfile";
import AllProducts from "../AdminControl/AllProducts";
import CategoryMenu from "../AdminControl/Category";
import AllOrders from "../AdminControl/AllOrders";
import PendingOrders from "../UserControl/PendingOrders";
import OrderHistory from "../UserControl/OrderHistory";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AdminMenu = () => {
  const items = [
    getItem("Vendors List", "sub1", <MailOutlined />, [
      getItem("All Vendors", "1"),
      getItem("Disabled Vendor", "2"),
    ]),
    getItem("Product & Categories", "sub2", <AppstoreOutlined />, [
      getItem("All Products", "3"),
      getItem("Categories", "4"),
      getItem("All Orders", "5"),
    ]),
    getItem("My Orders", "sub3", <MailOutlined />, [
      getItem("Pending Orders", "8"),
      getItem("Order History", "9"),
    ]),
    getItem("Settings", "sub4", <SettingOutlined />, [
      getItem("Update Profile", "6"),
      getItem("Change Password", "7"),
    ]),
  ];

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2","sub3", "sub4"];
  const [selectedKey, setSelectedKey] = useState(null);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "0fr 1fr", gap: "3rem" }}
    >
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
          minHeight:'80vh'
        }}
        onSelect={(e) => setSelectedKey(e.key)}
        selectedKeys={selectedKey}
        items={items}
      />
      {parseInt(selectedKey) === 1 && <AllVendors />}
      {parseInt(selectedKey) === 2 && <DisabledVendors />}
      {parseInt(selectedKey) === 3 && <AllProducts />}
      {parseInt(selectedKey) === 4 && <CategoryMenu />}
      {parseInt(selectedKey) === 5 && <AllOrders />}
      {parseInt(selectedKey) === 6 && <UpdateProfile />}
      {parseInt(selectedKey) === 8 && <PendingOrders />}
      {parseInt(selectedKey) === 9 && <OrderHistory />}
    </div>
  );
};
export default AdminMenu;
