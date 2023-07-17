import React, { useEffect } from "react";
import { Layout } from "../../components/layout/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isVendor } from "../../utils/auth";
import VendorMenu from "../../components/layout/VendorMenu";

export const VendorDashBoard = () => {
  const data = useSelector((state) => state.data);
  const navigate = useNavigate();
  if (data?.token === undefined) {
    setTimeout(() => {
      navigate("/");
      return;
    }, 0);
  }
  useEffect( () => {
    console.log(data.token)
    const validity=async()=>{
        const res = await isVendor(data?.token);
        console.log(res)
        if (res === false) {
          navigate("/");
          return
        }
    }
    validity()
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Layout>
        <VendorMenu/>
      </Layout>
    </>
  );
};
