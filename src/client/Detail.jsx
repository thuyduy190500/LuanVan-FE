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

        <div className="pd-wrap">
          <div className="container">
            <div className="heading-section">
              <h2 style={{ fontWeight: "bold" }}>Thông tin phòng trọ</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ImageGallery items={images} />
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    {/* <div className="product-name">Mô tả phòng trọ</div> */}
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
                    Phòng trọ được xây dựng kiên cố hơn, đẹp mắt hơn hoặc nâng
                    hẳn tầm cỡ quy mô để người ở dễ lựa chọn. Là khoảng không
                    gian chất lượng để sinh hoạt, thư giãn và nghỉ ngơi. Đối
                    tượng thường sử dụng phòng trọ này là sinh viên, học sinh,
                    người lao động có thu nhập từ thấp đến vừa và không có nhu
                    cầu ăn ở quá cao.
                  </p>

                  <div className="row">
                    <p className="col-md-6">
                      <strong>Loại phòng: {room?.LoaiPhong} </strong>
                    </p>
                    <p className="col-md-6">
                      <strong>Diện tích: {room?.DienTich}</strong>
                    </p>
                    <p className="col-md-6">
                      <strong>Số lượng tối đa: {room?.SLToiDa}</strong>
                    </p>
                    <p className="col-md-6">
                      <strong>
                        Thiết bị cung cấp sẵn: {room?.tenThietBi.join(" ")}
                      </strong>
                    </p>
                    <p className="col-md-6">
                      <strong>
                        Dịch vụ:
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
                      Đặt phòng
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
                    Mô tả
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
                  <span>***Tiện ích căn hộ:</span>
                  <ul>
                    <li>
                      Có thang máy. Bảo vệ trực 24/24, giờ giấc thoải mái.
                    </li>
                    <li>Internet cáp quang tốc độ cao, truyền hình cáp.</li>
                    <li>Dọn vệ sinh hàng ngày, không gian sống sạch đẹp.</li>
                    <li>Hầm để xe thoải mái, có dịch vụ giặt là.</li>
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
