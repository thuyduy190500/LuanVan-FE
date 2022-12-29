import React, { useState, useEffect, useRef } from "react";
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
  Col,
  Drawer,
  Space,
  Tabs,
  Switch,
  Card,
  List,
  Popconfirm,
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import "./asset/Bill.css";

import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import { useReactToPrint } from "react-to-print";
import { renderToString } from "react-dom/server";
import { useParams } from "react-router-dom";
import {
  PlusOutlined,
  CheckCircleOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Content } = Layout;

export default function Bill() {
  const [modalCreateBill, setModalCreateBill] = useState(false);
  const [modalDeleteBill, setModalDeleteBill] = useState(false);
  const [modalUpdateBill, setModalUpdateBill] = useState(false);

  const [bill, setBill] = useState();
  const [form] = Form.useForm();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [valueTrangThai, setValueTrangThai] = useState();
  const [trangThai, setTrangThai] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [billDetail, setBillDetail] = useState();
  const [houseList, setHouseList] = useState([]);
  const [nhatroId, setNhaTroId] = useState("49");
  const [roomHouse, setRoomHouse] = useState([]);
  const [listBill, setListBill] = useState([]);
  const { id } = useParams();
  const [updateStatusId, setupdateStatusId] = useState();
  const confirm = "Bạn có chắc chắn muốn xác nhận hóa đơn này?";

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/hoadon/${id}`);
        console.log("hd", res.data);
        setListBill(res.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "key",
    },
    {
      title: "Tên Phòng",
      dataIndex: "TenPhong",

      width: "25%",
    },
    {
      title: "Tháng",
      dataIndex: "Thang",
      sorter: (a, b) => a.quantum - b.quantum,
      width: "20%",
    },
    {
      title: "Ngày lập",
      dataIndex: "NgayLap",
      width: "15%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "TongTien",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      render: (text) => {
        if (text === "Chưa thu") {
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
              onClick={(e) => updateBill(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteBill(record)}
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
      message: "Thất bại",
    });
  };

  function deleteBill(record) {
    setModalDeleteBill(true);
    setIdDelete(record.id);
  }

  function updateBill(record) {
    setModalUpdateBill(true);
    console.log("tt", record.TrangThai);
    console.log("tt", record);

    setTrangThai(record.TrangThai);
    form.setFieldsValue({
      tenphong: record.TenPhong,
      thang: record.thang,
      ngayad: record.NgayAD,
      trangthai: record.TrangThai,
      diencu: record.ChiSoDienCu,
      dienmoi: record.ChiSoDienMoi,
      nuoccu: record.ChiSoNuocCu,
      nuocmoi: record.ChiSoNuocMoi,
      tongtien: record.tongTien.toLocaleString("it-IT"),
      ngaylap: moment(record.NgayLap).format("DD-MM-YYYY"),
    });
    setIdUpdate(record.id);
  }

  const handleDeleteBill = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-bill/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleUpdateBill = async () => {
    const NgayLap = form.getFieldValue("ngaylap");
    const TrangThai = form.getFieldValue("trangthai");
    const CSDienCu = form.getFieldValue("diencu");
    const CSDienMoi = form.getFieldValue("dienmoi");
    const CSNuocCu = form.getFieldValue("nuoccu");
    const CSNuocMoi = form.getFieldValue("nuocmoi");
    const TongTien = form.getFieldValue("tongtien");
    const res = await axios.put(
      `http://localhost:8000/update-bill/${idUpdate}`,
      {
        NgayLap,
        TrangThai,
        CSDienCu,
        CSDienMoi,
        CSNuocCu,
        CSNuocMoi,
        TongTien,
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

  const showDrawer = async (item) => {
    setOpenDetail(true);
    const res = await axios.get(`http://localhost:8000/bill/${item.id}`);
    setBillDetail(res.data);
    console.log("data", res.data);

    // console.log("data", res.data);
  };
  const onCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOnChangeMenu = async (item) => {
    const res = await axios.get(`http://localhost:8000/bill-house/${item}`);
    setBill(res.data);
    setNhaTroId(res.data[0].NHATROId);
  };

  const onChangeSwitch = async (checked) => {
    console.log(`switch to ${checked}`);
    if (checked === true) {
      const res = await axios.get(
        `http://localhost:8000/bill-house-state/${nhatroId}`
      );
      setBill(res.data);
    } else {
      const res = await axios.get(
        `http://localhost:8000/bill-house/${nhatroId}`
      );
      setBill(res.data);
    }
  };

  function updateStatus(item) {
    setupdateStatusId(item.id);
    console.log("id", item.id);
  }
  const handleOkUpdateStatus = async () => {
    const res = await axios.put(
      `http://localhost:8000/update-bill/${updateStatusId}`,
      {
        TrangThai: "Đã thu",
      }
    );
    window.location.reload();
  };

  // CHI TIẾT HÓA ĐƠN
  const BillDetail = (data) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "hoadon",
      // onAfterPrint: () => alert("In thành công"),
    });
    const handleSendMail = async () => {
      const res = await axios.post(`http://localhost:8000/send-mail`, {
        TenNT: billDetail[0].TenNT,
        Sdt: billDetail[0].Sdt,
        Thang: billDetail[0].Thang,
        TenPhong: billDetail[0].TenPhong,
        TongDien: billDetail[0].CSDienMoi - billDetail[0].CSDienCu,
        TongNuoc: billDetail[0].CSNuocMoi - billDetail[0].CSNuocCu,
      });
      console.log(res);
      if (res.status === 200) {
        successNotification("success");
        // setTimeout(function () {
        //   window.location.reload();
        // }, 1000);
      } else {
        errorNotification("error");
      }
    };
    if (billDetail) {
      return (
        <>
          <div className="">
            <Button onClick={handlePrint}>In hóa đơn</Button>
            <Button onClick={handleSendMail}>Gửi hóa đơn</Button>
          </div>
          <div
            ref={componentRef}
            style={{ width: "100%", height: window.innerHeight }}
            className="bill"
          >
            <h3 className="title">PHIẾU THU TIỀN PHÒNG</h3>
            <div className="body-section">
              <div className="row">
                <div className="col-6">
                  <p className="sub-heading">
                    Tên nhà trọ:{billDetail[0].TenNT}
                  </p>
                  <p className="sub-heading">
                    Số điện thoại: {billDetail[0].Sdt}
                  </p>
                  {/* <p className="sub-heading">Địa chỉ:</p> */}
                </div>
                <div className="col-6">
                  <p className="sub-heading">Tháng:{billDetail[0].Thang} </p>
                  <p className="sub-heading">Phòng:{billDetail[0].TenPhong} </p>
                </div>
              </div>
            </div>
            <div className="body-section">
              <h6 className="heading">Thông tin phòng</h6>
              <table className="table-bordered" id="bill1">
                <thead>
                  <tr>
                    <th className="w-20">Tên</th>
                    <th className="w-15">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Phòng</td>
                    <td>{billDetail[0].GiaPhong}</td>
                  </tr>
                  {billDetail[0].dichvu.map((dv) => {
                    return (
                      <tr>
                        <td>{dv.TenDV}</td>
                        <td value={dv.DonGia}>{dv.DonGia}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colspan="6">
                      <strong>
                        Tổng cộng:{" "}
                        {Number(billDetail[0].GiaPhong) +
                          billDetail[0].giadichvu.reduce(
                            (a, b) => Number(a) + Number(b),
                            0
                          )}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h6 className="heading1">Thông tin điện nước</h6>
              <table className="table-bordered" id="bill2">
                <thead>
                  <tr>
                    <th className="w-20">Tên</th>
                    <th className="w-15">Chỉ số cũ</th>
                    <th className="w-15">Chỉ số mới</th>
                    <th className="w-15">Tổng tiêu thụ</th>
                    <th className="w-15">Đơn giá</th>
                    <th className="w-20">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Điện</td>
                    <td>{billDetail[0].CSDienCu}</td>
                    <td>{billDetail[0].CSDienMoi}</td>
                    <td>{billDetail[0].CSDienMoi - billDetail[0].CSDienCu}</td>
                    <td>{billDetail[0].DonGiaDien}</td>
                    <td>
                      {billDetail[0].DonGiaDien *
                        (billDetail[0].CSDienMoi - billDetail[0].CSDienCu)}
                    </td>
                  </tr>
                  <tr>
                    <td>Nước</td>
                    <td>{billDetail[0].CSNuocCu}</td>
                    <td>{billDetail[0].CSNuocMoi}</td>
                    <td>{billDetail[0].CSNuocMoi - billDetail[0].CSNuocCu}</td>
                    <td>{billDetail[0].DonGiaNuoc}</td>
                    <td>
                      {billDetail[0].DonGiaNuoc *
                        (billDetail[0].CSNuocMoi - billDetail[0].CSNuocCu)}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6">
                      <strong>
                        Tổng cộng:{" "}
                        {billDetail[0].DonGiaNuoc *
                          (billDetail[0].CSNuocMoi - billDetail[0].CSNuocCu) +
                          billDetail[0].DonGiaDien *
                            (billDetail[0].CSDienMoi - billDetail[0].CSDienCu)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="row footer">
                <div className="col-6">
                  <h3 id="thanhtoan" className="heading">
                    Thanh toán: {billDetail[0].TongTien}
                  </h3>
                  <i>(Vui lòng thanh toán trước ngày 01 hàng tháng)</i>
                </div>
                <div className="" id="divngaylap">
                  <p id="textngaylap">Ngày lập </p>
                  <p id="ngaylap">
                    {moment(billDetail[0].NgayLap).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      console.log("sai");
    }
  };
  // KẾT THÚC CHI TIẾT HÓA ĐƠN

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
            <List
              grid={{ gutter: 12, column: 1 }}
              dataSource={listBill}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className="card mb-3"
                    style={{
                      width: "700px",
                      margin: "0 50px",
                    }}
                  >
                    {item.trangThai === "Đã thu" ? (
                      <div
                        className="row no-gutters"
                        style={{ backgroundColor: "#F6F9B3", height: "120px" }}
                      >
                        <div className="row">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-4">
                                <img
                                  src="https://icons-for-free.com/iconfiles/png/512/credit+card+purchase+receipt+icon-1320186098000412582.png"
                                  alt=""
                                  style={{ width: 100 }}
                                />
                              </div>
                              <div className="col-sm-4">
                                <p className="">
                                  <strong
                                    style={{ color: "Red", fontSize: "18px" }}
                                  >
                                    Tháng: {item.thang}
                                  </strong>
                                </p>

                                <p
                                  style={{
                                    color: "black",
                                    paddingTop: "7px",
                                    fontSize: "14px",
                                  }}
                                >
                                  <strong>
                                    Tổng tiền:{" "}
                                    {item.tongTien.toLocaleString("it-IT")}
                                  </strong>
                                </p>
                                <p
                                  style={{
                                    color: "black",
                                    fontSize: "14px",
                                    paddingTop: "7px",
                                  }}
                                >
                                  <strong>
                                    Trạng thái:{" "}
                                    <Tag
                                      color="blue"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {item.trangThai}
                                    </Tag>
                                  </strong>
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <p>
                                  <strong>
                                    <Button
                                      onClick={(e) => showDrawer(item)}
                                      style={{
                                        border: "none",
                                        color: "white",
                                        margin: "2% 10%",
                                        backgroundColor: " #2370B6",
                                        width: 100,
                                      }}
                                    >
                                      Xem chi tiết
                                    </Button>
                                    <Button
                                      style={{
                                        border: "none",
                                        color: "white",
                                        margin: "5% 2%",
                                        backgroundColor: " #4BC14E",
                                      }}
                                      onClick={(e) => updateBill(item)}
                                    >
                                      Chỉnh sửa
                                    </Button>
                                    <Button
                                      style={{
                                        border: "none",
                                        color: "white",
                                        margin: "5% 2%",
                                        backgroundColor: " #DF1E1E",
                                        width: 80,
                                      }}
                                    >
                                      Xóa
                                    </Button>
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="row no-gutters"
                        style={{ backgroundColor: "#FDB4A4", height: "120px" }}
                      >
                        <div className="row">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-4">
                                <img
                                  src="https://icons-for-free.com/iconfiles/png/512/credit+card+purchase+receipt+icon-1320186098000412582.png"
                                  alt=""
                                  style={{ width: 100 }}
                                />
                              </div>
                              <div className="col-sm-4">
                                <p className="">
                                  <strong
                                    style={{ color: "Red", fontSize: "18px" }}
                                  >
                                    Tháng: {item.thang}
                                  </strong>
                                </p>

                                <p
                                  style={{
                                    color: "black",
                                    paddingTop: "7px",
                                    fontSize: "14px",
                                  }}
                                >
                                  <strong>
                                    Tổng tiền:{" "}
                                    {item.tongTien.toLocaleString("it-IT")}
                                  </strong>
                                </p>
                                <p
                                  style={{
                                    color: "black",
                                    fontSize: "14px",
                                    paddingTop: "7px",
                                  }}
                                >
                                  <strong>
                                    Trạng thái:{" "}
                                    <Popconfirm
                                      placement="top"
                                      title={confirm}
                                      onConfirm={handleOkUpdateStatus}
                                      okText="OK"
                                      cancelText="Cancel"
                                    >
                                      <Button
                                        style={{
                                          border: "none",
                                          backgroundColor: "#FDB4A4",
                                        }}
                                        onClick={(e) => updateStatus(item)}
                                      >
                                        <Tag
                                          color="green"
                                          style={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          {item.trangThai}
                                        </Tag>
                                      </Button>
                                    </Popconfirm>
                                  </strong>
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <p>
                                  <strong>
                                    <Button
                                      onClick={(e) => showDrawer(item)}
                                      style={{
                                        border: "none",
                                        color: "white",
                                        margin: "2% 10%",
                                        backgroundColor: " #2370B6",
                                        width: 100,
                                      }}
                                    >
                                      Xem chi tiết
                                    </Button>
                                    <Button
                                      style={{
                                        border: "none",
                                        color: "white",
                                        margin: "5% 2%",
                                        backgroundColor: " #4BC14E",
                                      }}
                                      onClick={(e) => updateBill(item)}
                                    >
                                      Chỉnh sửa
                                    </Button>
                                    <Button
                                      style={{
                                        border: "none",
                                        color: "white",
                                        margin: "5% 2%",
                                        backgroundColor: " #DF1E1E",
                                        width: 80,
                                      }}
                                    >
                                      Xóa
                                    </Button>
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>

      {/* MODAL UPDATE bill */}
      <Modal
        title="Cập nhật phiếu thu"
        visible={modalUpdateBill}
        centered
        onOk={handleUpdateBill}
        onCancel={() => {
          setModalUpdateBill(false);
          // setTrangThai();
        }}
        width={700}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Tháng"
                name="thang"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tháng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Chỉ số điện cũ"
                name="diencu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chỉ số điện cũ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Chỉ số điện mới"
                name="dienmoi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chỉ số điện mới!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Chỉ số nước cũ"
                name="nuoccu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chỉ số nước cũ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Chỉ số nước mới"
                name="nuocmoi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chỉ số nước mới!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày lập"
                name="ngaylap"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày lập!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tổng tiền"
                name="tongtien"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tổng tiền!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Trạng thái"
            name="trangthai"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái!",
              },
            ]}
          >
            {trangThai === "Chưa thu" ? (
              <Radio.Group
                onChange={onChangeTrangThai}
                name="trangthai"
                defaultValue={"Chưa thu"}
                // value={trangThai ? "Đang áp dụng" : "Ngừng áp dụng"}
              >
                <Radio value="Chưa thu">Chưa thu</Radio>
                <Radio value="Đã thu">Đã thu</Radio>
              </Radio.Group>
            ) : (
              <Radio.Group
                onChange={onChangeTrangThai}
                name="trangthai"
                defaultValue={"Đã thu"}
              >
                <Radio value="Chưa thu">Chưa thu</Radio>
                <Radio value="Đã thu">Đã thu</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE bill */}
      <Modal
        title="Xóa dịch vụ"
        visible={modalDeleteBill}
        onOk={handleDeleteBill}
        onCancel={() => setModalDeleteBill(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa hóa đơn này không </p>
      </Modal>

      {/* XEM CHI TIẾT */}
      <Drawer
        title="Thông tin chi tiết hóa đơn"
        placement="right"
        visible={openDetail}
        width={900}
        onClose={onCloseDetail}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCloseDetail}>Cancel</Button>
          </Space>
        }
      >
        <BillDetail />
      </Drawer>
    </>
  );
}
