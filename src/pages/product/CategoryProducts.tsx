import { useParams } from "react-router-dom";

import { Spin, Typography } from "antd";
import { useGetProductsByCategorySlugQuery } from "../../redux/features/admin/productManagementApi";

const { Title, Text } = Typography;

const CategoryProducts = () => {
  const { slug } = useParams();
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsByCategorySlugQuery(slug);


  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">Failed to load products.</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Products in "{slug}" Category</Title>
      {products.data?.length ? (
        <ul>
          {products.data?.map((product) => (
            <li key={product._id}>{product.name}</li> // Customize this with your product card UI
          ))}
        </ul>
      ) : (
        <Text>No products found in this category.</Text>
      )}
    </div>
  );
};

export default CategoryProducts;
