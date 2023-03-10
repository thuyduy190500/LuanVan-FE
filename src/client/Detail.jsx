import React from "react";
import "./css/ListHouse.css";
import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

import nhatro1 from "./images/nhatro1.jpeg";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
export default function Detail() {
  const images = [
    {
      original:
        "https://behouse.vn/wp-content/uploads/2021/03/phong-tro-dep.jpg",
      thumbnail:
        "https://behouse.vn/wp-content/uploads/2021/03/phong-tro-dep.jpg",
    },
    {
      original:
        "https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2022-5.jpg",
      thumbnail:
        "https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2022-5.jpg",
    },
    {
      original:
        "https://giadinh.mediacdn.vn/zoom/740_463/296230595582509056/2021/8/9/phong-tro-giam-gia-2-1628484565812682328121.jpg",
      thumbnail:
        "https://giadinh.mediacdn.vn/zoom/740_463/296230595582509056/2021/8/9/phong-tro-giam-gia-2-1628484565812682328121.jpg",
    },
    {
      original:
        "https://www.vinamoves.vn/vnt_upload/news/01_2021/luu-y-can-biet-de-thue-phong-tro-sinh-vien-tranh-mac-lua.jpg",
      thumbnail:
        "https://www.vinamoves.vn/vnt_upload/news/01_2021/luu-y-can-biet-de-thue-phong-tro-sinh-vien-tranh-mac-lua.jpg",
    },
  ];
  const [visible, setVisible] = useState(false);
  const [room, setRoom] = useState();
  const [service, setService] = useState();

  const { id } = useParams();

  const getRoom = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/room-house-typeroom-detail/${id}`
      );
      const resDV = await axios.get(`http://localhost:8000/service`);
      console.log("res", res.data);
      setRoom(res.data);
      setService(resDV.data);
    } catch (error) {
      console.log(error.massage);
    }
  };

  useEffect(() => {
    console.log("id", id);
    getRoom();
  }, [id]);

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

        <div className="pd-wrap">
          <div className="container">
            <div className="heading-section">
              <h2 style={{ fontWeight: "bold" }}>Th??ng tin ph??ng tr???</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ImageGallery items={images} />
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    {/* <div className="product-name">M?? t??? ph??ng tr???</div> */}
                    <div className="reviews-counter">
                      <div className="rate">
                        <input
                          type="radio"
                          id="star5"
                          name="rate"
                          value="5"
                          checked
                        />
                        <label for="star5" title="text">
                          5 stars
                        </label>
                        <input
                          type="radio"
                          id="star4"
                          name="rate"
                          value="4"
                          checked
                        />
                        <label for="star4" title="text">
                          4 stars
                        </label>
                        <input
                          type="radio"
                          id="star3"
                          name="rate"
                          value="3"
                          checked
                        />
                        <label for="star3" title="text">
                          3 stars
                        </label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">
                          2 stars
                        </label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">
                          1 star
                        </label>
                      </div>
                      <span>3 Reviews</span>
                    </div>
                    <div className="product-price-discount">
                      <span>
                        {room?.giaPhong.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "vnd",
                        })}
                      </span>
                    </div>
                  </div>
                  <p>
                    Ph??ng tr??? ???????c x??y d???ng ki??n c??? h??n, ?????p m???t h??n ho???c n??ng
                    h???n t???m c??? quy m?? ????? ng?????i ??? d??? l???a ch???n. L?? kho???ng kh??ng
                    gian ch???t l?????ng ????? sinh ho???t, th?? gi??n v?? ngh??? ng??i. ?????i
                    t?????ng th?????ng s??? d???ng ph??ng tr??? n??y l?? sinh vi??n, h???c sinh,
                    ng?????i lao ?????ng c?? thu nh???p t??? th???p ?????n v???a v?? kh??ng c?? nhu
                    c???u ??n ??? qu?? cao.
                  </p>

                  <div className="row">
                    <p className="col-md-6">
                      <strong>Lo???i ph??ng: {room?.LoaiPhong} </strong>
                    </p>
                    <p className="col-md-6">
                      <strong>Di???n t??ch: {room?.DienTich}</strong>
                    </p>
                    <p className="col-md-6">
                      <strong>S??? l?????ng t???i ??a: {room?.SLToiDa}</strong>
                    </p>
                    <p className="col-md-6">
                      <strong>
                        Thi???t b??? cung c???p s???n: {room?.tenThietBi.join(" ")}
                      </strong>
                    </p>
                    <p className="col-md-6">
                      <strong>
                        D???ch v???:
                        {service?.map((dv) => {
                          return <>&nbsp;{dv.TenDV}&nbsp;</>;
                        })}
                      </strong>
                    </p>
                  </div>

                  {/* <div className="product-count">
                    <Button
                      style={{ background: "black" }}
                      type="primary"
                      onClick={() => setVisible(true)}
                    >
                      ?????t ph??ng
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="product-info-tabs">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="description-tab"
                    data-toggle="tab"
                    href="#description"
                    role="tab"
                    aria-controls="description"
                    aria-selected="true"
                  >
                    M?? t???
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  // className="tab-pane fade show active"
                  id="description"
                  // role="tabpanel"
                  // aria-labelledby="description-tab"
                >
                  <span>***Ti???n ??ch c??n h???:</span>
                  <ul>
                    <li>
                      C?? thang m??y. B???o v??? tr???c 24/24, gi??? gi???c tho???i m??i.
                    </li>
                    <li>Internet c??p quang t???c ????? cao, truy???n h??nh c??p.</li>
                    <li>D???n v??? sinh h??ng ng??y, kh??ng gian s???ng s???ch ?????p.</li>
                    <li>H???m ????? xe tho???i m??i, c?? d???ch v??? gi???t l??.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

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
