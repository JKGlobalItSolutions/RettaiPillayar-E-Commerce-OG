import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Sidebar from '../Admin/Sidebar';
import Navbar from '../Admin/Navbar';
import Dashboard from './Dashboard';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';

const StyledAdminPanel = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;

  .content-area {
    padding: 2rem;
    transition: all 0.3s ease;
    margin-left: 250px;

    @media (max-width: 991px) {
      margin-left: 0;
    }
  }

  .panel-container {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    min-height: calc(100vh - 4rem);
    overflow-y: auto;
  }

  h2 {
    color: #A41E19;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    .content-area {
      padding: 1rem;
    }
  }
`;

const AdminPanel = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StyledAdminPanel>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="content-area">
        <Navbar setIsOpen={setIsSidebarOpen} />
        <Container fluid>
          <Row>
            <Col>
              <div className="panel-container">
                {activePage === 'dashboard' && <Dashboard />}
                {activePage === 'categories' && <CategoryManagement />}
                {activePage === 'products' && <ProductManagement />}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </StyledAdminPanel>
  );
};

export default AdminPanel;
