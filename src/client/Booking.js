import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Booking.css";
import nhatro1 from "./images/nhatro1.jpeg";
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
} from "antd";

export default function Booking() {
  const [gioiTinh, setGioiTinh] = useState();
  const [namSinh, setNamSinh] = useState();
  const [form] = Form.useForm();

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

  const handleOKBooking = async () => {
    const values = {
      hoten: form.getFieldValue("hoten"),
      namsinh: form.getFieldValue("namsinh"),
      gioitinh: form.getFieldValue("gioitinh"),
      sdt: form.getFieldValue("sdt"),
      nghenghiep: form.getFieldValue("nghenghiep"),
      slnguoio: form.getFieldValue("slnguoio"),
      nhucausd: form.getFieldValue("nhucausd"),
      trangthai: "Đã đặt",
    };
    const res = await axios.post("http://localhost:8000/create-service", {
      values,
    });
    if (res.status === 201) {
      successNotification("success");
      window.location.reload();
    } else {
      errorNotification("error");
    }
  };

  return (
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
      <section>
        {/* <div className="content-wrapper">
          <div className="content"> */}
        <div className="signup-wrapper shadow-box">
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
        {/* </div> */}
        {/* </div> */}
      </section>

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
  );
}
