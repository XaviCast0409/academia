import { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { storeStyles } from '@/styles/store.styles';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';
import transactionService from '@/services/transactionService';
import { Product } from '@/types/product';

const StorePage = () => {
  const { user, updateUserXaviCoins, refreshUserData } = useAuthStore();
  const { products, loading, loadProducts } = useProductStore();

  // Cargar productos del backend
  useEffect(() => {
    loadProducts().catch((error) => {
      Alert.alert('Error', 'No se pudieron cargar los productos');
      console.error('Error loading products:', error);
    });
  }, [loadProducts]);

  const handleBuyProduct = (product: Product) => {
    // Verificar si el usuario tiene suficientes XaviCoins
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para comprar');
      return;
    }

    if (user.xaviCoins < product.price) {
      Alert.alert(
        'Saldo Insuficiente', 
        `Necesitas ${product.price} XaviCoins para comprar este producto. Tu saldo actual es ${user.xaviCoins} XaviCoins.`
      );
      return;
    }

    // Mostrar confirmación de compra
    Alert.alert(
      'Confirmar Compra',
      `¿Estás seguro de que quieres comprar "${product.name}" por ${product.price} XaviCoins?\n\nTu saldo actual: ${user.xaviCoins} XaviCoins\nSaldo después de la compra: ${user.xaviCoins - product.price} XaviCoins`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Comprar',
          style: 'default',
          onPress: () => executePurchase(product),
        },
      ]
    );
  };

  const executePurchase = async (product: Product) => {
    if (!user) return;

    try {
      const response = await transactionService.purchaseProduct(parseInt(user.id), product.id);
      
      if (response.success) {
        // Actualizar XaviCoins del usuario en el store
        const newXaviCoins = user.xaviCoins - product.price;
        updateUserXaviCoins(newXaviCoins);
        
        Alert.alert(
          '¡Compra Exitosa!',
          `Has comprado "${product.name}" exitosamente.\n\n${response.message}`,
          [
            {
              text: 'OK',
              onPress: async () => {
                // Recargar productos y refrescar datos del usuario
                await Promise.all([
                  loadProducts(),
                  refreshUserData()
                ]);
              },
            },
          ]
        );
      } else {
        Alert.alert('Error en la Compra', response.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al realizar la compra');
      console.error('Purchase error:', error);
    }
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Tienda Pokémon" />
      <ScrollView 
        style={storeStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={storeStyles.itemsContainer}>
          {loading ? (
            <View style={storeStyles.loadingContainer}>
              <Text style={storeStyles.loadingText}>Cargando productos...</Text>
            </View>
          ) : (
            products.map((product) => (
              <TouchableOpacity key={product.id} style={storeStyles.itemCard}>
                <Image 
                  source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }} 
                  style={storeStyles.itemImage} 
                />
                <View style={storeStyles.itemInfo}>
                  <Text style={storeStyles.itemName}>{product.name}</Text>
                  <Text style={storeStyles.itemDescription}>{product.description}</Text>
                  <Text style={storeStyles.professorName}>Prof. {product.professor.name}</Text>
                  <View style={storeStyles.priceContainer}>
                    <Text style={storeStyles.price}>{product.price}</Text>
                    <Text style={storeStyles.currency}> XaviCoins</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={storeStyles.buyButton}
                  onPress={() => handleBuyProduct(product)}
                >
                  <Text style={storeStyles.buyButtonText}>Comprar</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default StorePage; 