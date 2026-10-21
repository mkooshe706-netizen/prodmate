import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  variant?: 'default' | 'elevated' | 'highlight';
}

export const Card = ({
  children,
  className = '',
  variant = 'default',
  ...props
}: CardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white border border-border-light shadow-sm';
      case 'highlight':
        return 'bg-primary-50 border border-primary-100';
      case 'default':
      default:
        return 'bg-white border border-border-light';
    }
  };

  return (
    <View
      className={`rounded-2xl p-4 ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardHeader = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <View className={`flex-row justify-between items-center mb-3 ${className}`}>
    {children}
  </View>
);

export const CardContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <View className={className}>{children}</View>;