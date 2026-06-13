// ============================================
// COMMON & SHARED TYPES
// ============================================

// ============================================
// FORM TYPES
// ============================================

export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface FormSubmitResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// ============================================
// PAGINATION & FILTERING
// ============================================

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

export interface SortOption {
  label: string;
  value: string;
  order: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ============================================
// LOADING & ERROR STATES
// ============================================

export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error?: Error | string;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

export interface RequestState {
  status: 'idle' | 'pending' | 'success' | 'error';
  isLoading: boolean;
  error?: string;
  data?: any;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Authorization denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

// ============================================
// NAVIGATION & ROUTING
// ============================================

export interface NavItem {
  label: string;
  labelUz?: string;
  labelRu?: string;
  href: string;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[];
  divider?: boolean;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  current?: boolean;
}

export interface RouteParams {
  locale: 'uz' | 'ru';
  [key: string]: string;
}

// ============================================
// TABLE & LIST TYPES
// ============================================

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableState<T> {
  data: T[];
  selectedRows: string[];
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
  filters: FilterParams;
  pagination: PaginationMeta;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
  onSelect?: (selectedRows: string[]) => void;
  pagination?: PaginationMeta;
  onPaginationChange?: (page: number, limit: number) => void;
}

// ============================================
// MODAL & DIALOG TYPES
// ============================================

export interface ModalConfig {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
}

export interface ConfirmDialogConfig extends ModalConfig {
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: 'primary' | 'danger' | 'warning';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

// ============================================
// DROPDOWN & SELECT TYPES
// ============================================

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
  description?: string;
  icon?: string;
}

export interface OptionGroup<T = string> {
  label: string;
  options: SelectOption<T>[];
}

export interface MultiSelectState {
  selectedValues: string[];
  isOpen: boolean;
  searchQuery: string;
}

// ============================================
// TOAST & NOTIFICATION TYPES
// ============================================

export interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationConfig extends ToastConfig {
  id: string;
  timestamp: number;
}

// ============================================
// RESPONSIVE & LAYOUT TYPES
// ============================================

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

export interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface ScreenSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
}

// ============================================
// THEME & STYLING TYPES
// ============================================

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    [key: string]: string;
  };
  spacing: Record<string, number | string>;
  borderRadius: Record<string, number | string>;
  shadows: Record<string, string>;
  typography: Record<string, any>;
}

export interface CSSVariables {
  [key: string]: string | number;
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  repeat?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface TransitionConfig {
  property: string;
  duration: number;
  easing?: string;
  delay?: number;
}

// ============================================
// LOCALIZATION TYPES
// ============================================

export interface LocaleConfig {
  code: 'uz' | 'ru';
  name: string;
  nameNative: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  currencyCode: string;
  currencySymbol: string;
  phonePrefix: string;
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationNamespace {
  [namespace: string]: Translation;
}

// ============================================
// UPLOAD & FILE TYPES
// ============================================

export interface FileUploadConfig {
  accept: string | string[];
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface FileProgress {
  fileName: string;
  progress: number;
  loaded: number;
  total: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ValidationRule<T = any> {
  validate: (value: T) => boolean | Promise<boolean>;
  message: string;
  when?: (formValues: any) => boolean;
}

export interface FieldValidationConfig {
  required?: string | boolean;
  minLength?: number | string;
  maxLength?: number | string;
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => boolean | string | Promise<boolean | string>;
  custom?: ValidationRule[];
}

export type ValidationErrors = Record<string, string>;

// ============================================
// API CLIENT TYPES
// ============================================

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}

export interface ResponseInterceptor {
  onSuccess: (response: any) => any;
  onError: (error: any) => Promise<any>;
}

export interface RequestInterceptor {
  onBefore: (config: RequestConfig) => RequestConfig;
  onError: (error: any) => Promise<any>;
}

// ============================================
// QUERY & MUTATION TYPES
// ============================================

export interface QueryOptions<T> {
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface MutationOptions<TData, TError = Error, TVariables = void> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

// ============================================
// SEARCH & FILTER TYPES
// ============================================

export interface SearchConfig {
  debounceMs?: number;
  minChars?: number;
  matchType?: 'exact' | 'contains' | 'startsWith';
  caseSensitive?: boolean;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  executedAt: string;
}

export interface FilterGroup {
  label: string;
  options: SelectOption[];
  multiple?: boolean;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: number;
}

export interface PageViewEvent extends AnalyticsEvent {
  path: string;
  title: string;
  referrer?: string;
}

export interface ConversionEvent extends AnalyticsEvent {
  conversionType: string;
  value: number;
  currency?: string;
}

// ============================================
// CACHE TYPES
// ============================================

export interface CacheConfig {
  ttl?: number;
  key: string;
  version?: number;
}

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  createdAt: number;
}

// ============================================
// COMMON ENUMS
// ============================================

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}
