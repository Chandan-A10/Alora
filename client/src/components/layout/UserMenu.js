import { Menu } from "antd";
import React, { useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import UpdateProfile from "../UpdateProfile";
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

const UserMenu = () => {
  const items = [
    getItem("My Orders", "sub1", <MailOutlined />, [
      getItem("Pending Orders", "1"),
      getItem("Order History", "2"),
    ]),
    getItem("Settings", "sub4", <SettingOutlined />, [
      getItem("Update Profile", "6"),
      getItem("Change Password", "7"),
    ]),
  ];

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub4"];
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
      style={{
        display: "grid",
        backgroundColor: "white",
        gridTemplateColumns: "0fr 1fr",
        gap: "3rem",
      }}
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
      {parseInt(selectedKey) === 6 && <UpdateProfile />}
      {parseInt(selectedKey) === 1 && <PendingOrders />}
      {parseInt(selectedKey) === 2 && <OrderHistory />}
    </div>
  );
};
export default UserMenu;
