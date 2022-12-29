import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./asset/Login.css";
import { notification } from "antd";
import(notification);

export default function Login() {
  const [tendn, setTendn] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const navigate = useNavigate();

  const Error_Notification = () => {
    notification.info({
      message: "Đăng nhập không thành công !!!",
    });
  };

  useEffect(() => {
    async function fetchData(tendn, matkhau) {
      const isLogin = await axios.post("http://localhost:8000/login", {
        tendn: tendn,
        matkhau: matkhau,
      });
      if (isLogin.data) {
        navigate("/home");
      } else {
        Error_Notification();
      }
    }
    fetchData(tendn, matkhau);
  }, [tendn, matkhau]);

  const handleOnClick = () => {
    const tendnInput = document.getElementById("tendn").value;
    const matkhauInput = document.getElementById("matkhau").value;
    setTendn(tendnInput);
    setMatkhau(matkhauInput);
  };

  return (
    <div id="login">
      <div className="main">
        <p className="sign" align="center">
          ĐĂNG NHẬP
        </p>
        <form className="form1">
          <input
            className="un "
            type="text"
            align="center"
            placeholder="Tên đăng nhập"
            id="tendn"
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Mật khẩu"
            id="matkhau"
          />
          <a className="submit" align="center" onClick={handleOnClick}>
            Đăng nhập
          </a>
          <p className="forgot" align="center">
            <a>Quên mật khẩu?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
