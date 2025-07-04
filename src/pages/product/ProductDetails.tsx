  import { useParams, Link } from "react-router-dom";
  import {
    Card,
    Skeleton,
    Row,
    Col,
    Button,
    Divider,
    Tabs,
    Tag,
    Typography,
  } from "antd";
  import {
    useGetAllProductsQuery,
    useGetProductBySlugAndIdQuery,
  } from "../../redux/features/admin/productManagementApi";

  import ReactImageMagnify from "react-image-magnify";
  import { useAddToCartHandler } from "../../hooks/useAddToCartHandler";

  const { Title, Paragraph } = Typography;

  const ProductDetails = () => {
    const { slugAndId } = useParams();
    const id = slugAndId?.split("-").slice(-1)[0]; 

    const { data: product, isLoading } = useGetProductBySlugAndIdQuery(
      id as string
    );
    
    const { data: allProducts } = useGetAllProductsQuery(undefined);
    const { handleAddToCart } = useAddToCartHandler();

    // console.log(product);
    // console.log(allProducts);
    const productData = product?.data;
    console.log(productData);

    if (isLoading) {
      return <Skeleton active />;
    }

    // Filter related products (same category, different ID)
    const relatedProducts = allProducts?.data
      ?.filter(
        (p: any) =>
          p.category?.name === productData?.category?.name && p._id !== productData?._id
      )
      ?.slice(0, 4);

      // console.log(relatedProducts);

    return (
      <div style={{ padding: "20px" }}>
        {/* --- Product Card --- */}
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "500px",
                  borderRadius: "8px",
                  // overflow: "hidden",
                }}
              >
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "bicycle_img",
                      isFluidWidth: true,
                      src: productData?.productImg ?? "",
                    },
                    largeImage: {
                      src: productData?.productImg ?? "",
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerStyle: {
                      borderRadius: "8px",
                      zIndex: 9,
                    },
                    imageStyle: {
                      width: "100%",
                      height: "100%",
                      maxHeight: "500px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    },
                    isHintEnabled: true,
                    shouldUsePositiveSpaceLens: true,
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <Title level={2}>{productData?.name}</Title>
                <Title level={3} style={{ color: "#1890ff" }}>
                  ${productData?.price}
                </Title>

                <Paragraph>
                  <strong>Brand:</strong> {productData?.brand}
                </Paragraph>
                <Paragraph>
                  <strong>Model:</strong> {productData?.model}
                </Paragraph>

                <Paragraph>
                  <strong>Status:</strong>{" "}
                  {productData?.quantity && productData.quantity > 0 ? (
                    <Tag color="green">In Stock</Tag>
                  ) : (
                    <Tag color="red">Out of Stock</Tag>
                  )}
                </Paragraph>
                <Paragraph>
                  <strong>Reviews:</strong> ⭐⭐⭐⭐☆ (4/5)
                </Paragraph>

                <Divider />
                <Button
                  shape="round"
                  type="primary"
                  block
                  size="large"
                  disabled={!productData?.quantity || productData.quantity <= 0}
                  onClick={() => handleAddToCart(productData)}
                  style={{ backgroundColor: "#f59e0b", color: "#000" }}
                 
                >
                  Add to Cart
                </Button>
              </div>
            </Col>
          </Row>
        </Card>

        {/* --- Product Info Tabs --- */}
        <Card style={{ marginTop: "24px" }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Description" key="1">
              <Paragraph>{productData?.description}</Paragraph>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Specifications" key="2">
              <ul>
                <li>
                  <strong>Brand:</strong> {productData?.brand}
                </li>
                <li>
                  <strong>Model:</strong> {productData?.model}
                </li>
                <li>
                  <strong>Category:</strong> {productData?.category?.name}
                </li>
                <li>
                  <strong>Price:</strong> ${productData?.price}
                </li>
                <li>
                  <strong>Status:</strong>{" "}
                  {productData?.quantity && productData.quantity > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </li>
              </ul>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Reviews" key="3">
              <p>No reviews yet. Be the first to leave one!</p>
            </Tabs.TabPane>
          </Tabs>
        </Card>

        {/* --- Related Products --- */}
        {(relatedProducts ?? []).length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <Title level={3}>Related Products</Title>
            <Row gutter={[16, 16]}>
              {(relatedProducts ?? []).map((item: any) => (
                <Col key={item._id} xs={24} sm={12} md={6}>
                  <Link
                    to={`/products/${item.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${item._id}`}
                  >
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={item.productImg}
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                      }
                    >
                      <Title level={5}>{item.name}</Title>
                      <Paragraph>${item.price}</Paragraph>
                      <Tag
                        color={
                          item.quantity && item.quantity > 0 ? "green" : "red"
                        }
                      >
                        {item.quantity && item.quantity > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Tag>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    );
  };

  export default ProductDetails;
