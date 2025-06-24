import React from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
  style?: React.CSSProperties;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', asChild = false, className = '', style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
      default: 'text-white hover:opacity-90 focus:ring-blue-500 transition-opacity',
      ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-11 px-8 py-3 text-lg',
      icon: 'h-10 w-10',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const buttonStyle = variant === 'default' && !style?.backgroundColor
      ? { backgroundColor: '#4793ea', ...style }
      : style;

    return (
      <Comp className={classes} style={buttonStyle} ref={ref} {...props} />
    );
  }
);

Button.displayName = 'Button';
