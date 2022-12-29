import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  notification,
  Space,
  Drawer,
} from "antd";
import "antd/dist/antd.css";
import "./asset/Content.css";
import "./asset/Home.css";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import {
  PlusOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";

const { Content } = Layout;
const { Option } = Select;

const handleChangeCity = (value) => {
  console.log(`selected ${value}`);
};

const handleChangeTyperoom = (value) => {
  console.log(`selected ${value}`);
};

export default function Home() {
  const [modalCreateHouse, setModalCreateHouse] = useState(false);
  const [modalDeleteHouse, setModalDeleteHouse] = useState(false);
  const [modalUpdateHouse, setModalUpdateHouse] = useState(false);

  const [houses, setHouses] = useState([]);
  const [cityList, setCity] = useState([]);
  const [districtList, setDistrict] = useState([]);
  const [directionList, setDirection] = useState([]);
  const [streetList, setStreet] = useState([]);
  const [typeroomList, setTyperoom] = useState([]);
  const [serviceList, setService] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [tongPhong, setTongPhong] = useState();
  const [idDelete, setIdDelete] = useState();
  const [idUpdate, setIdUpdate] = useState();

  const [diennuoc, setDienNuoc] = useState();
  const [diachiUpdate, setDiaChiUpdate] = useState({});
  const [thanhPhoId, setThanhPhoId] = useState();

  const [form] = Form.useForm();

  useEffect(() => {
    const getHouses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/thongtinNT");
        console.log("data", res.data);
        let arrLoaiPhong = [];
        let arrDichVu = [];
        const result = await res.data.map(async (item, idx) => {
          let loaiphongById = [];
          item.LOAIPHONGId.forEach(async (a) => {
            const loaiphong = await axios.get(
              `http://localhost:8000/typeroom/${a}`
            );
            loaiphongById.push(loaiphong.data.LoaiPhong);
          });
          arrLoaiPhong.push({ id: item.id, loaiphong: loaiphongById });

          let filterLoaiPhong = arrLoaiPhong.filter((lp) => lp.id === item.id);
          let tendvById = [];

          item.DICHVUId.forEach(async (a) => {
            const dichvu = await axios.get(
              `http://localhost:8000/service/${a}`
            );
            tendvById.push(dichvu.data.TenDV);
          });
          arrDichVu.push({ id: item.id, tendv: tendvById });

          let filterDichVu = arrDichVu.filter((dv) => dv.id === item.id);

          const nhatro = await axios.get(
            `http://localhost:8000/house/${item.NHATROId}`
          );
          const tennhatro = nhatro.data.TenNT;
          const duong = await axios.get(
            `http://localhost:8000/street/${item.DUONGId}`
          );
          const phuong = await axios.get(
            `http://localhost:8000/direction/${item.PHUONGId}`
          );
          const quan = await axios.get(
            `http://localhost:8000/district/${item.QUANId}`
          );
          const thanhpho = await axios.get(
            `http://localhost:8000/city/${item.THANHPHOId}`
          );

          const tenduong = duong.data.TenDuong;
          const tenphuong = phuong.data.TenPhuong;
          const tenquan = quan.data.TenQuan;
          const tentp = thanhpho.data.TenTP;
          const diachi =
            "Đường " +
            tenduong +
            " ," +
            "Phường " +
            tenphuong +
            " ," +
            "Quận " +
            tenquan +
            " ," +
            "TP " +
            tentp;
          return {
            id: item.id,
            TenNT: tennhatro,
            dichvu: filterDichVu[0].tendv,
            loaiphong: filterLoaiPhong[0].loaiphong,
            diachi: diachi,
            sdt: item.Sdt,
            GiaDien: item.GiaDien,
            GiaNuoc: item.GiaNuoc,
            MoTa: item.MoTa,
            index: idx + 1,
            NHATROId: item.NHATROId,
          };
        });

        setHouses(await Promise.all(result));
      } catch (error) {
        console.log(error.massage);
      }
    };
    getHouses();
  }, []);

  const columns = [
    {
      title: "Stt",
      dataIndex: "index",
    },
    {
      title: "Tên nhà trọ",
      dataIndex: "TenNT",
      width: "20%",
    },

    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      // width: "35%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      width: "35%",
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
              onClick={(e) => updateHouse(record)}
            ></Button>
            <Button
              style={{ marginRight: "4px", color: "red" }}
              icon={<DeleteFilled />}
              onClick={(e) => deleteHouse(record)}
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

  useEffect(() => {
    const getCity = async () => {
      try {
        const resCity = await axios.get("http://localhost:8000/city");
        setCity(resCity.data);
        const resDistrict = await axios.get("http://localhost:8000/district");
        setDistrict(resDistrict.data);
        const resDirection = await axios.get("http://localhost:8000/direction");
        setDirection(resDirection.data);
        const resStreet = await axios.get("http://localhost:8000/street");
        setStreet(resStreet.data);
        const resTyperoom = await axios.get("http://localhost:8000/typeroom");
        setTyperoom(resTyperoom.data);
        const resService = await axios.get("http://localhost:8000/service");
        setService(resService.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getCity();
  }, []);

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

  const handleChangeCity = (value) => {
    return value;
  };

  const handleChangeDistrict = (value) => {
    return value;
  };

  const handleChangeDirection = (value) => {
    return value;
  };

  const handleChangeStreet = (value) => {
    return value;
  };

  const onFinish = async (values) => {
    console.log(values);
    const res = await axios.post(
      "http://localhost:8000/create-thongtinNT",
      values
    );
    console.log("thông tin", res.data);
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
    console.log("res", res.data);
  };

  const openModalCreate = async () => {
    setModalCreateHouse(true);
    const res = await axios.get(`http://localhost:8000/electric-water-state`);
    console.log("diennuoc", res.data.DonGiaDien, res.data.DonGiaNuoc);
    form.setFieldsValue({
      giadien: res.data.DonGiaDien,
      gianuoc: res.data.DonGiaNuoc,
    });
  };

  const showDrawer = async (item) => {
    setOpenDetail(true);
    const res = await axios.get(`http://localhost:8000/thongtinNT/${item.id}`);

    const resDienNuoc = await axios.get(
      `http://localhost:8000/electric-water-state`
    );

    console.log("id", res.data);
    // let resTongPhong = await axios.get(
    //   `http://localhost:8000/tongphong/${res.data.NHATROId}`
    // );
    // console.log("tong", resTongPhong.data);
    // setTongPhong(resTongPhong);
    form.setFieldsValue({
      tennhatro: item.TenNT,
      sdt: item.sdt,
      diachi: item.diachi,
      loaiphong: item.loaiphong.join("\n"),
      dichvu: item.dichvu.join("\n"),
      giadien: resDienNuoc.data.DonGiaDien,
      gianuoc: resDienNuoc.data.DonGiaNuoc,
      mota: item.MoTa,
      // tongphong: tongPhong,
    });
  };
  const onCloseDetail = () => {
    setOpenDetail(false);
  };

  function deleteHouse(record) {
    setModalDeleteHouse(true);
    setIdDelete(record.NHATROId);
  }

  const handleDeleteHouse = async () => {
    console.log("id delte", idDelete);

    const res = await axios.delete(
      `http://localhost:8000/delete-thongtinNT/${idDelete}`
    );
    console.log("duy", res.data);
    if (res.data === "OK") {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  const updateHouse = async (record) => {
    console.log("u", record);
    const res = await axios.get(
      `http://localhost:8000/getThongtinNTByNhaTroId/${record.NHATROId}`
    );

    form.setFieldsValue({
      tennhatro: record.TenNT,
      sdt: record.sdt,
      // diachi: record.diachi,
      thanhpho: res.data.THANHPHOId,
      quan: res.data.QUANId,
      phuong: res.data.PHUONGId,
      duong: res.data.DUONGId,
      loaiphong: record.loaiphong,
      dichvu: record.dichvu,
      giadien: record.GiaDien,
      gianuoc: record.GiaNuoc,
      mota: record.MoTa,
    });

    console.log("res", res.data);
    setModalUpdateHouse(true);
    setIdUpdate(record.id);
  };

  const handleUpdateHouse = async () => {
    const TenNT = form.getFieldValue("tennhatro");
    const Sdt = form.getFieldValue("sdt");
    const THANHPHOId = form.getFieldValue("thanhpho");
    const QUANId = form.getFieldValue("quan");
    const PHUONGId = form.getFieldValue("phuong");
    const DUONGId = form.getFieldValue("duong");
    const LOAIPHONGArr = form.getFieldValue("loaiphong");
    const DICHVUArr = form.getFieldValue("dichvu");
    const MoTa = form.getFieldValue("mota");
    console.log(
      "duyyy",
      TenNT,
      Sdt,
      THANHPHOId,
      QUANId,
      PHUONGId,
      DUONGId,
      LOAIPHONGArr,
      DICHVUArr,
      MoTa
    );
    let DICHVUId = await DICHVUArr.map(async (item) => {
      console.log("item", item);
      const res = await axios.post(`http://localhost:8000/getServiceByName`, {
        tenDV: item,
      });
      return res.data.id;
    });

    let LOAIPHONGId = await LOAIPHONGArr.map(async (e) => {
      console.log("items", e);
      const res = await axios.post(`http://localhost:8000/getTypeRoomByName`, {
        LoaiPhong: e,
      });
      return res.data.id;
    });
    console.log("kq", await Promise.all(DICHVUId), LOAIPHONGId);
    const res = await axios.put(
      `http://localhost:8000/capnhatThongTinNT/${idUpdate}`,
      {
        TenNT,
        Sdt,
        THANHPHOId,
        QUANId,
        PHUONGId,
        DUONGId,
        LOAIPHONGId: await Promise.all(LOAIPHONGId),
        DICHVUId: await Promise.all(DICHVUId),
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
            // height: "700px",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: "24px", textAlign: "center" }}
          >
            <div className="row">
              <Button
                className="add-house"
                onClick={openModalCreate}
                type="primary"
                style={{
                  width: "15%",
                  marginRight: "11%",
                  right: 0,
                  position: "relative",
                }}
              >
                <PlusOutlined />
                Thêm nhà trọ
              </Button>
            </div>
            <Table columns={columns} dataSource={houses} onChange={onChange} />
          </div>
        </Content>
      </Layout>

      {/* MODAL CREATE HOUSE */}
      <Modal
        title="Tạo mới nhà trọ"
        visible={modalCreateHouse}
        centered
        okButtonProps={{ style: { display: "none" } }}
        // cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalCreateHouse(false)}
        footer={null}
        width={1000}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên nhà trọ" name="tennhatro">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="sdt">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Thành phố" name="thanhpho">
                <Select
                  defaultValue="Chọn Thành Phố"
                  onChange={handleChangeCity}
                >
                  {cityList.map((city) => {
                    return <Option value={city.id}>{city.TenTP}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Quận" name="quan">
                <Select
                  defaultValue=" Chọn Quận"
                  onChange={handleChangeDistrict}
                >
                  {districtList.map((district) => {
                    return (
                      <Option value={district.id}>{district.TenQuan}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Phường" name="phuong">
                <Select
                  defaultValue="Chọn Phường"
                  onChange={handleChangeDirection}
                >
                  {directionList.map((direction) => {
                    return (
                      <Option value={direction.id}>
                        {direction.TenPhuong}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Đường" name="duong">
                <Select defaultValue="Chọn Đường" onChange={handleChangeStreet}>
                  {streetList.map((street) => {
                    return <Option value={street.id}>{street.TenDuong}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại phòng" name="loaiphong">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn loại phòng"
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
              <Form.Item label="Dịch vụ" name="dichvu">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn dịch vụ"
                  // onChange={handleChangeTyperoom}
                >
                  {serviceList.map((service) => {
                    return (
                      <Option value={service.id} label={service.TenDV}>
                        {service.TenDV}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Giá điện" name="giadien">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá nước" name="gianuoc">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Mô tả" name="mota">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => setModalCreateHouse(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 10 }}
              >
                Tạo
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* MODAL DELETE NHÀ TRỌ */}
      <Modal
        title="Xóa nhà trọ"
        visible={modalDeleteHouse}
        onOk={handleDeleteHouse}
        onCancel={() => setModalDeleteHouse(false)}
      >
        <Form form={form}></Form>
        <p> Bạn có chắc chắn xóa nhà trọ này không </p>
      </Modal>

      {/* MODAL UPDATE NHÀ TRỌ */}
      <Modal
        title="Cập nhật thông tin nhà trọ"
        visible={modalUpdateHouse}
        centered
        okButtonProps={{ style: { display: "none" } }}
        // cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalUpdateHouse(false)}
        footer={null}
        width={1000}
      >
        <Form
          layout="vertical"
          onFinish={handleUpdateHouse}
          form={form}
          // initialValues={{
          //   remember: true,
          // }}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên nhà trọ" name="tennhatro">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="sdt">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Thành phố" name="thanhpho">
                <Select defaultValue="chọn tp" onChange={handleChangeCity}>
                  {cityList.map((city) => {
                    return <Option value={city.id}>{city.TenTP}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Quận" name="quan">
                <Select
                  defaultValue={diachiUpdate?.quan}
                  onChange={handleChangeDistrict}
                >
                  {districtList.map((district) => {
                    return (
                      <Option value={district.id}>{district.TenQuan}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Phường" name="phuong">
                <Select
                  defaultValue={diachiUpdate?.phuong}
                  onChange={handleChangeDirection}
                >
                  {directionList.map((direction) => {
                    return (
                      <Option value={direction.id}>
                        {direction.TenPhuong}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Đường" name="duong">
                <Select
                  defaultValue={diachiUpdate?.duong}
                  onChange={handleChangeStreet}
                >
                  {streetList.map((street) => {
                    return <Option value={street.id}>{street.TenDuong}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại phòng" name="loaiphong">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn loại phòng"
                  onChange={handleChangeTyperoom}
                >
                  {typeroomList.map((typeroom) => {
                    return (
                      <Option
                        value={typeroom.LoaiPhong}
                        label={typeroom.LoaiPhong}
                      >
                        {typeroom.LoaiPhong}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Dịch vụ" name="dichvu">
                <Select
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn dịch vụ"
                  // onChange={handleChangeTyperoom}
                >
                  {serviceList.map((service) => {
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
            <Col span={12}>
              <Form.Item label="Giá điện" name="giadien">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá nước" name="gianuoc">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Mô tả" name="mota">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => setModalCreateHouse(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 10 }}
              >
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* DETAIL */}
      <Drawer
        title="Thông tin chi tiết"
        placement="right"
        visible={openDetail}
        width={720}
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
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên nhà trọ" name="tennhatro">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="sdt">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Địa chỉ" name="diachi">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại phòng" name="loaiphong">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Dịch vụ" name="dichvu">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Giá điện" name="giadien">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá nước" name="gianuoc">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Mô tả" name="mota">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
