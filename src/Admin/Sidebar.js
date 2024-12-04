import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { Home, Box, Settings } from "lucide-react";
import logo from "../Images/Logo/Rettai Pillayar logo.png";

const StyledSidebar = styled.div`
  background-color: rgb(163, 29, 24);

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  height: 100%;
  min-height: calc(100vh - 4rem);

  .nav-link {
    color: #e0e0e0;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    &:hover,
    &:focus {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.active {
      color: #ffffff;
      background-color: black;
      box-shadow: 0 2px 10px rgba(164, 30, 25, 0.3);
    }

    svg {
      margin-right: 0.75rem;
    }
  }

  .brand {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <StyledSidebar>
      <div className="text-center">
        <img
          style={{ height: "100px" }}
          className="img-fluid text-center "
          src={logo}
          alt=""
        />
      </div>
      <div className="brand">
        <Settings size={24} />
        Admin Panel
      </div>
      <Nav className="flex-column">
        <Nav.Link
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <Home size={18} />
          Dashboard
        </Nav.Link>
        <Nav.Link
          className={activePage === "categories" ? "active" : ""}
          onClick={() => setActivePage("categories")}
        >
          <Box size={18} />
          Categories
        </Nav.Link>
        <Nav.Link
          className={activePage === "products" ? "active" : ""}
          onClick={() => setActivePage("products")}
        >
          <Box size={18} />
          Products
        </Nav.Link>
      </Nav>
    </StyledSidebar>
  );
};

export default Sidebar;
