// import Iyzipay from 'iyzipay';
import { IYZICO_ENV } from '../config/iyzicoConfig';

// Mock Iyzico configuration for frontend testing
// Note: Real Iyzico integration should be done on backend
const isDevelopment = import.meta.env.DEV;

// Iyzico configuration (only for development mock)
let iyzipay = null;

if (!isDevelopment) {
  // In production, this should be handled by backend API
  console.warn('Iyzico integration should be done on backend in production');
}

// Payment request builder
export const createPaymentRequest = (paymentData) => {
  const {
    cardHolder,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    price,
    installment,
    conversationId,
    basketId
  } = paymentData;

  return {
    locale: 'tr',
    conversationId: conversationId || `TB_${Date.now()}`,
    price: price.toString(),
    paidPrice: price.toString(),
    currency: 'TRY',
    installment: installment || 1,
    basketId: basketId || `BASKET_${Date.now()}`,
    paymentChannel: 'WEB',
    paymentGroup: 'PRODUCT',
    callbackUrl: `${window.location.origin}/payment/callback`,
    enabledInstallments: [1, 2, 3, 6, 9],
    paymentCard: {
      cardHolderName: cardHolder,
      cardNumber: cardNumber.replace(/\s/g, ''),
      expireMonth: expiryMonth,
      expireYear: `20${expiryYear}`,
      cvc: cvc,
      registerCard: 0
    },
    buyer: {
      id: `BY${Date.now()}`,
      name: cardHolder.split(' ')[0] || 'Guest',
      surname: cardHolder.split(' ').slice(1).join(' ') || 'User',
      gsmNumber: '+905551234567',
      email: 'test@tatilbudur.com',
      identityNumber: '11111111111',
      lastLoginDate: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      registrationAddress: 'Test Address',
      ip: '127.0.0.1',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34000'
    },
    shippingAddress: {
      contactName: cardHolder,
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Test Address',
      zipCode: '34000'
    },
    billingAddress: {
      contactName: cardHolder,
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Test Address',
      zipCode: '34000'
    },
    basketItems: [
      {
        id: 'TB001',
        name: 'Hotel Reservation',
        category1: 'Travel',
        category2: 'Hotel',
        itemType: 'PHYSICAL',
        price: price.toString()
      }
    ]
  };
};

// Create payment (Mock for frontend development)
export const createPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    // Mock payment simulation
    setTimeout(() => {
      const mockResult = {
        status: 'success',
        paymentId: `${Date.now()}`,
        conversationId: `TB_${Date.now()}`,
        price: paymentData.price,
        paidPrice: paymentData.price,
        currency: 'TRY',
        installment: paymentData.installment || 1,
        paymentStatus: 'SUCCESS',
        fraudStatus: 1,
        merchantCommissionRate: 2.9,
        merchantCommissionRateAmount: (paymentData.price * 0.029).toFixed(2),
        iyziCommissionRateAmount: 0,
        iyziCommissionFee: 0,
        cardType: 'CREDIT_CARD',
        cardAssociation: 'VISA',
        cardFamily: 'Visa',
        binNumber: paymentData.cardNumber.substring(0, 6),
        lastFourDigits: paymentData.cardNumber.substring(paymentData.cardNumber.length - 4),
        basketId: `BASKET_${Date.now()}`,
        currency: 'TRY',
        authCode: '123456',
        phase: 'AUTH',
        lastTransactionStatus: 'SUCCESS',
        locale: 'tr',
        systemTime: Date.now(),
        token: `TOKEN_${Date.now()}`
      };
      
      console.log('Mock Iyzico Payment Result:', mockResult);
      resolve(mockResult);
    }, 1000); // Simulate API delay
  });
};

// Get installment options (Mock for frontend development)
export const getInstallmentOptions = (price, binNumber) => {
  return new Promise((resolve, reject) => {
    // Mock installment options
    setTimeout(() => {
      const mockResult = {
        status: 'success',
        installmentDetails: [
          {
            installmentPrices: [
              { installmentNumber: 1, price: price, totalPrice: price },
              { installmentNumber: 2, price: (price / 2).toFixed(2), totalPrice: price },
              { installmentNumber: 3, price: (price / 3).toFixed(2), totalPrice: price },
              { installmentNumber: 6, price: (price / 6).toFixed(2), totalPrice: price },
              { installmentNumber: 9, price: (price / 9).toFixed(2), totalPrice: price }
            ]
          }
        ]
      };
      
      console.log('Mock Iyzico Installment Result:', mockResult);
      resolve(mockResult);
    }, 500);
  });
};

// Verify payment (Mock for frontend development)
export const verifyPayment = (token, amount = null) => {
  return new Promise((resolve, reject) => {
    // Mock verification
    setTimeout(() => {
      // Eğer amount verilmişse onu kullan, yoksa 100.00 kullan
      const paymentAmount = amount ? amount.toString() : '100.00';
      
      const mockResult = {
        status: 'success',
        paymentStatus: 'SUCCESS',
        token: token,
        conversationId: `VERIFY_${Date.now()}`,
        price: paymentAmount,
        paidPrice: paymentAmount,
        currency: 'TRY',
        installment: 1,
        paymentId: `${Date.now()}`
      };
      
      console.log('Mock Iyzico Verification Result:', mockResult);
      resolve(mockResult);
    }, 500);
  });
};

// Cancel payment (Mock for frontend development)
export const cancelPayment = (paymentId, reason = 'USER_CANCEL') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockResult = {
        status: 'success',
        paymentId: paymentId,
        conversationId: `CANCEL_${Date.now()}`,
        status: 'SUCCESS'
      };
      
      console.log('Mock Iyzico Cancel Result:', mockResult);
      resolve(mockResult);
    }, 500);
  });
};

// Refund payment (Mock for frontend development)
export const refundPayment = (paymentId, amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockResult = {
        status: 'success',
        paymentId: paymentId,
        conversationId: `REFUND_${Date.now()}`,
        price: amount.toString(),
        currency: 'TRY',
        status: 'SUCCESS'
      };
      
      console.log('Mock Iyzico Refund Result:', mockResult);
      resolve(mockResult);
    }, 500);
  });
};

// Mock iyzipay object for compatibility
export const mockIyzipay = {
  payment: {
    create: (request, callback) => {
      setTimeout(() => callback(null, { status: 'success' }), 1000);
    }
  }
};

export default mockIyzipay;
