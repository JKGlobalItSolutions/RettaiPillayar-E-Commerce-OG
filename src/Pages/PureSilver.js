import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { db, storage } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import banner from '../Images/products/product baanner.jpg'

const StyledPureSilver = styled.div`
  font-family: 'Lora', serif;

  h1 {
    text-align: center;
    font-weight: bolder;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  h3 {
    text-align: center;
    font-weight: bolder;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .card {
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .card-img-top {
    object-fit: cover;
    height: 200px;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #000;
    background-color: #FFE31A;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .original-price {
    text-decoration: line-through;
    color: #6c757d;
  }

  .btn-danger {
    background-color: #FF0000;
    border-color: #FF0000;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #D10000;
      border-color: #D10000;
    }
  }

  .scroll-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }
`;

const PureSilver = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const categoryRefs = useRef({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, where("page", "==", "Pure Silver"));
      const productsSnapshot = await getDocs(q);
      
      if (!productsSnapshot.empty) {
        setShowContent(true);
        const productsList = await Promise.all(productsSnapshot.docs.map(async (doc) => {
          const productData = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, productData.image));
          return {
            id: doc.id,
            ...productData,
            image: imageUrl,
          };
        }));
        setProducts(productsList);
      } else {
        setShowContent(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => doc.data().name);
      setCategories(categoriesList);
      
      categoriesList.forEach(category => {
        if (!categoryRefs.current[category]) {
          categoryRefs.current[category] = React.createRef();
        }
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
    if (container) {
      const scrollAmount = container.clientWidth;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const renderScrollButtons = (ref) => (
    <>
      <button
        className="scroll-button left"
        onClick={() => scrollProducts(ref, 'left')}
      >
        <ChevronLeft size={24} color="#333" />
      </button>
      <button
        className="scroll-button right"
        onClick={() => scrollProducts(ref, 'right')}
      >
        <ChevronRight size={24} color="#333" />
      </button>
    </>
  );

  return (
    <div>
      <Header />
      <div className="">
        <img className='img-fluid' src={banner} alt="" />
      </div>
      {showContent && (
        <StyledPureSilver>
          <Container>
            <h1>PureSilver</h1>
            {categories.map((category) => {
              const categoryProducts = products.filter(product => product.category === category);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category} className="mb-5">
                  <h3>{category}</h3>
                  <div className="position-relative">
                    {renderScrollButtons(categoryRefs.current[category])}
                    <div
                      className="d-flex flex-nowrap overflow-hidden"
                      ref={categoryRefs.current[category]}
                      style={{ margin: '0 -10px' }}
                    >
                      {categoryProducts.map(renderProductCard)}
                    </div>
                  </div>
                </div>
              );
            })}
          </Container>
        </StyledPureSilver>
      )}
      <Footer />
    </div>
  );
};

export default PureSilver;

