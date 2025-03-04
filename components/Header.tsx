import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Menu } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
  onMenuPress,
  rightComponent,
}) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
        )}
        
        {showMenuButton && (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onMenuPress}
          >
            <Menu size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        paddingTop: 48,
        height: 90,
      },
      android: {
        paddingTop: 16,
        height: 64,
      },
      web: {
        paddingTop: 16,
        height: 64,
      },
    }),
  },
  leftContainer: {
    flexDirection: 'row',
    width: 60,
  },
  rightContainer: {
    width: 60,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 4,
  },
  menuButton: {
    padding: 4,
  },
});

export default Header;