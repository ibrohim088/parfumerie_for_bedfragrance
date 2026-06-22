import { Locale } from './locales';

export interface LocalizationStrings {
  // Common
  common: {
    home: string;
    catalog: string;
    giftBox: string;
    about: string;
    contact: string;
    cart: string;
    account: string;
    logout: string;
    login: string;
    register: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    loading: string;
    error: string;
    success: string;
    language: string;
    theme: string;
  };
  // Navigation
  navigation: {
    home: string;
    catalog: string;
    giftBox: string;
    about: string;
    contact: string;
    myAccount: string;
    myOrders: string;
    myAddresses: string;
    profile: string;
    notifications: string;
    settings: string;
    logout: string;
  };
  // Hero
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  // Products
  products: {
    title: string;
    featured: string;
    price: string;
    rating: string;
    addToCart: string;
    removeFromCart: string;
    quantity: string;
    inStock: string;
    outOfStock: string;
    view: string;
    filters: string;
    sort: string;
    category: string;
    priceRange: string;
    reset: string;
    noProducts: string;
    specifications: string;
    ingredients: string;
    usage: string;
    reviews: string;
  };
  // Cart
  cart: {
    title: string;
    items: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
    checkout: string;
    continueShopping: string;
    empty: string;
    remove: string;
    update: string;
    updateCart: string;
  };
  // Checkout
  checkout: {
    title: string;
    shippingInfo: string;
    billingInfo: string;
    paymentMethod: string;
    orderReview: string;
    address: string;
    phone: string;
    email: string;
    fullName: string;
    city: string;
    region: string;
    zipCode: string;
    notes: string;
    placeOrder: string;
    selectPaymentMethod: string;
    payme: string;
    click: string;
    cash: string;
    orderPlaced: string;
    orderNumber: string;
    estimatedDelivery: string;
  };
  // Auth
  auth: {
    title: string;
    login: string;
    register: string;
    phone: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
    forgotPassword: string;
    noAccount: string;
    haveAccount: string;
    otp: string;
    otpSent: string;
    verifyOtp: string;
    didntReceiveOtp: string;
    resendOtp: string;
    phoneFormat: string;
    loginSuccess: string;
    registerSuccess: string;
    invalidPhone: string;
    invalidOtp: string;
    passwordMismatch: string;
  };
  // Account
  account: {
    title: string;
    overview: string;
    personalInfo: string;
    orders: string;
    addresses: string;
    payment: string;
    notifications: string;
    scentProfile: string;
    settings: string;
    totalOrders: string;
    totalSpent: string;
    recentOrders: string;
    edit: string;
    save: string;
    cancel: string;
    delete: string;
    deleteConfirm: string;
    noOrders: string;
    noAddresses: string;
    addAddress: string;
    editAddress: string;
    setDefault: string;
  };
  // Orders
  orders: {
    title: string;
    all: string;
    pending: string;
    completed: string;
    cancelled: string;
    status: string;
    date: string;
    total: string;
    items: string;
    viewDetails: string;
    trackOrder: string;
    deliveryDate: string;
    shippingAddress: string;
    trackingNumber: string;
    noOrders: string;
  };
  // Notifications
  notifications: {
    title: string;
    orderPlaced: string;
    orderShipped: string;
    orderDelivered: string;
    paymentConfirmed: string;
    newProduct: string;
    promo: string;
    markAsRead: string;
    delete: string;
    noNotifications: string;
  };
  // Profile
  profile: {
    title: string;
    personalInfo: string;
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    changePassword: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    save: string;
    cancel: string;
    saveSuccess: string;
    profilePicture: string;
  };
  // Payment
  payment: {
    title: string;
    addPaymentMethod: string;
    savedMethods: string;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    setDefault: string;
    remove: string;
    payme: string;
    click: string;
    cash: string;
    noPaymentMethods: string;
  };
  // Scent Profile
  scentProfile: {
    title: string;
    favoriteScents: string;
    scentFamily: string;
    intensity: string;
    notes: string;
    floral: string;
    fresh: string;
    woody: string;
    oriental: string;
    chypre: string;
    light: string;
    moderate: string;
    strong: string;
    create: string;
    update: string;
    delete: string;
    noProfile: string;
    recommendations: string;
  };
  // Errors
  errors: {
    notFound: string;
    unauthorized: string;
    forbidden: string;
    badRequest: string;
    serverError: string;
    networkError: string;
    tryAgain: string;
    goHome: string;
    loadingError: string;
    validationError: string;
  };
  // Footer
  footer: {
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    social: string;
    copyright: string;
    followUs: string;
  };
}

export type LocaleKey = keyof LocalizationStrings;
// export type NestedKey<T> = {
//   [K in keyof T]: T[K] extends object ? K | `${K & string}.${NestedKey<T[K]>}` : K;
// }[keyof T];
export type NestedKey<T> = {
  [K in keyof T & string]: T[K] extends object ? K | `${K}.${NestedKey<T[K]>}` : K;
}[keyof T & string];