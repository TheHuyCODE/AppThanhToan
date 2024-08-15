import React from "react";
import { AiFillProject } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";

import { MdCategory, MdInventory } from "react-icons/md";

const QuantityDashboard = () => {
  return (
    <div className="quantity_dashboard">
      <div className="quantity_product">
        <div className="quantity_product_top">
          <span>HÓA ĐƠN</span>
          <FaFileInvoice className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>100</span>
        </div>
      </div>
      <div className="quantity_categories">
        <div className="quantity_product_top">
          <span>DOANH THU</span>
          <AiFillProject className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>100</span>
        </div>
      </div>
      <div className="quantity_customer">
        <div className="quantity_product_top">
          <span>SẢN PHẨM</span>

          <MdCategory className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>100</span>
        </div>
      </div>
      <div className="quantity_invoices">
        <div className="quantity_product_top">
          <span>TỒN KHO</span>
          <MdInventory className="icon" />
        </div>
        <div className="quantity_product_bottom">
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default QuantityDashboard;
