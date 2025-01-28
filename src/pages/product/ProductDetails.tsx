import { useParams } from "react-router-dom";
import { Card, Skeleton } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/admin/productManagementApi";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Card style={{ width: "100%", marginTop: "16px" }}>
      <img
        alt="bicycle_img"
        src={product?.data?.productImg}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <h1>{product?.data?.name}</h1>
      <p>
        <strong>Brand:</strong> {product?.data?.brand}
      </p>
      <p>
        <strong>Model:</strong> {product?.data?.model}
      </p>
      <p>
        <strong>Price:</strong> {product?.data?.price}
      </p>
      <p>
        <strong>Category:</strong> {product?.data?.category}
      </p>
      <p>
        <strong>Description:</strong> {product?.data?.description}
      </p>
    </Card>
  );
};

export default ProductDetails;
