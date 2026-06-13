// ============================================
// REACT & JSX TYPE EXTENSIONS
// ============================================

import React from 'react';

declare global {
  namespace React {
    // ============================================
    // CUSTOM COMPONENT PROPS
    // ============================================

    interface FC<P = any> {
      /**
       * Display name for debugging
       */
      displayName?: string;

      /**
       * Static metadata
       */
      metadata?: Record<string, any>;
    }

    // ============================================
    // EXTENDED HTML ATTRIBUTES
    // ============================================

    interface HTMLAttributes<T> {
      /**
       * CSS module class name
       */
      moduleName?: string;

      /**
       * Data attributes for testing
       */
      'data-testid'?: string;
      'data-test'?: string;

      /**
       * Analytics attributes
       */
      'data-analytics'?: string;
      'data-event'?: string;
    }

    // ============================================
    // FORM ELEMENT EXTENSIONS
    // ============================================

    interface InputHTMLAttributes<T> {
      /**
       * Show loading state
       */
      isLoading?: boolean;

      /**
       * Show error state
       */
      hasError?: boolean;

      /**
       * Clear input button
       */
      clearable?: boolean;
    }

    interface SelectHTMLAttributes<T> {
      /**
       * Show loading state
       */
      isLoading?: boolean;

      /**
       * Show error state
       */
      hasError?: boolean;

      /**
       * Placeholder text
       */
      placeholder?: string;
    }

    interface TextareaHTMLAttributes<T> {
      /**
       * Show error state
       */
      hasError?: boolean;

      /**
       * Character limit
       */
      maxChars?: number;

      /**
       * Show character count
       */
      showCharCount?: boolean;
    }

    interface ButtonHTMLAttributes<T> {
      /**
       * Button variant
       */
      variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';

      /**
       * Button size
       */
      size?: 'sm' | 'md' | 'lg' | 'xl';

      /**
       * Show loading state
       */
      isLoading?: boolean;

      /**
       * Is disabled
       */
      isDisabled?: boolean;

      /**
       * Full width
       */
      fullWidth?: boolean;

      /**
       * Icon position
       */
      iconPosition?: 'left' | 'right';
    }
  }
}

// ============================================
// STYLED COMPONENTS TYPES (if using)
// ============================================

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      warning: string;
      info: string;
      bg: string;
      text: string;
      border: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

// ============================================
// NEXT.JS SPECIFIC TYPES
// ============================================

export interface NextPageWithLayout<P = {}, IP = P> extends React.FC<P> {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  metadata?: {
    title: string;
    description: string;
  };
}

export interface NextAppWithLayout extends App {
  Component: NextPageWithLayout;
}

// ============================================
// COMPONENT PROPS HELPERS
// ============================================

export type PropsWithClassName<P = {}> = P & {
  className?: string;
};

export type PropsWithStyle<P = {}> = P & {
  style?: React.CSSProperties;
};

export type PropsWithChildren<P = {}> = P & {
  children?: React.ReactNode;
};

export type PropsWithRef<P = {}, R = any> = P & {
  ref?: React.Ref<R>;
};

// ============================================
// EVENT HANDLER TYPES
// ============================================

export type InputChangeHandler = (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
export type SelectChangeHandler = (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
export type TextareaChangeHandler = (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type CheckboxChangeHandler = (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

// ============================================
// HOOK TYPES
// ============================================

export interface UseStateReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
}

export interface UseCallbackOptions {
  memoize?: boolean;
  delay?: number;
}

export interface UseEffectOptions {
  once?: boolean;
  condition?: boolean | (() => boolean);
}

// ============================================
// CONTEXT TYPES
// ============================================

export interface ContextValue<T> {
  state: T;
  dispatch: React.Dispatch<React.SetStateAction<T>>;
}

export interface ProviderProps {
  children?: React.ReactNode;
  value?: any;
}

// ============================================
// RENDER PROP TYPES
// ============================================

export type RenderProp<T> = (props: T) => React.ReactNode;
export type Children<T = {}> = React.ReactNode | RenderProp<T>;

// ============================================
// COMPONENT TYPE HELPERS
// ============================================

export type ComponentType<P = {}> = React.FC<P> | React.ComponentClass<P>;
export type ForwardRefComponent<T = any, P = {}> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;

// ============================================
// MEMO COMPONENT TYPE
// ============================================

export type MemoComponent<P = {}> = React.MemoExoticComponent<React.FC<P>>;

// ============================================
// HOC TYPE
// ============================================

export type HOC<P, IP = P> = (Component: ComponentType<IP>) => ComponentType<P>;

// ============================================
// SVG ICON TYPE
// ============================================

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
  title?: string;
  className?: string;
}

export type IconComponent = React.FC<IconProps>;

// ============================================
// ANIMATION COMPONENT TYPES
// ============================================

export interface AnimatedComponentProps<P = {}> extends PropsWithChildren<P> {
  animationName: string;
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface TransitionComponentProps<P = {}> extends PropsWithChildren<P> {
  in: boolean;
  timeout?: number | { enter?: number; exit?: number };
  unmountOnExit?: boolean;
}
