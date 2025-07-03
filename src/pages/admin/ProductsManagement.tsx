/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Select,
  Switch,
  Upload,
  Pagination,
  TableColumnsType,
  TableProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types";
import { brand, model } from "../../constants/global";


const { Option } = Select;

const ProductsManagement = () => {
  const [page, setPage] = useState(1);

  // Fetch Products
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetAllProductsQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  // Fetch Categories 
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery(undefined);

    // console.log(categoriesData);

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const [form] = Form.useForm();

  const metaData = products?.meta;
  const tableData = products?.data?.map((product) => ({
    key: product._id,
    ...product,
  }));

  const showModal = (product?: TProduct) => {
    setEditingProduct(product || null);
    form.setFieldsValue(
      product
        ? {
            ...product,
            category: (product.category as any)._id || product.category, 
            productImg: product.productImg
              ? [
                  {
                    uid: "-1",
                    name: "Existing Image",
                    status: "done",
                    url: product.productImg,
                  },
                ]
              : [],
          }
        : {
            name: "",
            brand: "",
            price: 1,
            model: "",
            category: "",
            description: "",
            quantity: 1,
            stock: true,
            productImg: [],
          }
    );
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      // Generate slug
      const slug = values.name.toLowerCase().split(" ").join("-");

      const productData = {
        name: values.name,
        slug, 
        brand: values.brand,
        price: Number(values.price),
        model: values.model,
        category: values.category,
        description: values.description,
        quantity: Number(values.quantity),
        stock: values.stock,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      if (values.productImg && values.productImg[0]?.originFileObj) {
        formData.append("file", values.productImg[0].originFileObj);
      } else if (!editingProduct?.productImg) {
        formData.append("file", "");
      }

      if (editingProduct) {
        await updateProduct({
          id: editingProduct._id,
          ...productData,
        }).unwrap();
        message.success("Product updated successfully!");
      } else {
        await addProduct(formData).unwrap();
        message.success("Product added successfully!");
      }

      handleCancel();
      refetch();
    } catch (error) {
      message.error("Operation failed");
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("Product deleted successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const columns: TableColumnsType<TProduct> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Model", dataIndex: "model", key: "model" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => category?.name || "N/A", 
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: boolean) => (stock ? "Yes" : "No"),
    },
    {
      title: "Update",
      key: "update",
      render: (record: TProduct) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (record: TProduct) => (
        <Space>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TProduct>["onChange"] = () => {};

  return (
    <>
      <div style={{ padding: 20 }}>
        <Button
          color="default"
          variant="solid"
          onClick={() => showModal()}
          style={{ marginBottom: 16 }}
        >
          Add Product
        </Button>
        <Table
          columns={columns}
          dataSource={tableData || []}
          loading={isLoading}
          rowKey="_id"
          onChange={onChange}
          pagination={false}
        />
        <Modal
          title={editingProduct ? "Edit Product" : "Add Product"}
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
              <Select>
                {brand.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{ required: true }]}>
              <Select>
                {model.map((model) => (
                  <Option key={model} value={model}>
                    {model}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select loading={isCategoryLoading}>
                {categoriesData?.map((category: any) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="stock" label="In Stock" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item
              name="productImg"
              label="Product Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default ProductsManagement;
