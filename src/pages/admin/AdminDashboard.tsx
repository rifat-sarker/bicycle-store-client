import { Card, Col, Row, Statistic, Table, Spin } from "antd";
import { Line, Pie, Column } from "@ant-design/charts";
import { useGetAllOrdersQuery } from "../../redux/features/customer/customerOrderApi";
import { useGetUsersQuery } from "../../redux/features/admin/userManagementApi";
import { useRevenueQuery } from "../../redux/features/admin/revenueApi";

import type { TOrder,  } from "../../types/orderManagement.type";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types";
import React from "react";

const AdminDashboard: React.FC = () => {
  const { data: orders, isLoading: ordersLoading } =
    useGetAllOrdersQuery(undefined);
  const { data: users, isLoading: usersLoading } = useGetUsersQuery(undefined);
  const { data: revenue, isLoading: revenueLoading } =
    useRevenueQuery(undefined);

    const { data: productsData } = useGetAllProductsQuery(undefined); 

    const productMap = React.useMemo(() => {
      const map: { [key: string]: TProduct } = {};
      productsData?.data?.forEach((product: TProduct) => {
        map[product._id] = product;
      });
      return map;
    }, [productsData]);


  const totalProductsSold =
    orders?.data?.reduce(
      (sum: number, order: TOrder) => sum + order.products.length,
      0
    ) || 0;

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

  // Generate dynamic monthly sales data
  const monthlySalesMap: { [key: string]: number } = {};

  orders?.data?.forEach((order: TOrder) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    monthlySalesMap[month] = (monthlySalesMap[month] || 0) + 1;
  });

  const monthlySalesData = Object.keys(monthlySalesMap).map((month) => ({
    month,
    value: monthlySalesMap[month],
  }));

  // Product Sales Data
  const productSalesMap: {
    [key: string]: { name: string; orders: number; revenue: number };
  } = {};

  orders?.data?.forEach((order: TOrder) => {
    order.products.forEach((orderedProduct) => {
      const productDetails = productMap[orderedProduct.product];
      if (productDetails) {
        if (productSalesMap[productDetails.name]) {
          productSalesMap[productDetails.name].orders += 1;
          productSalesMap[productDetails.name].revenue +=
            productDetails.price * orderedProduct.quantity;
        } else {
          productSalesMap[productDetails.name] = {
            name: productDetails.name,
            orders: 1,
            revenue: productDetails.price * orderedProduct.quantity,
          };
        }
      }
    });
  });
  

  const tableData = Object.values(productSalesMap).map((product, index) => ({
    key: index + 1,
    ...product,
  }));

  // Charts Configuration
  const lineConfig = {
    data: monthlySalesData,
    xField: "month",
    yField: "value",
    point: { size: 5, shape: "diamond" },
    color: "#1890ff",
    smooth: true,
  };

  const pieData = Object.values(productSalesMap).map((product) => ({
    type: product.name,
    value: product.orders,
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{name}",
      style: { fontSize: 14, textAlign: "center" },
    },
    interactions: [{ type: "element-active" }],
  };

  const barConfig = {
    data: tableData,
    xField: "orders",
    yField: "name",
    seriesField: "name",
    legend: false,
  };

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
              {card.value === "Loading..." ? (
                <Spin />
              ) : (
                <Statistic
                  value={card.value}
                  prefix={card.title === "Total Revenue" ? "$" : ""}
                  valueStyle={{ fontSize: 24 }}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Monthly Sales Chart" bordered={false}>
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Product Sales Distribution" bordered={false}>
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Product Orders Bar Chart" bordered={false}>
            <Column {...barConfig} />
          </Card>
        </Col>
      </Row>

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
