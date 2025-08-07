import { StyleSheet } from 'react-native';

export const xavicoinStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7', // yellow-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fbbf24', // yellow-400
  },
  coinIcon: {
    fontSize: 16,
    marginRight: 4,
    color: '#f59e0b', // amber-500 (dorado)
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  text: {
    fontWeight: 'bold',
    color: '#92400e', // yellow-800 (texto dorado oscuro)
  },
  // Size variants
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  smallCoinIcon: {
    fontSize: 12,
  },
  mediumCoinIcon: {
    fontSize: 16,
  },
  largeCoinIcon: {
    fontSize: 20,
  },
}); 