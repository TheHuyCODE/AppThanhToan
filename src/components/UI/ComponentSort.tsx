import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
type SortState = {
  key: string | null;
  direction: "asc" | "desc" | null;
};
interface ComponentSortProps {
  title: string;
  sortKey: string;
  sortDataCustomer: (key: string, direction: "asc" | "desc") => void;
}
const ComponentSort: React.FC<ComponentSortProps> = ({ title, sortKey, sortDataCustomer }) => {
  const [sortedColumn, setSortedColumn] = useState<SortState>({ key: null, direction: null });
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleHeaderClick = (key: string) => {
    setSortedColumn((prevState) => {
      if (prevState.key === key) {
        const newDirection = prevState.direction === "asc" ? "desc" : "asc";
        console.log(`New direction for column ${key}: ${newDirection}`);
        sortDataCustomer(key, newDirection);
        return { key, direction: newDirection };
      }
      console.log(`Sorting direction for column ${key}: asc`);
      return { key, direction: "asc" };
    });
  };
  return (
    <div
      className="table-header"
      onClick={() => handleHeaderClick(sortKey)}
      onMouseEnter={() => setHoveredColumn(sortKey)}
      onMouseLeave={() => setHoveredColumn(null)}
      // style={{ position: "relative", width: width }}
    >
      <span style={{ display: "block" }}>{title}</span>
      <div className="arrow-icon-container">
        {sortedColumn.key === sortKey && sortedColumn.direction === "asc" && (
          <FaArrowUp className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key === sortKey && sortedColumn.direction === "desc" && (
          <FaArrowDown className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key !== sortKey && hoveredColumn === sortKey && (
          <FaArrowUp className="arrow-icon arrow-icon-hover arrow-icon-visible" />
        )}
      </div>
    </div>
  );
};

export default ComponentSort;
