import { StyleSheet } from 'react-native';

export const storeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
  },
  content: {
    flex: 1,
    padding: 16,
  },
  itemsContainer: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#dbeafe', // blue-200
  },
  itemImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669', // green-600
  },
  currency: {
    fontSize: 14,
    color: '#059669', // green-600
    marginLeft: 4,
  },
  buyButton: {
    backgroundColor: '#fbbf24', // yellow-400
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  buyButtonText: {
    color: '#1e40af', // blue-800
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    fontWeight: '500',
  },
  professorName: {
    fontSize: 12,
    color: '#9ca3af', // gray-400
    marginBottom: 4,
    fontStyle: 'italic',
  },
}); 