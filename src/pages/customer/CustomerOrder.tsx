import { Space, Table, message } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../redux/features/customer/customerOrderApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TOrder } from "../../types/orderManagement.type";

const CustomerOrder = () => {
  const { data: orders, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();

  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const userOrders: TOrder[] =
    orders?.data?.filter((order: TOrder) => order.email === currentUserEmail) ||
    [];

  const handleCancel = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      message.success("Order canceled successfully!");
      refetch()
    } catch (error) {
      message.error("Failed to cancel order. Please try again.");
    }
  };

  const tableData = userOrders.map(
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
      render: (data: { key: string; status: string }) =>
        data.status === "Pending" ? (
          <Space size="middle">
            <a
              onClick={() => handleCancel(data.key)}
              style={{ color: "red", cursor: "pointer" }}
            >
              Cancel
            </a>
          </Space>
        ) : (
          "-"
        ),
    },
  ];

  return <Table dataSource={tableData} columns={columns} loading={isLoading} pagination={{ pageSize: 8, position: ['bottomLeft'] }} />;
};

export default CustomerOrder;
