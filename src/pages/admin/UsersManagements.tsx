import { Space, Table, message, Select } from "antd";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetUsersQuery } from "../../redux/features/admin/userManagementApi";

const UserManagement = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery(undefined);

  const currentUser = useAppSelector(selectCurrentUser);

  const isAdmin = currentUser?.role === "admin";

  const handleCancel = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      message.success("Order canceled successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to cancel order. Please try again.");
    }
  };

  const tableData = users?.data?.map(({ _id, name, email, role, status }) => ({
    key: _id,
    name,
    email,
    role,
    status,
  }));

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
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
              onChange={(value) => handleStatusChange(data.key, value)}
            >
              <Select.Option value="in-progress">In-progress</Select.Option>
              <Select.Option value="blocked">Blocked</Select.Option>
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

export default UserManagement;
