import { Space, Table, message, Select, Pagination } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/features/customer/customerOrderApi";
import { TOrder } from "../../types/orderManagement.type";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { formatDateTime } from "../../utils/date";

const OrdersManagement = () => {
  const [page, setPage] = useState(1);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page.toString() },
    { name: "sort", value: "id" },
  ]);

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;
  const isAdmin = currentUser?.role === "admin";

  const metaData = orders?.meta;
  const filteredOrders: TOrder[] = Array.isArray(orders?.data)
    ? orders.data.filter(
        (order: TOrder) => isAdmin || order.email === currentUserEmail
      )
    : [];

  // console.log(filteredOrders);

  const handleCancel = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      message.success("Order canceled successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to cancel order. Please try again.");
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ id: orderId, data: { status } }).unwrap();
      message.success("Order status updated successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to update order status. Please try again.");
    }
  };

  const tableData = filteredOrders.map(
    ({ _id, user, products, transaction, totalPrice, status, createdAt }) => ({
      key: _id,
      userEmail: user?.email || "Not Available",
      products: products.map((p) => p._id).join(", "),
      transactionId: transaction?.id || "Not Available",
      date: formatDateTime(createdAt),
      totalPrice,
      status,
    })
  );

  // console.log(tableData);

  const columns = [
    { title: "Products", dataIndex: "products", key: "products" },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    { title: "User Email", dataIndex: "userEmail", key: "userEmail" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (data: { key: string; status: string }) => (
        <Space size="middle">
        {data.status === "Pending" && (
          <a onClick={() => handleCancel(data.key)} style={{ color: "red", cursor: "pointer" }}>
            <i className="fas fa-times-circle" /> Cancel
          </a>
        )}
        {isAdmin && (
          <Select
            defaultValue={data.status}
            style={{ width: '100%', maxWidth: 120 }}
            onChange={(value) => handleStatusChange(data.key, value)}
          >
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Paid">Paid</Select.Option>
            <Select.Option value="Shipped">Shipped</Select.Option>
            <Select.Option value="Delivered">Delivered</Select.Option>
            <Select.Option value="Cancelled">Cancelled</Select.Option>
          </Select>
        )}
      </Space>
      
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={tableData}
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Pagination
      style={{padding: "20px 0px"}}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default OrdersManagement;
