import { StyleSheet } from 'react-native';

export const tabBarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#dc2626', // red-600
    borderTopWidth: 4,
    borderTopColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    paddingBottom: 40, // Add padding for safe area
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#b91c1c', // red-700
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  activeLabel: {
    fontWeight: 'bold',
  },
}); 