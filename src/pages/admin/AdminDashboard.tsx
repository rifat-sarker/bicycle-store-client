import React from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { Line } from '@ant-design/charts'; // For chart example

const { Meta } = Card;

// 1. Cards Section Data
const cardData = [
  { title: 'Total Users', value: 1200 },
  { title: 'Total Orders', value: 5000 },
  { title: 'Total Revenue', value: 85000 },
  { title: 'Products Sold', value: 3500 },
];

// 2. Chart Data (Example with Line Chart)
const chartData = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 80 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 60 },
];

// 3. Table Data (Example)
const tableData = [
  { key: '1', name: 'Product A', orders: 120, revenue: 15000 },
  { key: '2', name: 'Product B', orders: 250, revenue: 30000 },
  { key: '3', name: 'Product C', orders: 350, revenue: 42000 },
];

// Table Columns
const columns = [
  { title: 'Product Name', dataIndex: 'name', key: 'name' },
  { title: 'Orders', dataIndex: 'orders', key: 'orders' },
  { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
];

const AdminDashboard: React.FC = () => {
  // Chart configuration
  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    point: { size: 5, shape: 'diamond' },
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* 1st Section: Cards */}
      <Row gutter={16}>
        {cardData.map((card, index) => (
          <Col span={6} key={index}>
            <Card
              title={card.title}
              bordered={false}
              hoverable
              style={{ textAlign: 'center' }}
            >
              <Statistic
                value={card.value}
                prefix={card.title === 'Total Revenue' ? '$' : ''}
                valueStyle={{ fontSize: 24 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 2nd Section: Charts */}
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="Monthly Sales Chart" bordered={false}>
            <Line {...config} />
          </Card>
        </Col>
      </Row>

      {/* 3rd Section: Tables */}
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Product Sales Data" bordered={false}>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              bordered
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard
;
