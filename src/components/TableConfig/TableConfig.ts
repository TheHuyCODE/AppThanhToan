export const localeProduct = {
  emptyText: "Không có sản phẩm",
};
export const localCategory = {
  emptyText: "Không có danh mục cấp 1",
};
export const localCategorySeconds = {
  emptyText: "Không có danh mục cấp 2",
};
export const localCategoryThirds = {
  emptyText: "Không có danh mục cấp 3",
};
export const localInvoice = {
  emptyText: "Không có hóa đơn",
};
export const localUsers = {
  emptyText: "Không có người dùng",
};
export const localPayment = {
  emptyText: "Không có phương thức thanh toán",
};
export const localCustomer = {
  emptyText: "Không có khách hàng",
};
export const localReturn = {
  emptyText: "Không có trả hàng",
};
export const paginationConfig = {
  position: ["bottomCenter"],
  defaultCurrent: 6,
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30"],
};
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/;
export const domain = {
  domainLink: "https://cdtn.boot.ai",
};

// src/TableConfig/TableConfig.ts
export interface DataProfile {
  address: string | null;
  age: number | null;
  created_date: number;
  email: string;
  full_name: string;
  gender: string | null;
  group: {
    key: string;
    valid: number;
  };
  group_id: string;
  id: string;
  is_active: boolean;
  modified_date: number;
  phone: string;
}
export interface DataUser {
  stt: number;
  id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  key: string;
}