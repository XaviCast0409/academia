import { useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import Pagination from '@/components/common/Pagination';
import { transactionsStyles } from '@/styles/transactions.styles';
import { useAuthStore } from '@/store/authStore';
import { useTransactionStore } from '@/store/transactionStore';
import { Transaction } from '@/types/transaction';

const TransactionsPage = () => {
  console.log('TransactionsPage: Component rendered');
  const { user } = useAuthStore();
  const { 
    transactions, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    loadTransactions 
  } = useTransactionStore();

  useEffect(() => {
    if (user) {
      loadTransactions(parseInt(user.id)).catch((error) => {
        Alert.alert('Error', 'No se pudieron cargar las transacciones');
        console.error('Error loading transactions:', error);
      });
    }
  }, [user, loadTransactions]);

  // Refrescar transacciones cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      if (user) {
        console.log('TransactionsPage: Refreshing transactions on focus');
        loadTransactions(parseInt(user.id)).catch((error) => {
          console.error('Error refreshing transactions:', error);
        });
      }
    }, [user, loadTransactions])
  );

  const handlePageChange = (page: number) => {
    if (user) {
      loadTransactions(parseInt(user.id), page).catch((error) => {
        Alert.alert('Error', 'No se pudo cargar la página');
        console.error('Error loading page:', error);
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return { 
          container: transactionsStyles.typePurchase, 
          text: transactionsStyles.typeTextPurchase 
        };
      case 'assignment':
        return { 
          container: transactionsStyles.typeAssignment, 
          text: transactionsStyles.typeTextAssignment 
        };
      default:
        return { 
          container: transactionsStyles.typePurchase, 
          text: transactionsStyles.typeTextPurchase 
        };
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'Compra';
      case 'assignment':
        return 'Asignación';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderTransactionCard = (transaction: Transaction) => {
    const typeStyles = getTypeColor(transaction.type);
    
    return (
      <View key={transaction.id} style={transactionsStyles.transactionCard}>
        <View style={transactionsStyles.transactionHeader}>
          <View style={transactionsStyles.productInfo}>
            <Text style={transactionsStyles.productName}>
              {transaction.product?.name || 'Producto no disponible'}
            </Text>
            <Text style={transactionsStyles.productDescription}>
              {transaction.description}
            </Text>
          </View>
          <View style={[transactionsStyles.transactionType, typeStyles.container]}>
            <Text style={[transactionsStyles.typeText, typeStyles.text]}>
              {getTypeText(transaction.type)}
            </Text>
          </View>
        </View>

        <View style={transactionsStyles.transactionDetails}>
          <View style={transactionsStyles.amountContainer}>
            <Text style={transactionsStyles.amountText}>
              -{transaction.amount}
            </Text>
            <Text style={transactionsStyles.currencyText}>XaviCoins</Text>
          </View>

          <View style={transactionsStyles.dateContainer}>
            <Text style={transactionsStyles.dateText}>
              Realizada el {formatDate(transaction.createdAt)}
            </Text>
          </View>

          {transaction.description && (
            <View style={transactionsStyles.descriptionContainer}>
              <Text style={transactionsStyles.descriptionText}>
                "{transaction.description}"
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={transactionsStyles.emptyContainer}>
      <Text style={transactionsStyles.emptyIcon}>🛒</Text>
      <Text style={transactionsStyles.emptyTitle}>No hay transacciones</Text>
      <Text style={transactionsStyles.emptyText}>
        Cuando realices compras en la tienda, aparecerán aquí en tu historial de transacciones.
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <PokemonHeader title="Historial de Transacciones" />
      <ScrollView 
        style={transactionsStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {loading ? (
          <View style={transactionsStyles.loadingContainer}>
            <Text style={transactionsStyles.loadingText}>Cargando transacciones...</Text>
          </View>
        ) : error ? (
          <View style={transactionsStyles.errorContainer}>
            <Text style={transactionsStyles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={transactionsStyles.retryButton} 
              onPress={() => user && loadTransactions(parseInt(user.id))}
            >
              <Text style={transactionsStyles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : transactions.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <View style={transactionsStyles.transactionsContainer}>
              {transactions.map(renderTransactionCard)}
            </View>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default TransactionsPage; 