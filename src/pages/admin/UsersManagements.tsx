import { Space, Table, Select, message } from "antd";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/admin/userManagementApi";

const UserManagement = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const isAdmin = currentUser?.role === "admin";
  const filteredUsers = (users?.data ?? []).filter(
    (user) => isAdmin || user.email === currentUserEmail
  );

  // console.log(filteredUsers);
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to delete user. Please try again.");
    }
  };

  const handleStatusChange = async (userId: string, status: string) => {
    try {
      if (userId && status) {
        await updateUserStatus({ id: userId, data: { status } }).unwrap();
        message.success("User status updated successfully!");
        refetch();
      } else {
        message.error("Invalid user ID or status.");
      }
    } catch (error) {
      message.error("Failed to update user status. Please try again.");
    }
  };

  const tableData = filteredUsers.map(({ _id, name, email, role, status }) => ({
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
          <a
            onClick={() => handleDeleteUser(data.key)}
            style={{ color: "red", cursor: "pointer" }}
          >
            Delete
          </a>

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
