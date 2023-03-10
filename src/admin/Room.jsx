import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Layout, Button, Modal, Form, Input, Row, Col } from "antd";
import {
  Layout,
  List,
  Button,
  Dropdown,
  Space,
  Menu,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Drawer,
  Select,
  Tabs,
  DatePicker,
  Radio,
  notification,
  Collapse,
  Checkbox,
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import "./asset/Room.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import {
  EditFilled,
  HomeFilled,
  DeleteFilled,
  EyeFilled,
  UserOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import moment from "moment";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const { Meta } = Card;
const { Content } = Layout;
const { Option } = Select;

export default function Room() {
  const [modalCreateRoom, setModalCreateRoom] = useState(false);
  const [modalCreateBill, setModalCreateBill] = useState(false);

  const [modalUpdateRoom, setModalUpdateRoom] = useState(false);
  const [modalDeleteRoom, setModalDeleteRoom] = useState(false);

  const [modalAddCustomer, setModalAddCustomer] = useState(false);
  const [modalUpdateCustomer, setModalUpdateCustomer] = useState(false);
  const [modalDetailCustomer, setModalDetailCustomer] = useState(false);
  const [modalTraPhong, setModalTraPhong] = useState(false);

  const [roomList, setRoom] = useState();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [houseList, setHouse] = useState([]);
  const [idUpdate, setIdUpdate] = useState();
  const [thietbi, setThietbi] = useState();
  const [gioiTinh, setGioiTinh] = useState();
  const [namSinh, setNamSinh] = useState();
  const [ngayDen, setNgayDen] = useState();
  const [ngayDi, setNgayDi] = useState();
  const [phongId, setPhongId] = useState();
  const [thangId, setThangId] = useState();
  const [thangHTId, setThangHTId] = useState();

  const [khachthueId, setKhachThueId] = useState();
  const [ttkhachphong, setTtkhachphong] = useState();
  const [typeroomList, setTyperoomList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [nhatroId, setNhaTroId] = useState("49");
  const [khachthue, setKhachThue] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const [dateFromRequestNgayDen, setDateFromRequestNgayDen] = useState();
  const [dateFromRequestNgayDi, setDateFromRequestNgayDi] = useState();
  const [dateFromRequestNamSinh, setDateFromRequestNamSinh] = useState();

  const [idDelete, setIdDelete] = useState();
  const [slDangO, setSlDangO] = useState([]);
  const [donGiaDV, setDonGiaDV] = useState([]);

  const [idPhong, setIdPhong] = useState();
  const [daiDienPhong, setDaiDienPhong] = useState();
  const [service, setService] = useState();
  const [device, setDevice] = useState();

  useEffect(() => {
    const getRooms = async () => {
      try {
        console.log("nh?? tr??? id", nhatroId);
        const res = await axios.get(
          `http://localhost:8000/room-house/${nhatroId}`
        );
        console.log("arr", res.data);
        const phong_sl = [];
        res.data.map(async (phong) => {
          console.log("phong id", phong.id);

          const resSLuong = await axios.get(
            `http://localhost:8000/sldango/${phong.id}`
          );
          phong_sl.push({ id: phong.id, dango: resSLuong.data.soluong });
        });
        setSlDangO(phong_sl);
        console.log("sl", phong_sl);
        const resHouse = await axios.get("http://localhost:8000/house1");
        const resLP = await axios.get("http://localhost:8000/typeroom");
        // const resTB = await axios.get("http://localhost:8000/device");

        const customRoomList = res.data.map((obj, index) => ({
          ...obj,
          key: index + 1,
        }));
        setRoom(customRoomList);
        setHouse(resHouse.data);
        setTyperoomList(resLP.data);
        // setDeviceList(resTB.data);
        // console.log("tt", resTT.data);
      } catch (error) {
        console.log(error.massage);
      }
    };

    getRooms();
    console.log(houseList);
  }, [nhatroId]);

  const showDrawer = async (item) => {
    setOpen(true);
    const res = await axios.get(
      `http://localhost:8000/typeroom-device/${item.id}`
    );
    console.log("type", res.data);
    setDonGiaDV([...res.data[0].DonGia]);
    setIdPhong(item.id);

    form.setFieldsValue({
      tenphong: item.TenPhong,
      dientich: item.DienTich,
      sl: item.SLToiDa,
      trangthai: item.TrangThai,
      mota: item.MoTa,
      tennt: res.data[0].TenNT,
      loaiphong: res.data[0].LoaiPhong,
      dv: res.data[0].TenDV.join("\n"),
      tb: res.data[0].TenTB.join("\n"),
      giaphong: res.data[0].GiaPhong.toLocaleString("it-IT"),
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOnChangeMenu = async (item) => {
    const res = await axios.get(`http://localhost:8000/room-house/${item}`);
    setRoom(res.data);
    setNhaTroId(res.data[0].NHATROId);
    // console.log("nh?? tr??? id", res.data);
  };

  const showModalUpdateRoom = async (item) => {
    setModalUpdateRoom(true);
    const resDevice = await axios.get("http://localhost:8000/device");
    setDevice(resDevice.data);
    const resService = await axios.get("http://localhost:8000/service");
    setService(resService.data);
    const res = await axios.get(
      `http://localhost:8000/typeroom-device/${item.id}`
    );
    console.log("item", res.data);

    form.setFieldsValue({
      tenphong: item.TenPhong,
      dientich: item.DienTich,
      soluong: item.SLToiDa,
      trangthai: item.TrangThai,
      mota: item.MoTa,
      tennt: res.data[0].TenNT,
      giaphong: res.data[0].GiaPhong,
      loaiphong: res.data[0].LoaiPhong,
      thietbi: res.data[0].TenTB,
      dichvu: res.data[0].TenDV[0],
    });
    setIdUpdate(item.id);
  };

  const handleUpdateRoom = async (values) => {
    const TenPhong = form.getFieldValue("tenphong");
    const DienTich = form.getFieldValue("dientich");
    const SLToiDa = form.getFieldValue("soluong");
    const MoTa = form.getFieldValue("mota");
    const LOAIPHONGId = form.getFieldValue("loaiphong");
    const THIETBIArr = form.getFieldValue("thietbi");
    const DICHVUArr = form.getFieldValue("dichvu");

    let DICHVUId = await DICHVUArr.map(async (item) => {
      console.log("item", item);
      const res = await axios.post(`http://localhost:8000/getServiceByName`, {
        tenDV: item,
      });
      return res.data.id;
    });

    let THIETBIId = await THIETBIArr.map(async (item) => {
      console.log("item1", item);
      const res = await axios.post(`http://localhost:8000/getDeviceByName`, {
        tenTB: item,
      });
      return res.data.id;
    });

    console.log(
      "update",
      TenPhong,
      DienTich,
      MoTa,
      LOAIPHONGId,
      await Promise.all(DICHVUId),
      await Promise.all(THIETBIId)
    );

    const res = await axios.put(
      `http://localhost:8000/capnhatphong/${idUpdate}`,
      {
        TenPhong,
        DienTich,
        SLToiDa,
        // LOAIPHONGId,
        MoTa,
        DICHVUId: await Promise.all(DICHVUId),
        THIETBIId: await Promise.all(THIETBIId),
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

  function addCustomer(record) {
    setPhongId(record);
    setModalAddCustomer(true);
  }
  const onChangeNamSinh = (date, dateString) => {
    console.log(dateString);
    setNamSinh(dateString);
  };
  const onChangeNgayDen = (date, dateString) => {
    console.log(dateString);
    setNgayDen(dateString);
  };
  const onChangeNgayDi = (date, dateString) => {
    console.log(dateString);
    setNgayDi(dateString);
  };
  const onChangeGioiTinh = (e) => {
    console.log("radio checked", e.target.value);
    setGioiTinh(e.target.value);
  };

  const onChangeDaiDienPhong = (e) => {
    console.log(`checked = ${e.target.checked}`);
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

  const onFinishAddCustomer = async (values) => {
    const item = {
      NamSinh: namSinh,
      NgayDen: ngayDen,
      NgayDi: ngayDi,
      TenKH: form.getFieldValue("tenkt"),
      GioiTinh: form.getFieldValue("gioitinh"),
      Sdt: form.getFieldValue("sdt"),
      cmnd: form.getFieldValue("cmnd"),
      NgheNghiep: form.getFieldValue("nghenghiep"),
      HoKhau: form.getFieldValue("hokhau"),
      DaiDienPhong: form.getFieldValue("daidienphong"),
      PHONGId: phongId,
      TrangThai: "??ang ???",
    };
    console.log("item", item);

    const res = await axios.post("http://localhost:8000/create-customer", item);
    console.log("th??ng tin", res.data);
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
    console.log("res", res.data);
  };

  const showDrawerDetailCustomer = async (item) => {
    setModalDetailCustomer(true);
    const res = await axios.get(`http://localhost:8000/customer/${item}`);
    setKhachThue(res.data);
  };

  const onCloseDetailCustomer = () => {
    setModalDetailCustomer(false);
  };

  const onChangeCollapse = (key) => {
    console.log(key);
  };
  const handleTraPhong = (item) => {
    setModalTraPhong(true);
    setKhachThueId(item.idKhach);
    setTtkhachphong(item);
    console.log("kh??ch", item);
  };

  const TraPhong = async () => {
    // const NgayDi = form.getFieldValue("ngaydi");
    // const TrangThai = "Kh??ng c??n ???";
    const idKhach = ttkhachphong.idKhach;
    const idPhong = ttkhachphong.idPhong;

    console.log("idkhach", idKhach, idPhong);

    const res = await axios.post(`http://localhost:8000/traphong`, {
      idKhach: idKhach,
      idPhong: idPhong,
    });
    console.log("200", res);

    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  function handleUpdateCustomer(record) {
    console.log("re", record);
    setModalUpdateCustomer(true);
    setDateFromRequestNgayDen(record.NgayDen);
    setDateFromRequestNgayDi(record.NgayDi);
    setDateFromRequestNamSinh(record.NamSinh);
    setDaiDienPhong(record.DaiDienPhong);
    setKhachThueId(record.idKhach);
    form.setFieldsValue({
      hokhau: record.HoKhau,
      tenkt: record.TenKT,
      cmnd: record.Cmnd,
      sdt: record.Sdt,
      nghenghiep: record.NgheNghiep,
      ngayden: dateFromRequestNgayDen,
      ngaydi: dateFromRequestNgayDi,
      namsinh: dateFromRequestNamSinh,
      gioitinh: record.GioiTinh,
    });
  }

  const updateCustomer = async () => {
    const khachthue = {
      TenKH: form.getFieldValue("tenkt"),
      NamSinh: namSinh,
      GioiTinh: form.getFieldValue("gioitinh"),
      NgheNghiep: form.getFieldValue("nghenghiep"),
      Sdt: form.getFieldValue("sdt"),
      cmnd: form.getFieldValue("cmnd"),
      HoKhau: form.getFieldValue("hokhau"),
      NgayDen: ngayDen,
      NgayDi: ngayDi,
      DaiDienPhong: form.getFieldValue("daidienphong"),
    };
    console.log("kt", khachthueId);
    const res = await axios.put(
      `http://localhost:8000/update-customer/${khachthueId}`,
      khachthue
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const handleChangeTyperoom = (value) => {
    console.log("value", value);
    return value;
  };

  const handleOKCreateRoom = async () => {
    const item = {
      TenPhong: form.getFieldValue("tenphong"),
      DienTich: form.getFieldValue("dientich"),
      SLToiDa: form.getFieldValue("sl"),
      TrangThai: "Tr???ng",
      NHATROId: nhatroId,
      LOAIPHONGId: form.getFieldValue("loaiphong"),
      MoTa: form.getFieldValue("mota"),
    };

    console.log("rr", item);

    const res = await axios.post("http://localhost:8000/create-room", {
      ...item,
    });
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  function deleteRoom(record) {
    setModalDeleteRoom(true);
    setIdDelete(record.id);
    console.log("record", record);
  }

  const handleDeleteRoom = async () => {
    const res = await axios.delete(
      `http://localhost:8000/delete-room/${idDelete}`
    );
    if (res.status === 200) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const createBill = async () => {
    setModalCreateBill(true);
    console.log("id ph??ng", idPhong);
    const currentDate = new Date();
    let prevMonth;
    if (currentDate.getMonth() === 0) {
      prevMonth = "12/" + String(currentDate.getFullYear() - 1);
    }
    // else if (1 <= currentDate.getMonth() < 10) {
    //   prevMonth =
    //     "0" +
    //     String(currentDate.getMonth()) +
    //     "/" +
    //     String(currentDate.getFullYear());
    // }
    else {
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
    const currentMonth =
      currentDate.getMonth() + 1 + "/" + currentDate.getFullYear();
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
    const GiaPhong = form.getFieldValue("giaphong");
    const tongtien = await TongTien(
      ChiSoDienMoi - ChiSoDienCu,
      ChiSoNuocMoi - ChiSoNuocCu,
      GiaPhong,
      donGiaDV
    );

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
          <Tabs defaultActiveKey="1" onChange={handleOnChangeMenu}>
            {houseList.map((house) => {
              return (
                <Tabs.TabPane tab={house.TenNT} key={house.id}>
                  <div
                    className="site-layout-background "
                    style={{ padding: "24px" }}
                  >
                    <div className="row">
                      <p>T???ng ph??ng: {roomList.length} </p>
                      {/* <p> C??n tr???ng: {trangThaiPhong.length} |</p> */}

                      <Button
                        onClick={() => setModalCreateRoom(true)}
                        type="primary"
                        style={{
                          width: "11%",
                          marginRight: "25%",
                          right: 0,
                          position: "absolute",
                          top: "160px",
                        }}
                      >
                        <PlusOutlined />
                        Th??m ph??ng
                      </Button>
                      <Button
                        onClick={() => setModalCreateRoom(true)}
                        style={{
                          width: "15%",
                          marginRight: "7%",
                          position: "absolute",
                          top: "160px",
                          right: 0,
                          backgroundColor: "#F6663F",
                          color: "white",
                        }}
                      >
                        <Link to={"/export-customer"}>
                          Danh s??ch kh??ch thu??
                        </Link>
                      </Button>
                    </div>
                    <hr style={{ marginTop: "8px" }} />

                    <List
                      grid={{ gutter: 16, column: 5 }}
                      dataSource={roomList}
                      renderItem={(item) => (
                        <List.Item>
                          {slDangO.map((sldo) => {
                            return (
                              <div className="list-room">
                                {sldo.id === item.id && (
                                  <>
                                    {item.TrangThai === "C?? ng?????i ???" &&
                                    0 < sldo.dango &&
                                    sldo.dango < item.SLToiDa ? (
                                      <>
                                        <Card
                                          className="card-add-client-detail"
                                          actions={[
                                            <DeleteFilled
                                              key="delete"
                                              style={{ color: "red" }}
                                              onClick={(e) => deleteRoom(item)}
                                            />,
                                            <EditFilled
                                              key="edit"
                                              style={{ color: "blue" }}
                                              onClick={(e) =>
                                                showModalUpdateRoom(item)
                                              }
                                            />,
                                            <EyeFilled
                                              key="detail"
                                              onClick={(e) => showDrawer(item)}
                                              style={{ color: "black" }}
                                            />,
                                          ]}
                                        >
                                          <Meta
                                            avatar={<HomeFilled />}
                                            title={item.TenPhong}
                                          />
                                          <div className="two-btn">
                                            <Button
                                              type="primary"
                                              shape="round"
                                              className="btn-detail"
                                              onClick={(e) =>
                                                showDrawerDetailCustomer(
                                                  item.id
                                                )
                                              }
                                            >
                                              Chi Ti???t
                                            </Button>
                                            <Button
                                              type="primary"
                                              shape="round"
                                              className="btn-add-client"
                                              onClick={(e) =>
                                                addCustomer(item.id)
                                              }
                                            >
                                              Th??m kh??ch
                                            </Button>
                                          </div>

                                          <div className="price">
                                            <p>
                                              S???c ch???a :
                                              <span> {item.SLToiDa}</span>
                                            </p>
                                            <p>
                                              {slDangO.map((sl) => {
                                                return (
                                                  <>
                                                    {sl.id === item.id && (
                                                      <>
                                                        ??ang ??? :
                                                        <span> {sl.dango}</span>
                                                      </>
                                                    )}
                                                  </>
                                                );
                                              })}
                                            </p>
                                          </div>
                                        </Card>
                                      </>
                                    ) : (
                                      <>
                                        {item.TrangThai === "C?? ng?????i ???" ? (
                                          <>
                                            <Card
                                              className="card-detail"
                                              actions={[
                                                <DeleteFilled
                                                  key="delete"
                                                  style={{ color: "red" }}
                                                  onClick={(e) =>
                                                    deleteRoom(item)
                                                  }
                                                />,
                                                <EditFilled
                                                  key="edit"
                                                  style={{ color: "blue" }}
                                                  onClick={(e) =>
                                                    showModalUpdateRoom(item)
                                                  }
                                                />,
                                                <EyeFilled
                                                  key="detail"
                                                  onClick={(e) =>
                                                    showDrawer(item)
                                                  }
                                                  style={{ color: "black" }}
                                                />,
                                              ]}
                                            >
                                              <Meta
                                                avatar={<HomeFilled />}
                                                title={item.TenPhong}
                                              />
                                              <Button
                                                type="primary"
                                                shape="round"
                                                className="btn-detail"
                                                style={{ marginLeft: "25px" }}
                                                onClick={(e) =>
                                                  showDrawerDetailCustomer(
                                                    item.id
                                                  )
                                                }
                                              >
                                                Chi Ti???t
                                              </Button>

                                              <div className="price">
                                                <p>
                                                  S???c ch???a :
                                                  <span> {item.SLToiDa}</span>
                                                </p>
                                                <p>
                                                  {slDangO.map((sl) => {
                                                    return (
                                                      <>
                                                        {sl.id === item.id && (
                                                          <>
                                                            ??ang ??? :
                                                            <span>
                                                              {" "}
                                                              {sl.dango}
                                                            </span>
                                                          </>
                                                        )}
                                                      </>
                                                    );
                                                  })}
                                                </p>
                                              </div>
                                            </Card>
                                          </>
                                        ) : (
                                          <>
                                            <Card
                                              className="card-add-client"
                                              actions={[
                                                <DeleteFilled
                                                  key="delete"
                                                  style={{ color: "red" }}
                                                  onClick={(e) =>
                                                    deleteRoom(item)
                                                  }
                                                />,
                                                <EditFilled
                                                  key="edit"
                                                  style={{ color: "blue" }}
                                                  onClick={(e) =>
                                                    showModalUpdateRoom(item)
                                                  }
                                                />,
                                                <EyeFilled
                                                  key="detail"
                                                  onClick={(e) =>
                                                    showDrawer(item)
                                                  }
                                                  style={{ color: "black" }}
                                                />,
                                              ]}
                                            >
                                              <Meta
                                                avatar={<HomeFilled />}
                                                title={item.TenPhong}
                                              />
                                              <Button
                                                type="primary"
                                                shape="round"
                                                className="btn-add-client"
                                                onClick={(e) =>
                                                  addCustomer(item.id)
                                                }
                                              >
                                                Th??m kh??ch
                                              </Button>

                                              <div className="price">
                                                <p>
                                                  S???c ch???a :
                                                  <span> {item.SLToiDa}</span>
                                                </p>
                                                <p>
                                                  ??ang ??? :<span> 0</span>
                                                </p>
                                              </div>
                                            </Card>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </List.Item>
                      )}
                    />
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Content>
      </Layout>

      {/* DETAIL */}
      <Drawer
        title="Th??ng tin chi ti???t ph??ng"
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
              <Form.Item label="T??n ph??ng" name="tenphong">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Di???n t??ch" name="dientich">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="T??n nh?? tr???" name="tennt">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Lo???i ph??ng" name="loaiphong">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="S??? l?????ng t???i ??a" name="sl">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gi?? ph??ng" name="giaphong">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tr???ng th??i" name="trangthai">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Thi???t b???" name="tb">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="D???ch v???" name="dv">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="M?? t???" name="mota">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" onClick={createBill}>
          L???p h??a ????n
        </Button>
      </Drawer>

      {/* MODAL CREATE ROOM */}
      <Modal
        title="T???o m???i ph??ng"
        visible={modalCreateRoom}
        centered
        onOk={handleOKCreateRoom}
        onCancel={() => setModalCreateRoom(false)}
        width={800}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
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
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Di???n t??ch"
                name="dientich"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p di???n t??ch!",
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
                label="Lo???i ph??ng"
                name="loaiphong"
                style={{ marginRight: "100px" }}
              >
                <Select
                  defaultValue="Ch???n lo???i ph??ng"
                  onChange={handleChangeTyperoom}
                >
                  {typeroomList.map((typeroom) => {
                    return (
                      <Option value={typeroom.id}>{typeroom.LoaiPhong}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="S??? l?????ng t???i ??a"
                name="sl"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p s??? l?????ng t???i ??a!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="M?? t???" name="mota">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* MODAL UPDATE PH??NG */}
      <Modal
        title="C???p nh???t th??ng tin ph??ng"
        visible={modalUpdateRoom}
        centered
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalUpdateRoom(false)}
        footer={null}
        width={800}
      >
        <Form layout="vertical" form={form} hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="T??n ph??ng" name="tenphong">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Di???n t??ch" name="dientich">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="T??n nh?? tr???" name="tennt">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Lo???i ph??ng"
                name="loaiphong"
                style={{ marginRight: "100px" }}
              >
                <Select
                  defaultValue="Ch???n lo???i ph??ng"
                  onChange={handleChangeTyperoom}
                >
                  {typeroomList.map((typeroom) => {
                    return (
                      <Option value={typeroom.id}>{typeroom.LoaiPhong}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="S??? l?????ng t???i ??a" name="soluong">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gi?? ph??ng" name="giaphong">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tr???ng th??i" name="trangthai">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Thi???t b???" name="thietbi">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Ch???n thi???t b???"
                  // onChange={handleChangeTyperoom}
                >
                  {device?.map((device) => {
                    return (
                      <Option value={device.TenTB} label={device.TenTB}>
                        {device.TenTB}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="D???ch v???" name="dichvu">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Ch???n d???ch v???"
                  // onChange={handleChangeTyperoom}
                >
                  {service?.map((service) => {
                    return (
                      <Option value={service.TenDV} label={service.TenDV}>
                        {service.TenDV}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="M?? t???" name="mota">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => setModalUpdateRoom(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 10 }}
                onClick={handleUpdateRoom}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* MODAL TH??M KH??CH */}
      <Modal
        title="Th??m kh??ch"
        visible={modalAddCustomer}
        centered
        okButtonProps={{ style: { display: "none" } }}
        // cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalAddCustomer(false)}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          onFinish={onFinishAddCustomer}
          form={form}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="H??? t??n kh??ch thu??" name="tenkt">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gi???i t??nh" name="gioitinh">
                <Radio.Group onChange={onChangeGioiTinh}>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>N???</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="N??m sinh" name="namsinh">
                <DatePicker onChange={onChangeNamSinh} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="S??? ??i???n tho???i" name="sdt">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="CMND/CCCD" name="cmnd">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngh??? nghi???p" name="nghenghiep">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="H??? kh???u th?????ng tr??" name="hokhau">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ng??y ?????n" name="ngayden">
                <DatePicker format={dateFormat} onChange={onChangeNgayDen} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ng??y ??i" name="ngaydi">
                <DatePicker onChange={onChangeNgayDi} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="daidienphong">
                <Radio.Group onChange={onChangeGioiTinh}>
                  <Radio value={true}>?????i di???n ph??ng</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => setModalAddCustomer(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 10 }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* MODAL UPDATE KH??CH THU?? */}
      <Modal
        title="C???p nh???t th??ng tin kh??ch thu??"
        visible={modalUpdateCustomer}
        centered
        okButtonProps={{ style: { display: "none" } }}
        // cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalUpdateCustomer(false)}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          // onFinish={onFinishAddCustomer}
          form={form}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="H??? t??n kh??ch thu??" name="tenkt">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gi???i t??nh" name="gioitinh">
                <Radio.Group onChange={onChangeGioiTinh}>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>N???</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <p>
                  <strong style={{ fontWeigth: "bold", color: "black" }}>
                    N??m sinh
                  </strong>
                </p>
                <DatePicker
                  defaultValue={moment(dateFromRequestNamSinh, dateFormat)}
                  onChange={onChangeNamSinh}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="S??? ??i???n tho???i" name="sdt">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="CMND/CCCD" name="cmnd">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngh??? nghi???p" name="nghenghiep">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="H??? kh???u th?????ng tr??" name="hokhau">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <p>
                  <strong style={{ fontWeigth: "bold", color: "black" }}>
                    Ng??y ?????n
                  </strong>
                </p>
                <DatePicker
                  defaultValue={moment(dateFromRequestNgayDen, dateFormat)}
                  onChange={onChangeNgayDen}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <p>
                  <strong style={{ fontWeigth: "bold", color: "black" }}>
                    Ng??y ??i
                  </strong>
                </p>
                <DatePicker
                  defaultValue={moment(dateFromRequestNgayDi, dateFormat)}
                  onChange={onChangeNgayDi}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="daidienphong">
                {daiDienPhong === true ? (
                  <Checkbox checked onChange={onChangeDaiDienPhong}>
                    ?????i di???n ph??ng
                  </Checkbox>
                ) : (
                  <Checkbox onChange={onChangeDaiDienPhong}>
                    ?????i di???n ph??ng
                  </Checkbox>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => setModalAddCustomer(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 10 }}
                onClick={updateCustomer}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* MODAL XEM CHI TI???T KH??CH THU?? */}
      <Drawer
        title="Th??ng tin chi ti???t kh??ch thu??"
        placement="right"
        visible={modalDetailCustomer}
        width={720}
        onClose={onCloseDetailCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCloseDetailCustomer}>Cancel</Button>
          </Space>
        }
      >
        <Collapse onChange={onChangeCollapse}>
          {khachthue.map((kt) => {
            return (
              <Panel header={kt.TenKT}>
                <Row gutter={16}>
                  <Col span={12}>
                    <p>
                      <strong>N??m sinh: </strong>
                      {moment(kt.NamSinh).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <strong>Gi???i t??nh: </strong>
                      {kt.GioiTinh === true ? "Nam" : "N???"}
                    </p>
                    <p>
                      <strong>S??? ??i???n tho???i: </strong>
                      {kt.Sdt}
                    </p>
                    <p>
                      <strong>CMND/CCCD: </strong>
                      {kt.Cmnd}
                    </p>
                    <p>
                      <strong style={{ color: "red" }}>
                        {kt.DaiDienPhong === true ? "?????i di???n ph??ng" : ""}{" "}
                      </strong>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      <strong>H??? kh???u: </strong>
                      {kt.HoKhau}
                    </p>
                    <p>
                      <strong>Ngh??? nghi???p: </strong>
                      {kt.NgheNghiep}
                    </p>
                    <p>
                      <strong>Ng??y ?????n: </strong>
                      {moment(kt.NgayDen).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <strong>Ng??y ??i: </strong>
                      {kt.NgayDi}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={16} style={{ textAlign: "center" }}>
                    <Button
                      style={{ backgroundColor: "#1890ff", color: "white" }}
                      onClick={(e) => handleTraPhong(kt)}
                    >
                      Tr??? ph??ng
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#1890ff",
                        color: "white",
                        marginLeft: "20px",
                      }}
                      onClick={(e) => handleUpdateCustomer(kt)}
                    >
                      C???p nh???t
                    </Button>
                  </Col>
                </Row>
              </Panel>
            );
          })}
        </Collapse>
      </Drawer>

      {/* TR??? PH??NG */}
      <Modal
        title="Th??ng tin tr??? ph??ng"
        visible={modalTraPhong}
        centered
        onOk={() => TraPhong()}
        onCancel={() => setModalTraPhong(false)}
        width={500}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ng??y ??i" name="ngaydi">
                <DatePicker onChange={onChangeNgayDi} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* MODAL DELETE ROOM */}
      <Modal
        title="X??a ph??ng"
        visible={modalDeleteRoom}
        onOk={handleDeleteRoom}
        onCancel={() => setModalDeleteRoom(false)}
      >
        <Form form={form}></Form>
        <p> B???n c?? ch???c ch???n x??a ph??ng n??y kh??ng? </p>
      </Modal>

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
