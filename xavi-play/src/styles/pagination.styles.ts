import { StyleSheet } from 'react-native';

export const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dc2626', // red-600
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af', // gray-400
    borderColor: '#6b7280', // gray-500
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#6b7280', // gray-500
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dc2626', // red-600
  },
  activePageButton: {
    backgroundColor: '#dc2626', // red-600
  },
  ellipsisButton: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  pageButtonText: {
    color: '#dc2626', // red-600
    fontSize: 14,
    fontWeight: 'bold',
  },
  activePageButtonText: {
    color: '#ffffff',
  },
  ellipsisText: {
    color: '#6b7280', // gray-500
    fontSize: 14,
  },
}); 