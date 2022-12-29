import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Collapse } from "antd";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function DetailHome() {
  const [street, setStreet] = useState();
  const [house, setHouse] = useState();
  const { id, DUONGId } = useParams();

  useEffect(() => {
    const getStreet = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/house/${id}`);
        if (res.status === 200) {
          const resStreet = await axios.get(
            `http://localhost:8000/street/${id}`
          );
          if (resStreet.status === 200) {
            setStreet(resStreet.data);
          }
          setHouse(res.data);
        }
        // setHouse(res.data);
        console.log("data", house);
      } catch (error) {
        console.log(error.massage);
      }
    };
    getStreet();
  }, []);
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
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
          <Collapse defaultActiveKey={["1"]} onChange={onChange}>
            <Panel header="Tên nhà trọ" key="1">
              {house.map((h) => {
                return (
                  <>
                    <p>
                      <strong>Tên nhà trọ:</strong> {h.TenNT}
                    </p>
                  </>
                );
              })}
            </Panel>
            <Panel header="Địa chỉ" key="2">
              {/* {street.map((s) => {
                return (
                  <>
                    <p>
                      <strong>Địa chỉ:</strong>
                      {s.TenDuong}
                    </p>
                  </>
                );
              })} */}
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Content>
      </Layout>
    </div>
  );
}
