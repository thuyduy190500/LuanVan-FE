import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
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
  Row,
  Drawer,
  Space,
  Tabs,
  Col,
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import {
  PlusOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const { Content } = Layout;
const { Search } = Input;

export default function Export_Customer() {
  const [modalCreateCustomer, setModalCreateCustomer] = useState(false);
  const [modalDeleteCustomer, setModalDeleteCustomer] = useState(false);
  const [modalUpdateCustomer, setModalUpdateCustomer] = useState(false);

  const [customerList, setCustomer] = useState();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [valueTrangThai, setValueTrangThai] = useState();
  const [nhaTroId, setNhaTroId] = useState("49");

  const [house, setHouse] = useState();
  const [keyword, setKeyword] = useState();
  const filterData = (house) => (formatter) =>
    house.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const resHouse = await axios.get("http://localhost:8000/house1");
        setHouse(resHouse.data);
        // console.log(resHouse.data);
        const res = await axios.get(
          `http://localhost:8000/customer-staying/${nhaTroId}`
        );

        const customCustomersList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setCustomer(customCustomersList);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getCustomers();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "key",
    },
    {
      title: "Tên khách thuê",
      dataIndex: "TenKT",
      width: "200px",
    },
    {
      title: "Giới tính",
      dataIndex: "GioiTinh",
      width: "100px",
      render: (value) => {
        if (value === true) {
          return "Nam";
        } else {
          return "Nữ";
        }
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "HoKhau",
      width: "200px",
    },
    {
      title: "NamSinh",
      dataIndex: "NamSinh",
      width: "150px",
      render: (value) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },
    {
      title: "SĐT",
      dataIndex: "Sdt",
      width: "100px",
    },

    {
      title: "Nghề nghiệp",
      dataIndex: "NgheNghiep",
      width: "140px",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "Cmnd",
      width: "100px",
    },
    {
      title: "Phòng",
      dataIndex: "TenPhong",
      width: "100px",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const successNotification = (type) => {
    notification[type]({
      message: "Thành công",
    });
  };

  const errorNotification = (type) => {
    notification[type]({
      message: "Không tìm thấy",
    });
  };

  function handleInputChangeKeyword(e) {
    console.log("search", e.target.value);
    setKeyword(e.target.value);
  }

  function onSearch() {
    if (keyword) {
      const customerFilter = customerList.filter((project) =>
        project.TenKT.toLowerCase().startsWith(keyword.toLowerCase())
      );
      console.log("cus", customerFilter);

      if (customerFilter.length == 0) {
        setCustomer(customerList);
        errorNotification();
      } else {
        setCustomer(customerFilter);
      }
    }
    console.log("cusss", customerList);
  }

  const handleOnChangeMenu = async (item) => {
    setNhaTroId(item);
    console.log("nhà trọ id", item);
    const res = await axios.get(
      `http://localhost:8000/customer-staying/${nhaTroId}`
    );
    setCustomer(res.data);
  };

  const ListCustomer = (data) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "Danh sach khach thue",
    });

    if (customerList) {
      return (
        <>
          <div
            className=""
            style={{
              right: 0,
              marginLeft: "75%",
              marginTop: "-9%",
              marginBottom: "5%",
            }}
          >
            <Button onClick={handlePrint}>In danh sách</Button>
          </div>
          <div
            ref={componentRef}
            style={{ width: "100%", height: window.innerHeight }}
            className="customer"
          >
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "4%",
              }}
            >
              Danh sách khách thuê
            </h1>
            <Table
              columns={columns}
              dataSource={customerList}
              onChange={onChange}
              pagination={false}
            />
          </div>
        </>
      );
    } else {
      console.log("sai");
    }
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
            <Row gutter={16} style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Search
                  placeholder="Nhập tên khách thuê"
                  onSearch={onSearch}
                  enterButton
                  onChange={handleInputChangeKeyword}
                />
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" onChange={handleOnChangeMenu}>
              {house?.map((house) => {
                return (
                  <Tabs.TabPane tab={house.TenNT} key={house.id}>
                    <div
                      className="site-layout-background "
                      style={{ padding: "24px" }}
                    >
                      {/* <Table
                        columns={columns}
                        dataSource={customerList}
                        onChange={onChange}
                      /> */}
                      <ListCustomer />
                    </div>
                  </Tabs.TabPane>
                );
              })}
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  );
}
