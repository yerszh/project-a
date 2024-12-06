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
    <>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onClick(category)}
          className="p-3 border border-[#E0E0E0] rounded-xl font-normal cursor-pointer bg-white text-[#171A1D] text-sm leading-3"
        >
          {category}
        </button>
      ))}
    </>
  );
};

export default CategoryButtons;
