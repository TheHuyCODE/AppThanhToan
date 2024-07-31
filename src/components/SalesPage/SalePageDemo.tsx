import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import products from "../../configs/products";
import HeaderPageSales from "./HeaderPageSales";
import LeftPageContent from "./LeftPageContent";
import RightPageContent from "./RightPageContent";
import "./SalePage.css";
import "../styles/valiables.css";
import { Modal } from "antd";
import invoice from "../../configs/invoice";
import useDebounce from "../auth/useDebounce";
import category from "../../configs/category";
import sellProduct from "../../configs/sellProduct";
import ReturnInvoice from "../Invoices/ReturnInvoice";
import { GiCardKingClubs } from "react-icons/gi";
import LeftReturnInvoice from "../Invoices/LeftReturnInvoice";
import { previousDay } from "date-fns";
interface Product {
  id: number;
  name: string;
  price: number;
  capital_price: number;
  // Add other necessary fields
}
interface Invoice {
  id: number;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  total_price: number;
  created_date: number;
  items: Product[];
  id_payment: string;
  type: string;
}
interface InfoBankingItem {
  value: number;
  id: string;
  account_name: string;
  account_no: string;
  bank_id: string;
  template: string;
  name: string;
}
interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}
interface Customer {
  id: string;
  full_name: string;
}
const SalePageDemo: React.FC = () => {
  const [dataProduct, setDataProduct] = useState<Product[]>([]);
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [isDataCustomer, setIsDataCustomer] = useState<Customer[]>([]);
  const [bankingData, setBankingData] = useState<InfoBankingItem[]>([]);
  const [isSelectItemPayment, setIsSelectItemPayment] = useState([]);
  const [dataReturnPayment, setDataReturnPayment] = useState([]);
  const [dataTableInvoice, setDataTableInvoice] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [idSearchCategory, setIdSearchCategory] = useState({
    id_category: "",
  });
  const [valueSearch, setValueSearch] = useState("");
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  const [totalInvoice, setTotalInvoice] = useState(0);
  const debounceValueSearch = useDebounce(valueSearch, 700);
  const debouncedSearchTerm = useDebounce(searchTerm, 700); // Delay 500ms
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [hiddenQRCode, setHiddenQRCode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenPaymentReturn, setIsOpenPaymentReturn] = useState(false);
  const [hiddenPopUpDiscountPrice, setHiddenPopUpDiscountPrice] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [keyRemove, setKeyRemove] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: Product[] }>(() => {
    const savedProducts = localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : {};
  });
  const [editedPrices, setEditedPrices] = useState<{ [key: string]: boolean }>({});
  const [total, setTotal] = useState<{ quantity: number; price: number }>({
    quantity: 0,
    price: 0,
  });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [amountPaid, setAmountPaid] = useState(finalPrice);
  const [isPercentage, setIsPercentage] = useState(false);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(() => {
    const savedInvoices = localStorage.getItem("invoiceList");
    const parsedInvoices = savedInvoices ? JSON.parse(savedInvoices) : [];

    // Check if "Hóa đơn 1" already exists in parsedInvoices
    const defaultInvoiceExists = parsedInvoices.some((invoice: Invoice) => invoice.id === 1);
    if (!defaultInvoiceExists) {
      parsedInvoices.push({
        id: 1,
        invoice_number: "Hóa đơn 1",
        customer_id: "",
        customer_name: "",
        total_price: 0,
        created_date: Date.now(),
        items: [],
        id_payment: "1",
        type: "invoice",
      });
    }

    return parsedInvoices;
  });
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState<number>(() => {
    const savedInvoices = localStorage.getItem("invoiceList");
    const parsedInvoices = savedInvoices ? JSON.parse(savedInvoices) : [];

    const highestInvoiceNumber =
      parsedInvoices.length > 0
        ? Math.max(...parsedInvoices.map((invoice: Invoice) => invoice.id))
        : 0;

    return highestInvoiceNumber + 1;
  });
  const [activeKey, setActiveKey] = useState<string>("1");
  const maxItems: number = 5;
  const dataCategorySearch = dataCategory?.map((item, index) => ({
    name: item.name,
    value: index + 1,
    id: item.id,
  }));
  const openModal = () => {
    setOpen(!open);
  };
  const fetchDataProduct = async () => {
    try {
      const res = await products.getSellProductPagination();
      if (res.data && Array.isArray(res.data.items)) {
        setDataProduct(res.data.items);
        setTotalItems(res.data.total); // Corrected this line
      } else {
        console.error("API response is not an array:", res.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const fetchDataProductAfter = async (current: number, page_size: number) => {
    try {
      const res = await products.getDataProductPagination(current, page_size);
      if (res.data) {
        setDataProduct(res.data.items);
        setTotalItems(res.data.total);
      } else {
        console.error("API response is not an array:", res.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleInputDiscountPrice = () => {
    setHiddenPopUpDiscountPrice(!hiddenPopUpDiscountPrice);
  };
  const handleProductClick = (product: Product) => {
    setInvoiceList((prevInvoices) =>
      prevInvoices.map((invoice) => {
        if (invoice.id_payment === activeKey) {
          const existingProduct = invoice.items.find((p) => p.id === product.id);
          const updatedItems = existingProduct
            ? invoice.items.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              )
            : [...invoice.items, { ...product, quantity: 1 }];
          return { ...invoice, items: updatedItems };
        }
        return invoice;
      })
    );
  };
  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      await fetchScanProductData(value);
      setValueSearchProduct("");
    }
  };
  const fetchScanProductData = async (barcode: string) => {
    try {
      const res = await products.getDataSearchBarcodeProduct(barcode);
      // Kiểm tra xem res.data.items có tồn tại và là một mảng
      if (res.data) {
        const foundProduct = res.data;
        console.log("foundProduct", foundProduct);
        setValueSearchProduct(foundProduct);
        setInvoiceList((prevInvoices) =>
          prevInvoices.map((invoice) => {
            if (invoice.id_payment === activeKey) {
              const existingProduct = invoice.items.find((p) => p.id === foundProduct.id);
              const updatedItems = existingProduct
                ? invoice.items.map((p) =>
                    p.id === foundProduct.id ? { ...p, quantity: p.quantity + 1 } : p
                  )
                : [...invoice.items, { ...foundProduct, quantity: 1 }];
              return { ...invoice, items: updatedItems };
            }
            return invoice;
          })
        );
      } else {
        console.error("API response is not a valid product object:", res.data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleChangeNumberCards = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const newQuantity = parseInt(e.target.value, 10);
    setSelectedProducts((prevSelectedProducts) => {
      const currentProducts = prevSelectedProducts[activeKey] || [];
      const updatedProducts = currentProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      );
      updateTotal(updatedProducts);
      // Update the invoiceList to include the updated products
      setInvoiceList((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id_payment === activeKey ? { ...invoice, items: updatedProducts } : invoice
        )
      );
      return { ...prevSelectedProducts, [activeKey]: updatedProducts };
    });
  };
  const handleChangePriceProduct = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    let value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
    console.log("value", value);
    console.log("productId", productId);
    if (isNaN(value)) {
      value = 0; // Set a default value if the input is not a number
    }
    setInvoiceList((prevInvoices) =>
      prevInvoices.map((invoice) => {
        if (invoice.id_payment === activeKey) {
          const updatedItems = invoice.items.map((p) =>
            p.id === productId ? { ...p, capital_price: value } : p
          );
          return { ...invoice, items: updatedItems };
        }
        return invoice;
      })
    );
    setEditedPrices((prev) => ({ ...prev, [productId]: true }));
  };
  const handleBlurPriceProduct = (productId: string) => {
    setEditedPrices((prev) => ({ ...prev, [productId]: true }));
  };
  const decrement = (invoiceId: string, productId: string) => {
    console.log("invoice", typeof invoiceId);
    setInvoiceList((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id_payment === invoiceId
          ? {
              ...invoice,
              items: invoice.items.map((product: any) =>
                product.id === productId && product.quantity > 1
                  ? { ...product, quantity: product.quantity - 1 }
                  : product
              ),
            }
          : invoice
      )
    );
  };
  const decrementReturn = (invoiceID: string, productID: string) => {
    setInvoiceList((prevInvoices) => {
      const updatedInvoices = prevInvoices.map((invoice) =>
        invoice.id_payment === invoiceID
          ? {
              ...invoice,
              items: invoice.items.map((product: any) =>
                product.id === productID
                  ? {
                      ...product,
                      quantity: Math.max(product.quantity - 1, 0),
                      total_price: Math.max((product.quantity - 1) * product.price, 0),
                    }
                  : product
              ),
            }
          : invoice
      );

      return updatedInvoices;
    });
  };
  const increment = (invoiceId: string, productId: string) => {
    setInvoiceList((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id_payment === invoiceId
          ? {
              ...invoice,
              items: invoice.items.map((product: any) =>
                product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
              ),
            }
          : invoice
      )
    );
  };
  const incrementReturn = (invoiceID: string, productID: string) => {
    setInvoiceList((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id_payment === invoiceID
          ? {
              ...invoice,
              items: invoice.items.map((product: any) =>
                product.id === productID && product.quantity < product.remaining_quantity
                  ? {
                      ...product,
                      quantity: product.quantity + 1,
                      total_price: (product.quantity + 1) * product.price,
                    }
                  : product
              ),
            }
          : invoice
      )
    );
  };
  const removeProductCarts = (invoiceId: string, productId: string) => {
    console.log("Invoice ID:", invoiceId);
    console.log("Product ID:", productId);
    setInvoiceList((prevState) =>
      prevState.map((invoice) => {
        if (invoice.id_payment === invoiceId) {
          return {
            ...invoice,
            items: invoice.items.filter((product) => product.id !== productId),
          };
        }
        return invoice;
      })
    );
  };

  const updateTotal = (products: Product[]) => {
    const newTotal = products.reduce(
      (acc, product) => ({
        quantity: acc.quantity + product.quantity,
        price: acc.price + product.quantity * product.capital_price,
      }),
      { quantity: 0, price: 0 }
    );
    setTotal(newTotal);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    setHiddenPopUpDiscountPrice(false);
    console.log("1111111");
  };
  const addInvoice = () => {
    if (invoiceList.length < maxItems) {
      // Find the highest existing invoice number
      const highestInvoiceNumber = Math.max(...invoiceList.map((invoice) => invoice.id));
      const newInvoiceNumber = highestInvoiceNumber + 1;
      const newKey = `${newInvoiceNumber}`;
      const newInvoice: Invoice = {
        id: newInvoiceNumber,
        invoice_number: `Hóa đơn ${newInvoiceNumber}`,
        customer_id: "",
        customer_name: "",
        total_price: 0,
        created_date: Date.now(),
        items: [],
        id_payment: newKey,
        type: "invoice", // hóa đơn
      };
      setInvoiceList((prev) => [...prev, newInvoice]);
      setActiveKey(newKey);
      localStorage.setItem("idActiveInvoice", newKey);
      console.log("activeKey:", newInvoice.id_payment);
      setNextInvoiceNumber(newInvoiceNumber + 1);
    } else {
      toast.warning("Không thể thêm quá 5 hóa đơn");
    }
  };

  const addReturnInvoice = () => {
    setIsModalOpen(true);
    getDataInvoiceReturn();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const findCashBankIds = () => {
    const itemWithFalseType = bankingData.find((item) => item.type === false);
    const id = itemWithFalseType ? itemWithFalseType.id : null;

    console.log("idCashBankString", id);
    return id;
  };
  useEffect(() => console.log("111", findCashBankIds), []);
  const handlePaymentMethodChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newPaymentMethod = parseInt(event.target.value, 10);
    console.log("newPaymentMethod", newPaymentMethod);
    setSelectedPaymentMethod(newPaymentMethod);
    if (newPaymentMethod === 0 || newPaymentMethod === 2) {
      setHiddenQRCode(false);
    }
    // else {
    //   setHiddenQRCode(true); // Ẩn QR code nếu không phải các phương thức thanh toán trên
    // }
    // setShowSelect(false);
  };
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueSearch = e.target.value.trim();
    setValueSearch(valueSearch);
    console.log("valueSearch", valueSearch);
  };
  const handleSelectCategory = (value: number) => {
    const selectedCategory = dataCategorySearch.find((item) => item.value === value);
    if (selectedCategory) {
      console.log("select", selectedCategory.id);
      setIdSearchCategory({
        ...idSearchCategory,
        id_category: selectedCategory.id,
      });
    } else {
      console.log("Invalid category index:", value);
      fetchDataProduct();
    }
  };
  const fetchDataSearchProduct = async () => {
    try {
      const res = await products.getDataSearchNameProduct(debounceValueSearch);
      setDataProduct(res.data.items);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchDataSearchProduct();
    console.log("valueSearchProduct", valueSearch);
  }, [debounceValueSearch]);
  const fetchSearchDataCategory = async () => {
    try {
      const res = await products.getDataSearchProduct(idSearchCategory.id_category);
      setDataProduct(res.data.items);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    if (idSearchCategory.id_category) {
      fetchSearchDataCategory();
    }
  }, [idSearchCategory.id_category]);
  const handleAddReturnInvoice = async () => {
    if (invoiceList.length < maxItems) {
      const returnInvoiceIds = invoiceList
        .filter((invoice) => invoice.type === "return")
        .map((invoice) => invoice.id);
      const highestReturnInvoiceNumber =
        returnInvoiceIds.length > 0 ? Math.max(...returnInvoiceIds) : 0;
      const newReturnInvoiceNumber = highestReturnInvoiceNumber + 1;
      const newKey = `return-${newReturnInvoiceNumber}`;
      const newInvoice = {
        id: newReturnInvoiceNumber,
        invoice_number: `Trả hàng ${newReturnInvoiceNumber}`,
        customer_id: "",
        customer_name: "",
        total_price: 0,
        created_date: Date.now(),
        items: [],
        id_payment: newKey,
        type: "return",
        user: [],
        id_invoice: "",
      };
      // Add the new return invoice to the invoice list
      setInvoiceList((prev) => [...prev, newInvoice]);
      setActiveKey(newKey);
      setIsModalOpen(false);
      setIsOpenPaymentReturn(true);
      // Close the modal after adding the invoice
    } else {
      toast.warning("Không thể thêm quá 5 hóa đơn");
    }
  };

  const handleDetailInvoiceReturn = async (id: string) => {
    try {
      const res = await invoice.getDataDetailInvoiceReturn(id);
      const returnedInvoice = res.data;
      // Set the quantity of each product to 0
      const updatedProducts = returnedInvoice.product.map((product: any) => ({
        ...product,
        quantity: 0,
      }));
      setInvoiceList((prevInvoiceList) => {
        return prevInvoiceList.map((invoice) => {
          if (invoice.type === "return") {
            return {
              ...invoice,
              items: updatedProducts,
              user: returnedInvoice.create_user,
              id_invoice: returnedInvoice.id,
              customer_id: returnedInvoice.customer.id,
            };
          }
          return invoice;
        });
      });

      console.log("Updated invoiceList with returned items", invoiceList);
    } catch (err) {
      console.log("Error fetching invoice return details", err);
    }
  };

  // Always create Invoice number 1
  const createInvoiceOne = () => {
    const newInvoice: Invoice = {
      id: 1,
      invoice_number: `Hóa đơn 1`,
      customer_id: "",
      customer_name: "",
      total_price: 0,
      created_date: Date.now(),
      items: [],
      id_payment: "1",
      type: "invoice", // hóa đơn
    };
    setInvoiceList([newInvoice]);
  };
  const removeInvoice = (targetKey: string) => {
    const invoiceToRemove = invoiceList.find((invoice) => invoice.id_payment === targetKey);
    const remainingInvoices = invoiceList.filter((invoice) => invoice.id_payment !== targetKey);
    if (invoiceToRemove && invoiceToRemove.items.length > 0) {
      openModal();
      setKeyRemove(targetKey);
    } else if (invoiceList.length === 1 && targetKey === "1") {
      return;
    } else if (invoiceList.length === 1 && targetKey !== "1") {
      createInvoiceOne();
      setActiveKey("1");
      localStorage.setItem("idActiveInvoice", "1");
    } else {
      // Invoice has no items, remove directly
      setInvoiceList(remainingInvoices);
      if (remainingInvoices.length) {
        const targetIndex = invoiceList.findIndex((invoice) => invoice.id_payment === targetKey);
        const newActiveKey =
          targetIndex > 0
            ? remainingInvoices[targetIndex - 1].id_payment
            : remainingInvoices[0].id_payment;
        setActiveKey(newActiveKey);
        localStorage.setItem("idActiveInvoice", newActiveKey);
      } else {
        setActiveKey("1");
      }
    }
  };
  const removeReturnInvoice = (key: string) => {
    const returnInvoiceToRemove = invoiceList.find(
      (invoice) => invoice.id_payment === key && invoice.type === "return"
    );
    if (returnInvoiceToRemove) {
      const remainingInvoices = invoiceList.filter((invoice) => invoice.id_payment !== key);
      if (remainingInvoices.length === 0) {
        createInvoiceOne();
        setActiveKey("1");
        localStorage.setItem("idActiveInvoice", "1");
      } else {
        setInvoiceList(remainingInvoices);
        setActiveKey("1");
      }
    } else {
      toast.warning("Hóa đơn trả hàng không tồn tại hoặc đã bị xóa.");
    }
  };

  const confirmRemoveInvoice = () => {
    if (keyRemove) {
      if (keyRemove === "1") {
        const newInvoiceList = invoiceList.filter((invoice) => invoice.id_payment !== keyRemove);
        setInvoiceList(newInvoiceList);
        if (newInvoiceList.length) {
          const targetIndex = invoiceList.findIndex((invoice) => invoice.id_payment === keyRemove);
          const newActiveKey =
            targetIndex > 0
              ? newInvoiceList[targetIndex - 1].id_payment
              : newInvoiceList[0].id_payment;
          setActiveKey(newActiveKey);
          localStorage.setItem("idActiveInvoice", newActiveKey);
        } else {
          createInvoiceOne();
          setActiveKey("1");
          localStorage.setItem("idActiveInvoice", "1");
        }
      } else {
        const newInvoiceList = invoiceList.filter((invoice) => invoice.id_payment !== keyRemove);
        setInvoiceList(newInvoiceList);

        if (newInvoiceList.length) {
          const targetIndex = invoiceList.findIndex((invoice) => invoice.id_payment === keyRemove);
          const newActiveKey =
            targetIndex > 0
              ? newInvoiceList[targetIndex - 1].id_payment
              : newInvoiceList[0].id_payment;
          setActiveKey(newActiveKey);
          localStorage.setItem("idActiveInvoice", newActiveKey);
        } else {
          createInvoiceOne();
          setActiveKey("1");
          localStorage.setItem("idActiveInvoice", "1");
        }
      }
      openModal();
    }
  };
  const removeNotConFirmInvoice = (targetKey: string) => {
    const invoiceToRemove = invoiceList.find((invoice) => invoice.id_payment === targetKey);
    const remainingInvoices = invoiceList.filter((invoice) => invoice.id_payment !== targetKey);
    if (invoiceToRemove) {
      if (invoiceList.length === 1 && targetKey === "1") {
        // Only one invoice left and it's "Hóa đơn 1", do not allow removal
        clearInvoiceOneData();
        setActiveKey("1");
        localStorage.setItem("idActiveInvoice", "1");
        return;
      }
      setInvoiceList(remainingInvoices);
      if (targetKey === "1") {
        // If "Hóa đơn 1" is removed, set the active key to the first remaining invoice
        if (remainingInvoices.length) {
          setActiveKey(remainingInvoices[0].id_payment);
          localStorage.setItem("idActiveInvoice", remainingInvoices[0].id_payment);
        } else {
          // If no remaining invoices, reset to default "Hóa đơn 1"
          createInvoiceOne();
          setActiveKey("1");
          localStorage.setItem("idActiveInvoice", "1");
        }
      } else {
        // If other invoice is removed, ensure "Hóa đơn 1" is visible
        if (remainingInvoices.length) {
          setActiveKey(remainingInvoices[0].id_payment);
          localStorage.setItem("idActiveInvoice", remainingInvoices[0].id_payment);
        } else {
          createInvoiceOne();
          setActiveKey("1");
          localStorage.setItem("idActiveInvoice", "1");
        }
      }
    } else {
      console.log("err");
    }
  };
  const clearInvoiceOneData = () => {
    // Logic to clear data in "Hóa đơn 1"
    const updatedInvoiceList = invoiceList.map((invoice) =>
      invoice.id_payment === "1"
        ? { ...invoice, items: [], total: 0 } // Clear specific fields
        : invoice
    );
    setInvoiceList(updatedInvoiceList);
  };
  const getInfoBanking = async () => {
    try {
      const res = await sellProduct.getInfoBank();
      const dataBank = res.data.items;
      setBankingData(dataBank);
      console.log("data", dataBank);
    } catch (error) {
      console.error("Error fetching banking data", error);
    }
  };
  const getDataCategory = async () => {
    const res = await products.getCategoryProduct();
    if (res.data && Array.isArray(res.data.category)) {
      const data = res.data.category;
      setDataCategory(data);
      console.log("dataCategory", dataCategory);
    } else {
      console.error("API response is not an array:", res.data);
    }
  };
  const getDataInvoiceReturn = async () => {
    setLoading(true);
    try {
      const res = await invoice.getAllInvoices();
      if (res.code === 200) {
        const data = res.data.items;
        const totalInvoices = res.data.total;
        setDataTableInvoice(data);
        setTotalInvoice(totalInvoices);
        setLoading(false);
      } else {
        console.log("message", res.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
      setLoading(false);
    }
  };
  const getDataCustomer = async () => {
    try {
      const res = await sellProduct.getCustomer();
      if (res.code === 200) {
        const dataCustomer = res.data.items;
        setIsDataCustomer(dataCustomer);
        localStorage.setItem("info_customer", JSON.stringify(dataCustomer));
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleSearchInvoices = async (searchTerm: string) => {
    console.log("valueSearch", searchTerm);
    setLoading(true);
    try {
      const res = await invoice.getDataSearchInvoice(searchTerm);
      if (res.code === 200) {
        const data = res.data.items;
        setDataTableInvoice(data);
        setLoading(false);
      } else {
        console.log("message", res.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchInvoices(debouncedSearchTerm);
    } else {
      getDataInvoiceReturn();
    }
  }, [debouncedSearchTerm]);
  const detailTotalInvoice = (invoiceID: string) => {
    const activeInvoice = invoiceList.find((invoice) => invoice.id_payment === invoiceID);
    if (activeInvoice) {
      const totalQuantity = activeInvoice.items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = activeInvoice.items.reduce(
        (sum, item) => sum + item.quantity * item.capital_price,
        0
      );
      return { totalQuantity, totalPrice };
    }
    return { totalQuantity: 0, totalPrice: 0 };
  };
  const calculateFinalPrice = (totalPrice: any, discountPrice: any, isPercentage: any) => {
    let finalPrice = totalPrice;
    if (isPercentage) {
      finalPrice -= (totalPrice * discountPrice) / 100;
    } else {
      finalPrice -= discountPrice;
    }
    setFinalPrice(finalPrice);
    setAmountPaid(finalPrice);
  };
  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      value = "0";
    }
    setAmountPaid(parseFloat(value));
  };
  const calculateChange = () => {
    const change = amountPaid - finalPrice;
    return change < 0 ? 0 : change.toLocaleString("vi-VN");
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    console.log("value", value);
    if (value === "") {
      value = "0";
    }
    let parsedValue = parseFloat(value);
    if (!isPercentage && parsedValue > totalPrice) {
      parsedValue = totalPrice;
    } else if (isPercentage && parsedValue > 100) {
      parsedValue = 100;
    }
    setDiscountPrice(parsedValue);
  };
  const handleVNDClick = () => {
    if (isPercentage) {
      // Convert percentage discount to VND
      const discountInVND = ((totalPrice * discountPrice) / 100).toFixed(2);
      setDiscountPrice(parseFloat(discountInVND));
      setIsPercentage(false);
    }
    setIsPercentage(false);
  };
  const handlePercentageClick = () => {
    if (!isPercentage) {
      // Convert VND discount to percentage
      const discountInPercentage = ((discountPrice / totalPrice) * 100).toFixed(2);
      setDiscountPrice(parseFloat(discountInPercentage));
      setIsPercentage(true);
    }
    setIsPercentage(true);
  };
  const typeInvoiListDetail = () => {
    const typeInvoiceList = invoiceList.filter(
      (invoice) => invoice.type === "invoice" && invoice.id_payment === activeKey
    );
    const items = typeInvoiceList.flatMap((invoice) =>
      invoice.items.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.capital_price,
        total_price: product.quantity * product.capital_price,
      }))
    );
    return items;
  };
  // const calculateAndPrintInvoice = () => {
  //   console.log("build payment");
  //   const Items = typeInvoiListDetail();
  // };
  useEffect(() => {
    const { totalQuantity, totalPrice } = detailTotalInvoice(activeKey);
    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
    setAmountPaid(totalPrice);
    calculateFinalPrice(totalPrice, discountPrice, isPercentage);
    console.log("activeKey", activeKey);
    const typeInvoiceList = invoiceList.filter(
      (invoice) => invoice.type === "return" && invoice.id_payment === activeKey
    );
    setDataReturnPayment(typeInvoiceList);
  }, [invoiceList, activeKey, discountPrice, isPercentage, totalPrice]);
  useEffect(() => {
    console.log("111");
    if (activeKey.includes("return")) {
      setIsOpenPaymentReturn(true);
      console.log("isOpenPaymentReturn", isOpenPaymentReturn);
    } else {
      setIsOpenPaymentReturn(false);
    }
  }, [activeKey]);

  useEffect(() => {
    localStorage.setItem("invoiceList", JSON.stringify(invoiceList));
    setDiscountPrice(0);
  }, [invoiceList]);

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    fetchDataProduct();
    getDataCategory();
    getDataCustomer();
    getInfoBanking();
  }, []);
  return (
    <>
      {/* <ToastContainer closeOnClick autoClose={5000} /> */}
      <Modal
        title=""
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={400}
        open={open}
        onOk={confirmRemoveInvoice}
        onCancel={openModal}
        okText="Đồng ý"
        cancelText="Bỏ qua"
      >
        <h3 className="confirm_remove_invoices">Đóng hóa đơn {keyRemove}</h3>
        <p className="text_remove_invoices">
          Thông tin của <span>Hóa đơn {keyRemove}</span> sẽ không được lưu lại. Bạn có chắc chắn
          muốn đóng không?
        </p>
      </Modal>
      <div className="containner-sales">
        <HeaderPageSales
          addInvoice={addInvoice}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
          items={invoiceList}
          removeInvoice={removeInvoice}
          removeReturnInvoice={removeReturnInvoice}
          handleAddReturnInvoice={handleAddReturnInvoice}
          onDetailInvoiceReturn={handleDetailInvoiceReturn}
          isModalOpen={isModalOpen}
          addReturnInvoice={addReturnInvoice}
          closeModal={closeModal}
          dataTableInvoice={dataTableInvoice}
          onSearchInvoices={setSearchTerm}
          handleEnterPress={handleEnterPress}
          setDataTableInvoice={setDataTableInvoice}
          totalInvoice={totalInvoice}
          setLoading={setLoading}
          loading={loading}
        />
        <div className="page-content">
          {isOpenPaymentReturn ? (
            <LeftReturnInvoice
              invoiceList={invoiceList}
              activeKey={activeKey}
              removeProductCarts={removeProductCarts}
              decrement={decrement}
              increment={increment}
              // updateProductTotal={updateProductTotal}
              decrementReturn={decrementReturn}
              incrementReturn={incrementReturn}
            />
          ) : (
            <LeftPageContent
              dataProduct={dataProduct}
              handleProductClick={handleProductClick}
              removeProductCarts={removeProductCarts}
              activeKey={activeKey}
              invoiceList={invoiceList}
              decrement={decrement}
              increment={increment}
              setIsOpenPaymentReturn={setIsOpenPaymentReturn}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              setIsSelectItemPayment={setIsSelectItemPayment}
              handleChangePriceProduct={handleChangePriceProduct}
              handleBlurPriceProduct={handleBlurPriceProduct}
              editedPrices={editedPrices}
              detailTotalInvoice={detailTotalInvoice}
              setInvoiceList={setInvoiceList}
              // selectedProducts={selectedProducts[activeKey] || []}
            />
          )}
          {isOpenPaymentReturn ? (
            <ReturnInvoice
              dataReturnPayment={dataReturnPayment}
              removeReturnInvoice={removeReturnInvoice}
              activeKey={activeKey}
            />
          ) : (
            <RightPageContent
              selectedProducts={selectedProducts[activeKey] || []}
              total={total}
              dataCategory={dataCategory}
              handleChangeNumberCards={handleChangeNumberCards}
              handleInputDiscountPrice={handleInputDiscountPrice}
              dataProduct={dataProduct}
              handleProductClick={handleProductClick}
              toggleSidebar={toggleSidebar}
              setSidebarVisible={setSidebarVisible}
              isSidebarVisible={isSidebarVisible}
              hiddenPopUpDiscountPrice={hiddenPopUpDiscountPrice}
              isDataCustomer={isDataCustomer}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              activeKey={activeKey}
              discountPrice={discountPrice}
              finalPrice={finalPrice}
              handleDiscountChange={handleDiscountChange}
              handleVNDClick={handleVNDClick}
              handlePercentageClick={handlePercentageClick}
              isPercentage={isPercentage}
              calculateChange={calculateChange}
              handleAmountPaidChange={handleAmountPaidChange}
              amountPaid={amountPaid}
              setHiddenPopUpDiscountPrice={setHiddenPopUpDiscountPrice}
              handlePaymentMethodChange={handlePaymentMethodChange}
              bankingData={bankingData}
              selectedPaymentMethod={selectedPaymentMethod}
              setHiddenQRCode={setHiddenQRCode}
              hiddenQRCode={hiddenQRCode}
              // calculateAndPrintInvoice={calculateAndPrintInvoice}
              typeInvoiListDetail={typeInvoiListDetail}
              findCashBankIds={findCashBankIds}
              handleSearchProduct={handleSearchProduct}
              handleSelectCategory={handleSelectCategory}
              fetchDataProductAfter={fetchDataProductAfter}
              fetchDataProduct={fetchDataProduct}
              getDataCustomer={getDataCustomer}
              removeNotConFirm={removeNotConFirmInvoice}
              totalItems={totalItems}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SalePageDemo;
