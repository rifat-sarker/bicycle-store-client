import { Space, Table, message, Select } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/features/customer/customerOrderApi";
import { TOrder } from "../../types/orderManagement.type";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const OrdersManagement = () => {
  const { data: orders, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;
  const isAdmin = currentUser?.role === "admin";

  const filteredOrders: TOrder[] = Array.isArray(orders?.data)
    ? orders.data.filter(
        (order: TOrder) => isAdmin || order.email === currentUserEmail
      )
    : [];

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
      if (orderId && status) {
        await updateOrderStatus({ id: orderId, data: { status } }).unwrap();
        message.success("Order status updated successfully!");
        refetch();
      } else {
        message.error("Invalid order ID or status.");
      }
    } catch (error) {
      message.error("Failed to update order status. Please try again.");
    }
  };

  const tableData = filteredOrders.map(
    ({
      _id,
      product,
      transactionId,
      email,
      totalPrice,
      status,
      createdAt,
    }) => ({
      key: _id,
      product,
      transactionId: transactionId || "Not Available",
      email,
      date: createdAt,
      totalPrice,
      status,
    })
  );

  const columns = [
    { title: "Product", dataIndex: "product", key: "product" },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (data: { key: string; status: string }) => (
        <Space size="middle">
          {data.status === "Pending" ? (
            <a
              onClick={() => handleCancel(data.key)}
              style={{ color: "red", cursor: "pointer" }}
            >
              Cancel
            </a>
          ) : (
            "-"
          )}
          {isAdmin && (
            <Select
              defaultValue={data.status}
              style={{ width: 120 }}
              onChange={(value) => handleStatusChange(data.key, value)} // Pass `data.key` as `orderId`
            >
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Paid">Paid</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Dlivered">Delivered</Select.Option>
              <Select.Option value="Cancelled">Cancelled</Select.Option>
            </Select>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      loading={isLoading}
      pagination={{ pageSize: 8, position: ["bottomLeft"] }}
    />
  );
};

export default OrdersManagement;
