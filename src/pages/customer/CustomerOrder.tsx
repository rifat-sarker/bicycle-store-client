import { Pagination, Space, Table, message } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../redux/features/customer/customerOrderApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TOrder } from "../../types/orderManagement.type";
import { useState } from "react";
import { formatDateTime } from "../../utils/date";

const CustomerOrder = () => {
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

  const currentUser = useAppSelector(selectCurrentUser);
  // console.log(currentUser, "current user");
  // const currentUserEmail = currentUser?.email;
  const currentUserId = currentUser?.id;
  // console.log(currentUserId, "current user id");

  const metaData = orders?.meta;

  const userOrders: TOrder[] =
    orders?.data?.filter(
      (order: TOrder) => order.user?._id === currentUserId
    ) || [];

  // console.log(userOrders);

  const handleCancel = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      message.success("Order canceled successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to cancel order. Please try again.");
    }
  };

  const tableData = userOrders.map(
    ({ _id, user, products, transaction, totalPrice, status, createdAt }) => ({
      key: _id,
      products: products.map((p) => p._id).join(", "),
      transactionId: transaction?.id || "Not Available",
      userEmail: user?.email || "Not Available",
      date: formatDateTime(createdAt),
      totalPrice,
      status,
    })
  );

  const columns = [
    { title: "Product", dataIndex: "products", key: "products" },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    { title: "Email", dataIndex: "userEmail", key: "userEmail" },
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

  return (
    <>
      <Table
        dataSource={tableData}
        columns={columns}
        loading={isLoading}
        pagination={false}
        style={{ width: "100%" }}
        scroll={{ x: 1000 }}
      />
      <Pagination
        style={{
          padding: "20px 0px",
          alignSelf: "center",
          width: "100%",
        }}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default CustomerOrder;
