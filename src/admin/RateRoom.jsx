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

export default function RateRoom() {
  const [modalCreateRateRoom, setModalCreateRateRoom] = useState(false);
  const [modalDeleteRateRoom, setModalDeleteRateRoom] = useState(false);
  const [modalUpdateRateRoom, setModalUpdateRateRoom] = useState(false);

  const [rateroomList, setRateRoom] = useState();
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [valueTrangThai, setValueTrangThai] = useState();
  const [typeroomList, setTyperoomList] = useState([]);
  const [trangThai, setTrangThai] = useState();

  useEffect(() => {
    const getRateRooms = async () => {
      try {
        const res = await axios.get("http://localhost:8000/rateroom");
        const resLP = await axios.get("http://localhost:8000/typeroom");

        const customRateRoomsList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setRateRoom(customRateRoomsList);
        setTyperoomList(resLP.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getRateRooms();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "key",
    },
    {
      title: "Loại phòng",
      dataIndex: "LoaiPhong",
      width: "25%",
    },
    {
      title: "Đơn giá",
      dataIndex: "GiaPhong",
      sorter: (a, b) => a.quantum - b.quantum,
      width: "20%",
      render: (value) => {
        return value.toLocaleString("it-IT");
      },
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "Thang",
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
              onClick={(e) => updateRateRoom(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteRateRoom(record)}
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

  const handleOKCreateRateRoom = async () => {
    const LoaiPhong = form.getFieldValue("loaiphong");
    const GiaPhong = form.getFieldValue("giaphong");
    const Thang = form.getFieldValue("thang");
    const TrangThai = form.getFieldValue("trangthai");
    console.log("gia", LoaiPhong, GiaPhong, Thang, TrangThai);
    const res = await axios.post("http://localhost:8000/create-rateroom", {
      LoaiPhong,
      GiaPhong,
      Thang,
      TrangThai,
    });
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  function deleteRateRoom(record) {
    setModalDeleteRateRoom(true);
    setIdDelete(record.id);
  }

  function updateRateRoom(record) {
    setModalUpdateRateRoom(true);
    setTrangThai(record.TrangThai);
    form.setFieldsValue({
      loaiphong: record.LoaiPhong,
      giaphong: record.GiaPhong,
      thang: record.Thang,
      trangthai: record.TrangThai,
    });
    setIdUpdate(record.id);
  }

  const handleDeleteRateRoom = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-rateroom/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateRateRoom = async () => {
    const LoaiPhong = form.getFieldValue("loaiphong");
    const GiaPhong = form.getFieldValue("giaphong");
    const Thang = form.getFieldValue("thang");
    const TrangThai = form.getFieldValue("trangthai");
    console.log("update", LoaiPhong, GiaPhong, Thang, TrangThai);

    const res = await axios.put(
      `http://localhost:8000/update-rateroom/${idUpdate}`,
      {
        LOAIPHONGId: LoaiPhong,
        GiaPhong,
        THANGId: Thang,
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
  const handleChangeTyperoom = (value) => {
    console.log("value", value);

    return value;
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
                onClick={() => setModalCreateRateRoom(true)}
                type="primary"
                style={{
                  width: "15%",
                  marginRight: "11%",
                  right: 0,
                  position: "relative",
                }}
              >
                <PlusOutlined />
                Tạo mới giá phòng
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={rateroomList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>

      {/* MODAL CREATE RATRROOM */}
      <Modal
        title="Tạo mới giá phòng"
        visible={modalCreateRateRoom}
        centered
        onOk={handleOKCreateRateRoom}
        onCancel={() => setModalCreateRateRoom(false)}
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
            label="Loại phòng"
            name="loaiphong"
            style={{ marginRight: "100px" }}
          >
            <Select
              defaultValue="Chọn loại phòng"
              onChange={handleChangeTyperoom}
            >
              {typeroomList.map((typeroom) => {
                return (
                  <Option value={typeroom.id}>{typeroom.LoaiPhong}</Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="giaphong"
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

      {/* MODAL UPDATE RATEROOM */}
      <Modal
        title="Cập nhật giá phòng"
        visible={modalUpdateRateRoom}
        centered
        onOk={handleUpdateRateRoom}
        onCancel={() => setModalUpdateRateRoom(false)}
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
            label="Loại phòng"
            name="loaiphong"
            style={{ marginRight: "100px" }}
          >
            <Select
              defaultValue="Chọn loại phòng"
              onChange={handleChangeTyperoom}
            >
              {typeroomList.map((typeroom) => {
                return (
                  <Option value={typeroom.id}>{typeroom.LoaiPhong}</Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="giaphong"
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
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE RATEROOM */}
      <Modal
        title="Xóa giá phòng"
        visible={modalDeleteRateRoom}
        onOk={handleDeleteRateRoom}
        onCancel={() => setModalDeleteRateRoom(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa giá phòng này không?</p>
      </Modal>
    </>
  );
}
