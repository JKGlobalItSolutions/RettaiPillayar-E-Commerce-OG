import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StyledDashboard = styled.div`
  padding: 2rem 0;

  h2 {
    color: #A41E19;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

  .card-title {
    color: #A41E19;
    font-weight: bold;
  }

  .card-text {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
`;

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [pageProductCounts, setPageProductCounts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => doc.data());
      setTotalProducts(productsList.length);

      // Fetch categories
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      setTotalCategories(categoriesSnapshot.docs.length);

      // Count products per page
      const pageCounts = productsList.reduce((acc, product) => {
        acc[product.page] = (acc[product.page] || 0) + 1;
        return acc;
      }, {});

      const pageCountsArray = Object.entries(pageCounts).map(([name, value]) => ({ name, value }));
      setPageProductCounts(pageCountsArray);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('Failed to fetch dashboard data. Please try again.');
    }
  };

  return (
    <StyledDashboard>
      <Container>
        <h2>Dashboard</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Products</Card.Title>
                <Card.Text>{totalProducts}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Categories</Card.Title>
                <Card.Text>{totalCategories}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Products per Page</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pageProductCounts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#A41E19" name="Products" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </StyledDashboard>
  );
};

export default Dashboard;

