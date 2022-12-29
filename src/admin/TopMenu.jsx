import React from "react";

import { Layout } from "antd";
import "antd/dist/antd.css";
import { HomeFilled, BellFilled, MessageFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
export default function TopMenu() {
  return (
    // <Layout className="site-layout">
    <Header
      className="site-layout-background"
      style={{
        paddingLeft: "950px",
        position: "fixed",
        width: "100%",
        height: "60px",
        fontSize: "22px",
        background: "#fff",
      }}
    >
      <Link
        to="/homepage"
        exact="true"
        style={{
          textDecoration: "none",
          color: "#878787",
          paddingRight: "35px",
        }}
      >
        <HomeFilled />
      </Link>
      <Link
        to="/homepage"
        exact="true"
        style={{
          textDecoration: "none",
          color: "#878787",
          paddingRight: "35px",
        }}
      >
        <MessageFilled />
      </Link>
      <Link
        to="#"
        exact="true"
        style={{
          textDecoration: "none",
          color: "#878787",
          paddingRight: "35px",
        }}
      >
        <BellFilled />
      </Link>
    </Header>
    // </Layout>
  );
}
