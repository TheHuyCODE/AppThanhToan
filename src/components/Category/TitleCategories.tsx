import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./CatalogManagement.css";
interface TitleCategoriesProp {
  selectedCategory: string;
  selectedChildCategory: string;
  showTableCategory: () => void;
  showTableChildCategory: () => void;
}
const titleCategories: React.FC<TitleCategoriesProp> = ({
  selectedCategory,
  selectedChildCategory,
  showTableCategory,
  showTableChildCategory,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
      console.log("select", select);
    }
    if (selectedChildCategory) {
      localStorage.setItem("selectedChildCategory", selectedChildCategory);
      console.log("selectedChild", selectedChild);
    }
  }, [selectedCategory, selectedChildCategory]);
  const select: string | null = localStorage.getItem("selectedCategory");
  const selectedChild: string | null = localStorage.getItem("selectedChildCategory");
  const isCategorySelected = Boolean(select);
  const isChildCategorySelected = Boolean(selectedChild);
  return (
    <>
      <div>
        <a
          className={`title-category ${isCategorySelected ? "selected" : ""} ${
            isChildCategorySelected ? "selected-child" : ""
          }`}
          onClick={showTableCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          Quản lý danh mục{" "}
        </a>
        <a
          className={`title-category  ${isChildCategorySelected ? "selected-child" : ""}`}
          onClick={showTableChildCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          {select && <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />}
          {select}
        </a>
        <a className={`title-category`} style={{ color: "rgb(3,23,110)", pointerEvents: "none" }}>
          {selectedChild && <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />}
          {selectedChild}
        </a>
      </div>
    </>
  );
};

export default titleCategories;
