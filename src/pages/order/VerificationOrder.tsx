import { useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../../redux/features/customer/customerOrderApi";
import { Card, Spin, Typography, Alert } from "antd";

const { Text } = Typography;

const VerificationOrder = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, data, error } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    { refetchOnMountOrArgChange: true }
  );

  const orderData = data?.data?.[0];

  if (isLoading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  if (error)
    return (
      <Alert message="Error fetching order details" type="error" showIcon />
    );
  if (!orderData)
    return <Alert message="No order found" type="warning" showIcon />;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Order Verification
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {/* Order Details Card */}
        <Card
          title="Order Details"
          bordered={false}
          style={{ flex: 1, marginRight: "10px" }}
        >
          <Text strong>Order ID:</Text> {orderData.order_id}
          <br />
          <Text strong>Status:</Text>{" "}
          <Text code> {orderData.bank_status || "Pending"}</Text>
          <br />
          <Text strong>Amount:</Text> BDT: {orderData.amount}
          <br />
          <Text strong>Payable Amount:</Text> ${orderData.payable_amount}
          <br />
          <Text strong>Date:</Text> {orderData.date_time}
          <br />
          <Text strong>Discount:</Text>{" "}
          {orderData.discsount_amount
            ? `$${orderData.discsount_amount}`
            : "N/A"}
        </Card>

        {/* Customer Info Card */}
        <Card
          title="Customer Info"
          bordered={false}
          style={{ flex: 1, marginLeft: "10px" }}
        >
          <Text strong>Name:</Text> {orderData.name}
          <br />
          <Text strong>Email:</Text> {orderData.email}
          <br />
          <Text strong>Phone:</Text> {orderData.phone_no}
          <br />
          <Text strong>Address:</Text> {orderData.address}, {orderData.city}
        </Card>
      </div>

      {/* Payment Info Card */}
      <Card title="Payment Info" bordered={false}>
        <Text strong>Payment Method:</Text> {orderData.method}
        <br />
        <Text strong>Bank Transaction ID:</Text> {orderData.bank_trx_id}
        <br />
        <Text strong>Invoice No:</Text> {orderData.invoice_no}
        <br />
        <Text strong>Bank Status:</Text> {orderData.bank_status}
        <br />
        <Text strong>SP Message:</Text> {orderData.sp_message}
        <br />
        <Text strong>Date & Time:</Text> {orderData.date_time}
      </Card>
    </div>
  );
};

export default VerificationOrder;
