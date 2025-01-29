import { Button, Col, Divider, Form, Input, Row } from "antd";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import BSSelect from "../../components/form/BSSelect";
import { useAddProductMutation } from "../../redux/features/admin/productManagementApi";
import { categoryOptions, modelOptions } from "../../constants/global";

//! This is only for development
//! Should be removed
const productDefaultValues = {
  productImg:
    "https://i.ibb.co.com/FmzHyjJ/unbox-guy-9-Qm-VUQTFCVk-unsplash.jpg",
  name: "Ninja",
  brand: "HealthBike",
  price: 600,
  model: "Hybrid",
  category: "Fitness",
  description:
    "The FitRide F1 is perfect for fitness enthusiasts who want to stay in shape while enjoying the outdoors. Its lightweight frame and ergonomic design make it easy to ride for long periods, while the 10-speed gear system provides versatility and control. The comfortable saddle and adjustable handlebars ensure a customized fit, reducing strain on your body during intense workouts. With its practical features and stylish design, the FitRide F1 is a great choice for anyone looking to incorporate cycling into their fitness routine.",
  quantity: 20,
  stock: true,
};
const CreateProdcut = () => {
  const [addProduct, { data, error }] = useAddProductMutation();

  console.log({ data, error });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const productData = {
      data,
    };

    // console.log(data);
    const formData = new FormData();

    formData.append("data", JSON.stringify(productData));
    // formData.append("file", data.image);

    addProduct(formData);

    //! This is for development
    //! Just for checking
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <BSForm onSubmit={onSubmit} defaultValues={productDefaultValues}>
          <Divider>Add New Product</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSInput type="text" name="name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSSelect options={modelOptions} name="model" label="Model" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSInput type="text" name="brand" label="Brand" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSSelect
                options={categoryOptions}
                name="category"
                label="Category"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSInput type="number" name="price" label="Price" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSInput type="text" name="description" label="Description" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <BSInput type="number" name="quantity" label="Quantity" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </BSForm>
      </Col>
    </Row>
  );
};

export default CreateProdcut;
