import React from "react";
import "./main.css";
import "antd/dist/antd.css";
import nhatro1 from "./images/nhatro1.jpeg";
import nhatro2 from "./images/nhatro2.png";
import nhatro3 from "./images/nhatro3.jpg";
import banner from "./images/banner.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  DatePicker,
  List,
  Tabs,
  Collapse,
  Row,
  Col,
  Space,
  Modal,
  Form,
  Radio,
  notification,
  Input,
} from "antd";
import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  EditFilled,
  HomeFilled,
  DeleteFilled,
  EyeFilled,
  UserOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import axios from "axios";

import style from "./css/ListRoom.css";
import "bootstrap/dist/css/bootstrap.min.css";

const { Meta } = Card;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

export default function ListRoom() {
  const [roomList, setRoom] = useState([]);
  const [roomTypeRoom, setRoomTypeRoom] = useState();
  const [form] = Form.useForm();
  const [modalBooking, setModalBooking] = useState(false);
  const [gioiTinh, setGioiTinh] = useState();
  const [namSinh, setNamSinh] = useState();
  const [idBooking, setIdBooking] = useState();
  const [typeroom, setTyperoom] = useState([]);
  const [loaiphongId, setLoaiphongId] = useState("1");

  const { id } = useParams();
  useEffect(() => {
    const getRoom = async () => {
      try {
        const resLP = await axios.get(`http://localhost:8000/typeroom`);
        // const res = await axios.get(
        //   `http://localhost:8000/room-house-typeroom/${id}`
        // );
        // console.log("r", resLP.data, res);
        const res = await axios.post(
          `http://localhost:8000/getPhongsByNhaTroAndLoaiPhong`,
          { idNhaTro: id, idLoaiPhong: loaiphongId }
        );
        setRoomTypeRoom(res.data);
        console.log("abc", res.data);
        setTyperoom(resLP.data);
        // setRoom(res.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getRoom();
  }, []);
  const handleOnChangeMenu = async (item) => {
    setLoaiphongId(item);
    const res = await axios.post(
      `http://localhost:8000/getPhongsByNhaTroAndLoaiPhong`,
      { idNhaTro: id, idLoaiPhong: item }
    );
    setRoomTypeRoom(res.data);
    console.log("res", res.data);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const onChangeGioiTinh = (e) => {
    console.log("radio checked", e.target.value);
    setGioiTinh(e.target.value);
  };

  const onChangeNamSinh = (date, dateString) => {
    console.log(dateString);
    setNamSinh(dateString);
  };

  const successNotification = (type) => {
    notification[type]({
      message: "Đăng ký thành công",
    });
  };

  const errorNotification = (type) => {
    notification[type]({
      message: "Đăng ký thất bại",
    });
  };

  function createBooking(record) {
    setModalBooking(true);
    setIdBooking(record.id);
  }

  const handleOKBooking = async (record) => {
    const values = {
      HoTen: form.getFieldValue("hoten"),
      NamSinh: form.getFieldValue("namsinh"),
      GioiTinh: form.getFieldValue("gioitinh"),
      Sdt: form.getFieldValue("sdt"),
      NgheNghiep: form.getFieldValue("nghenghiep"),
      SLNguoiO: form.getFieldValue("slnguoio"),
      NhuCauSD: form.getFieldValue("nhucausd"),
      TrangThai: "Chưa duyệt",
      PHONGId: idBooking,
    };
    console.log("value", values);
    const res = await axios.post("http://localhost:8000/booking", values);
    if (res.status === 201) {
      successNotification("success");
      setModalBooking(false);
    } else {
      errorNotification("error");
    }
  };

  return (
    <>
      <body
        id="top"
        data-spy="scroll"
        data-target=".navbar-collapse"
        data-offset="50"
        className="hompage"
      >
        <section
          className="navbar custom-navbar navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
              </button>

              <a href="#" className="navbar-brand">
                MINI HOUSES
              </a>
            </div>

            <div className="navbar navbar-expand-lg navbar-light">
              <ul
                className="nav navbar-nav navbar-nav-first"
                style={{ fontSize: 15 }}
              >
                <li>
                  <a href="#top" className="smoothScroll">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#about" className="smoothScroll">
                    Giới thiệu
                  </a>
                </li>

                <li>
                  <a href="#courses" className="smoothScroll">
                    Nhà trọ
                  </a>
                </li>
                <li>
                  <a href="#testimonial" className="smoothScroll">
                    Đánh giá
                  </a>
                </li>
                <li>
                  <a href="#contact" className="smoothScroll">
                    Liên hệ
                  </a>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#">
                    <i className="fa fa-phone"></i> +65 2244 1100
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="row">
          <div className="col-md-4">
            <section
              className="bootstrap-scope "
              id="feature"
              // style={{ margin: "0 0 0 " }}
            >
              <div style={{ margin: "0 20px" }}>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  Thông tin giới thiệu
                </h1>
                <p>Dãy nhà trọ mới xây vừa xong cho thuê giá rẽ </p>
                <p>
                  Căn phòng mới xây nên rất chi là sạch sẽ, Bảo đảm xem là thích
                  ngay và rất an ninh
                </p>
                <strong style={{ fontSize: "15px" }}>
                  Mô tả nhà trọ như sau:
                </strong>
                <p>- Có lối đi riêng</p>
                <p>- Có hệ thống nước đồng nai (ko giếng)</p>
                <p>- Có nơi phơi đồ, sạch sẽ </p>
                <p>
                  - Rất phù hợp tiện lợi với sinh viên, nhân viên văn phòng,
                  công nhân và gia đình thu nhập ổn định.{" "}
                </p>
                <p>- Khu an ninh, yên tĩnh, dân trí cao. </p>
                <p>
                  - Giao thông thuận tiện đi lại gần chợ siêu thị trường học.{" "}
                </p>
                <p>- Giá phòng từ 1.500.000/phòng </p>
                <p style={{ color: "red" }}>- Điện 3500/kg Nước 7000/m3</p>
              </div>
            </section>
          </div>
          <div className="col-md-8">
            <section
              className="bootstrap-scope "
              id="feature"
              // style={{ margin: "0 0 0 " }}
            >
              <Tabs defaultActiveKey="1" onChange={handleOnChangeMenu}>
                {typeroom.map((tr) => {
                  return (
                    <>
                      <Tabs.TabPane tab={tr.LoaiPhong} key={tr.id}>
                        {roomTypeRoom.map((room) => {
                          return (
                            <div
                              className="card mb-3"
                              style={{ width: "700px", margin: "0 50px" }}
                            >
                              <div className="row no-gutters">
                                <div className="col-md-4">
                                  <img
                                    src={nhatro1}
                                    className="card-img"
                                    alt="..."
                                    height={180}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <div className="row">
                                      <p
                                        className="col-md-6"
                                        style={{ color: "red" }}
                                      >
                                        <strong style={{ color: "black" }}>
                                          Loại phòng: {tr.LoaiPhong}
                                        </strong>{" "}
                                        {/* {room.LoaiPhong} */}
                                      </p>
                                      <p className="col-md-6">
                                        <strong>Diện tích</strong>{" "}
                                        {room.DienTich}
                                      </p>
                                    </div>
                                    <div className="row">
                                      <p className="col-md-6">
                                        <strong>Mô tả</strong> {room.MoTa}
                                      </p>
                                      <p className="col-md-6">
                                        <strong>Số lượng tối đa</strong>{" "}
                                        {room.SLToiDa}
                                      </p>
                                    </div>

                                    <Button
                                      onClick={(e) => createBooking(room)}
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        marginTop: "15px",
                                      }}
                                    >
                                      Đặt phòng
                                    </Button>
                                    <Button
                                      onClick={(e) => createBooking(room)}
                                      style={{
                                        backgroundColor: "orange",
                                        color: "white",
                                        marginTop: "15px",
                                        marginLeft: "25px",
                                        width: "100px",
                                      }}
                                    >
                                      <Link to={"/detail/" + room.id}>
                                        Chi tiết
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Tabs.TabPane>
                    </>
                  );
                })}
              </Tabs>
            </section>
          </div>
        </div>

        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="footer-info">
                  <div className="section-title">
                    <h2>Địa chỉ</h2>
                  </div>
                  <address>
                    <p>
                      62/7 đường 3/2, phường Xuân Khánh
                      <br />
                      quận Ninh Kiều, tp Cần Thơ
                    </p>
                  </address>

                  <ul className="social-icon">
                    <li>
                      <a
                        href="#"
                        className="fa fa-facebook-square"
                        attr="facebook icon"
                      ></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-instagram"></a>
                    </li>
                  </ul>

                  <div className="copyright-text">
                    <p>Copyright &copy; 2019 Company Name</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="footer-info">
                  <div className="section-title">
                    <h2>Liên hệ</h2>
                  </div>
                  <address>
                    <p>+65 2244 1100, +66 1800 1100</p>
                    <p>
                      <a href="#">green@gmail.com</a>
                    </p>
                  </address>

                  <div className="footer_menu">
                    <h2>Quick Links</h2>
                    <ul>
                      <li>
                        <a href="#">Career</a>
                      </li>
                      <li>
                        <a href="#">Investor</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="footer-info newsletter-form">
                  <div className="section-title">
                    <h2>Newsletter Signup</h2>
                  </div>
                  <div>
                    <div className="form-group">
                      <form action="#" method="get">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          name="email"
                          id="email"
                          required=""
                        />
                        <input
                          type="submit"
                          className="form-control"
                          name="submit"
                          id="form-submit"
                          value="Send me"
                        />
                      </form>
                      <span>
                        <sup>*</sup> Please note - we do not spam your email.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>

      <Modal
        visible={modalBooking}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        footer={null}
        onCancel={() => setModalBooking(false)}
      >
        <div className="signup-wrapper ">
          <div className="company-details ">
            <div className="shadow"></div>
            <div className="wrapper-1">
              <div className="logo">
                <div className="icon-food"></div>
              </div>
              <h1 className="title">mini houses co.</h1>
              <div className="slogan">We deliver rooms to you.</div>
            </div>
          </div>
          <div className="signup-form ">
            <div className="wrapper-2">
              <div className="form-title">Đăng ký trực tuyến!</div>

              <Form layout="vertical" form={form}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Họ tên"
                      name="hoten"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ tên!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Năm sinh"
                      name="namsinh"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng nhập năm sinh!",
                        },
                      ]}
                    >
                      <DatePicker onChange={onChangeNamSinh} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Giới tính"
                      name="gioitinh"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng chọn giới tính!",
                        },
                      ]}
                    >
                      <Radio.Group onChange={onChangeGioiTinh}>
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="sdt"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
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
                      label="Nghề nghiệp"
                      name="nghenghiep"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng nhập nghề nghiệp!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Số lượng người ở"
                      name="slnguoio"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số lượng người ở!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Nhu cầu sử dụng"
                      name="nhucausd"
                      ules={[
                        {
                          required: true,
                          message: "Vui lòng nhập nhu cầu sử dụng!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={2}
                        placeholder="Ví dụ: ở/buôn bán/kinh doanh"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#D60CA7" }}
                    >
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: 10, backgroundColor: "#D60CA7" }}
                      onClick={handleOKBooking}
                    >
                      Gửi
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
