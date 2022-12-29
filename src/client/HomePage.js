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

        <div className="image">
          <img src={banner} style={{ width: "100%", height: "600px" }} />
        </div>

        <section id="courses">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title">
                  <h2>
                    Nhà trọ <small>Chúng tôi quan tâm đến chổ ở của bạn</small>
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
                  <h3>Giá cả</h3>
                  <p>
                    Giá cả hợp lý phù hợp với tất cả người thuê đặc biệt là sinh
                    viên
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>02</span>
                  <h3>An ninh</h3>
                  <p>
                    An ninh là tiêu chí hàng đầu để người thuê yên tâm sống và
                    làm việc
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="feature-thumb">
                  <span>03</span>
                  <h3>Phòng trọ</h3>
                  <p>
                    Phòng trọ rộng rãi thoáng mát phù hợp với nhu cầu của từng
                    đối tượng
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
                    3 yếu tố tạo nên chất lượng
                  </h1>
                  <br />
                  <figure>
                    <span>
                      <i className="fa fa-users"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>Tiện nghi</h3>
                      <p>
                        Nhiều trang thiết bị hiện đại mang lại sự thoải mái cho
                        người thuê
                      </p>
                    </figcaption>
                  </figure>

                  <figure>
                    <span>
                      <i className="fa fa-certificate"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>Giá cả hợp lý</h3>
                      <p>
                        Khách thuê phần lớn là sinh viên vì thế giá cả phù hợp
                        với tất cả các đối tượng
                      </p>
                    </figcaption>
                  </figure>

                  <figure>
                    <span>
                      <i className="fa fa-bar-chart-o"></i>
                    </span>
                    <figcaption>
                      <h3 style={{ fontWeight: "bold" }}>
                        Người chủ thân thiện
                      </h3>
                      <p>
                        Sẳn sàng giúp đỡ và giải quyết các vần đề trong quá
                        trình ở trọ một cách nhanh chóng
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="col-md-offset-1 col-md-4 col-sm-12">
                <div className="entry-form">
                  <form action="#" method="post">
                    <h2>Để lại thông tin tư vấn</h2>
                    <input
                      type="text"
                      name="full name"
                      className="form-control"
                      placeholder="Họ tên"
                      required=""
                    />

                    <input
                      type="text"
                      name="sdt"
                      className="form-control"
                      placeholder="Số điện thoại"
                      required=""
                    />

                    <button
                      className="submit-btn form-control"
                      id="form-submit"
                    >
                      Gửi
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
                  <h2>Đánh giá</h2>
                </div>
                <div className="site-card-wrapper">
                  <Row gutter={16}>
                    <Card style={{ width: 261, marginRight: 15 }}>
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title="Anna Phạm"
                        description="Diện tích vừa đủ để có cuộc sống và có thể sinh hoạt thoải mái, đảm bảo điều kiện học tập, diện tích vừa đủ cho 2 người ở vì chi phí cũng không quá đắt."
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
                        title="John Vũ"
                        description="Phòng trọ có giá phù hợp với điều kiện, hoàn cảnh gia đình mình, nhà vệ sinh, phòng tắm sạch sẽ và xung quanh phòng trọ thì an ninh, hàng xóm thân thiện"
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
                        title="David Trương"
                        description="Vị trí thuận tiện cho việc học tập, làm việc, khu vực đông dân cư, gần chợ và bệnh viện. Tuy nhiên thường xuyên bị kẹt xe vì thế chủ động thời gian đi sớm về muộn"
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
                        description="Cửa, cửa sổ chắc chắn, được khóa an toàn. Giá thuê không quá đắt so với những nhà tương tự. Nhà chủ dễ tính. Có nhà để xe an toàn. Nước dùng sạch (Không mùi)"
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
    </>
  );
}
