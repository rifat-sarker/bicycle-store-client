import { Button, Card, Col, Row, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types/productManagement.type";
import { TQueryParam } from "../../types";
import { useState } from "react";

import { Link } from "react-router-dom";

const { Meta } = Card;

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
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(params);
  // console.log(data);

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

  console.log(products);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
      filters: [
        {
          text: "GreenCycle",
          value: "GreenCycle",
        },
        {
          text: "BMXKing",
          value: "BMXKing",
        },
        {
          text: "UrbanRider",
          value: "UrbanRider",
        },
      ],
    },

    {
      title: "Model",
      key: "model",
      dataIndex: "model",
      filters: [
        {
          text: "Mountain",
          value: "Mountain",
        },
        {
          text: "Road",
          value: "Road",
        },
        {
          text: "Hybrid",
          value: "Hybrid",
        },
        {
          text: "BMX",
          value: "BMX",
        },
        {
          text: "Electric",
          value: "Electric",
        },
      ],
    },

    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.model?.forEach((item) =>
        queryParams.push({ name: "model", value: item })
      );

      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    // <Table
    //   loading={isFetching}
    //   columns={columns}
    //   dataSource={tableData}
    //   onChange={onChange}
    // />

    <Row gutter={[16, 16]}>
      {products?.map((product) => (
        <Col key={product.key} xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{ width: "100%" }}
            cover={<img alt="bicyle_img" src={product.productImg} />}
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
            <Link to="`/${product.id}">
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
  );
};

export default AllProduct;
