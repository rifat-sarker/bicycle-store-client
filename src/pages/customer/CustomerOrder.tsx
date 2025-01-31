import { useGetAllOrdersQuery } from "../../redux/features/customer/customerOrderApi";

const CustomerOrder = () => {
  const {
    data: orderData,
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery(undefined);

  console.log("API Response:", orderData); // Debugging

  return <div></div>;
};

export default CustomerOrder;
