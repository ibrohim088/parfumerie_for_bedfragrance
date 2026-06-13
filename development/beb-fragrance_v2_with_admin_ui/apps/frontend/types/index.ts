// ============================================
// TYPES INDEX - BARREL EXPORT
// ============================================

// ============================================
// ENVIRONMENT & CONFIGURATION TYPES
// ============================================

export type { ValidatedEnv, EnvironmentValidator } from './env';

// ============================================
// NEXTAUTH TYPES
// ============================================

export type {
  NextAuthCallbacks,
  NextAuthEvents,
  Account,
  Profile,
  NextAuthConfig,
} from './next-auth';

// ============================================
// REACT & JSX TYPES
// ============================================

export type {
  PropsWithClassName,
  PropsWithStyle,
  PropsWithChildren,
  PropsWithRef,
  InputChangeHandler,
  SelectChangeHandler,
  TextareaChangeHandler,
  CheckboxChangeHandler,
  UseStateReturn,
  UseCallbackOptions,
  UseEffectOptions,
  ContextValue,
  ProviderProps,
  RenderProp,
  Children,
  ComponentType,
  ForwardRefComponent,
  MemoComponent,
  HOC,
  IconProps,
  IconComponent,
  AnimatedComponentProps,
  TransitionComponentProps,
} from './react';

// ============================================
// NEXT.JS TYPES
// ============================================

export type {
  PageProps,
  PagePropsWithLayout,
  SSRPageProps,
  StaticPageProps,
  PageMetadata,
  LocalizedMetadata,
  NextApiHandler,
  ApiResponse,
  ApiErrorResponse,
  ApiPaginatedResponse,
  MiddlewareHandler,
  MiddlewareConfig,
  RouteHandler,
  RouteHandlerMethods,
  OptimizedImageProps,
  FontConfig,
  RedirectRule,
  RewriteRule,
  HeaderRule,
  BuildInfo,
  BuildManifest,
  WebpackConfig,
  NextConfig,
  ISRConfig,
  RevalidateType,
  PerformanceMetric,
  WebVital,
  PageSpeedMetric,
  DeploymentConfig,
} from './next';

export { NextError, NotFoundError, InternalServerError } from './next';

// ============================================
// API TYPES
// ============================================

export * from './api.types';

export type {
  ProductsQueryParams,
  Product,
  ProductDetailResponse,
  ProductsListResponse,
  ProductSearchResponse,
  OrderItem,
  Order,
  CreateOrderRequest,
  OrdersListResponse,
  OrderDetailResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
  CancelOrderResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
  User,
  UserDetailResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  Address,
  CreateAddressRequest,
  AddressesListResponse,
  AddressDetailResponse,
  CreateAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  DeleteAddressResponse,
  SetDefaultAddressResponse,
  Notification,
  NotificationsListResponse,
  MarkAsReadResponse,
  MarkAllAsReadResponse,
  DeleteNotificationResponse,
  ScentProfile,
  CreateScentProfileRequest,
  ScentProfileResponse,
  UpdateScentProfileRequest,
  DeleteScentProfileResponse,
  CreatePaymentRequest,
  PaymePaymentResponse,
  ClickPaymentResponse,
  PaymentStatusResponse,
  PaymentCallbackRequest,
  PaymentCallbackResponse,
  CartItem,
  Cart,
  CartResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
  RemoveFromCartResponse,
  ClearCartResponse,
  ApiResponse,
  PaginatedResponse,
  ApiErrorResponse,
} from './api.types';

// ============================================
// DOMAIN TYPES
// ============================================

export * from './domain.types';

export type {
  ProductCategory,
  ProductReview,
  ProductFilterOptions,
  ProductVariant,
  ScraperProduct,
  OrderStatusHistory,
  OrderTimeline,
  ShippingInfo,
  RefundInfo,
  GiftOrder,
  UserPreferences,
  UserStatistics,
  UserVerification,
  UserAccount,
  Admin,
  AdminPermission,
  CartSummary,
  CartPromoCode,
  CartSaved,
  PaymentMethod,
  Transaction,
  PaymentStats,
  WishlistItem,
  Wishlist,
  PriceHistoryEntry,
  NotificationPreferences,
  NotificationTemplate,
  ProductRating,
  UserReview,
  ScentNote,
  ScentFamily,
  ScentPreference,
  PersonalScentProfile,
  UserActivity,
  SalesMetrics,
  UserMetrics,
  SupportTicket,
  SupportMessage,
  Coupon,
  PromoCapaign,
  Locale,
  Theme,
  Currency,
  PaymentStatus,
  OrderStatus,
  NotificationType,
  UserRole,
} from './domain.types';

// ============================================
// COMMON TYPES
// ============================================

export * from './common.types';

export type {
  FormError,
  FormState,
  FormSubmitResult,
  PaginationParams,
  FilterParams,
  SortOption,
  PaginationMeta,
  LoadingState,
  AsyncState,
  RequestState,
  AppError,
  ValidationError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  NavItem,
  Breadcrumb,
  RouteParams,
  Column,
  TableState,
  TableProps,
  ModalConfig,
  ConfirmDialogConfig,
  SelectOption,
  OptionGroup,
  MultiSelectState,
  ToastConfig,
  NotificationConfig,
  ResponsiveValue,
  BreakpointConfig,
  ScreenSize,
  ThemeConfig,
  CSSVariables,
  AnimationConfig,
  TransitionConfig,
  LocaleConfig,
  Translation,
  TranslationNamespace,
  FileUploadConfig,
  UploadedFile,
  FileProgress,
  ValidationRule,
  FieldValidationConfig,
  ValidationErrors,
  RequestConfig,
  ResponseInterceptor,
  RequestInterceptor,
  QueryOptions,
  MutationOptions,
  SearchConfig,
  SearchResult,
  FilterGroup,
  AnalyticsEvent,
  PageViewEvent,
  ConversionEvent,
  CacheConfig,
  CacheEntry,
} from './common.types';

// ============================================
// ERROR CLASSES EXPORT
// ============================================

export {
  AppError,
  ValidationError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from './common.types';

// ============================================
// ENUMS EXPORT
// ============================================

export { HttpStatus, Environment, AdminPermission } from './common.types';

// ============================================
// TYPE GUARDS & UTILITIES
// ============================================

/**
 * Type guard for User
 */
export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'phone' in obj &&
    'role' in obj
  );
}

/**
 * Type guard for Admin
 */
export function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

/**
 * Type guard for error
 */
export function isAppError(error: any): error is AppError {
  return error instanceof AppError;
}

/**
 * Type guard for validation error
 */
export function isValidationError(error: any): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Type guard for async state
 */
export function isAsyncLoading<T>(state: AsyncState<T>): state is AsyncState<T> & { isLoading: true } {
  return state.isLoading;
}

/**
 * Type guard for async error
 */
export function isAsyncError<T>(state: AsyncState<T>): state is AsyncState<T> & { isError: true } {
  return state.isError;
}

/**
 * Type guard for async success
 */
export function isAsyncSuccess<T>(state: AsyncState<T>): state is AsyncState<T> & { data: T } {
  return !state.isLoading && !state.isError && state.data !== undefined;
}
