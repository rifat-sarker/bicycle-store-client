import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Select,
  Skeleton,
  Pagination,
} from "antd";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "../../redux/features/admin/productManagementApi";
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
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const { data: categories = [] } = useGetCategoriesQuery();

  useEffect(() => {
    const queryParams: TQueryParam[] = [
      { name: "limit", value: 10 },
      { name: "page", value: page.toString() },
      { name: "sort", value: "id" },
    ];

    if (searchQuery)
      queryParams.push({ name: "searchTerm", value: searchQuery });
    if (selectedModel)
      queryParams.push({ name: "model", value: selectedModel });
    if (selectedCategory)
      queryParams.push({ name: "category", value: selectedCategory });

    setParams(queryParams);
  }, [page, searchQuery, selectedModel, selectedCategory]);

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

  const metaData = productData?.meta;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  if (isLoading) {
    return (
      <Row gutter={[16, 16]}>
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
    <Row gutter={24} style={{ marginTop: 50 }}>
      {/* Left Sidebar Filters */}
      <Col xs={24} sm={24} md={6}>
        <Input
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />

        <Select
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Filter by Model"
          value={selectedModel}
          onChange={handleModelChange}
          allowClear
        >
          <Option value="Mountain">Mountain</Option>
          <Option value="Road">Road</Option>
          <Option value="Hybrid">Hybrid</Option>
          <Option value="BMX">BMX</Option>
          <Option value="Electric">Electric</Option>
        </Select>

        <Select
          style={{ width: "100%" }}
          placeholder="Filter by Category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          allowClear
        >
          {categories?.map((cat: any) => (
            <Option key={cat._id || cat.name} value={cat.name}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </Col>

      {/* Product Grid */}
      <Col xs={24} sm={24} md={18}>
        <Row gutter={[16, 16]}>
          {products?.map((product) => (
            <Col key={product.key} xs={24} sm={12} md={12} lg={8}>
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
                      style={{ height: "200px", objectFit: "cover" }}
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
                    color="default"
                    variant="solid"
                    style={{ marginTop: "16px", width: "100%" }}
                  >
                    View Details
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default AllProduct;
