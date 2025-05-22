import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Receipt from './Receipt';

// Mock the QRCode component
jest.mock('qrcode.react', () => {
  return function DummyQRCode(props) {
    return <div data-testid="qr-code">{props.value}</div>;
  };
});

describe('Receipt Component', () => {
  const mockData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 123 456 789',
    product: {
      title: 'CIC Seniors Mediplan'
    },
    plan: {
      name: 'Standard Plan',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    amount: 25000,
    receiptNumber: 'CIC-123456',
    policyNumber: 'POL-7890123',
    agent: 'Jane Smith',
    branch: 'Nairobi Main',
    paymentMethod: 'M-Pesa'
  };

  const mockClose = jest.fn();
  const mockDownload = jest.fn();
  const mockPrint = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders policy receipt correctly', () => {
    render(
      <Receipt
        data={mockData}
        onClose={mockClose}
        onDownload={mockDownload}
        onPrint={mockPrint}
        type="policy"
      />
    );

    // Check header
    expect(screen.getByText('Policy Receipt')).toBeInTheDocument();

    // Check customer details
    expect(screen.getByText('Customer Details')).toBeInTheDocument();
    expect(screen.getByText('John Doe', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('john@example.com', { exact: false })).toBeInTheDocument();

    // Check policy details
    expect(screen.getByText('Policy Details')).toBeInTheDocument();
    expect(screen.getByText('CIC Seniors Mediplan', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Standard Plan', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('KES 25,000', { exact: false })).toBeInTheDocument();

    // Check QR code
    expect(screen.getByTestId('qr-code')).toBeInTheDocument();
  });

  test('renders premium receipt correctly', () => {
    render(
      <Receipt
        data={mockData}
        onClose={mockClose}
        onDownload={mockDownload}
        onPrint={mockPrint}
        type="premium"
      />
    );

    // Check header
    expect(screen.getByText('Premium Receipt')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Receipt
        data={mockData}
        onClose={mockClose}
        onDownload={mockDownload}
        onPrint={mockPrint}
        type="policy"
      />
    );

    fireEvent.click(screen.getByTitle('Close'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test('calls onPrint when print button is clicked', () => {
    render(
      <Receipt
        data={mockData}
        onClose={mockClose}
        onDownload={mockDownload}
        onPrint={mockPrint}
        type="policy"
      />
    );

    fireEvent.click(screen.getByTitle('Print Receipt'));
    expect(mockPrint).toHaveBeenCalledTimes(1);
  });

  test('calls onDownload when download button is clicked', () => {
    render(
      <Receipt
        data={mockData}
        onClose={mockClose}
        onDownload={mockDownload}
        onPrint={mockPrint}
        type="policy"
      />
    );

    fireEvent.click(screen.getByTitle('Download Receipt'));
    expect(mockDownload).toHaveBeenCalledTimes(1);
  });
});
