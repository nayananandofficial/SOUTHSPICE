import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  User, 
  CreditCard, 
  Settings, 
  HelpCircle,
  FileText,
  Shield,
  RefreshCw,
  Phone,
  Mail,
  MessageCircle,
  Clock
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'account' | 'billing' | 'features' | 'technical';
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
}

const Help: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refund'>('terms');
  const [activeSection, setActiveSection] = useState<string>('faq');

  const sidebarItems: SidebarItem[] = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle, href: '#faq' },
    { id: 'legal', label: 'Legal', icon: FileText, href: '#legal' },
    { id: 'support', label: 'Support', icon: Phone, href: '#support' }
  ];

  const faqData: FAQItem[] = [
    // Account Management
    {
      id: 'acc-1',
      category: 'account',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Sign Up" button in the top right corner of our website. Fill in your details including name, email, and password. You\'ll receive a verification email to activate your account.'
    },
    {
      id: 'acc-2',
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 'acc-3',
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can change your email address in your profile settings. Go to Profile > Account Settings > Email Address. You\'ll need to verify the new email address before the change takes effect.'
    },
    {
      id: 'acc-4',
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'To delete your account, go to Profile > Account Settings > Delete Account. Please note that this action is irreversible and all your data will be permanently removed.'
    },

    // Billing & Payments
    {
      id: 'bill-1',
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI payments, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.'
    },
    {
      id: 'bill-2',
      category: 'billing',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption and comply with PCI DSS standards. We never store your complete card details on our servers. All payments are processed through secure payment gateways.'
    },
    {
      id: 'bill-3',
      category: 'billing',
      question: 'Can I get a refund for my order?',
      answer: 'Refunds are available in certain circumstances. If your order is cancelled before preparation begins, you\'ll receive a full refund. For other cases, please refer to our refund policy or contact customer support.'
    },
    {
      id: 'bill-4',
      category: 'billing',
      question: 'Why was my payment declined?',
      answer: 'Payment declines can happen due to insufficient funds, incorrect card details, bank restrictions, or security measures. Please check your card details and try again, or contact your bank for assistance.'
    },

    // Product Features
    {
      id: 'feat-1',
      category: 'features',
      question: 'How do I track my order?',
      answer: 'Once your order is confirmed, you\'ll receive a tracking link via SMS and email. You can also track your order in real-time through the "My Orders" section in your account.'
    },
    {
      id: 'feat-2',
      category: 'features',
      question: 'Can I modify my order after placing it?',
      answer: 'You can modify your order within 2 minutes of placing it, provided the restaurant hasn\'t started preparing it. Go to "My Orders" and click "Modify Order" if the option is available.'
    },
    {
      id: 'feat-3',
      category: 'features',
      question: 'Do you offer contactless delivery?',
      answer: 'Yes, we offer contactless delivery. Select this option during checkout, and our delivery partner will leave your order at your doorstep and notify you via call or message.'
    },
    {
      id: 'feat-4',
      category: 'features',
      question: 'What are your delivery hours?',
      answer: 'We deliver from 10:00 AM to 11:00 PM, 7 days a week. Some restaurants may have different operating hours, which will be displayed on their individual pages.'
    },

    // Technical Support
    {
      id: 'tech-1',
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try clearing your browser cache and cookies, disable browser extensions, or try using a different browser. If the problem persists, check your internet connection or contact our technical support.'
    },
    {
      id: 'tech-2',
      category: 'technical',
      question: 'I\'m having trouble with the mobile app. How can I fix it?',
      answer: 'First, try closing and reopening the app. If that doesn\'t work, restart your device or update the app to the latest version. You can also try clearing the app cache in your device settings.'
    },
    {
      id: 'tech-3',
      category: 'technical',
      question: 'Why am I not receiving notifications?',
      answer: 'Check your notification settings in the app and ensure notifications are enabled. Also verify that your device\'s notification settings allow our app to send notifications.'
    },
    {
      id: 'tech-4',
      category: 'technical',
      question: 'The payment page is not loading. What should I do?',
      answer: 'This could be due to browser security settings or ad blockers. Try disabling ad blockers, enabling JavaScript, or using a different browser. Contact support if the issue continues.'
    }
  ];

  const faqCategories = [
    { id: 'account', name: 'Account Management', icon: User, color: 'primary' },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard, color: 'secondary' },
    { id: 'features', name: 'Product Features', icon: Settings, color: 'accent' },
    { id: 'technical', name: 'Technical Support', icon: HelpCircle, color: 'warm' }
  ];

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20 pb-20 lg:pb-8 min-h-screen bg-warm-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Find answers to common questions, browse our policies, and get the support you need
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/4 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-heading font-semibold text-warm-900 mb-4">
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-body font-medium">{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                  );
                })}
              </nav>

              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
                <h4 className="font-heading font-semibold text-warm-900 mb-3">
                  Need More Help?
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>help@spiceroute.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/4 space-y-12"
          >
            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-warm-900 mb-8">
                Frequently Asked Questions
              </h2>

              {faqCategories.map((category) => (
                <div key={category.id} className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-8 h-8 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                      <category.icon className={`h-5 w-5 text-${category.color}-600`} />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-warm-900">
                      {category.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {faqData
                      .filter((faq) => faq.category === category.id)
                      .map((faq) => (
                        <div
                          key={faq.id}
                          className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleAccordion(faq.id)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                            aria-expanded={activeAccordion === faq.id}
                          >
                            <span className="font-body font-medium text-warm-900 pr-4">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                activeAccordion === faq.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {activeAccordion === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-0">
                                  <div className="border-t border-gray-100 pt-4">
                                    <p className="text-gray-700 font-body leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Legal Section */}
            <section id="legal" className="scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-warm-900 mb-8">
                Legal Information
              </h2>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    {[
                      { id: 'terms', label: 'Terms of Service', icon: FileText },
                      { id: 'privacy', label: 'Privacy Policy', icon: Shield },
                      { id: 'refund', label: 'Refund Policy', icon: RefreshCw }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center space-x-2 px-6 py-4 font-body font-medium transition-colors ${
                            activeTab === tab.id
                              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {activeTab === 'terms' && (
                      <motion.div
                        key="terms"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-gray max-w-none"
                      >
                        <div className="mb-6">
                          <h3 className="text-xl font-heading font-bold text-warm-900 mb-2">
                            Terms of Service
                          </h3>
                          <p className="text-sm text-gray-500">Last updated: January 1, 2024</p>
                        </div>

                        <div className="space-y-6 text-gray-700 font-body leading-relaxed">
                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              1. Acceptance of Terms
                            </h4>
                            <p>
                              By accessing and using Spice Route's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              2. Use License
                            </h4>
                            <p>
                              Permission is granted to temporarily download one copy of the materials on Spice Route's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>modify or copy the materials</li>
                              <li>use the materials for any commercial purpose or for any public display</li>
                              <li>attempt to reverse engineer any software contained on the website</li>
                              <li>remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              3. Disclaimer
                            </h4>
                            <p>
                              The materials on Spice Route's website are provided on an 'as is' basis. Spice Route makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              4. Limitations
                            </h4>
                            <p>
                              In no event shall Spice Route or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Spice Route's website, even if Spice Route or an authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              5. Accuracy of Materials
                            </h4>
                            <p>
                              The materials appearing on Spice Route's website could include technical, typographical, or photographic errors. Spice Route does not warrant that any of the materials on its website are accurate, complete, or current. Spice Route may make changes to the materials contained on its website at any time without notice.
                            </p>
                          </section>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'privacy' && (
                      <motion.div
                        key="privacy"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-gray max-w-none"
                      >
                        <div className="mb-6">
                          <h3 className="text-xl font-heading font-bold text-warm-900 mb-2">
                            Privacy Policy
                          </h3>
                          <p className="text-sm text-gray-500">Last updated: January 1, 2024</p>
                        </div>

                        <div className="space-y-6 text-gray-700 font-body leading-relaxed">
                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Information We Collect
                            </h4>
                            <p>
                              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, delivery address, and payment information.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              How We Use Your Information
                            </h4>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Process and fulfill your orders</li>
                              <li>Communicate with you about your orders and account</li>
                              <li>Provide customer support</li>
                              <li>Send you promotional communications (with your consent)</li>
                              <li>Improve our services and user experience</li>
                            </ul>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Information Sharing
                            </h4>
                            <p>
                              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted partners who assist us in operating our website and conducting our business.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Data Security
                            </h4>
                            <p>
                              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Your Rights
                            </h4>
                            <p>
                              You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional communications from us at any time by following the unsubscribe instructions in our emails.
                            </p>
                          </section>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'refund' && (
                      <motion.div
                        key="refund"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-gray max-w-none"
                      >
                        <div className="mb-6">
                          <h3 className="text-xl font-heading font-bold text-warm-900 mb-2">
                            Refund Policy
                          </h3>
                          <p className="text-sm text-gray-500">Last updated: January 1, 2024</p>
                        </div>

                        <div className="space-y-6 text-gray-700 font-body leading-relaxed">
                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Cancellation Policy
                            </h4>
                            <p>
                              You can cancel your order free of charge until the restaurant starts preparing your food. Once preparation begins, cancellation may not be possible. If cancellation is allowed after preparation has started, cancellation charges may apply.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Refund Eligibility
                            </h4>
                            <p>You are eligible for a full refund in the following cases:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Order cancelled before restaurant starts preparation</li>
                              <li>Restaurant is unable to fulfill your order</li>
                              <li>Significant delay in delivery (more than 60 minutes past estimated time)</li>
                              <li>Food quality issues reported within 24 hours of delivery</li>
                              <li>Wrong order delivered</li>
                            </ul>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Refund Process
                            </h4>
                            <p>
                              Refunds are processed back to your original payment method within 5-7 business days. For digital wallet payments, refunds are typically instant. You will receive an email confirmation once the refund is processed.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Partial Refunds
                            </h4>
                            <p>
                              In some cases, we may offer partial refunds or credits to your account. This typically applies when there are minor issues with your order that don't warrant a full refund, such as missing condiments or minor delays.
                            </p>
                          </section>

                          <section>
                            <h4 className="text-lg font-heading font-semibold text-warm-900 mb-3">
                              Contact for Refunds
                            </h4>
                            <p>
                              To request a refund, please contact our customer support team through the app, website, or by calling our helpline. Provide your order number and reason for the refund request. Our team will review and process eligible refunds promptly.
                            </p>
                          </section>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* Support Section */}
            <section id="support" className="scroll-mt-24">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-warm-900 mb-8">
                Contact Support
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-warm-900 mb-2">
                    Phone Support
                  </h3>
                  <p className="text-gray-600 font-body mb-4">
                    Speak directly with our support team
                  </p>
                  <p className="text-primary-600 font-body font-semibold mb-2">
                    +91 98765 43210
                  </p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-secondary-600" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-warm-900 mb-2">
                    Email Support
                  </h3>
                  <p className="text-gray-600 font-body mb-4">
                    Send us your questions anytime
                  </p>
                  <p className="text-secondary-600 font-body font-semibold mb-2">
                    help@spiceroute.com
                  </p>
                  <p className="text-sm text-gray-500">Response within 2 hours</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-warm-900 mb-2">
                    Live Chat
                  </h3>
                  <p className="text-gray-600 font-body mb-4">
                    Get instant help through chat
                  </p>
                  <button className="bg-accent-600 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-accent-700 transition-colors">
                    Start Chat
                  </button>
                  <p className="text-sm text-gray-500 mt-2">Available 9 AM - 9 PM</p>
                </motion.div>
              </div>

              {/* Additional Support Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8"
              >
                <h3 className="text-xl font-heading font-bold text-warm-900 mb-4 text-center">
                  Before You Contact Us
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-heading font-semibold text-warm-900 mb-3">
                      Have Your Information Ready
                    </h4>
                    <ul className="space-y-2 text-gray-700 font-body">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>Order number (if applicable)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>Account email address</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>Detailed description of the issue</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-warm-900 mb-3">
                      Response Times
                    </h4>
                    <ul className="space-y-2 text-gray-700 font-body">
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary-600" />
                        <span>Live Chat: Instant</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary-600" />
                        <span>Phone: Immediate</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary-600" />
                        <span>Email: Within 2 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Help;