import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Tag,
  Radio,
  message,
  Card,
  Col,
  Row,
  Select,
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import { PlusOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

export default function Statistical() {
  const [thongKe, setThongKe] = useState();
  const [khachthue, setKhachThue] = useState();

  useEffect(() => {
    const getThongKe = async () => {
      try {
        const res = await axios.post("http://localhost:8000/thongkedoanhthu", {
          value: "11/2022",
        });
        const reskt = await axios.get("http://localhost:8000/thongkekhachthue");
        console.log("data", reskt.data.length);
        const sl = reskt.data.length;

        setKhachThue(sl);
        setThongKe(res.data.doanhthu);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getThongKe();
  }, []);

  const handleChangeMonth = async (value) => {
    console.log("value", value);
    const res = await axios.post("http://localhost:8000/thongkedoanhthu", {
      value,
    });
    console.log("data", res.data);
    setThongKe(res.data.doanhthu);
    // return value;
  };

  return (
    <>
      <Sidebar />
      <TopMenu />
      <Layout className="site-layout" style={{ height: "608px" }}>
        <Content
          style={{
            margin: "  80px 15px 15px 220px",
            overflow: "auto",
            marginTop: "80px",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: "24px", textAlign: "center" }}
          >
            <Select
              style={{
                width: "25%",
                marginBottom: "3%",
              }}
              placeholder="Chọn tháng"
              onChange={handleChangeMonth}
              defaultValue="11/2022"
            >
              <Option value="10/2022">10/2022</Option>,
              <Option value="11/2022">11/2022</Option>;
            </Select>
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="TỔNG DOANH THU"
                    style={{ height: "200px", backgroundColor: "#9CBDF6" }}
                  >
                    <Row>
                      <h1 style={{ color: "black" }}>
                        <strong>{thongKe} vnđ</strong>
                      </h1>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/5071/5071176.png"
                        alt=""
                        style={{
                          width: "130px",
                          marginLeft: "130px",
                          position: "relative",
                          bottom: "20px",
                        }}
                      />
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="TỔNG KHÁCH THUÊ"
                    style={{
                      height: "200px",
                      backgroundColor: "#A5E29C",
                    }}
                  >
                    <Row>
                      <h1 style={{ color: "black" }}>
                        <strong>{khachthue} Khách</strong>
                      </h1>
                      <img
                        src="https://lamdong.gov.vn/sites/snv/Shared%20Documents/images/icon_thongke.png"
                        alt=""
                        style={{
                          width: "140px",
                          marginLeft: "180px",
                          position: "relative",
                          bottom: "30px",
                        }}
                      />
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
