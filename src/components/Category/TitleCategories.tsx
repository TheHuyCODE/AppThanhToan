import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface titleCategoriesProp {
  selectedCategory: string;
  showTableCategory: () => void;
}
const titleCategories: React.FC<titleCategoriesProp> = ({
  showTableCategory,
  selectedCategory,
}) => {
  return (
    <>
      <div>
        <a
          className="title-category"
          onClick={showTableCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          Quản lí danh mục{" "}
        </a>
        <a
          //   hidden={hiddenTitleChild}
          className="title-category"
          //   onClick={showTableChildCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          {<IoIosArrowForward style={{ color: "black", fontSize: 15 }} />}
          {selectedCategory}
        </a>
        {/* <a
          hidden={hiddenTitleSecondsChild}
          className="title-category"
          onClick={showTableChildSecondCategory}
          style={{ color: "rgb(3,23,110)", pointerEvents: "none" }}
        >
          {!viewTable && <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />}
          {selectedCategoryChild}
        </a> */}
      </div>
    </>
  );
};

export default titleCategories;
