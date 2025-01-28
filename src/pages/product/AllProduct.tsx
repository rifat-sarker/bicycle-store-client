import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types/productManagement.type";

export type TTableData = Pick<
  TProduct,
  "name" | "brand" | "model" | "price" | "description"
>;

const AllProduct = () => {
  const { data: productData } = useGetAllProductsQuery(undefined);
  // console.log(data);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const tableData = productData?.data?.map(
    ({ _id, name, brand, model, price, description }) => ({
      key: _id,
      name,
      brand,
      model,
      price,
      description,
    })
  );
  return (
    <Table<TTableData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AllProduct;
