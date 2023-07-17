import { Menu } from "antd";
import React, { useState } from "react";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import UpdateProfile from "../UpdateProfile";
import AddProducts from "../VendorControl/AddProducts";
import ShowVendorProduct from "../VendorControl/ShowVendorProduct";
import DraftedProducts from "../VendorControl/DraftedProducts";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const VendorMenu = () => {
  const items = [
    getItem("My Products", "sub1", <MailOutlined />, [
      getItem("Published products", "1"),
      getItem("Drafted products","3"),
      getItem("Add new product", "2"),
    ]),
    getItem("Order Menu", "sub2", <AppstoreOutlined />, [
      getItem("Order History", "4"),
      getItem("Pending Orders", "5"),
    ]),
    getItem("Settings", "sub4", <SettingOutlined />, [
      getItem("Update Profile", "6"),
      getItem("Change Password", "7"),
    ]),
  ];

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
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
    <div style={{ display: "grid", backgroundColor:'white', gridTemplateColumns: "0fr 1fr",gap:'3rem'}}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        onSelect={(e) => setSelectedKey(e.key)}
        selectedKeys={selectedKey}
        items={items}
      />
      {parseInt(selectedKey) === 1 && <ShowVendorProduct /> }
      {parseInt(selectedKey) === 2 && <AddProducts setselected={setSelectedKey}/> }
      {parseInt(selectedKey) === 3 && <DraftedProducts /> }
      {parseInt(selectedKey) === 6 && <UpdateProfile /> }
    </div>
  );
};
export default VendorMenu;
