import React from 'react';
import { useState, useEffect } from 'react';

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  taxRate: number;
}

interface Invoice {
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
  total: number;
}


const InvoicesList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
       
        const response = await fetch('http://localhost:3002/invoices');

        if (!response.ok) {
          throw new Error('Could not fetch invoices!');
        }

        const data: Invoice[] = await response.json();
        setInvoices(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='center'>

   
    <div className="invoice-table-container">
      <h1>Invoices</h1>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.customerName}</td>
                <td>{invoice.customerEmail}</td>
                <td>
                  <ul>
                    {invoice.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name}: {item.quantity} x ${item.price.toFixed(2)} (Tax: {item.taxRate}%)
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${invoice.total.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No invoices found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default InvoicesList;
