import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo/logo.png";
import "./side-bar.css";
import {
  RiHome3Line,
  RiUser3Line,
  RiCarLine,
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiDashboardLine,
} from "react-icons/ri";
import { useStore } from "../../../store";
import alertify from "alertifyjs";
import { logout } from "../../../store/user/userActions";
import { Container, Nav, Navbar } from "react-bootstrap";

const SideBar = () => {
  const { userState, dispatchUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    alertify.confirm(
      "Logout",
      "Are you sure want to logout?",
      () => {
        dispatchUser(logout());
        localStorage.removeItem("token");
        navigate("/");
      },
      () => {
        console.log("canceled");
      }
    );
  };

  return (
    <Navbar expand="lg" className="admin-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          <img src={logo} className="img-fluid" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">
              <RiDashboardLine /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
              <RiUser3Line /> User Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/vehicles">
              <RiCarLine /> Vehicle Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/reservations">
              <RiFileList3Line /> Reservation Management
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <RiHome3Line /> Web Site
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SideBar;
