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
  useUpdateProductMutation,
} from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types";
import { brand, category, model } from "../../constants/global";

const { Option } = Select;

const ProductsManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetAllProductsQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);
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
      let imageUrl = editingProduct?.productImg || "";
  
      // Check if a new image is selected
      if (Array.isArray(values.productImg) && values.productImg[0]?.originFileObj) {
        const formData = new FormData();
        formData.append("file", values.productImg[0].originFileObj);
        formData.append("upload_preset", "hf9byf67");
  
        const response = await fetch("https://api.cloudinary.com/v1_1/dunfiptfi/image/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Image upload failed");
        }
  
        const data = await response.json();
        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          throw new Error("Image upload response invalid");
        }
      }
  
      // Ensure stock is defined
      const stock = values.stock ?? false; // Default to false if undefined
  
      // Prepare product data (with defaults if necessary)
      const productData = {
        name: values.name || "",
        brand: values.brand || "",
        price: Number(values.price) || 0,
        model: values.model || "",
        category: values.category || "",
        description: values.description || "",
        quantity: Number(values.quantity) || 0,
        stock: stock, // Ensure it's a boolean value
        productImg: imageUrl || "", // Default to empty string if imageUrl is undefined
      };
  
      console.log("Product Data Before Stringifying:", productData);
  
      // Manually stringify the productData if needed
      const requestBody = JSON.stringify(productData);
  
      console.log("Sending Product Data:", requestBody); // ✅ Debugging log
  
      // If editing, update the product
      if (editingProduct) {
        await updateProduct({
          id: editingProduct._id,
          ...productData,
        }).unwrap();
        message.success("Product updated successfully!");
      } else {
        // Otherwise, add a new product
        await addProduct(productData).unwrap();
        message.success("Product added successfully!");
      }
  
      handleCancel();
      refetch();
    } catch (error) {
      console.error("Error:", error);
      message.error("Operation failed. Please try again.");
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
      filters: [
        {
          text: "Racing",
          value: "Racing",
        },
        {
          text: "Electric",
          value: "Electric",
        },
        {
          text: "Sport",
          value: "Sport",
        },
        {
          text: "Outdoor",
          value: "Outdoor",
        },
      ],
      onFilter: (value, record) => record.category.includes(value as string),
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

  const onChange: TableProps<TProduct>["onChange"] = () =>
    // pagination,
    // filters,
    // sorter,
    // extra
    {};

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
              <Select>
                {category.map((category) => (
                  <Option key={category} value={category}>
                    {category}
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
