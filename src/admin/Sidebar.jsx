import {
  UserOutlined,
  EnvironmentOutlined,
  BankOutlined,
  BookOutlined,
  HomeOutlined,
  SnippetsOutlined,
  CalendarOutlined,
  DesktopOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  PoundCircleOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu, Badge } from "antd";
import React, { useState, useEffect } from "react";
import "./asset/Sidebar.css";
import "antd/dist/antd.css";
import axios from "axios";

const { Sider } = Layout;

export default function SideBar() {
  const [count, setCount] = useState();

  useEffect(() => {
    const getSoPhieu = async () => {
      try {
        const res = await axios.get("http://localhost:8000/tongphieudk");
        console.log("dt", res.data.length);
        setCount(res.data.length);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getSoPhieu();
  }, []);

  return (
    <>
      {/* <Layout hasSider> */}
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: "1",
        }}
      >
        <div
          className="logo"
          style={{ height: "80px", textAlign: "center", padding: "20px 0" }}
        >
          <h3 style={{ color: "white" }}>QUẢN LÝ NHÀ TRỌ</h3>
          <h5 style={{ color: "#C2BFBE" }}>MINI HOUSES</h5>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Badge size="small" offset={[0, 15]} count={count}>
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              style={{ paddingLeft: 24 }}
            >
              <Link
                to="/manage-booking"
                activeClassName="active"
                exact="true"
                style={{ textDecoration: "none" }}
              >
                Quản lý đặt phòng
              </Link>
            </Menu.Item>
          </Badge>

          <Menu.Item key="2" icon={<EnvironmentOutlined />}>
            <Link to="/home" exact="true" style={{ textDecoration: "none" }}>
              Quản lý nhà trọ
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BankOutlined />}>
            <Link
              to="/typeroom"
              exact="true"
              style={{ textDecoration: "none" }}
            >
              Quản lý loại phòng
            </Link>
          </Menu.Item>
          <Menu.Item icon={<ThunderboltOutlined />}>
            <Link to="/service" exact="true" style={{ textDecoration: "none" }}>
              Quản lý dịch vụ
            </Link>
          </Menu.Item>
          <Menu.Item icon={<DesktopOutlined />}>
            <Link to="/device" exact="true" style={{ textDecoration: "none" }}>
              Quản lý thiết bị
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            <Link to="/room" exact="true" style={{ textDecoration: "none" }}>
              Quản lý phòng
            </Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<PoundCircleOutlined />}>
            <Link
              to="/rateroom"
              exact="true"
              style={{ textDecoration: "none" }}
            >
              Quản lý giá phòng
            </Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<BulbOutlined />}>
            <Link
              to="/electric-water"
              exact="true"
              style={{ textDecoration: "none" }}
            >
              Quản lý điện - nước
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CalendarOutlined />}>
            <Link to="/bill" exact="true" style={{ textDecoration: "none" }}>
              Quản lý hóa đơn
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SnippetsOutlined />}>
            <Link
              to="/customer"
              exact="true"
              style={{ textDecoration: "none" }}
            >
              Lịch sử khách thuê
            </Link>
          </Menu.Item>
          <Menu.Item icon={<AreaChartOutlined />}>
            <Link
              to="/statistical"
              exact="true"
              style={{ textDecoration: "none" }}
            >
              Thống kê
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {/* </Layout> */}
    </>
  );
}
