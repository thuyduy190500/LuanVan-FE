import React from "react";
import { Form, Input, notification } from "antd";
import axios from "axios";
import "./asset/Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Success_Notification = () => {
    notification.info({
      message: "Đăng ký tài khoản thành công !!!",
    });
  };

  const Error_Notification = () => {
    notification.info({
      message: "Đăng ký tài khoản thất bại !!!",
    });
  };

  const handleOK = async () => {
    const tendn = form.getFieldValue("tendn");
    const email = form.getFieldValue("email");
    const matkhau = form.getFieldValue("matkhau");
    const res = await axios.post("http://localhost:8000/account-create", {
      tendn,
      email,
      matkhau,
    });
    if (res.status === 201) {
      Success_Notification();
      navigate("/login");
    } else {
      Error_Notification();
    }
  };

  return (
    <>
      <div className="register">
        <div className="container-register">
          <Form form={form} id="signup">
            <div className="header">
              <h3>ĐĂNG KÝ TÀI KHOẢN</h3>

              <p>Vui lòng điền vào form này</p>
            </div>

            <div className="sep"></div>

            <div className="inputs">
              <Form.Item
                name="tendn"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập !",
                  },
                ]}
              >
                <Input className="tendn" placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email !",
                  },
                ]}
              >
                <Input className="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="matkhau"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu !",
                  },
                ]}
              >
                <Input className="matkhau" placeholder="Mật khẩu" />
              </Form.Item>

              <div className="checkboxy">
                <input name="cecky" id="checky" value="1" type="checkbox" />
                <label className="terms">
                  Tôi chấp nhận các điều khoản sử dụng
                </label>
              </div>
              <button id="submit" onClick={handleOK}>
                ĐĂNG KÝ
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
