import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <span>${price.toFixed(2)}</span>
    </div>
  );
};

export default ProductCard;