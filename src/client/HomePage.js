import React from "react";
import "./main.css";
import "antd/dist/antd.css";

import nhatro1 from "./images/nhatro1.jpeg";
import nhatro2 from "./images/nhatro2.png";
import nhatro3 from "./images/nhatro3.jpg";
import banner from "./images/banner.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Avatar, Rate, DatePicker } from "antd";
import {
  BrowserRouter as Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
const { Meta } = Card;

export default function HomePage() {
  const [houseList, setHouses] = useState([]);
  const [imgHouseList, setImgHouses] = useState([]);

  useEffect(() => {
    const getHouses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/houses");
        // const resImg = await axios.get("http://localhost:8000/image-house");
        setHouses(res.data);
        // imgHouseList(resImg.data);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getHouses();
  }, []);

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
                    Trang ch???
                  </a>
                </li>
                <li>
                  <a href="#about" className="smoothScroll">
                    Gi???i thi???u
                  </a>
                </li>

                <li>
                  <a href="#courses" className="smoothScroll">
                    Nh?? tr???
                  </a>
                </li>
                <li>
                  <a href="#testimonial" className="smoothScroll">
                    ????nh gi??
                  </a>
                </li>
                <li>
                  <a href="#contact" className="smoothScroll">
                    Li??n h???
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

        <div className="image">
          <img src={banner} style={{ width: "100%", height: "600px" }} />
        </div>

        <section id="courses">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title">
                  <h2>
                    Nh?? tr??? <small>Ch??ng t??i quan t??m ?????n ch??? ??? c???a b???n</small>
                  </h2>
                </div>
                <div
                  className="site-card-wrapper"
                  style={{ textAlign: "center" }}
                >
                  <Row gutter={16}>
                    {houseList.map((house) => {
                      return (
                        <Col span={8}>
                          <Card
                            style={{ width: 350 }}
                            cover={
                              <img
                                alt="example"
                                src="https://ancu.me/images/201904/kinh-nghiem-xay-nha-tro-gia-re-tiet-kiem-nhat/kinh-nghiem-xay-nha-tro-gia-re-tiet-kiem-nhat.jpg"
                              />
                            }
                          >
                            <Link to={"/enduser-listroom/" + house.id}>
                              <Meta
                                title={house.tennt}
                                description={house.diachi}
                              />
                            </Link>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="feature">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>01</span>
                  <h3>Gi?? c???</h3>
                  <p>
                    Gi?? c??? h???p l?? ph?? h???p v???i t???t c??? ng?????i thu?? ?????c bi???t l?? sinh
                    vi??n
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>02</span>
                  <h3>An ninh</h3>
                  <p>
                    An ninh l?? ti??u ch?? h??ng ?????u ????? ng?????i thu?? y??n t??m s???ng v??
                    l??m vi???c
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>03</span>
                  <h3>Ph??ng tr???</h3>
                  <p>
                    Ph??ng tr??? r???ng r??i tho??ng m??t ph?? h???p v???i nhu c???u c???a t???ng
                    ?????i t?????ng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="about-info">
                  <h1 style={{ fontWeight: "bold" }}>
                    3 y???u t??? t???o n??n ch???t l?????ng
                  </h1>
                  <br />
                  <figure>
                    <span>
                      <i className="fa fa-users"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>Ti???n nghi</h3>
                      <p>
                        Nhi???u trang thi???t b??? hi???n ?????i mang l???i s??? tho???i m??i cho
                        ng?????i thu??
                      </p>
                    </figcaption>
                  </figure>

                  <figure>
                    <span>
                      <i className="fa fa-certificate"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>Gi?? c??? h???p l??</h3>
                      <p>
                        Kh??ch thu?? ph???n l???n l?? sinh vi??n v?? th??? gi?? c??? ph?? h???p
                        v???i t???t c??? c??c ?????i t?????ng
                      </p>
                    </figcaption>
                  </figure>

                  <figure>
                    <span>
                      <i className="fa fa-bar-chart-o"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>
                        Ng?????i ch??? th??n thi???n
                      </h3>
                      <p>
                        S???n s??ng gi??p ????? v?? gi???i quy???t c??c v???n ????? trong qu??
                        tr??nh ??? tr??? m???t c??ch nhanh ch??ng
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="col-md-offset-1 col-md-4 col-sm-12">
                <div className="entry-form">
                  <form action="#" method="post">
                    <h2>????? l???i th??ng tin t?? v???n</h2>
                    <input
                      type="text"
                      name="full name"
                      className="form-control"
                      placeholder="H??? t??n"
                      required=""
                    />

                    <input
                      type="text"
                      name="sdt"
                      className="form-control"
                      placeholder="S??? ??i???n tho???i"
                      required=""
                    />

                    <button
                      className="submit-btn form-control"
                      id="form-submit"
                    >
                      G???i
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonial">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title">
                  <h2>????nh gi??</h2>
                </div>
                <div className="site-card-wrapper">
                  <Row gutter={16}>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="Anna Ph???m"
                        description="Di???n t??ch v???a ????? ????? c?? cu???c s???ng v?? c?? th??? sinh ho???t tho???i m??i, ?????m b???o ??i???u ki???n h???c t???p, di???n t??ch v???a ????? cho 2 ng?????i ??? v?? chi ph?? c??ng kh??ng qu?? ?????t."
                      />
                      <span>
                        <Rate value={4} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/jana" />
                        }
                        title="John V??"
                        description="Ph??ng tr??? c?? gi?? ph?? h???p v???i ??i???u ki???n, ho??n c???nh gia ????nh m??nh, nh?? v??? sinh, ph??ng t???m s???ch s??? v?? xung quanh ph??ng tr??? th?? an ninh, h??ng x??m th??n thi???n"
                      />
                      <span>
                        <Rate value={5} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/jon" />
                        }
                        title="David Tr????ng"
                        description="V??? tr?? thu???n ti???n cho vi???c h???c t???p, l??m vi???c, khu v???c ????ng d??n c??, g???n ch??? v?? b???nh vi???n. Tuy nhi??n th?????ng xuy??n b??? k???t xe v?? th??? ch??? ?????ng th???i gian ??i s???m v??? mu???n"
                      />
                      <span>
                        <Rate value={4} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/jess" />
                        }
                        title="Lisa "
                        description="C???a, c???a s??? ch???c ch???n, ???????c kh??a an to??n. Gi?? thu?? kh??ng qu?? ?????t so v???i nh???ng nh?? t????ng t???. Nh?? ch??? d??? t??nh. C?? nh?? ????? xe an to??n. N?????c d??ng s???ch (Kh??ng m??i)"
                      />
                      <span>
                        <Rate value={5} />
                        <span className="ant-rate-text"></span>
                      </span>
                    </Card>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="footer-info">
                  <div className="section-title">
                    <h2>?????a ch???</h2>
                  </div>
                  <address>
                    <p>
                      62/7 ???????ng 3/2, ph?????ng Xu??n Kh??nh
                      <br />
                      qu???n Ninh Ki???u, tp C???n Th??
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
                    <h2>Li??n h???</h2>
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
    </>
  );
}
