import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

const StyledDashboard = styled.div`
  .dashboard-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    height: 100%;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #6c757d;
    margin-bottom: 0.5rem;
  }

  .card-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #343a40;
  }

  .sales-overview {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .recent-activity {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .activity-item {
    padding: 0.75rem 0;
    border-bottom: 1px solid #e9ecef;

    &:last-child {
      border-bottom: none;
    }
  }

  .activity-icon {
    margin-right: 0.5rem;
  }
`;

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const recentActivity = [
  { id: 1, action: 'New order placed', time: '5 minutes ago' },
  { id: 2, action: 'Product "Smartphone X" added', time: '2 hours ago' },
  { id: 3, action: 'User John Doe registered', time: '1 day ago' },
  { id: 4, action: 'Category "Electronics" updated', time: '2 days ago' },
];

const Dashboard = () => {
  return (
    <StyledDashboard>
      <Container fluid>
        <h2 className="mb-4">Dashboard</h2>
        <Row>
          <Col md={3} className="mb-4">
            <div className="dashboard-card">
              <ShoppingBag className="card-icon text-primary" />
              <div className="card-title">Total Orders</div>
              <div className="card-value">1,254</div>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="dashboard-card">
              <Users className="card-icon text-success" />
              <div className="card-title">Total Customers</div>
              <div className="card-value">5,678</div>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="dashboard-card">
              <DollarSign className="card-icon text-warning" />
              <div className="card-title">Total Revenue</div>
              <div className="card-value">$45,678</div>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="dashboard-card">
              <TrendingUp className="card-icon text-info" />
              <div className="card-title">Growth Rate</div>
              <div className="card-value">12.5%</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <div className="sales-overview">
              <h3 className="mb-4">Sales Overview</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.month}</td>
                      <td>${data.sales.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={4}>
            <div className="recent-activity">
              <h3 className="mb-4">Recent Activity</h3>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <TrendingUp className="activity-icon" size={16} />
                  <span>{activity.action}</span>
                  <small className="text-muted d-block">{activity.time}</small>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </StyledDashboard>
  );
};

export default Dashboard;

