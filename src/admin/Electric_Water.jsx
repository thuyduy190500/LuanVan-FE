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
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import { PlusOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

export default function Electric_Water() {
  const [modalCreateE_W, setModalCreateE_W] = useState(false);
  const [modalDeleteE_W, setModalDeleteE_W] = useState(false);
  const [modalUpdateE_W, setModalUpdateE_W] = useState(false);

  const [serviceList, setE_W] = useState();
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [valueTrangThai, setValueTrangThai] = useState();
  const [trangThai, setTrangThai] = useState();

  useEffect(() => {
    const getE_Ws = async () => {
      try {
        const res = await axios.get("http://localhost:8000/electric-water");
        console.log("null", res.data);

        const customE_WsList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setE_W(customE_WsList);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getE_Ws();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "key",
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "Thang",

      width: "25%",
    },
    {
      title: "Đơn giá điện",
      dataIndex: "DonGiaDien",
      width: "20%",
    },
    {
      title: "Đơn giá nước",
      dataIndex: "DonGiaNuoc",
      width: "20%",
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
              onClick={(e) => updateE_W(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteE_W(record)}
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

  const handleOKCreateE_W = async () => {
    const Thang = form.getFieldValue("thang");
    const DonGiaDien = form.getFieldValue("dongiadien");
    const DonGiaNuoc = form.getFieldValue("dongianuoc");
    const TrangThai = form.getFieldValue("trangthai");

    const res = await axios.post(
      "http://localhost:8000/create-electric-water",
      {
        Thang,
        DonGiaDien,
        DonGiaNuoc,
        TrangThai,
      }
    );
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  function deleteE_W(record) {
    setModalDeleteE_W(true);
    setIdDelete(record.id);
  }

  function updateE_W(record) {
    setModalUpdateE_W(true);
    setTrangThai(record.TrangThai);
    form.setFieldsValue({
      thang: record.Thang,
      dongiadien: record.DonGiaDien,
      dongianuoc: record.DonGiaNuoc,
      trangthai: record.TrangThai,
    });
    setIdUpdate(record.id);
  }

  const handleDeleteE_W = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-electric-water/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateE_W = async () => {
    const Thang = form.getFieldValue("thang");
    const DonGiaDien = form.getFieldValue("dongiadien");
    const DonGiaNuoc = form.getFieldValue("dongianuoc");
    const TrangThai = form.getFieldValue("trangthai");

    const res = await axios.put(
      `http://localhost:8000/update-electric-water/${idUpdate}`,
      {
        Thang,
        DonGiaDien,
        DonGiaNuoc,
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
                onClick={() => setModalCreateE_W(true)}
                type="primary"
                style={{
                  width: "20%",
                  marginRight: "11%",
                  right: 0,
                  position: "relative",
                }}
              >
                <PlusOutlined />
                Tạo mới giá điện - nước
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
        title="Tạo mới giá điện - nước "
        visible={modalCreateE_W}
        centered
        onOk={handleOKCreateE_W}
        onCancel={() => setModalCreateE_W(false)}
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
            label="Ngày áp dụng"
            name="thang"
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
            label="Đơn giá điện"
            name="dongiadien"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá điện!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đơn giá nước"
            name="dongianuoc"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá nước!",
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

      {/* MODAL UPDATE e_w */}
      <Modal
        title="Cập nhật giá điện - nước"
        visible={modalUpdateE_W}
        centered
        onOk={handleUpdateE_W}
        onCancel={() => setModalUpdateE_W(false)}
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
            label="Ngày áp dụng"
            name="thang"
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
            label="Đơn giá điện"
            name="dongiadien"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá điện!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đơn giá nước"
            name="dongianuoc"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá nước!",
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
            {/* <Radio.Group onChange={onChangeTrangThai} value={valueTrangThai}>
              <Radio value="Đang áp dụng">Đang áp dụng</Radio>
              <Radio value="Ngừng áp dụng">Ngừng áp dụng</Radio>
            </Radio.Group> */}
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE e_w */}
      <Modal
        title="Xóa đơn giá điện - nước"
        visible={modalDeleteE_W}
        onOk={handleDeleteE_W}
        onCancel={() => setModalDeleteE_W(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa giá điện - nước này không? </p>
      </Modal>
    </>
  );
}
