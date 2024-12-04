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
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Юрист",
    "Экономист",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
  ];

  const handleCategoryClick = (category: string) => {
    //TODO handleCategoryClick
    alert(`You clicked on: ${category}`);
  };

  return (
    <div className={className}>
      <div>
        <h3>Выберите профессию</h3>
        <div className="max-h-[300px] overflow-y-auto">
          <CategoryButtons
            categories={categories}
            onClick={handleCategoryClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectProfession;
