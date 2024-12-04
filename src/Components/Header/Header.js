import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, InputGroup, Row, Col, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../Images/Logo/Rettai Pillayar logo.png';

const StyledHeader = styled.header`
  .welcome-banner {
    color: #8B4513;
    font-size: 0.8rem;
    @media (min-width: 768px) {
      font-size: 0.9rem;
    }
  }

  .logo-image {
    height: 30px;
    @media (min-width: 768px) {
      height: 40px;
    }
    @media (min-width: 992px) {
      height: 50px;
    }
  }

  .store-name {
    color: #FF0000;
    font-size: 1rem;
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
    @media (min-width: 992px) {
      font-size: 1.5rem;
    }
  }

  .store-subname {
    color: #000080;
    font-size: 0.8rem;
    @media (min-width: 768px) {
      font-size: 0.9rem;
    }
    @media (min-width: 992px) {
      font-size: 1rem;
    }
  }

  .custom-navbar {
    background-color: #B22222;
  }

  .nav-link, .nav-item {
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;
    color: white !important;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0.5rem 1rem !important;
    
    @media (min-width: 992px) {
      font-size: 1rem;
      padding: 0.75rem 1.5rem !important;
    }
    
    &:hover, &:focus, &.active {
      color: #F4D35E !important;
      background-color: transparent;
    }
  }

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
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: 'Lora', serif;
    text-align: center;
    padding: 0.5rem 1rem;
    
    @media (min-width: 992px) {
      font-size: 1rem;
    }
    
    &:last-child {
      border-bottom: none;
    }

    &:hover, &:focus, &.active {
      background-color: transparent;
      color: #F4D35E;
    }
  }

  .mobile-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .mobile-action-icon {
    font-size: 1.2rem;
    color: white;
  }

  .mobile-sign-in {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }

  .desktop-heart-icon {
    @media (min-width: 992px) {
      color: #FF0000 !important;
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
      <div className="py-2 text-center welcome-banner">
        <small>Welcome to Shree Rettai Pillaiyar</small>
      </div>

      <Navbar bg="white" expand="lg" className="py-2 border-bottom">
        <Container fluid>
          <Row className="w-100 align-items-center g-2">
            <Col xs={12} lg={3} className="text-center text-lg-start">
              <Navbar.Brand href="/" className="d-flex align-items-center justify-content-center justify-content-lg-start">
                <img
                  src={logo}
                  alt="Shree Rettai Pillaiyar Logo"
                  className="d-inline-block me-2 logo-image"
                />
                <div>
                  <h1 className="mb-0 fw-bold store-name">
                    SHREE RETTAI PILLAIYAR
                  </h1>
                  <h2 className="mb-0 store-subname">
                    POOJA STORES
                  </h2>
                </div>
              </Navbar.Brand>
            </Col>

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

            <Col xs={12} lg={3} className="d-none d-lg-block">
              <div className="d-flex align-items-center justify-content-end gap-4">
                <Nav.Link href="/cart" className="position-relative p-0">
                  <FaShoppingCart className='text-danger' size={34} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    0
                  </span>
                </Nav.Link>
                <Nav.Link href="/wishlist" className="p-0">
                  <FaHeart className="desktop-heart-icon" size={24} />
                </Nav.Link>
                <Button 
                  variant="danger" 
                  href='/login'
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

      <Navbar expand="lg" className="py-0 custom-navbar">
        <Container fluid className="px-2">
          <div className="d-flex d-lg-none align-items-center w-100 py-2">
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav-2" 
              className="border-light me-3"
            />
            <div className="mobile-actions ms-auto">
              <Nav.Link href="/cart" className="position-relative p-0">
                <FaShoppingCart className="mobile-action-icon" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </Nav.Link>
              <Nav.Link href="/wishlist" className="p-0">
                <FaHeart className="mobile-action-icon" />
              </Nav.Link>
              <Button 
                variant="outline-light" 
                size="sm"
                className="rounded-pill bg-light text-danger mobile-sign-in"
                href='/login'
                target='blank'
              >
                Sign In
              </Button>
            </div>
          </div>

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

