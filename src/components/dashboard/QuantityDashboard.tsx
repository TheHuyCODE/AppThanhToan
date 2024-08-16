import React from "react";
import { AiFillProject } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";

import { MdCategory, MdInventory } from "react-icons/md";
interface QuantityDashboardProps {
  totalDataDashboard: any;
}
const QuantityDashboard: React.FC<QuantityDashboardProps> = ({
  totalDataDashboard,
}) => {
  return (
    <div className="quantity_dashboard">
      <div className="quantity_product">
        <div className="quantity_product_top">
          <span>HÓA ĐƠN</span>
          <FaFileInvoice className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>{totalDataDashboard.totalInvoice}</span>
        </div>
      </div>
      <div className="quantity_categories">
        <div className="quantity_product_top">
          <span>DOANH THU HÔM NAY </span>
          <AiFillProject className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>
            {totalDataDashboard.totalRevenue.toLocaleString("vi-VN") || 0} đ
          </span>
        </div>
      </div>
      <div className="quantity_customer">
        <div className="quantity_product_top">
          <span>SẢN PHẨM</span>

          <MdCategory className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>{totalDataDashboard.totalProduct}</span>
        </div>
      </div>
      <div className="quantity_invoices">
        <div className="quantity_product_top">
          <span>TỒN KHO</span>
          <MdInventory className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>{totalDataDashboard.totalReturn}</span>
        </div>
      </div>
    </div>
  );
};

export default QuantityDashboard;
