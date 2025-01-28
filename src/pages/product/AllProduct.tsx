import { Button, Card, Col, Row, Input, Select, Skeleton, Spin } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types/productManagement.type";
import { TQueryParam } from "../../types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

export type TTableData = Pick<
  TProduct,
  | "name"
  | "brand"
  | "model"
  | "price"
  | "description"
  | "category"
  | "productImg"
>;

const AllProduct = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(params);

  const products = productData?.data?.map(
    ({
      _id,
      name,
      brand,
      model,
      price,
      description,
      category,
      productImg,
    }) => ({
      key: _id,
      name,
      brand,
      model,
      price,
      description,
      category,
      productImg,
    })
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedModel || product.model === selectedModel) &&
      (!selectedCategory || product.category === selectedCategory)
  );

  useEffect(() => {
    const queryParams: TQueryParam[] = [];
    if (searchQuery) queryParams.push({ name: "name", value: searchQuery });
    if (selectedModel)
      queryParams.push({ name: "model", value: selectedModel });
    if (selectedCategory)
      queryParams.push({ name: "category", value: selectedCategory });
    setParams(queryParams);
  }, [searchQuery, selectedModel, selectedCategory]);


  if (isLoading) {
    return (
      <Row  gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Skeleton.Image
                style={{ width: "100%", height: 200, borderRadius: "8px" }}
                active
              />
              <Skeleton
                active
                title={{ width: "70%" }}
                paragraph={{ rows: 2, width: ["80%", "90%"] }}
                style={{ marginTop: "16px" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <Row  gutter={[16, 16]} style={{ marginBottom: "16px",marginTop: "50px" }}>
        <Col span={8}>
          <Input
            placeholder="Search by Name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Filter by Model"
            value={selectedModel}
            onChange={handleModelChange}
          >
            <Option value="Mountain">Mountain</Option>
            <Option value="Road">Road</Option>
            <Option value="Hybrid">Hybrid</Option>
            <Option value="BMX">BMX</Option>
            <Option value="Electric">Electric</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Filter by Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <Option value="Racing">Racing </Option>
            <Option value="Electric">Electric</Option>
            <Option value="Fitness">Fitness</Option>
            <Option value="Urban">Urban</Option>
            <Option value="Sport">Sport</Option>
            <Option value="Adventure">Adventure</Option>
            <Option value="Outdoor">Outdoor</Option>
            <Option value="Kids">Kids</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filteredProducts?.map((product) => (
          <Col key={product.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                isFetching ? (
                  <Skeleton.Image active />
                ) : (
                  <img
                    alt="product"
                    src={product.productImg}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )
              }
              loading={isFetching}
            >
              <Meta
                title={product.name}
                description={
                  <>
                    <p>
                      <strong>Brand:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Model:</strong> {product.model}
                    </p>
                    <p>
                      <strong>Price:</strong> {product.price}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                  </>
                }
              />
              <Link to={`/product/${product.key}`}>
                <Button
                  type="primary"
                  style={{ marginTop: "16px", width: "100%" }}
                >
                  View Details
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllProduct;
