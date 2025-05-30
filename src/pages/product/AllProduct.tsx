import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Select,
  Skeleton,
  Pagination,
  Slider,
} from "antd";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types/productManagement.type";
import { TQueryParam } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

const AllProduct = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); 

  const { data: categories = [] } = useGetCategoriesQuery();

  const queryParams: TQueryParam[] = [
    { name: "limit", value: "9" },
    { name: "page", value: page.toString() },
    ...(searchQuery ? [{ name: "searchTerm", value: searchQuery }] : []),
    ...(selectedCategory
      ? [{ name: "category", value: selectedCategory }]
      : []),
    ...(priceRange[0] > 0
      ? [{ name: "minPrice", value: priceRange[0].toString() }]
      : []),
    ...(priceRange[1] < 1000
      ? [{ name: "maxPrice", value: priceRange[1].toString() }]
      : []),
  ];

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(queryParams);

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
    }: TProduct) => ({
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
    setPage(1);
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setPage(1);
    setSelectedCategory(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPage(1);
    setPriceRange([value[0], value[1]]);
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
      {/* Left Filter Section */}
      <Col xs={24} sm={24} md={6}>
        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />

        <Select
          style={{ width: "100%", marginBottom: 16 }}
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

        <div style={{ marginBottom: 16 }}>
          <Slider
            range
            min={0}
            max={1000} 
            value={priceRange}
            onChange={handlePriceRangeChange}
          
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Min: ${priceRange[0]}</span>
            <span>Max: ${priceRange[1]}</span>
          </div>
        </div>
      </Col>

      {/* Right Product Display Section */}
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
                        <strong>Price:</strong> ${product.price}
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
                    style={{ marginTop: 16, width: "100%" }}
                  >
                    View Details
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

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
