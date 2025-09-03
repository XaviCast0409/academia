import { View, Text, TouchableOpacity } from 'react-native';
import { TabParamList } from '@/types/navigation';
import { tabBarStyles } from '@/styles/tabBar.styles';
interface BottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  insets: any;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const isActive = (routeName: keyof TabParamList) => {
    return state.index === state.routes.findIndex((route: any) => route.name === routeName);
  };

  const tabs = [
    {
      name: 'Profile' as keyof TabParamList,
      label: 'Perfil',
      icon: '👤',
    },
    {
      name: 'Store' as keyof TabParamList,
      label: 'Tienda',
      icon: '🛍️',
    },
    {
      name: 'Activities' as keyof TabParamList,
      label: 'Actividades',
      icon: '📝',
    },
    {
      name: 'Study' as keyof TabParamList,
      label: 'Estudio',
      icon: '📚',
    },
  ];

  return (
    <View style={tabBarStyles.container}>
      <View style={tabBarStyles.tabsRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              tabBarStyles.tab,
              isActive(tab.name) && tabBarStyles.activeTab,
            ]}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Text style={tabBarStyles.icon}>{tab.icon}</Text>
            <Text
              style={[
                tabBarStyles.label,
                isActive(tab.name) && tabBarStyles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomTabBar; 