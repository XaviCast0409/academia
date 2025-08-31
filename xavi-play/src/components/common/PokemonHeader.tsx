import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from '@/styles/header.styles';
import { useAuthStore } from '@/store/authStore';
import XavicoinDisplay from './XavicoinDisplay';
import NotificationBell from './NotificationBell';

interface PokemonHeaderProps {
  title: string;
  onMenuPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const PokemonHeader: React.FC<PokemonHeaderProps> = ({ title, onMenuPress, showBackButton, onBackPress }) => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setMenuVisible(true);
    onMenuPress?.();
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              setMenuVisible(false);
              (navigation as any).reset({ index: 0, routes: [{ name: 'Login' }] });
            } catch (error: any) {
              Alert.alert('Error', 'No se pudo cerrar sesión correctamente');
            }
          },
        },
      ]
    );
  };

  const handleMenuItemPress = (item: string) => {
    setMenuVisible(false);
    
    // Implementar navegación a las diferentes vistas
    switch (item) {
      case 'mis-evidences':
        (navigation as any).navigate('Evidences');
        break;
      case 'mis-compras':
        (navigation as any).navigate('Transactions');
        break;
      case 'ranking':
        (navigation as any).navigate('Ranking');
        break;
      case 'misiones':
        (navigation as any).navigate('Missions');
        break;
      case 'cerrar-sesion':
        handleLogout();
        break;
      default:
        break;
    }
  };

     const menuItems = [
     { id: 'mis-evidences', title: 'Mis Evidencias', icon: '📤' },
     { id: 'mis-compras', title: 'Mis Compras', icon: '🛒' },
     { id: 'ranking', title: 'Ranking', icon: '🏆' },
     { id: 'misiones', title: 'Misiones', icon: '🎯' },
     { id: 'cerrar-sesion', title: 'Cerrar Sesión', icon: '🚪' },
   ];

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.content}>
        {showBackButton ? (
          <View style={headerStyles.leftSection}>
            <TouchableOpacity
              style={headerStyles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Text style={headerStyles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Text style={headerStyles.title}>{title}</Text>
        <View style={headerStyles.rightSection}>
          <NotificationBell onPress={() => (navigation as any).navigate('Notifications')} />
          <TouchableOpacity
            style={headerStyles.menuButton}
            onPress={handleMenuPress}
            activeOpacity={0.7}
          >
            <View style={headerStyles.menuIcon}>
              <View style={headerStyles.menuLine} />
              <View style={headerStyles.menuLine} />
              <View style={headerStyles.menuLine} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal del menú */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={headerStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={headerStyles.menuContainer}>
            <View style={headerStyles.menuHeader}>
              <Text style={headerStyles.menuTitle}>Menú</Text>
              <TouchableOpacity
                style={headerStyles.closeButton}
                onPress={() => setMenuVisible(false)}
              >
                <Text style={headerStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={headerStyles.menuItem}
                onPress={() => handleMenuItemPress(item.id)}
                activeOpacity={0.7}
              >
                <Text style={headerStyles.menuItemIcon}>{item.icon}</Text>
                <Text style={headerStyles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PokemonHeader; 