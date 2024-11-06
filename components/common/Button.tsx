import { ComponentPropsWithRef } from 'react';
import { IconType } from 'react-icons';

interface IButtonProps extends ComponentPropsWithRef<'button'> {
  icon?: IconType;
  variant?: 'default' | 'outline' | 'text';
}

export default function Button({
  children,
  className = '',
  icon: Icon,
  variant = 'default',
  ...props
}: IButtonProps) {
  const getVariantClass = (variant: 'default' | 'outline' | 'text') => {
    switch (variant) {
      case 'default':
        return `text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200
dark:bg-gray-700 dark:hover:bg-gray-900`;
      case 'outline':
        return `border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300
bg-gray-50 hover:bo-gray200 dark:bg-gray-800 dark:hover:bg-gray-700`;
      case 'text':
        return `text-black dark:text-gray-300 bg-transparent hover:bg-gray-200
dark:hover:bg-gray-700`;
      default:
        return '';
    }
  };

  return (
    <button
      className={`inline-flex items-center w-[38px] min-h-[38px] rounded px-3 py-1 ${getVariantClass(variant)} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`text-lg ${children ? 'ml-1' : ''}'`} />}
      {children}
    </button>
  );
}
