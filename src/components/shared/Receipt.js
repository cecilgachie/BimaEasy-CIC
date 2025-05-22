import React, { useRef } from 'react';
import { FaTimes, FaDownload, FaPrint, FaQrCode } from 'react-icons/fa';
import './Receipt.css';
import { QRCodeCanvas } from 'qrcode.react';
import logo from '../../assets/cic_insurance.png';

/**
 * Modern Receipt Component
 *
 * A reusable receipt component that can be used across the application
 * for displaying insurance policy receipts, premium payments, etc.
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Receipt data
 * @param {Function} props.onClose - Function to close the receipt
 * @param {Function} props.onDownload - Function to download the receipt
 * @param {Function} props.onPrint - Function to print the receipt
 * @param {string} props.type - Receipt type (policy, premium, claim)
 */
const Receipt = ({
  data,
  onClose,
  onDownload,
  onPrint,
  type = 'policy' // Default type is policy receipt
}) => {
  const receiptRef = useRef(null);
  const today = new Date().toLocaleDateString();

  // Generate a receipt number if not provided
  const receiptNumber = data.receiptNumber || `CIC-${Math.floor(100000 + Math.random() * 900000)}`;

  // Generate a policy number if not provided
  const policyNumber = data.policyNumber || `POL-${Math.floor(1000000 + Math.random() * 9000000)}`;

  // Generate QR code data
  const qrData = JSON.stringify({
    receiptNumber,
    policyNumber,
    date: today,
    customer: data.name,
    amount: data.amount,
    type: type
  });

  // Handle print action
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      // Default print functionality
      const printContent = document.querySelector('.receipt-content').innerHTML;
      const printWindow = window.open('', '_blank');

      // Get current date formatted nicely
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Calculate expiry date (1 year from today)
      const expiryDate = new Date(today);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      const formattedExpiryDate = expiryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Create print styles
      const style = `
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
          }
          .receipt-logo {
            text-align: center;
            margin-bottom: 30px;
          }
          .receipt-info {
            border: 1px solid #eee;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
            background-color: #f9f9f9;
          }
          .receipt-customer, .receipt-product {
            margin-bottom: 30px;
          }
          h1 {
            text-align: center;
            color: #800000;
            margin-bottom: 30px;
          }
          h3 {
            color: #800000;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          h4 {
            margin: 15px 0 10px;
            color: #555;
          }
          .purchase-success {
            background-color:#64795b;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 13px;
          }
          .receipt-plan-details {
            margin: 15px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
            border-left: 3px solid #800000;
          }
          .plan-features {
            margin: 10px 0 10px 20px;
            padding-left: 0;
          }
          .plan-features li {
            margin-bottom: 8px;
            list-style-type: disc;
          }
          .receipt-footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #555;
          }
          .policy-notice {
            font-style: italic;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
          }
          .receipt-qr {
            text-align: center;
            margin: 20px 0;
          }
          .receipt-verification {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 10px;
          }
        </style>
      `;

      printWindow.document.write(`
        <html>
          <head>
            <title>CIC Insurance - ${type.charAt(0).toUpperCase() + type.slice(1)} Receipt</title>
            ${style}
          </head>
          <body>
            <div class="receipt-document">
              <h1>${type.charAt(0).toUpperCase() + type.slice(1)} Receipt</h1>
              ${printContent}
              <div class="policy-notice">
                <p>This receipt serves as proof of purchase. Please retain for your records.</p>
                ${type === 'policy' ? `<p>Your policy is effective from ${formattedDate} to ${formattedExpiryDate}. Full policy documentation has been sent to your registered email address.</p>` : ''}
                <p>CIC Insurance Group Limited is regulated by the Insurance Regulatory Authority of Kenya.</p>
              </div>
            </div>
          </body>
        </html>
      `);

      // Print and close the window after a slight delay to ensure it's rendered
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 800);
    }
  };

  return (
    <div className="modern-receipt-overlay">
      <div className="modern-receipt-modal" ref={receiptRef}>
        <div className="modern-receipt-header">
          <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Receipt</h2>
          <div className="modern-receipt-actions">
            <button className="modern-receipt-action-btn" onClick={handlePrint} title="Print Receipt">
              <FaPrint />
            </button>
            {onDownload && (
              <button className="modern-receipt-action-btn" onClick={onDownload} title="Download Receipt">
                <FaDownload />
              </button>
            )}
            <button className="modern-receipt-close-btn" onClick={onClose} title="Close">
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="receipt-content">
          <div className="modern-receipt-logo">
            <img src={logo} alt="CIC Insurance Group" />
          </div>

          <div className="modern-receipt-info">
            <div className="modern-receipt-info-row">
              <div className="modern-receipt-info-col">
                <p><strong>Receipt #:</strong> {receiptNumber}</p>
                <p><strong>Date:</strong> {today}</p>
                {type === 'policy' && <p><strong>Policy #:</strong> {policyNumber}</p>}
              </div>
              <div className="modern-receipt-info-col">
                {data.agent && <p><strong>Agent:</strong> {data.agent}</p>}
                {data.branch && <p><strong>Branch:</strong> {data.branch}</p>}
                {data.paymentMethod && <p><strong>Payment Method:</strong> {data.paymentMethod}</p>}
                {type === 'policy' && <p><strong>Policy Status:</strong> <span className="purchase-success">ACTIVE</span></p>}
              </div>
            </div>
          </div>

          <div className="modern-receipt-customer">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {data.name || 'N/A'}</p>
            <p><strong>Email:</strong> {data.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {data.phone || 'N/A'}</p>
            {data.kraPin && <p><strong>KRA PIN:</strong> {data.kraPin}</p>}
            {data.idNumber && <p><strong>ID Number:</strong> {data.idNumber}</p>}
          </div>

          {type === 'policy' && data.product && (
            <div className="modern-receipt-product">
              <h3>Policy Details</h3>
              <p><strong>Product:</strong> {data.product.title || data.product}</p>
              {data.plan && (
                <div className="modern-receipt-plan-details">
                  <p><strong>Plan:</strong> {data.plan.name}</p>
                  <p><strong>Coverage:</strong></p>
                  <ul className="plan-features">
                    {data.plan.features && data.plan.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p><strong>Premium Amount:</strong> KES {(data.amount || 0).toLocaleString()}</p>
              <p><strong>Payment Status:</strong> <span className="purchase-success">PAID</span></p>
              <p><strong>Coverage Period:</strong> {data.period || '12 months'} from {today}</p>
            </div>
          )}

          <div className="modern-receipt-qr">
            <QRCodeCanvas value={qrData} size={120} level="H" />
            <p className="modern-receipt-verification">Scan to verify receipt authenticity</p>
          </div>

          <div className="modern-receipt-footer">
            <p>Thank you for choosing CIC Insurance Group!</p>
            {type === 'policy' && <p>Your policy is now active. A confirmation email has been sent to your email address with full details and policy documentation.</p>}
            <p><strong>For support:</strong> callc@cic.co.ke or +254 703 099 120</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
