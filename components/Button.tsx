import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = styles.primaryButton;
        break;
      case 'secondary':
        buttonStyle = styles.secondaryButton;
        break;
      case 'outline':
        buttonStyle = styles.outlineButton;
        break;
      case 'danger':
        buttonStyle = styles.dangerButton;
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, ...styles.smallButton };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, ...styles.mediumButton };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, ...styles.largeButton };
        break;
    }
    
    // Disabled style
    if (disabled || loading) {
      buttonStyle = { ...buttonStyle, ...styles.disabledButton };
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleVar: TextStyle = {};
    
    switch (variant) {
      case 'primary':
        textStyleVar = styles.primaryText;
        break;
      case 'secondary':
        textStyleVar = styles.secondaryText;
        break;
      case 'outline':
        textStyleVar = styles.outlineText;
        break;
      case 'danger':
        textStyleVar = styles.dangerText;
        break;
    }
    
    switch (size) {
      case 'small':
        textStyleVar = { ...textStyleVar, ...styles.smallText };
        break;
      case 'medium':
        textStyleVar = { ...textStyleVar, ...styles.mediumText };
        break;
      case 'large':
        textStyleVar = { ...textStyleVar, ...styles.largeText };
        break;
    }
    
    if (disabled || loading) {
      textStyleVar = { ...textStyleVar, ...styles.disabledText };
    }
    
    return textStyleVar;
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#3498db' : '#ffffff'} 
        />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  // Variant styles
  primaryButton: {
    backgroundColor: '#3498db',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: '#f1c40f',
  },
  secondaryText: {
    color: '#2c3e50',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  outlineText: {
    color: '#3498db',
  },
  dangerButton: {
    backgroundColor: '#e74c3c',
  },
  dangerText: {
    color: '#ffffff',
  },
  // Size styles
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  mediumText: {
    fontSize: 14,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  largeText: {
    fontSize: 16,
  },
  // Disabled styles
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;