import React, { useEffect } from "react";
import { Layout } from "../../components/layout/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidUser } from "../../utils/auth";
import UserMenu from "../../components/layout/UserMenu";

export const Dashboard = () => {
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
        const res = await isValidUser(data?.token);
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
        <UserMenu/>
      </Layout>
    </>
  );
};
