import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, InputGroup, Row, Col, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../Images/Logo/Rettai Pillayar logo.png';

const StyledHeader = styled.header`
  .welcome-banner {
    color: #8B4513;
  }

  .logo-image {
    height: 40px;
    @media (min-width: 768px) {
      height: 50px;
    }
    @media (min-width: 992px) {
      height: 60px;
    }
  }

  .store-name {
    color: #FF0000;
  }

  .store-subname {
    color: #000080;
  }

  .custom-navbar {
    background-color: #B22222;
  }

  .nav-link, .nav-item {
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    color: white !important;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0.75rem 1.5rem !important;
    
    &:hover, &:focus, &.active {
      color: #F4D35E !important;
      background-color: transparent;
    }
  }

  /* Bootstrap Hover Dropdown */
  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    margin-top: 0;
    border: none;
    border-radius: 8px;
    background-color: #B22222;
    padding: 0;
    min-width: 200px;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
  }

  .dropdown-item {
    color: white;
    font-size: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: 'Lora', serif;
    text-align: center;
    
    &:last-child {
      border-bottom: none;
    }

    &:hover, &:focus, &.active {
      background-color: transparent;
      color: #F4D35E;
    }
  }
`;

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <StyledHeader>
      {/* Welcome Banner */}
      <div className="py-2 text-center welcome-banner">
        <small>Welcome to Shree Rettai Pillaiyar</small>
      </div>

      {/* Main Header */}
      <Navbar bg="white" expand="lg" className="py-2 border-bottom">
        <Container fluid>
          <Row className="w-100 align-items-center g-2">
            {/* Logo Section */}
            <Col xs={12} lg={3} className="text-center text-lg-start">
              <Navbar.Brand href="/" className="d-flex align-items-center justify-content-center justify-content-lg-start">
                <img
                  src={logo}
                  alt="Shree Rettai Pillaiyar Logo"
                  className="d-inline-block me-2 logo-image"
                />
                <div>
                  <h1 className="mb-0 fs-4 fw-bold store-name">
                    SHREE RETTAI PILLAIYAR
                  </h1>
                  <h2 className="mb-0 fs-6 store-subname">
                    POOJA STORES
                  </h2>
                </div>
              </Navbar.Brand>
            </Col>

            {/* Search Section */}
            <Col xs={12} lg={6}>
              <Form onSubmit={handleSearch} className="px-2">
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="Search Products & Categories"
                    className="border-danger rounded-start-pill"
                    style={{ borderRight: 'none', borderWidth: '3px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button 
                    variant="danger" 
                    type="submit"
                    className="rounded-end-pill"
                    style={{ width: '60px' }}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form>
            </Col>

            {/* Actions Section */}
            <Col xs={12} lg={3} className="d-none d-lg-block">
              <div className="d-flex align-items-center justify-content-end gap-4">
                <Nav.Link href="/cart" className="position-relative p-0">
                  <FaShoppingCart className='text-danger' size={34} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    0
                  </span>
                </Nav.Link>
                {/* <Nav.Link href="/wishlist" className="p-0 text-danger">
                  <FaHeart size={24} />
                </Nav.Link> */}
                <Button 
                  variant="danger" 
                  href='/admin'
                  target='blank'
                  className="rounded-pill px-4"
                  style={{ backgroundColor: '#B22222' }}
                >
                  SIGN IN
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Navigation Menu */}
      <Navbar expand="lg" className="py-0 custom-navbar">
        <Container fluid className="px-2">
          {/* Mobile Navigation */}
          <div className="d-flex d-lg-none align-items-center w-100 py-2">
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav-2" 
              className="border-light me-3"
            />
            <div className="d-flex align-items-center gap-3 ms-auto">
              <Nav.Link href="/cart" className="position-relative p-0">
                <FaShoppingCart size={20} className="text-white" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </Nav.Link>
              <Nav.Link href="/wishlist" className="p-0">
                <FaHeart size={20} className="text-white" />
              </Nav.Link>
              <Button 
                variant="outline-light" 
                size="sm"
                className="rounded-pill bg-light text-danger"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <Navbar.Collapse id="basic-navbar-nav-2">
            <Nav className="justify-content-around w-100">
              <Nav.Item>
                <Nav.Link href="/">HOME</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about">ABOUT US</Nav.Link>
              </Nav.Item>
              <NavDropdown 
                title="PRODUCTS" 
                id="products-dropdown"
                className="dropdown"
              >
                <NavDropdown.Item href="/panjaloga">Panjaloga</NavDropdown.Item>
                <NavDropdown.Item href="/rudh">Rudraksha</NavDropdown.Item>
                <NavDropdown.Item href="/karungali">Karungali</NavDropdown.Item>
                <NavDropdown.Item href="/statues">Statues</NavDropdown.Item>
                <NavDropdown.Item href="/puresilver">Pure Silver</NavDropdown.Item>
                <NavDropdown.Item href="/maalai">Malai</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link href="/blog">BLOG</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/contact">CONTACT US</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledHeader>
  );
};

export default Header;
