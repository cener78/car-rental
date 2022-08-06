import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "../components/admins/common/side-bar";
import "./admin-template.css";

const AdminTemplate = ({ children }) => {
  return (
    <Container fluid className="admin-template">
      <Row>
        <div className="col-lg-3 sidebar">
          <SideBar />
        </div>
        <div  className="col-lg-9 p-5 ">{children}</div>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
