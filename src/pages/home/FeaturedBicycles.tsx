import { Card, Col, Row, Button } from "antd";

const FeaturedBicycles = () => {
  const bicycles = [
    {
      id: 1,
      title: "Mountain Bike",
      image: "https://i.ibb.co/G9WyKbW/download.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      title: "Road Bike",
      image: "https://i.ibb.co/G9WyKbW/download.jpg",
      description: "Tempora maiores facere cumque saepe dolorem.",
    },
    {
      id: 3,
      title: "Hybrid Bike",
      image: "https://i.ibb.co/G9WyKbW/download.jpg",
      description: "Inventore suscipit totam eligendi ipsam nemo.",
    },
    {
      id: 4,
      title: "Electric Bike",
      image: "https://i.ibb.co/G9WyKbW/download.jpg",
      description: "Tenetur voluptatem magni neque omnis veritatis.",
    },
    {
      id: 5,
      title: "Folding Bike",
      image: "https://i.ibb.co/G9WyKbW/download.jpg",
      description: "Quae architecto facilis maiores facere cumque.",
    },
    {
      id: 6,
      title: "BMX Bike",
      image: "https://i.ibb.co/G9WyKbW/download.jpg",
      description: "Nemo earum tenetur voluptatem magni neque omnis.",
    },
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1>Featured Bicycles</h1>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {bicycles.map((bicycle) => (
          <Col key={bicycle.id} xs={24} sm={12} md={8}>
            <Card title={bicycle.title} bordered={false}>
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  marginBottom: "8px",
                }}
                src={bicycle.image}
                alt={bicycle.title}
              />
              <p>{bicycle.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button className="secondary-bg">View All</Button>
      </div>
    </div>
  );
};

export default FeaturedBicycles;
