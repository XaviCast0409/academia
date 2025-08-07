import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MainLayoutProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, tabBar }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {children}
      </View>
      {tabBar && (
        <View style={styles.tabBarContainer}>
          {tabBar}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: '#dc2626', // red-600
  },
});

export default MainLayout; 