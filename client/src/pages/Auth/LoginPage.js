import React from "react";
import { Layout } from "../../components/layout/layout";
import { Login } from "../../components/Auth/Login";

export const LoginPage = () => {
  return (
    <div>
      <Layout>
        <Login/>
      </Layout>
    </div>
  );
};
