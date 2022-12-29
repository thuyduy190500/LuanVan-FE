import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  notification,
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

export default function TypeRoom() {
  const [modalCreateTyperoom, setModalCreateTyperoom] = useState(false);
  const [modalDeleteTyperoom, setModalDeleteTyperoom] = useState(false);
  const [modalUpdateTyperoom, setModalUpdateTyperoom] = useState(false);

  const [TyperoomList, setTyperoom] = useState();
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [device, setDevice] = useState([]);
  useEffect(() => {
    const getTyperooms = async () => {
      try {
        const res = await axios.get("http://localhost:8000/typeroom");

        const customTyperoomsList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setTyperoom(customTyperoomsList);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getTyperooms();
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
      title: "Mô tả",
      dataIndex: "MoTa",
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
              onClick={(e) => updateTyperoom(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteTyperoom(record)}
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

  const createTyperoom = async () => {
    setModalCreateTyperoom(true);
    const res = await axios.get("http://localhost:8000/device");
    setDevice(res.data);
    // let arrTHIETBI = []
    // const result = await res.data.map(async (item, idx) => {

    //   let tendvById = [];

    //   item.DICHVUId.forEach(async (a) => {
    //     const dichvu = await axios.get(
    //       `http://localhost:8000/service/${a}`
    //     );
    //     tendvById.push(dichvu.data.TenDV);
    //   });
    //   arrDichVu.push({ id: item.id, tendv: tendvById });

    //   let filterDichVu = arrDichVu.filter((dv) => dv.id === item.id);

    //   return {
    //     id: item.id,
    //     TenNT: tennhatro,
    //     dichvu: filterDichVu[0].tendv,
    //     loaiphong: filterLoaiPhong[0].loaiphong,
    //     diachi: diachi,
    //     sdt: item.Sdt,
    //     GiaDien: item.GiaDien,
    //     GiaNuoc: item.GiaNuoc,
    //     MoTa: item.MoTa,
    //     index: idx + 1,
    //     NHATROId: item.NHATROId,
    //   };
    // });
  };

  const handleOKCreateTyperoom = async () => {
    const LoaiPhong = form.getFieldValue("loaiphong");
    const MoTa = form.getFieldValue("mota");
    const ThietBi = form.getFieldValue("thietbi");

    const res = await axios.post("http://localhost:8000/create-typeroom", {
      LoaiPhong,
      MoTa,
      ThietBi,
    });
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
    // console.log("tb", ThietBi);
  };

  function deleteTyperoom(record) {
    setModalDeleteTyperoom(true);
    setIdDelete(record.id);
  }

  function updateTyperoom(record) {
    setModalUpdateTyperoom(true);
    form.setFieldsValue({
      loaiphong: record.LoaiPhong,
      mota: record.MoTa,
    });
    setIdUpdate(record.id);
  }

  const handleDeleteTyperoom = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-typeroom/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateTyperoom = async () => {
    const LoaiPhong = form.getFieldValue("loaiphong1");
    const MoTa = form.getFieldValue("mota1");

    const res = await axios.put(
      `http://localhost:8000/update-typeroom/${idUpdate}`,
      {
        LoaiPhong,
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
                onClick={createTyperoom}
                type="primary"
                style={{
                  width: "15%",
                  marginRight: "11%",
                  right: 0,
                  position: "relative",
                }}
              >
                <PlusOutlined />
                Thêm loại phòng
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={TyperoomList}
              onChange={onChange}
            />
          </div>
        </Content>
      </Layout>

      {/* MODAL CREATE HOUSE */}
      <Modal
        title="Tạo mới loại phòng"
        visible={modalCreateTyperoom}
        centered
        onOk={handleOKCreateTyperoom}
        onCancel={() => setModalCreateTyperoom(false)}
        width={500}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Form.Item
            label="Loại phòng"
            name="loaiphong"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập loại phòng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Thiết bị" name="thietbi">
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Chọn thiết bị"
              // onChange={handleChangeTyperoom}
            >
              {device.map((device) => {
                return (
                  <Option value={device.id} label={device.TenTB}>
                    {device.TenTB}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="mota"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL UPDATE Typeroom */}
      <Modal
        title="Cập nhật thông tin loại phòng"
        visible={modalUpdateTyperoom}
        centered
        onOk={handleUpdateTyperoom}
        onCancel={() => setModalUpdateTyperoom(false)}
        width={700}
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
          // autoComplete="off"
        >
          <Form.Item
            label="Loại phòng"
            name="loaiphong"
            style={{ marginRight: "100px" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập loại phòng!",
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
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE Typeroom */}
      <Modal
        title="Xóa loại phòng"
        visible={modalDeleteTyperoom}
        onOk={handleDeleteTyperoom}
        onCancel={() => setModalDeleteTyperoom(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa loại phòng này không?</p>
      </Modal>
    </>
  );
}
