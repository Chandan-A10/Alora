import React, { useEffect } from "react";
import { Layout } from "../../components/layout/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";
import AdminMenu from "../../components/layout/AdminMenu";

export const AdminDashboard = () => {
  const data = useSelector((state) => state.data);
  const navigate = useNavigate();
  if (data?.token === undefined) {
    setTimeout(() => {
      navigate("/");
      return;
    }, 0);
  }
  useEffect( () => {
    const validity=async()=>{
        const res = await isAdmin(data?.token);
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
        <AdminMenu/>
      </Layout>
    </>
  );
};
