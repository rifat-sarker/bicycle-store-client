import { Card, Col, Row, Statistic, Table } from "antd";
import { Line } from "@ant-design/charts"; // Line chart for visualization
import { useGetAllOrdersQuery } from "../../redux/features/customer/customerOrderApi";
import { useGetUsersQuery } from "../../redux/features/admin/userManagementApi";
import { useRevenueQuery } from "../../redux/features/admin/revenueApi";

const AdminDashboard: React.FC = () => {
  const { data: orders, isLoading: ordersLoading } =
    useGetAllOrdersQuery(undefined);
  const { data: users, isLoading: usersLoading } = useGetUsersQuery(undefined);
  const { data: revenue, isLoading: revenueLoading } =
    useRevenueQuery(undefined);

  const totalProductsSold =
    orders?.data?.reduce((sum, order) => sum + order.products.length, 0) || 0;

  const cardData = [
    {
      title: "Total Users",
      value: usersLoading ? "Loading..." : users?.data?.length || 0,
    },
    {
      title: "Total Orders",
      value: ordersLoading ? "Loading..." : orders?.data?.length || 0,
    },
    {
      title: "Total Revenue",
      value: revenueLoading ? "Loading..." : revenue?.data?.totalRevenue || 0,
    },
    {
      title: "Products Sold",
      value: ordersLoading ? "Loading..." : totalProductsSold,
    },
  ];

  const chartData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 80 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 70 },
    { month: "May", value: 60 },
  ];

  const config = {
    data: chartData,
    xField: "month",
    yField: "value",
    point: { size: 5, shape: "diamond" },
  };

  const tableData = [
    { key: "1", name: "Urban Cruiser 200", orders: 10, revenue: 20000 },
    { key: "2", name: "Trailblazer X1", orders: 2, revenue: 3000 },
    { key: "3", name: "EcoRide E500", orders: 3, revenue: 3000 },
  ];

  // Table Columns
  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Orders", dataIndex: "orders", key: "orders" },
    { title: "Revenue", dataIndex: "revenue", key: "revenue" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16}>
        {cardData.map((card, index) => (
          <Col span={6} key={index}>
            <Card
              title={card.title}
              bordered={false}
              hoverable
              style={{ textAlign: "center" }}
            >
              <Statistic
                value={card.value}
                prefix={card.title === "Total Revenue" ? "$" : ""}
                valueStyle={{ fontSize: 24 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Monthly Sales Chart" bordered={false}>
            <Line {...config} />
          </Card>
        </Col>
      </Row>

      {/* 3rd Section: Tables */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
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

export default AdminDashboard;
