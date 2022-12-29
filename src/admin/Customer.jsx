import React, { useState, useEffect } from "react";
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
const { Content } = Layout;
const { Search } = Input;

export default function Customer() {
  const [modalCreateCustomer, setModalCreateCustomer] = useState(false);
  const [modalDeleteCustomer, setModalDeleteCustomer] = useState(false);
  const [modalUpdateCustomer, setModalUpdateCustomer] = useState(false);

  const [customerList, setCustomer] = useState();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [valueTrangThai, setValueTrangThai] = useState();
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
        const res = await axios.get("http://localhost:8000/customer");

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
      width: "250px",
    },
    {
      title: "Phòng",
      dataIndex: "TenPhong",
      width: "200px",
    },
    {
      title: "Nhà trọ",
      dataIndex: "TenNT",
      filters: [
        {
          text: "Mini House 1",
          value: "Mini House 1",
        },
        {
          text: "Mini House 2",
          value: "Mini House 2",
        },
      ],
      onFilter: (value, record) => record.TenNT.startsWith(value),
      filterSearch: true,
      width: "200px",
    },

    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      width: "300px",

      render: (text) => {
        if (text === "Không còn ở") {
          return <Tag color="red">{text}</Tag>;
        } else {
          return <Tag color="blue">{text}</Tag>;
        }
      },
    },
    {
      title: "",
      width: "400px",

      render: (set, record) => (
        <>
          <div className="d-flex">
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteCustomer(record)}
            ></Button>
            <Button
              style={{ color: "black" }}
              icon={<EyeFilled />}
              onClick={(e) => showDrawer(record)}
            ></Button>
          </div>
        </>
      ),
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

  const handleOKCreateCustomer = async () => {
    const TenDV = form.getFieldValue("tendv");
    const DonGia = form.getFieldValue("dongia");
    const NgayAD = form.getFieldValue("ngayad");
    const TrangThai = form.getFieldValue("trangthai");

    const res = await axios.post("http://localhost:8000/create-customer", {
      TenDV,
      DonGia,
      NgayAD,
      TrangThai,
    });
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  function deleteCustomer(record) {
    setModalDeleteCustomer(true);
    setIdDelete(record.id);
  }

  function updateCustomer(record) {
    setModalUpdateCustomer(true);
    form.setFieldsValue({
      tendv: record.TenDV,
      dongia: record.DonGia,
      ngayad: record.NgayAD,
    });
    setIdUpdate(record.id);
  }

  const handleDeleteCustomer = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-customer/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateCustomer = async () => {
    const TenDV = form.getFieldValue("tendv");
    const DonGia = form.getFieldValue("dongia");
    const NgayAD = form.getFieldValue("ngayad");
    const TrangThai = form.getFieldValue("trangthai");

    const res = await axios.put(
      `http://localhost:8000/update-customer/${idUpdate}`,
      {
        TenDV,
        DonGia,
        NgayAD,
        TrangThai,
      }
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };
  const onChangeTrangThai = (e) => {
    console.log("radio checked", e.target.value);
    setValueTrangThai(e.target.value);
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

  const showDrawer = async (item) => {
    console.log("item", item);
    setOpen(true);
    const res = await axios.get(
      `http://localhost:8000/customer-detail/${item.id}`
    );
    var gt = "";
    if (res.data.GioiTinh === true) {
      gt = "Nam";
    } else {
      gt = "Nữ";
    }
    form.setFieldsValue({
      tenphong: item.TenPhong,
      hoten: item.TenKT,
      sdt: item.Sdt,
      cmnd: item.Cmnd,
      hokhau: item.HoKhau,
      namsinh: moment(item.NamSinh).format("DD-MM-YYYY"),
      ngayden: moment(item.NgayDen).format("DD-MM-YYYY"),
      ngaydi: "15-12-2022",
      gioitinh: gt,
      nghenghiep: item.NgheNghiep,
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Sidebar />
      <TopMenu />
      <Layout className="site-layout" style={{ height: "658px" }}>
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
            <Table
              columns={columns}
              dataSource={customerList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>

      {/* CHI TIẾT KHÁCH THUÊ */}
      <Drawer
        title="Thông tin chi tiết khách thuê"
        placement="right"
        visible={open}
        width={720}
        onClose={onClose}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ tên" name="hoten">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phòng" name="tenphong">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Năm sinh" name="namsinh">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Giới tính" name="gioitinh">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Số điện thoại" name="sdt">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Hộ khẩu thường trú" name="hokhau">
                <Input.TextArea rows={"2"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Nghề nghiệp" name="nghenghiep">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CMND/CCCD" name="cmnd">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày đến" name="ngayden">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày đi" name="ngaydi">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Modal
        title="Xóa khách thuê"
        visible={modalDeleteCustomer}
        onOk={handleDeleteCustomer}
        onCancel={() => setModalDeleteCustomer(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa khách thuê này không? </p>
      </Modal>
    </>
  );
}
