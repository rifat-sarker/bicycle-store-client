// components/ProductCard.tsx
import { Card, Button, Rate } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface ProductCardProps {
  _id: string;
  name: string;
  productImg: string;
  price: number;
  rating?: number;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  name,
  productImg,
  price,
  rating = 4.5,
  onAddToCart,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        bordered={false}
        style={{
          height: "420px",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: hovered
            ? "0 8px 32px rgba(0, 0, 0, 0.12)"
            : "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e8e8e8",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          cursor: "pointer",
        }}
        bodyStyle={{
          padding: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "260px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={productImg || "/placeholder.svg"}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              transition: "transform 0.3s ease",
            }}
          />

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 265,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              pointerEvents: hovered ? "auto" : "none",
              zIndex: 10,
            }}
          >
            <Link to={`/product/${_id}`}>
              <Button
                type="link"
                icon={<EyeOutlined style={{ fontSize: "20px" }} />}
                style={{
                  borderRadius: "8px",
                  color: "#000",
                  backgroundColor: "#10b981",
                  boxShadow: "0 4px 12px rgba(22, 119, 255, 0.3)",
                  fontWeight: "500",
                }}
              >
                Details
              </Button>
            </Link>
            <Button
              type="link"
              icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
              style={{
                backgroundColor: "#f59e0b",
                color: "#000",
                fontWeight: "500",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
            >
              Cart
            </Button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div
          style={{
            padding: "20px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
          }}
        >
          <h5>{name}</h5>
          <Rate
            disabled
            allowHalf
            value={rating}
            style={{ fontSize: "14px", color: "#f59e0b" }}
          />
          <h4 style={{ color: "#f59e0b", fontWeight: 700 }}>${price}</h4>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
