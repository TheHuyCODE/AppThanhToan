import React from "react";
import { Select } from "antd";
import { CiSearch } from "react-icons/ci";
import { domain } from "../TableConfig/TableConfig";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const RightPageContent = ({
  dataProduct,
  handleProductClick,
  handleOpenModal,
  toggleSidebar,
  isSidebarVisible,
  hiddenPopUpDiscountPrice,
}) => {
  const domainLink = domain.domainLink;
  return (
    <div className="right-page-content">
      <div className="right-page-content-header">
        <div
          style={{ display: "flex", position: "relative" }}
          className="box-input-search-customer"
        >
          <CiSearch
            style={{
              position: "absolute",
              top: "10px",
              left: "11px",
              transform: "translateY(8%)",
              fontSize: "20px",
            }}
          />
          <input type="text" placeholder="Tìm sản phẩm" className="input-search-customer" />
        </div>
        <Select
          showSearch
          placeholder="Lọc theo danh mục sản phẩm danh mục sản phẩm"
          optionFilterProp="label"
          style={{ width: 260, height: 40 }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          // options={category.map((cat) => ({ label: cat.name, value: cat.id }))}
        />
      </div>
      <div className="right-page-content-container">
        <ul className="list-product">
          {dataProduct?.map((product, index) => (
            <li key={index} className="box-product" onClick={() => handleProductClick(product)}>
              <div className="product-info-img">
                <img
                  src={`${domainLink}${product.image_url}`}
                  loading="lazy"
                  alt={product.name}
                  className="image-review-product"
                />
              </div>
              <div className="product-info-bottom">
                <h4>{product.name}</h4>
                <div>
                  <span>{product.capital_price.toLocaleString("vi-VN")}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-page-content-footer">
        <div className="nagination-product">
          <button title="Trang trước" className="btn-before-product">
            <MdKeyboardArrowLeft className="icon" />
          </button>
          <span>2/2</span>
          <button title="Trang sau" className="btn-after-product">
            <MdKeyboardArrowRight className="icon" />
          </button>
        </div>
        <button className="btn-pay" onClick={toggleSidebar}>
          THANH TOÁN
        </button>
      </div>
      <div className={`overlay ${isSidebarVisible ? "show" : ""}`} onClick={toggleSidebar}></div>
      <div
        className={`sidebar ${isSidebarVisible ? "show" : ""}`}
        // onClick={() => setHiddenPopUpDiscountPrice(false )}
      >
        {/* Nội dung của sidebar */}
        <div className="header-sidebar-bank">
          <span>Thanh toán hóa đơn</span>
          <button className="close-sidebar-bank" onClick={toggleSidebar}>
            <IoMdClose />
          </button>
        </div>
        <div className="main-sidebar-bank">
          <div className="customer-debt-point-wraper">
            <Select
              showSearch
              placeholder="Chọn khách hàng"
              notFoundContent="Không tìm thấy người dùng"
              optionFilterProp="label"
              // onChange={(value) => getCustomerPayment(value)}
              // value={selectedCustomer}
              style={{ width: 400, height: 40, paddingRight: "0px" }}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              // options={infoCustomer}
            />
            {/* {selectedCustomer && (
              <button
                onClick={handleClearSelection}
                style={{ marginLeft: "10px" }}
              >
                Clear
              </button>
            )} */}
            <button className="btn-add-customers" title="Thêm khách hàng" onClick={handleOpenModal}>
              <IoMdAdd />
            </button>
          </div>
          <div className="payment-invoice">
            <div className="payment-invoice__total">
              <label className="payment-invoice__label">Tổng tiền hàng</label>
              {/* <span className="payment-invoice__value">
                {total.quantity}
              </span> */}
              <div className="payment-invoice__price-total">
                <p className="payment-invoice__price-amount">
                  {/* {total.price.toLocaleString("vi-VN")} */}
                </p>
              </div>
            </div>
            <div className="payment-invoice__discount">
              <label className="payment-invoice__label">Giảm giá</label>
              <input
                type="text"
                // value={inputPayment.discount_price.toLocaleString("vi-VN")}
                // onChange={onChangePricePayment}
                // onClick={handleInputClick}
                className="payment-invoice__input"
              />
            </div>
            {hiddenPopUpDiscountPrice && (
              <div className="pop-discount">
                <p>Giảm giá</p>
                <input
                  type="text"
                  // value={inputPayment.discount_price.toLocaleString("vi-VN")}
                  // onChange={onChangePricePayment}
                  className="payment-invoice__input"
                />
                <button
                // className={`discount-button ${!isPercentage ? "active" : ""}`}
                // onClick={handleVNDClick}
                >
                  VND
                </button>
                <button
                // className={`discount-button ${isPercentage ? "active" : ""}`}
                // onClick={handlePercentageClick}
                >
                  %
                </button>
              </div>
            )}
            <div className="payment-invoice__total-after-discount">
              <label className="payment-invoice__label">Khách cần trả</label>
              <div className="payment-invoice__price">
                <p className="payment-invoice__price-amount">
                  {/* {inputPayment.amount_due.toLocaleString("vi-VN")} */}
                </p>
              </div>
            </div>
            <div className="payment-invoice__guest-pays">
              <label className="payment-invoice__label">Khách thanh toán</label>
              <input
                type="text"
                // value={inputPayment.amount_paid.toLocaleString("vi-VN")}
                // onChange={onChangeAmountPaid}
                className="payment-invoice__input"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="payment-invoice__payment-methods">
              <div className="payment-invoice__method">
                <input
                  className="payment-invoice__checkbox"
                  type="radio"
                  id="cashmoney"
                  value={0}
                  // checked={selectedPaymentMethod === 0}
                  // onChange={handlePaymentMethodChange}
                />
                <label className="payment-invoice__label" htmlFor="cashmoney">
                  Tiền mặt
                </label>
              </div>
              <div className="payment-invoice__method">
                <input
                  className="payment-invoice__checkbox"
                  type="radio"
                  id="internetmoney"
                  value={1}
                  // checked={selectedPaymentMethod === 1}
                  // onChange={handlePaymentMethodChange}
                />
                <label className="payment-invoice__label" htmlFor="internetmoney">
                  Chuyển khoản
                </label>
              </div>
              <div className="payment-invoice__method">
                <input
                  className="payment-invoice__checkbox"
                  type="radio"
                  id="cashmoneyandinternetmoney"
                  value={2}
                  // checked={selectedPaymentMethod === 2}
                  // onChange={handlePaymentMethodChange}
                />
                <label className="payment-invoice__label" htmlFor="cashmoneyandinternetmoney">
                  Thanh toán kết hợp
                </label>
              </div>
            </div>

            {/* {selectedPaymentMethod === 1 && (
              <Select
                placeholder="-Tài khoản nhận-"
                allowClear
                onChange={(value) => {
                  handleSelectInfoBank(value);
                }}
                style={{ width: "100%", height: 40 }}
              >
                {infoBanking.map((option) => (
                  <option value={option.value} key={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            )} */}
            {/* {hiddenQRCode && (
              <div
                className="img-QR"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={linkQR}
                  alt="QR"
                  style={{
                    width: "150px",
                    height: "180px",
                    cursor: "pointer",
                  }}
                  onClick={detailQRCode}
                />
              </div>
            )} */}
            {/* {detailQrCode && <QRCode value={linkQR} />} */}
            <div className="option_price"></div>
            <div className="payment-invoice__money-return">
              <label className="payment-invoice__label">Tiền thừa trả khách</label>
              <div className="payment-invoice__return-amount">
                <p className="payment-invoice__price-amount">
                  {/* {inputPayment.change.toLocaleString("vi-VN")} */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-sidebar-bank">
          <button
            className="btn-pay"
            style={{
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            // onClick={clickPaymentTheBill}
          >
            THANH TOÁN
          </button>
          {/* {statePayment && ( */}
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
            }}
          >
            {/* <DetailInvoices
              ref={componentRef}
              idCustomer={selectedCustomer}
              selectedProducts={selectedProducts}
              amount_due={inputPayment.amount_due.toLocaleString("vi-VN")}
              amount_paid={inputPayment.amount_paid.toLocaleString("vi-VN")}
              discount_price={inputPayment.discount_price.toLocaleString("vi-VN")}
              isVoicesID={isVoicesID}
            /> */}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default RightPageContent;
