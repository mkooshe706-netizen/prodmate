import React from 'react';
import {
  Text,
  Pressable,
  ActivityIndicator,
  View,
  PressableProps,
} from 'react-native';
import { Colors } from '../../theme/colors';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) => {
  const getContainerClasses = () => {
    const base = 'flex-row items-center justify-center rounded-xl';
    const disabledStyle = disabled || isLoading ? 'opacity-50' : '';

    const variants = {
      primary: 'bg-primary-600',
      secondary: 'bg-primary-50',
      outline: 'bg-transparent border border-border-light',
      ghost: 'bg-transparent',
    };

    const sizes = {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    };

    return `${base} ${variants[variant]} ${sizes[size]} ${disabledStyle} ${className}`;
  };

  const getTextClasses = () => {
    const base = 'font-inter-semibold text-center';

    const variants = {
      primary: 'text-white',
      secondary: 'text-primary-600',
      outline: 'text-neutral-900',
      ghost: 'text-neutral-500',
    };

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return `${base} ${variants[variant]} ${sizes[size]}`;
  };

  return (
    <Pressable
      disabled={disabled || isLoading}
      className={getContainerClasses()}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : Colors.primary.main}
          size="small"
        />
      ) : (
        <View className="flex-row items-center justify-center gap-x-2">
          {leftIcon}
          <Text className={getTextClasses()}>{label}</Text>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
};