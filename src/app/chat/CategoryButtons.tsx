import React from "react";

interface CategoryButtonsProps {
  categories: string[];
  onClick: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  onClick,
}) => {
  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onClick(category)}
          style={{
            padding: "10px 20px",
            margin: "5px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            fontSize: "16px",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
