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
  Popconfirm,
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
const dateFormat = "YYYY/MM/DD";

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
  const [keyword, setKeyword] = useState();
  const [modalDeleteBooking, setModalDeleteBooking] = useState(false);
  const confirm = "Bạn có chắc chắn muốn xác nhận phiếu đăng ký này?";
  const [updateStatusId, setupdateStatusId] = useState();

  function updateStatus(record) {
    setupdateStatusId(record.id);
    console.log("id", record.id);
  }
  const handleOkUpdateStatus = async () => {
    const res = await axios.put(
      `http://localhost:8000/update-status-booking/${updateStatusId}`,
      {
        TrangThai: "Đã duyệt",
      }
    );
    window.location.reload();
  };

  function deleteBooking(record) {
    setModalDeleteBooking(true);
    setIdDelete(record.id);
  }

  const handleDeleteBooking = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-booking/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/list-booking");

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
      title: "Họ tên ",
      dataIndex: "HoTen",
      width: "250px",
    },
    {
      title: "Nhà trọ",
      dataIndex: "TenNT",
      width: "200px",
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
    },
    {
      title: "Phòng",
      dataIndex: "TenPhong",
      width: "200px",
    },
    {
      title: "Sdt",
      dataIndex: "Sdt",
      width: "200px",
    },
    {
      title: "Thời điểm đặt",
      dataIndex: "ThoiDiemDat",
      width: "200px",
      render: (value) => {
        return moment(value).format("DD-MM-YYYY");
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      width: "150px",

      render: (text, record) => {
        if (text === "Chưa duyệt") {
          return (
            <>
              <Popconfirm
                placement="top"
                title={confirm}
                onConfirm={handleOkUpdateStatus}
                okText="OK"
                cancelText="Cancel"
              >
                <Button
                  style={{ border: "none" }}
                  onClick={(e) => updateStatus(record)}
                >
                  <Tag color="red">{text}</Tag>
                </Button>
              </Popconfirm>
            </>
          );
        } else {
          return <Tag color="blue">{text}</Tag>;
        }
      },
    },
    {
      title: "",
      width: "200px",

      render: (set, record) => (
        <>
          <div className="d-flex">
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteBooking(record)}
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

  function deleteCustomer(record) {
    setModalDeleteCustomer(true);
    setIdDelete(record.id);
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

  function handleInputChangeKeyword(e) {
    console.log("search", e.target.value);
    setKeyword(e.target.value);
  }

  function onSearch() {
    if (keyword) {
      const customerFilter = customerList.filter((project) =>
        project.TenPhong.toLowerCase().startsWith(keyword.toLowerCase())
      );
      if (customerFilter.length == 0) {
        setCustomer(customerList);
        errorNotification();
      } else {
        setCustomer(customerFilter);
      }
    }
  }

  const showDrawer = async (item) => {
    console.log("item", item);
    setOpen(true);
    const res = await axios.get(
      `http://localhost:8000/list-booking/${item.id}`
    );
    form.setFieldsValue({
      tenphong: item.TenPhong,
      hoten: item.HoTen,
      sdt: item.Sdt,
      namsinh: moment(item.NamSinh).format("DD-MM-YYYY"),
      gioitinh: item.GioiTinh,
      nghenghiep: item.NgheNghiep,
      sl: item.SLNguoiO,
      nhucausd: item.NhuCauSD,
    });
  };

  const onClose = () => {
    setOpen(false);
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
                  placeholder="Nhập tên phòng"
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
        title="Thông tin chi tiết phiếu đặt"
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
            <Col span={12}>
              <Form.Item label="Nghề nghiệp" name="nghenghiep">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số lượng người ở" name="sl">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Nhu cầu sử dụng" name="nhucausd">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Modal
        title="Xóa phiếu đặt phòng"
        visible={modalDeleteBooking}
        onOk={handleDeleteBooking}
        onCancel={() => setModalDeleteBooking(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa phiếu đặt phòng này không </p>
      </Modal>
    </>
  );
}
