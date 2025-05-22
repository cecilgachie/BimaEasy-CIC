import React, { useState } from 'react';
import { FaTimes, FaPrint, FaShoppingCart } from 'react-icons/fa';
import { productCoveragePlans } from '../quoteformsummary';
import Receipt from '../shared/Receipt';

function PremiumModal({ onClose, onPrint }) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handlePurchase = (product, plan) => {
    // Create receipt data
    const data = {
      name: localStorage.getItem('userName') || 'Customer',
      email: localStorage.getItem('userEmail') || 'customer@example.com',
      phone: localStorage.getItem('userPhone') || '+254 XXX XXX XXX',
      product: product,
      plan: plan,
      amount: plan.price || 15000, // Default price if not specified
      paymentMethod: 'Credit Card',
      branch: 'Nairobi Main Branch',
      agent: 'Online Self-Service'
    };

    // Set receipt data and show receipt
    setReceiptData(data);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content premium-modal" style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div className="modal-header">
          <h2>Premium Coverage Details</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="premium-products" style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '20px 0' }}>
          {Object.entries(productCoveragePlans).map(([product, plans]) => (
            <div key={product} className="premium-product-card" style={{ minWidth: '300px', flex: '1' }}>
              <h3>{product}</h3>
              <div className="coverage-plans">
                {plans.map((plan) => {
                  // Add price to plan for receipt
                  const planWithPrice = {
                    ...plan,
                    price: Math.round(15000 * plan.priceMultiplier)
                  };

                  return (
                    <div key={plan.id} className="coverage-plan">
                      <h4>{plan.name}</h4>
                      <ul>
                        {plan.features.map((feature, index) => (
                          <li key={index}>
                            <span className="feature-check">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="purchase-btn"
                        onClick={() => handlePurchase(product, planWithPrice)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          marginTop: '15px',
                          backgroundColor: '#800000',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <FaShoppingCart /> Purchase {plan.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Receipt Component */}
      {showReceipt && receiptData && (
        <Receipt
          data={receiptData}
          onClose={handleCloseReceipt}
          onPrint={onPrint}
          type="premium"
        />
      )}
    </div>
  );
}

export default PremiumModal;