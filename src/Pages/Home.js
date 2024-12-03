import React, { useRef, useEffect } from 'react';
import Header from '../Components/Header/Header';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import HomeBanner from '../Images/Pages/Home/Home Banner.png';
import Panchalogam from '../Images/Pages/Home/Panchalogam.png';
import Rudhraksha from '../Images/Pages/Home/Rudhraksha.png';
import Karungali from '../Images/Pages/Home/Karungali.png';
import Statues from '../Images/Pages/Home/Statues.png';
import PureSilver from '../Images/Pages/Home/Pure Silver.png';
import Maalai from '../Images/Pages/Home/Malai.png';
import HomeBanner2 from '../Images/Pages/Home/Home content banner.png';
import Blog1 from '../Images/Pages/Home/Blog image 1 (2).png';
import Blog2 from '../Images/Pages/Home/Blog Image 2.png';
import Blog3 from '../Images/Pages/Home/Blog Image 3.png';
import "../Styles/Home.css";

// Import product images
import Product1 from '../Images/products/product 1.png';
import Product2 from '../Images/products/product 2.png';
import Product3 from '../Images/products/product 3.png';
import Product4 from '../Images/products/product 4.png';
import Product5 from '../Images/products/product 5.png';
import Product6 from '../Images/products/product 6.png';
import Product7 from '../Images/products/product 7.png';
import Product8 from '../Images/products/product 8.png';

import Footer from '../Components/Footer/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const newProductsRef = useRef(null);
  const bestSellersRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "Sandal Malai",
      image: Product1,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 2,
      name: "Rudraksha Mala",
      image: Product2,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 3,
      name: "Deity Figure",
      image: Product3,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 4,
      name: "Crystal Mala",
      image: Product4,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 5,
      name: "Nandi Statue",
      image: Product5,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 6,
      name: "Golden Arch",
      image: Product6,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 7,
      name: "Copper Lamp",
      image: Product7,
      price: 675.00,
      originalPrice: 750.00,
    },
    {
      id: 8,
      name: "Shiva Lingam",
      image: Product8,
      price: 675.00,
      originalPrice: 750.00,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const renderProductCard = (product) => (
    <div key={product.id} className="col-10 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-2">
      <Card className="h-100 border-0 shadow-sm">
        <div className="position-relative" style={{ paddingTop: '100%' }}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title className="fs-5 mb-3">{product.name}</Card.Title>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <span className="fs-5 fw-bold px-2" style={{ color: '#000', backgroundColor: "#FFE31A" }}>
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-decoration-line-through text-muted">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          </div>
          <Button 
            variant="danger" 
            className="w-100"
            style={{ 
              backgroundColor: '#FF0000',
              borderColor: '#FF0000'
            }}
          >
            Buy Now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );

  const scrollProducts = (ref, direction) => {
    const container = ref.current;
    const scrollAmount = container.clientWidth;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderScrollButtons = (ref) => (
    <>
      <button
        className="position-absolute start-0 top-50 translate-middle-y  border-0 d-flex align-items-center justify-content-center scroll-button"
        style={{
          zIndex: 1000,
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => scrollProducts(ref, 'left')}
      >
        <ChevronLeft size={24} color="#333" />
      </button>
      <button
        className="position-absolute end-0 top-50 translate-middle-y  border-0 d-flex align-items-center justify-content-center scroll-button"
        style={{
          zIndex: 1000,
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => scrollProducts(ref, 'right')}
      >
        <ChevronRight size={24} color="#333" />
      </button>
    </>
  );

  return (
    <div>
      <Header />
      <div className="banner animate-on-scroll">
        <img className='img-fluid' src={HomeBanner} alt="Home Banner" />
      </div>
      <Container className="my-3 animate-on-scroll">
        <h3 style={{fontFamily:"lora"}} className='text-center my-4 fw-bolder'>Shop By Category Items</h3>
        <Row className='justify-content-center' >
          <Col xs={9} lg={2} className="mb-3  ">
            <img className='img-fluid' src={Panchalogam} alt="Panchalogam" />
          </Col>
          <Col xs={9} lg={2} className="mb-3">
            <img className='img-fluid' src={Rudhraksha} alt="Rudhraksha" />
          </Col>
          <Col xs={9} lg={2} className="mb-3">
            <img className='img-fluid' src={Karungali} alt="Karungali" />
          </Col>
          <Col xs={9} lg={2} className="mb-3">
            <img className='img-fluid' src={Statues} alt="Statues" />
          </Col>
          <Col xs={9} lg={2} className="mb-3">
            <img className='img-fluid' src={PureSilver} alt="Pure Silver" />
          </Col>
          <Col xs={9} lg={2} className="mb-3">
            <img className='img-fluid' src={Maalai} alt="Maalai" />
          </Col>
        </Row>
      </Container>
      <Container fluid className="px-0 animate-on-scroll p-lg-5">
        <h3 style={{fontFamily:"lora"}} className='text-center my-4 fw-bolder'>New Products</h3>
        <div className="position-relative">
          {renderScrollButtons(newProductsRef)}
          <div className="d-flex flex-nowrap overflow-hidden" ref={newProductsRef}>
            {products.map(renderProductCard)}
          </div>
        </div>
      </Container>
      <Container fluid className="px-0 animate-on-scroll p-lg-5">
        <h3 style={{fontFamily:"lora"}} className='text-center my-4 fw-bolder'>Best Sellers</h3>
        <div className="position-relative">
          {renderScrollButtons(bestSellersRef)}
          <div className="d-flex flex-nowrap overflow-hidden" ref={bestSellersRef}>
            {products.map(renderProductCard)}
          </div>
        </div>
      </Container>
      <div className="my-5 animate-on-scroll">
        <img className='img-fluid' src={HomeBanner2} alt="" />
      </div>
      <div className="container my-5 animate-on-scroll">
        <h3 className='fw-bolder text-center' style={{fontFamily:"lora"}} >Our Blog</h3>
        <div className="row align-items-center ">
          <div className="col-12 col-lg-4 my-2 ">
              <img className='img-fluid' src={Blog1} alt="" />
          </div>
          <div className="col-12 col-lg-4 my-2 ">
              <img className='img-fluid' src={Blog2} alt="" />
          </div>
          <div className="col-12 col-lg-4 my-2 ">
              <img className='img-fluid' src={Blog3} alt="" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;

