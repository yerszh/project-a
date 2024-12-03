import React from "react";
import CategoryButtons from "./CategoryButtons";

interface SelectProfessionProps {
  className?: string;
}

const SelectProfession: React.FC<SelectProfessionProps> = ({ className }) => {
  const categories = [
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
  ];

  const handleCategoryClick = (category: string) => {
    alert(`You clicked on: ${category}`);
  };

  return (
    <div className={className}>
      <div style={{ padding: "20px" }}>
        <h1>Select a Category</h1>
        <CategoryButtons
          categories={categories}
          onClick={handleCategoryClick}
        />
      </div>
    </div>
  );
};

export default SelectProfession;
