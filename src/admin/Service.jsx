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
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import { PlusOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

export default function Service() {
  const [modalCreateService, setModalCreateService] = useState(false);
  const [modalDeleteService, setModalDeleteService] = useState(false);
  const [modalUpdateService, setModalUpdateService] = useState(false);

  const [serviceList, setService] = useState();
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [valueTrangThai, setValueTrangThai] = useState();
  const [trangThai, setTrangThai] = useState();

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/service");

        const customServicesList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setService(customServicesList);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getServices();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "key",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "TenDV",

      width: "25%",
    },
    {
      title: "Đơn giá",
      dataIndex: "DonGia",
      sorter: (a, b) => a.quantum - b.quantum,
      width: "20%",
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "NgayAD",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      render: (text) => {
        if (text === "Ngừng áp dụng") {
          return <Tag color="red">{text}</Tag>;
        } else {
          return <Tag color="blue">{text}</Tag>;
        }
      },
    },
    {
      title: "",
      width: "18%",
      render: (set, record) => (
        <>
          <div className="d-flex">
            <Button
              style={{ marginRight: "4px", color: "blue" }}
              // id={record.index}
              icon={<EditFilled />}
              onClick={(e) => updateService(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteService(record)}
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
      message: "Thất bại",
    });
  };

  const handleOKCreateService = async () => {
    const TenDV = form.getFieldValue("tendv");
    const DonGia = form.getFieldValue("dongia");
    const NgayAD = form.getFieldValue("ngayad");
    const TrangThai = form.getFieldValue("trangthai");

    const res = await axios.post("http://localhost:8000/create-service", {
      TenDV,
      DonGia,
      NgayAD,
      TrangThai,
    });
    if (res.status === 201) {
      successNotification("success");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      errorNotification("error");
    }
  };

  function deleteService(record) {
    setModalDeleteService(true);
    setIdDelete(record.id);
  }

  function updateService(record) {
    setModalUpdateService(true);
    console.log("tt", record.TrangThai);
    setTrangThai(record.TrangThai);
    form.setFieldsValue({
      tendv: record.TenDV,
      dongia: record.DonGia,
      ngayad: record.NgayAD,
      trangthai: record.TrangThai,
    });
    setIdUpdate(record.id);
  }

  const handleDeleteService = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-service/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateService = async () => {
    const TenDV = form.getFieldValue("tendv");
    const DonGia = form.getFieldValue("dongia");
    const NgayAD = form.getFieldValue("ngayad");
    const TrangThai = form.getFieldValue("trangthai");

    const res = await axios.put(
      `http://localhost:8000/update-service/${idUpdate}`,
      {
        TenDV,
        DonGia,
        NgayAD,
        TrangThai,
      }
    );
    if (res.status === 200) {
      successNotification("success");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      errorNotification("error");
    }
  };
  const onChangeTrangThai = (e) => {
    console.log("radio checked", e.target.value);
    setValueTrangThai(e.target.value);
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
            <div className="row">
              <Button
                className="add-house"
                onClick={() => setModalCreateService(true)}
                type="primary"
                style={{
                  width: "15%",
                  marginRight: "11%",
                  right: 0,
                  position: "relative",
                }}
              >
                <PlusOutlined />
                Thêm dịch vụ
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={serviceList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>

      {/* MODAL CREATE HOUSE */}
      <Modal
        title="Tạo mới dịch vụ"
        visible={modalCreateService}
        centered
        onOk={handleOKCreateService}
        onCancel={() => setModalCreateService(false)}
        width={650}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên dịch vụ"
            name="tendv"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dịch vụ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="dongia"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày áp dụng"
            name="ngayad"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày áp dụng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="trangthai"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái!",
              },
            ]}
          >
            <Radio.Group onChange={onChangeTrangThai} value={valueTrangThai}>
              <Radio value="Đang áp dụng">Đang áp dụng</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL UPDATE SERVICE */}
      <Modal
        title="Cập nhật thông tin dịch vụ"
        visible={modalUpdateService}
        centered
        onOk={handleUpdateService}
        onCancel={() => {
          setModalUpdateService(false);
          // setTrangThai();
        }}
        width={650}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên dịch vụ"
            name="tendv"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dịch vụ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="dongia"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày áp dụng"
            name="ngayad"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày áp dụng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="trangthai"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái!",
              },
            ]}
          >
            {trangThai === "Đang áp dụng" ? (
              <Radio.Group
                onChange={onChangeTrangThai}
                name="trangthai"
                defaultValue={"Đang áp dụng"}
                // value={trangThai ? "Đang áp dụng" : "Ngừng áp dụng"}
              >
                <Radio value="Đang áp dụng">Đang áp dụng</Radio>
                <Radio value="Ngừng áp dụng">Ngừng áp dụng</Radio>
              </Radio.Group>
            ) : (
              <Radio.Group
                onChange={onChangeTrangThai}
                name="trangthai"
                defaultValue={"Ngừng áp dụng"}
              >
                <Radio value="Đang áp dụng">Đang áp dụng</Radio>
                <Radio value="Ngừng áp dụng">Ngừng áp dụng</Radio>
              </Radio.Group>
            )}
            {/* {trangThai == "Đang áp dụng" ? (
              <>
                <Radio.Group
                  onChange={onChangeTrangThai}
                  name="trangthai"
                  defaultValue={"Đang áp dụng"}
                  // value={trangThai ? "Đang áp dụng" : "Ngừng áp dụng"}
                >
                  <Radio value="Đang áp dụng">Đang áp dụng</Radio>
                  <Radio value="Ngừng áp dụng">Ngừng áp dụng</Radio>
                </Radio.Group>{" "}
              </>
            ) : (
              <>
                <Radio.Group
                  onChange={onChangeTrangThai}
                  name="trangthai"
                  defaultValue={"Ngừng áp dụng"}
                >
                  <Radio value="Đang áp dụng">Đang áp dụng</Radio>
                  <Radio value="Ngừng áp dụng">Ngừng áp dụng</Radio>
                </Radio.Group>
              </>
            )} */}
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE SERVICE */}
      <Modal
        title="Xóa dịch vụ"
        visible={modalDeleteService}
        onOk={handleDeleteService}
        onCancel={() => setModalDeleteService(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa dịch vụ này không? </p>
      </Modal>
    </>
  );
}
