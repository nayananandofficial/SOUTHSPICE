import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Wallet, Lock, Shield } from 'lucide-react';

// Official payment method SVG icons
const GooglePayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
    <path fill="#ed5748" d="M42.858,11.975c-4.546-2.624-10.359-1.065-12.985,3.481L23.25,26.927	c-1.916,3.312,0.551,4.47,3.301,6.119l6.372,3.678c2.158,1.245,4.914,0.506,6.158-1.649l6.807-11.789	C48.176,19.325,46.819,14.262,42.858,11.975z"></path><path fill="#fcc60e" d="M35.365,16.723l-6.372-3.678c-3.517-1.953-5.509-2.082-6.954,0.214l-9.398,16.275	c-2.624,4.543-1.062,10.353,3.481,12.971c3.961,2.287,9.024,0.93,11.311-3.031l9.578-16.59	C38.261,20.727,37.523,17.968,35.365,16.723z"></path><path fill="#48b564" d="M36.591,8.356l-4.476-2.585c-4.95-2.857-11.28-1.163-14.137,3.787L9.457,24.317	c-1.259,2.177-0.511,4.964,1.666,6.22l5.012,2.894c2.475,1.43,5.639,0.582,7.069-1.894l9.735-16.86	c2.017-3.492,6.481-4.689,9.974-2.672L36.591,8.356z"></path><path fill="#2c85eb" d="M19.189,13.781l-4.838-2.787c-2.158-1.242-4.914-0.506-6.158,1.646l-5.804,10.03	c-2.857,4.936-1.163,11.252,3.787,14.101l3.683,2.121l4.467,2.573l1.939,1.115c-3.442-2.304-4.535-6.92-2.43-10.555l1.503-2.596	l5.504-9.51C22.083,17.774,21.344,15.023,19.189,13.781z"></path>
  </svg>
);

const PhonePeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
    <path fill="#4527a0" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path fill="#fff" d="M32.267,20.171c0-0.681-0.584-1.264-1.264-1.264h-2.334l-5.35-6.25	c-0.486-0.584-1.264-0.778-2.043-0.584l-1.848,0.584c-0.292,0.097-0.389,0.486-0.195,0.681l5.836,5.666h-8.851	c-0.292,0-0.486,0.195-0.486,0.486v0.973c0,0.681,0.584,1.506,1.264,1.506h1.972v4.305c0,3.502,1.611,5.544,4.723,5.544	c0.973,0,1.378-0.097,2.35-0.486v3.112c0,0.875,0.681,1.556,1.556,1.556h0.786c0.292,0,0.584-0.292,0.584-0.584V21.969h2.812	c0.292,0,0.486-0.195,0.486-0.486V20.171z M26.043,28.413c-0.584,0.292-1.362,0.389-1.945,0.389c-1.556,0-2.097-0.778-2.097-2.529	v-4.305h4.043V28.413z"></path>
  </svg>
);

const UPIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <polygon fill="#388e3c" points="29,4 18,45 40,24"></polygon><polygon fill="#f57c00" points="21,3 10,44 32,23"></polygon>
  </svg>
);

const AmazonPayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 32 32">
    <path d="M 8.8710938 8 L 8.6621094 8.0351562 C 8.0081094 8.1171563 7.3775156 8.3618125 6.8535156 8.7578125 C 6.7365156 8.8278125 6.631625 8.921625 6.515625 9.015625 C 6.503625 8.992625 6.4921875 8.9683125 6.4921875 8.9453125 C 6.4681875 8.8163125 6.4565937 8.6778281 6.4335938 8.5488281 C 6.3985937 8.3388281 6.2822656 8.2324219 6.0722656 8.2324219 L 5.5234375 8.2324219 C 5.1854375 8.2324219 5.1269531 8.3038594 5.1269531 8.6308594 L 5.1269531 18.755859 C 5.1389531 18.907859 5.231375 18.988 5.359375 19 L 6.375 19 C 6.515 19 6.5964219 18.907859 6.6074219 18.755859 C 6.6194219 18.708859 6.6191406 18.662234 6.6191406 18.615234 L 6.6191406 15.097656 C 6.6661406 15.144656 6.7016094 15.168406 6.7246094 15.191406 C 7.5766094 15.903406 8.5568594 16.135781 9.6308594 15.925781 C 10.610859 15.727781 11.28675 15.132812 11.71875 14.257812 C 12.05675 13.592813 12.195031 12.916641 12.207031 12.181641 C 12.230031 11.376641 12.160266 10.60175 11.822266 9.84375 C 11.425266 8.91075 10.749375 8.2920312 9.734375 8.0820312 C 9.582375 8.0470312 9.4195781 8.0347187 9.2675781 8.0117188 C 9.1275781 7.9997187 8.9990938 8 8.8710938 8 z M 16.642578 8 C 16.595578 8.012 16.550906 8.0234375 16.503906 8.0234375 C 16.036906 8.0464375 15.580953 8.1047031 15.126953 8.2207031 C 14.834953 8.2907031 14.555391 8.3952813 14.275391 8.4882812 C 14.100391 8.5462812 14.017578 8.6753281 14.017578 8.8613281 C 14.029578 9.0133281 14.017578 9.176125 14.017578 9.328125 C 14.029578 9.561125 14.123703 9.6215 14.345703 9.5625 C 14.718703 9.4695 15.091844 9.3649219 15.464844 9.2949219 C 16.047844 9.1899219 16.643281 9.1426094 17.238281 9.2246094 C 17.553281 9.2826094 17.844969 9.3648125 18.042969 9.6328125 C 18.217969 9.8548125 18.288781 10.134063 18.300781 10.414062 C 18.312781 10.811063 18.3125 11.125484 18.3125 11.521484 C 18.3125 11.544484 18.312781 11.567125 18.300781 11.578125 L 18.242188 11.578125 C 17.740188 11.450125 17.227844 11.380703 16.714844 11.345703 C 16.177844 11.322703 15.641906 11.346203 15.128906 11.533203 C 14.510906 11.743203 14.007797 12.115656 13.716797 12.722656 C 13.494797 13.189656 13.459297 13.680641 13.529297 14.181641 C 13.634297 14.858641 13.961641 15.371266 14.556641 15.697266 C 15.128641 16.012266 15.735234 16.046125 16.365234 15.953125 C 17.088234 15.848125 17.729063 15.545125 18.289062 15.078125 C 18.312062 15.055125 18.336375 15.044484 18.359375 15.021484 C 18.394375 15.208484 18.418125 15.383875 18.453125 15.546875 C 18.476125 15.698875 18.570938 15.790734 18.710938 15.802734 L 19.492188 15.802734 C 19.609188 15.802734 19.714844 15.698312 19.714844 15.570312 C 19.726844 15.535312 19.726562 15.487406 19.726562 15.441406 L 19.726562 10.462891 C 19.723562 10.263891 19.710781 10.053469 19.675781 9.8554688 C 19.582781 9.2374687 19.325625 8.7234844 18.765625 8.3964844 C 18.450625 8.2094844 18.101516 8.1165938 17.728516 8.0585938 C 17.553516 8.0345937 17.389844 8.023 17.214844 8 L 16.642578 8 z M 20.6875 8.0019531 C 20.5705 8.0019531 20.512156 8.1056562 20.535156 8.2226562 C 20.558156 8.3166563 20.593906 8.422625 20.628906 8.515625 C 21.561906 10.825625 22.506172 13.134078 23.451172 15.455078 C 23.533172 15.653078 23.544172 15.817625 23.451172 16.015625 C 23.300172 16.364625 23.170813 16.726172 23.007812 17.076172 C 22.867813 17.391172 22.635156 17.62575 22.285156 17.71875 C 22.052156 17.77775 21.795781 17.800625 21.550781 17.765625 C 21.433781 17.753625 21.316219 17.73075 21.199219 17.71875 C 21.035219 17.70675 20.955359 17.776172 20.943359 17.951172 L 20.943359 18.419922 C 20.955359 18.688922 21.036687 18.804562 21.304688 18.851562 C 21.561687 18.897562 21.829375 18.931359 22.109375 18.943359 C 22.925375 18.954359 23.568281 18.629969 23.988281 17.917969 C 24.163281 17.637969 24.303641 17.345969 24.431641 17.042969 C 25.562641 14.184969 26.682734 11.33875 27.802734 8.46875 C 27.837734 8.38675 27.859094 8.3039375 27.871094 8.2109375 C 27.894094 8.0709375 27.824266 8.0019062 27.697266 8.0039062 L 26.753906 8.0039062 C 26.590906 7.9919063 26.438859 8.0960469 26.380859 8.2480469 C 26.357859 8.3180469 26.333547 8.3753125 26.310547 8.4453125 L 24.642578 13.216797 C 24.525578 13.554797 24.396297 13.904344 24.279297 14.277344 C 24.255297 14.218344 24.244422 14.195156 24.232422 14.160156 C 23.614422 12.457156 23.008625 10.755734 22.390625 9.0527344 C 22.297625 8.7727344 22.192891 8.502375 22.087891 8.234375 C 22.041891 8.105375 21.935203 8.0136719 21.783203 8.0136719 C 21.421203 8.0016719 21.0605 8.0019531 20.6875 8.0019531 z M 8.859375 9.2128906 C 9.571375 9.2708906 10.154031 9.6212187 10.457031 10.449219 C 10.644031 10.962219 10.691406 11.457141 10.691406 11.994141 C 10.691406 12.496141 10.656859 12.939969 10.505859 13.417969 C 10.178859 14.432969 9.4316094 14.829203 8.4746094 14.783203 C 7.7976094 14.748203 7.2264531 14.490187 6.6894531 14.117188 C 6.6314531 14.082187 6.5964219 14.025797 6.6074219 13.966797 L 6.6074219 10.005859 C 6.5964219 9.9358594 6.6314531 9.87875 6.6894531 9.84375 C 7.3424531 9.38875 8.065375 9.1548906 8.859375 9.2128906 z M 16.427734 12.363281 C 16.627484 12.345781 16.828844 12.349547 17.027344 12.373047 C 17.424344 12.408047 17.82175 12.477156 18.21875 12.535156 C 18.30075 12.547156 18.322266 12.582344 18.322266 12.652344 C 18.310266 12.886344 18.322266 13.107797 18.322266 13.341797 C 18.322266 13.574797 18.310547 13.785531 18.310547 14.019531 C 18.322547 14.077531 18.287234 14.123203 18.240234 14.158203 C 17.703234 14.543203 17.120078 14.801094 16.455078 14.871094 C 16.187078 14.894094 15.918109 14.894062 15.662109 14.789062 C 15.370109 14.684062 15.150359 14.438484 15.068359 14.146484 C 14.975359 13.843484 14.975641 13.528609 15.056641 13.224609 C 15.184641 12.827609 15.463891 12.607516 15.837891 12.478516 C 16.030391 12.420016 16.227984 12.380781 16.427734 12.363281 z M 29.041016 20.001953 C 28.107641 20.014953 27.005922 20.224047 26.169922 20.810547 C 25.911922 20.989547 25.957141 21.238078 26.244141 21.205078 C 27.184141 21.092078 29.276391 20.838406 29.650391 21.316406 C 30.025391 21.794406 29.235719 23.766437 28.886719 24.648438 C 28.778719 24.911437 29.007047 25.020312 29.248047 24.820312 C 30.812047 23.510312 31.218438 20.764141 30.898438 20.369141 C 30.737937 20.171641 29.974391 19.988953 29.041016 20.001953 z M 1.2167969 21.001953 C 0.99873437 21.031953 0.9048125 21.308344 1.1328125 21.527344 C 5.0498125 25.201344 10.225656 27 15.972656 27 C 20.071656 27 24.830234 25.662578 28.115234 23.142578 C 28.658234 22.723578 28.195672 22.09575 27.638672 22.34375 C 23.955672 23.96875 19.955453 24.751953 16.314453 24.751953 C 10.918453 24.751953 5.69475 23.625406 1.46875 21.066406 C 1.37625 21.010406 1.2894844 20.991953 1.2167969 21.001953 z"></path>
  </svg>
);

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface PaymentStepProps {
  orderTotal: number;
  onPaymentMethodSelect: (method: string) => void;
  selectedPaymentMethod: string;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  orderTotal,
  onPaymentMethodSelect,
  selectedPaymentMethod
}) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: GooglePayIcon,
      description: 'Quick payment with Google Pay'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: PhonePeIcon,
      description: 'Pay with PhonePe wallet'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: UPIIcon,
      description: 'Pay with UPI ID or QR code'
    },
    {
      id: 'amazonpay',
      name: 'Amazon Pay',
      icon: AmazonPayIcon,
      description: 'Pay with Amazon Pay balance'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'Pay through your bank account'
    }
  ];

  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!cardDetails.number.trim()) {
      newErrors.number = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
      newErrors.number = 'Please enter a valid 16-digit card number';
    }

    if (!cardDetails.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Please enter expiry in MM/YY format';
    }

    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!cardDetails.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUPI = () => {
    const newErrors: Record<string, string> = {};

    if (!upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      newErrors.upiId = 'Please enter a valid UPI ID';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'card':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({ 
                  ...prev, 
                  number: formatCardNumber(e.target.value) 
                }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                  errors.number ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.number && (
                <p className="mt-1 text-sm text-red-600">{errors.number}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({ 
                    ...prev, 
                    expiry: formatExpiry(e.target.value) 
                  }))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.expiry ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expiry && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({ 
                    ...prev, 
                    cvv: e.target.value.replace(/\D/g, '') 
                  }))}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ 
                  ...prev, 
                  name: e.target.value 
                }))}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </motion.div>
        );

      case 'upi':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@paytm"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                  errors.upiId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.upiId && (
                <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
              )}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 font-body">
                💡 You can also scan the QR code that will appear after clicking "Place Order"
              </p>
            </div>
          </motion.div>
        );

      case 'netbanking':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Bank
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body">
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="other">Other Banks</option>
              </select>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700 font-body">
                ⚠️ You will be redirected to your bank's secure website to complete the payment
              </p>
            </div>
          </motion.div>
        );

      case 'googlepay':
      case 'phonepe':
      case 'amazonpay':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="font-heading font-semibold text-warm-900 mb-2">
                {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name} Payment
              </h4>
              <p className="text-gray-600 font-body">
                You will be redirected to complete your payment securely
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 font-body">
                ✅ Quick and secure payment with your preferred digital wallet
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-warm-900 mb-2">
          Payment Information
        </h2>
        <p className="text-gray-600 font-body">
          Choose your preferred payment method and complete your order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-heading font-semibold text-warm-900 mb-6">
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onPaymentMethodSelect(method.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all focus:outline-none ${
                      selectedPaymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-offset-2'
                        : 'border-gray-200 hover:border-primary-300 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-10 rounded-full flex items-center justify-center ${
                        selectedPaymentMethod === method.id
                          ? 'bg-primary-100'
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          selectedPaymentMethod === method.id
                            ? 'text-primary-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-warm-900">
                          {method.name}
                        </h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Payment Form */}
            {selectedPaymentMethod && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-heading font-semibold text-warm-900 mb-4">
                  Payment Details
                </h4>
                {renderPaymentForm()}
              </div>
            )}
          </div>

          {/* Security Information */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-heading font-semibold text-warm-900">
                Secure Payment
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 font-body">256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 font-body">PCI DSS compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">🔒</span>
                <span className="text-gray-700 font-body">No card details stored</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✅</span>
                <span className="text-gray-700 font-body">100% secure transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
            <h3 className="text-lg font-heading font-semibold text-warm-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 font-body">Order Total</span>
                <span className="font-medium">₹{orderTotal}</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-heading font-bold text-warm-900">
                  Amount to Pay
                </span>
                <span className="text-xl font-heading font-bold text-primary-600">
                  ₹{orderTotal}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 font-body">
              <div className="flex items-center space-x-2">
                <span>🚚</span>
                <span>Estimated delivery: 30-40 mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>24/7 customer support</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔄</span>
                <span>Easy returns & refunds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStep;