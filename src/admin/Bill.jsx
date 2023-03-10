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
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import "./asset/Bill.css";
import { BrowserRouter as Routes, Link } from "react-router-dom";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import { useReactToPrint } from "react-to-print";
import { renderToString } from "react-dom/server";

import {
  PlusOutlined,
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

  const [idPhong, setIdPhong] = useState();
  const [thangId, setThangId] = useState();
  const [donGiaDV, setDonGiaDV] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const resHouse = await axios.get("http://localhost:8000/house1");
        const resRoom = await axios.get(
          `http://localhost:8000/room-house/${nhatroId}`
        );
        // const res = await axios.get(
        //   `http://localhost:8000/bill-house/${nhatroId}`
        // );
        // const customBillsList = res.data.map((obj, index) => ({
        //   ...obj,
        //   key: index + 1,
        // }));
        setHouseList(resHouse.data);
        // setBill(customBillsList);

        setRoomHouse(resRoom.data);
        console.log("room", resRoom.data);
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
      title: "T??n Ph??ng",
      dataIndex: "TenPhong",

      width: "25%",
    },
    {
      title: "Th??ng",
      dataIndex: "Thang",
      sorter: (a, b) => a.quantum - b.quantum,
      width: "20%",
    },
    {
      title: "Ng??y l???p",
      dataIndex: "NgayLap",
      width: "15%",
    },
    {
      title: "T???ng ti???n",
      dataIndex: "TongTien",
      width: "15%",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "TrangThai",
      render: (text) => {
        if (text === "Ch??a thu") {
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
      message: "Th??nh c??ng",
    });
  };

  const errorNotification = (type) => {
    notification[type]({
      message: "Th???t b???i",
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
      thang: record.Thang,
      ngayad: record.NgayAD,
      trangthai: record.TrangThai,
      diencu: record.CSDienCu,
      dienmoi: record.CSDienMoi,
      nuoccu: record.CSNuocCu,
      nuocmoi: record.CSNuocMoi,
      tongtien: record.TongTien,
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
  };

  const onCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOnChangeMenu = async (item) => {
    setNhaTroId(item);
    const resRoom = await axios.get(`http://localhost:8000/room-house/${item}`);
    setRoomHouse(resRoom.data);
  };

  // CHI TI???T H??A ????N
  const BillDetail = (data) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "hoadon",
      // onAfterPrint: () => alert("In th??nh c??ng"),
    });
    if (billDetail) {
      return (
        <>
          <div className="">
            <Button onClick={handlePrint}>In h??a ????n</Button>
          </div>
          <div
            ref={componentRef}
            style={{ width: "100%", height: window.innerHeight }}
            className="bill"
          >
            <h3 className="title">PHI???U THU TI???N PH??NG</h3>
            <div className="body-section">
              <div className="row">
                <div className="col-6">
                  <p className="sub-heading">
                    T??n nh?? tr???:{billDetail[0].TenNT}
                  </p>
                  <p className="sub-heading">
                    S??? ??i???n tho???i: {billDetail[0].Sdt}
                  </p>
                  <p className="sub-heading">?????a ch???:</p>
                </div>
                <div className="col-6">
                  <p className="sub-heading">Th??ng:{billDetail[0].Thang} </p>
                  <p className="sub-heading">Ph??ng:{billDetail[0].TenPhong} </p>
                </div>
              </div>
            </div>
            <div className="body-section">
              <h6 className="heading">Th??ng tin ph??ng</h6>
              <table className="table-bordered" id="bill1">
                <thead>
                  <tr>
                    <th className="w-20">T??n</th>
                    <th className="w-15">????n gi??</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ph??ng</td>
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
                        T???ng c???ng:{" "}
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
              <h6 className="heading1">Th??ng tin ??i???n n?????c</h6>
              <table className="table-bordered" id="bill2">
                <thead>
                  <tr>
                    <th className="w-20">T??n</th>
                    <th className="w-15">Ch??? s??? c??</th>
                    <th className="w-15">Ch??? s??? m???i</th>
                    <th className="w-15">T???ng ti??u th???</th>
                    <th className="w-15">????n gi??</th>
                    <th className="w-20">T???ng ti???n</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>??i???n</td>
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
                    <td>N?????c</td>
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
                        T???ng c???ng:{" "}
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
                    Thanh to??n: {billDetail[0].TongTien}
                  </h3>
                  <i>(Vui l??ng thanh to??n tr?????c ng??y 01 h??ng th??ng)</i>
                </div>
                <div className="" id="divngaylap">
                  <p id="textngaylap">Ng??y l???p </p>
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
  // K???T TH??C CHI TI???T H??A ????N

  // l???p h??a ????n
  const createBill = async (item) => {
    setIdPhong(item.id);
    const idPhong = item.id;
    setModalCreateBill(true);
    const currentDate = new Date();
    let prevMonth;
    if (currentDate.getMonth() === 0) {
      prevMonth = "12/" + String(currentDate.getFullYear() - 1);
    } else {
      prevMonth =
        String(currentDate.getMonth()) +
        "/" +
        String(currentDate.getFullYear());
    }

    console.log("date", prevMonth);
    const resThang = await axios.post(
      `http://localhost:8000/getMonthByString`,
      {
        prevMonth,
      }
    );
    console.log("res", resThang.data);
    const idThang = resThang.data.id;
    setThangId(idThang);
    const resChiSo = await axios.post(
      `http://localhost:8000/getChiSoByIdPhongThang`,
      {
        idThang,
        idPhong,
      }
    );

    console.log("chi so", resChiSo.data);
    const currentMonth = currentDate.getMonth() + 1;
    form.setFieldsValue({
      thang: currentMonth,
      diencu: resChiSo.data.ChiSoDien,
      nuoccu: resChiSo.data.ChiSoNuoc,
    });
  };

  const TongTien = async (TieuThuDien, TieuThuNuoc, giaphong, donGiaDV) => {
    const dongia = await axios.get(
      "http://localhost:8000/electric-water-state"
    );
    console.log("dg 1", dongia, donGiaDV);
    const TienDien = Number(TieuThuDien) * Number(dongia.data.DonGiaDien);
    const TienNuoc = Number(TieuThuNuoc) * Number(dongia.data.DonGiaNuoc);
    const sum = donGiaDV.reduce((a, b) => Number(a) + Number(b), 0);
    const tongtienphong = TienDien + TienNuoc + sum + Number(giaphong);
    return tongtienphong;
  };

  const handleOKCreateBill = async () => {
    const currentDate = new Date();
    console.log("date", currentDate);
    const Thang = form.getFieldValue("thang");
    const ChiSoDienMoi = form.getFieldValue("dienmoi");
    const ChiSoDienCu = form.getFieldValue("diencu");
    const ChiSoNuocMoi = form.getFieldValue("nuocmoi");
    const ChiSoNuocCu = form.getFieldValue("nuoccu");
    const NgayLap = currentDate.toISOString();
    const TrangThai = "Ch??a thu";

    const res = await axios.get(
      `http://localhost:8000/typeroom-device/${idPhong}`
    );
    console.log("gi?? d???ch v???", ...res.data[0].DonGia);
    console.log("gi?? ph??ng", res.data[0].GiaPhong[0]);

    // setDonGiaDV([...res.data[0].DonGia]);
    const GiaPhong = res.data[0].GiaPhong[0];
    const Giadv = [...res.data[0].DonGia[0]];

    let currentMonth;
    if (Number(Thang) >= 10) {
      currentMonth = Thang + "/" + currentDate.getFullYear();
    } else {
      currentMonth = "0" + Thang + "/" + currentDate.getFullYear();
    }
    const resThang = await axios.post(
      `http://localhost:8000/getMonthByString`,
      {
        currentMonth,
      }
    );
    const IdThangHT = resThang.data.id;

    const tongtien = await TongTien(
      ChiSoDienMoi - ChiSoDienCu,
      ChiSoNuocMoi - ChiSoNuocCu,
      GiaPhong,
      Giadv
    );
    console.log("thang", IdThangHT);
    console.log("gi?? dv", Giadv);

    console.log("tong", tongtien);

    const createBill = await axios.post(`http://localhost:8000/create-bill`, {
      idPhong,
      IdThangHT,
      ChiSoDienMoi,
      ChiSoNuocMoi,
      tongtien,
      TrangThai,
      NgayLap,
      ChiSoDienCu,
      ChiSoNuocCu,
      nhatroId,
    });
    if (createBill.status === 201) {
      successNotification("success");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
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
            <Tabs defaultActiveKey="1" onChange={handleOnChangeMenu}>
              {houseList.map((house) => {
                return (
                  <Tabs.TabPane tab={house.TenNT} key={house.id}>
                    <div
                      className="site-layout-background "
                      style={{ padding: "24px" }}
                    >
                      {/* <Table
                        columns={columns}
                        dataSource={bill}
                        onChange={onChange}
                      /> */}
                      <List
                        grid={{ gutter: 16, column: 5 }}
                        dataSource={roomHouse}
                        renderItem={(item) => (
                          <List.Item>
                            <Card
                              title={item.TenPhong}
                              style={{ backgroundColor: "#EEEEEE" }}
                            >
                              <Button
                                type="primary"
                                shape="round"
                                style={{
                                  backgroundColor: "red",
                                }}
                                onClick={(e) => createBill(item)}
                              >
                                L???p h??a ????n
                              </Button>
                              <Button
                                type="primary"
                                shape="round"
                                style={{ marginTop: "10px" }}
                              >
                                <Link to={"/bill-detail/" + item.id}>
                                  Xem h??a ????n
                                </Link>
                              </Button>
                            </Card>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Tabs.TabPane>
                );
              })}
            </Tabs>
          </div>
        </Content>
      </Layout>

      {/* MODAL UPDATE bill */}
      <Modal
        title="C???p nh???t phi???u thu"
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
            <Col span={12}>
              {/* <Form.Item
                label="T??n ph??ng"
                name="tenphong"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t??n ph??ng!",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}
            </Col>
            <Col span={12}>
              <Form.Item
                label="Th??ng"
                name="thang"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p th??ng!",
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
                label="Ch??? s??? ??i???n c??"
                name="diencu"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? ??i???n c??!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ch??? s??? ??i???n m???i"
                name="dienmoi"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? ??i???n m???i!",
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
                label="Ch??? s??? n?????c c??"
                name="nuoccu"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? n?????c c??!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ch??? s??? n?????c m???i"
                name="nuocmoi"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? n?????c m???i!",
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
                label="Ng??y l???p"
                name="ngaylap"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ng??y l???p!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="T???ng ti???n"
                name="tongtien"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t???ng ti???n!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Tr???ng th??i"
            name="trangthai"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n tr???ng th??i!",
              },
            ]}
          >
            {trangThai === "Ch??a thu" ? (
              <Radio.Group
                onChange={onChangeTrangThai}
                name="trangthai"
                defaultValue={"Ch??a thu"}
                // value={trangThai ? "??ang ??p d???ng" : "Ng???ng ??p d???ng"}
              >
                <Radio value="Ch??a thu">Ch??a thu</Radio>
                <Radio value="???? thu">???? thu</Radio>
              </Radio.Group>
            ) : (
              <Radio.Group
                onChange={onChangeTrangThai}
                name="trangthai"
                defaultValue={"???? thu"}
              >
                <Radio value="Ch??a thu">Ch??a thu</Radio>
                <Radio value="???? thu">???? thu</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL DELETE bill */}
      <Modal
        title="X??a d???ch v???"
        visible={modalDeleteBill}
        onOk={handleDeleteBill}
        onCancel={() => setModalDeleteBill(false)}
      >
        <Form form={form}></Form>
        <p> B???n c?? ch???c ch???n x??a h??a ????n n??y kh??ng </p>
      </Modal>

      {/* XEM CHI TI???T */}
      <Drawer
        title="Th??ng tin chi ti???t h??a ????n"
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

      {/* L???P H??A ????N */}
      <Modal
        title="L???p h??a ????n"
        visible={modalCreateBill}
        centered
        onOk={handleOKCreateBill}
        onCancel={() => setModalCreateBill(false)}
        width={800}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Th??ng"
                name="thang"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p th??ng!",
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
                label="Ch??? s??? ??i???n c??"
                name="diencu"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? ??i???n c??!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ch??? s??? ??i???n m???i"
                name="dienmoi"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? ??i???n m???i!",
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
                label="Ch??? s??? n?????c c??"
                name="nuoccu"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? n?????c c??!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ch??? s??? n?????c m???i"
                name="nuocmoi"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p ch??? s??? n?????c m???i!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
