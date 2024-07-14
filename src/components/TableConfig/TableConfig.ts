export const localeProduct = {
  emptyText: "Không có sản phẩm",
};
export const localCategory = {
  emptyText: "Không có danh mục",
};
export const localInvoice = {
  emptyText: "Không có hóa đơn",
};

export const paginationConfig = {
  position: ["bottomCenter"],
  defaultCurrent:6,
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30"],
};

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
