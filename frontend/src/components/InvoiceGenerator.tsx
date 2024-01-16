
import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface Item {
  username: string;
  quantity: number;
  price: number;
  taxRate: number;
}

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [items, setItems] = useState<Item[]>([
    { username: "", quantity: 0, price: 0, taxRate: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { username: "", quantity: 0, price: 0, taxRate: 0 }]);
  };
    const submitInvoice = async () => {
    const invoiceData = {
      customerName,
      customerEmail,
      items,
      total: calculateTotal()
    };

    try {
      const response = await fetch('http://localhost:3002/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Invoice submitted:', result);
       window.location.href = '/invoices';
    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      const itemTotal = item.quantity * item.price;
      const itemTax = (itemTotal * item.taxRate) / 100;
      total += itemTotal + itemTax;
    }
    return total;
  };

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Invoice Number: 12345</Text>
          <Text>Customer Name: {customerName}</Text>
          <Text>Customer Email: {customerEmail}</Text>
          <Text>Invoice Items:</Text>
          {items.map((item, index) => (
            <Text key={index}>
              Item {index + 1}: {item.username}, Quantity: {item.quantity}, Price: ${item.price}, Tax Rate: {item.taxRate}%
            </Text>
          ))}
          <Text>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="invoice-generator">
      <h1>Invoice Generator</h1>
      <div>
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>Customer Email:</label>
        <input
          type="text"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>
      <div>
        <h2>Invoice Items</h2>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Item Name"
              value={item.username}
              onChange={(e) => {
                const updatedItems = [...items];
                updatedItems[index].username = e.target.value;
                setItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => {
                const updatedItems = [...items];
                updatedItems[index].quantity = parseInt(e.target.value, 10) || 0;
                setItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => {
                const updatedItems = [...items];
                updatedItems[index].price = parseFloat(e.target.value) || 0;
                setItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder="Tax Rate (%)"
              value={item.taxRate}
              onChange={(e) => {
                const updatedItems = [...items];
                updatedItems[index].taxRate = parseFloat(e.target.value) || 0;
                setItems(updatedItems);
              }}
            />
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addItem}>Add Item</button>
      </div>
      <div>
        <h2>Invoice Summary</h2>
        <p>Total: ${calculateTotal().toFixed(2)}</p>
        <button onClick={submitInvoice}>Submit Invoice</button>
        <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    margin: 10,
  },
  section: {
    flexGrow: 1,
  },
});

export default InvoiceGenerator;
