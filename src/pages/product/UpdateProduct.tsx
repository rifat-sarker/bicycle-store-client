import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";

interface Bicycle {
  key: string;
  name: string;
  brand: string;
  price: string;
}

const initialData: Bicycle[] = [
  { key: "1", name: "Mountain Bike", brand: "Giant", price: "500" },
  { key: "2", name: "Road Bike", brand: "Trek", price: "700" },
  { key: "3", name: "Hybrid Bike", brand: "Cannondale", price: "600" },
];

const updateProduct: React.FC = () => {
  const [bicycles, setBicycles] = useState<Bicycle[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBicycle, setEditingBicycle] = useState<Bicycle | null>(null);
  const [form] = Form.useForm();

  const showModal = (bicycle?: Bicycle) => {
    setEditingBicycle(bicycle || null);
    form.setFieldsValue(bicycle || { name: "", brand: "", price: "" });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = (values: Bicycle) => {
    if (editingBicycle) {
      setBicycles((prev) =>
        prev.map((b) => (b.key === editingBicycle.key ? { ...b, ...values } : b))
      );
      message.success("Bicycle updated successfully!");
    } else {
      setBicycles([...bicycles, { key: Date.now().toString(), ...values }]);
      message.success("Bicycle added successfully!");
    }
    handleCancel();
  };

  const handleDelete = (key: string) => {
    setBicycles((prev) => prev.filter((b) => b.key !== key));
    message.success("Bicycle deleted successfully!");
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Bicycle) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Bicycle
      </Button>
      <Table columns={columns} dataSource={bicycles} />
      <Modal
        title={editingBicycle ? "Edit Bicycle" : "Add Bicycle"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please enter brand" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter price" }]}> 
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default updateProduct;
