import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Modal, Form, Input, notification } from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import { PlusOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

export default function Device() {
  const [modalCreateDevice, setModalCreateDevice] = useState(false);
  const [modalDeleteDevice, setModalDeleteDevice] = useState(false);
  const [modalUpdateDevice, setModalUpdateDevice] = useState(false);

  const [serviceList, setDevice] = useState();
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();

  useEffect(() => {
    const getDevices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/device");

        const customDevicesList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setDevice(customDevicesList);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getDevices();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "key",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "TenTB",

      width: "25%",
    },

    {
      title: "Mô tả",
      dataIndex: "MoTa",
      width: "30%",
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
              onClick={(e) => updateDevice(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteDevice(record)}
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

  const handleOKCreateDevice = async () => {
    const TenTB = form.getFieldValue("tentb");
    const MoTa = form.getFieldValue("mota");
    const res = await axios.post("http://localhost:8000/create-device", {
      TenTB,
      MoTa,
    });
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  function deleteDevice(record) {
    setModalDeleteDevice(true);
    setIdDelete(record.id);
  }

  function updateDevice(record) {
    setModalUpdateDevice(true);
    form.setFieldsValue({
      tentb: record.TenTB,
      mota: record.MoTa,
    });
    setIdUpdate(record.id);
  }

  const handleDeleteDevice = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-device/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateDevice = async () => {
    const TenTB = form.getFieldValue("tentb");
    const MoTa = form.getFieldValue("mota");

    const res = await axios.put(
      `http://localhost:8000/update-device/${idUpdate}`,
      {
        TenTB,
        MoTa,
      }
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
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
            <div className="row">
              <Button
                className="add-house"
                onClick={() => setModalCreateDevice(true)}
                type="primary"
                style={{
                  width: "15%",
                  marginRight: "11%",
                  right: 0,
                  position: "relative",
                }}
              >
                <PlusOutlined />
                Thêm thiết bị
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
        title="Tạo mới thiết bị"
        visible={modalCreateDevice}
        centered
        onOk={handleOKCreateDevice}
        onCancel={() => setModalCreateDevice(false)}
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
            label="Tên thiết bị"
            name="tentb"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên thiết bị!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="mota"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL UPDATE device */}
      <Modal
        title="Cập nhật thông tin thiết bị"
        visible={modalUpdateDevice}
        centered
        onOk={handleUpdateDevice}
        onCancel={() => setModalUpdateDevice(false)}
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
            label="Tên thiết bị"
            name="tentb"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên thiết bị!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="mota"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE device */}
      <Modal
        title="Xóa thiết bị"
        visible={modalDeleteDevice}
        onOk={handleDeleteDevice}
        onCancel={() => setModalDeleteDevice(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa thiết bị này không? </p>
      </Modal>
    </>
  );
}
