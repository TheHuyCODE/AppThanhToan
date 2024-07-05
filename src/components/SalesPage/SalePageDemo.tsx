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

const SalePageDemo: React.FC = () => {
  const [dataProduct, setDataProduct] = useState<Product[]>([]);
  const [dataTableInvoice, setDataTableInvoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 700); // Delay 500ms
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiddenPopUpDiscountPrice, setHiddenPopUpDiscountPrice] = useState(false);
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [keyRemove, setKeyRemove] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: Product[] }>(() => {
    const savedProducts = localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : {};
  });
  const [total, setTotal] = useState<{ quantity: number; price: number }>({
    quantity: 0,
    price: 0,
  });
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

  const openModal = () => {
    setOpen(!open);
  };
  const fetchDataProduct = async () => {
    try {
      const res = await products.getSellProduct();
      if (res.data && Array.isArray(res.data.items)) {
        setDataProduct(res.data.items);
      } else {
        console.error("API response is not an array:", res.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const currentProducts = prevSelectedProducts[activeKey] || [];
      const existingProduct = currentProducts.find((p) => p.id === product.id);
      const updatedProducts = existingProduct
        ? currentProducts.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p))
        : [...currentProducts, { ...product, quantity: 1 }];

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

  const handleChangeNumberCards = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
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

  const decrement = (productId: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const currentProducts = prevSelectedProducts[activeKey] || [];
      const updatedProducts = currentProducts.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
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

  const increment = (productId: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const currentProducts = prevSelectedProducts[activeKey] || [];
      const updatedProducts = currentProducts.map((product) =>
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
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
    // const discountInVND = inputPayment.discount_price;
    // const discountInPercent = (discountInVND / total.price) * 100;
    // setInputPayment((prev) => ({
    //   ...prev,
    //   discount_price: Math.round(discountInPercent),
    // }));
  };
  const addInvoice = () => {
    if (Object.keys(selectedProducts).length < maxItems) {
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
      console.log("actiiveKey:", newInvoice.id_payment);
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
      };

      // Add the new return invoice to the invoice list
      setInvoiceList((prev) => [...prev, newInvoice]);
      setActiveKey(newKey);
      setIsModalOpen(false); // Close the modal after adding the invoice
    } else {
      toast.warning("Không thể thêm quá 5 hóa đơn");
    }
  };

  const handleDetailInvoiceReturn = async (id: string) => {
    try {
      const res = await invoice.getDataDetailInvoiceReturn(id);
      const returnedInvoice = res.data;
      setInvoiceList((prevInvoiceList) => {
        return prevInvoiceList.map((invoice) => {
          if (invoice.type === "return") {
            return {
              ...invoice,
              items: returnedInvoice.product,
            };
          }
          // localStorage.setItem("invoiceList", JSON.stringify(updatedInvoiceList));
          return invoice;
        });
      });

      console.log("Updated invoiceList with returned items", invoiceList);
    } catch (err) {
      console.log("Error fetching invoice return details", err);
    }
  };

  // const removeInvoice = (key: string) => {
  //   console.log("key", key);
  //   const keyRemove = key;
  //   setKeyRemove(keyRemove);
  //   if (key === "1") {
  //     setSelectedProducts((prevSelectedProducts) => {
  //       // Clear products associated with invoice "Hóa đơn 1"
  //       const updatedSelectedProducts = { ...prevSelectedProducts };
  //       delete updatedSelectedProducts[key];
  //       return updatedSelectedProducts;
  //     });
  //     setInvoiceList((prev) => {
  //       // Find the invoice with id === 1 and set its items to an empty array
  //       return prev.map((invoice) => (invoice.id === 1 ? { ...invoice, items: [] } : invoice));
  //     });
  //     setActiveKey("1"); // Set to the initial invoice
  //   } else {
  //     setInvoiceList((prev) => prev.filter((invoice) => invoice.id !== parseInt(key)));
  //     setSelectedProducts((prev) => {
  //       const newProducts = { ...prev };
  //       delete newProducts[key];
  //       return newProducts;
  //     });
  //   }
  // };
  const removeInvoice = (key: string) => {
    const invoiceToRemove = invoiceList.find((invoice) => invoice.id_payment === key);
    if (invoiceToRemove && invoiceToRemove.items.length > 0) {
      // Invoice has products, show confirmation modal
      setKeyRemove(key);
      openModal();
    } else {
      // Invoice has no products, remove directly
      if (key === "1") {
        setSelectedProducts((prevSelectedProducts) => {
          const updatedSelectedProducts = { ...prevSelectedProducts };
          delete updatedSelectedProducts[key];
          return updatedSelectedProducts;
        });
        setInvoiceList((prev) =>
          prev.map((invoice) => (invoice.id === 1 ? { ...invoice, items: [] } : invoice))
        );
        setActiveKey("1");
      } else {
        setInvoiceList((prev) => prev.filter((invoice) => invoice.id !== parseInt(key)));
        setSelectedProducts((prev) => {
          const newProducts = { ...prev };
          delete newProducts[key];
          return newProducts;
        });
      }
    }
  };
  const removeReturnInvoice = (key: string) => {
    const returnInvoiceToRemove = invoiceList.find(
      (invoice) => invoice.id_payment === key && invoice.type === "return"
    );
    if (returnInvoiceToRemove) {
      setInvoiceList((prev) => prev.filter((invoice) => invoice.id_payment !== key));
      setSelectedProducts((prev) => {
        const updatedProducts = { ...prev };
        delete updatedProducts[key];
        return updatedProducts;
      });
    } else {
      toast.warning("Hóa đơn trả hàng không tồn tại hoặc đã bị xóa.");
    }
  };

  const confirmRemoveInvoice = () => {
    if (keyRemove) {
      if (keyRemove === "1") {
        setSelectedProducts((prevSelectedProducts) => {
          // Clear products associated with invoice "Hóa đơn 1"
          const updatedSelectedProducts = { ...prevSelectedProducts };
          delete updatedSelectedProducts[keyRemove];
          return updatedSelectedProducts;
        });
        setInvoiceList((prev) => {
          // Find the invoice with id === 1 and set its items to an empty array
          return prev.map((invoice) => (invoice.id === 1 ? { ...invoice, items: [] } : invoice));
        });
        setActiveKey("1"); // Set to the initial invoice
      } else {
        setInvoiceList((prev) => prev.filter((invoice) => invoice.id !== parseInt(keyRemove)));
        setSelectedProducts((prev) => {
          const newProducts = { ...prev };
          delete newProducts[keyRemove];
          return newProducts;
        });
      }
    }
    openModal();
  };
  const getDataInvoiceReturn = async () => {
    try {
      const res = await invoice.getAllInvoices();
      if (res.code === 200) {
        const data = res.data.items;
        console.log("dataInvoice", data);
        setDataTableInvoice(data);
      } else {
        console.log("message", res.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  const handleSearchInvoices = async (searchTerm: string) => {
    console.log("valueSearch", searchTerm);
    try {
      const res = await invoice.getDataSearchInvoice(searchTerm);
      if (res.code === 200) {
        const data = res.data.items;
        setDataTableInvoice(data);
      } else {
        console.log("message", res.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchInvoices(debouncedSearchTerm);
    } else {
      getDataInvoiceReturn();
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    localStorage.setItem("invoiceList", JSON.stringify(invoiceList));
  }, [invoiceList]);

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    fetchDataProduct();
  }, []);
  return (
    <>
      <ToastContainer />
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
        />
        <div className="page-content">
          <LeftPageContent
            dataProduct={dataProduct}
            handleProductClick={handleProductClick}
            activeKey={activeKey}
            selectedProducts={selectedProducts[activeKey] || []}
          />
          <RightPageContent
            selectedProducts={selectedProducts[activeKey] || []}
            total={total}
            // handleOpenModal={handleOpenModal}
            handleChangeNumberCards={handleChangeNumberCards}
            decrement={decrement}
            increment={increment}
            dataProduct={dataProduct}
            handleProductClick={handleProductClick}
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
            hiddenPopUpDiscountPrice={hiddenPopUpDiscountPrice}
          />
        </div>
      </div>
    </>
  );
};

export default SalePageDemo;
