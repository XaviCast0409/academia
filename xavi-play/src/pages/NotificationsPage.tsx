import React from 'react';
import { Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNotificationStore } from '@/store/notificationStore';
import PokemonHeader from '@/components/common/PokemonHeader';
import ScreenWrapper from '@/components/common/ScreenWrapper';

const NotificationsPage: React.FC = () => {
  const { items, fetch, isLoading, markAsRead } = useNotificationStore();

  React.useEffect(() => {
    fetch(1);
  }, [fetch]);

  return (
    <ScreenWrapper>
      <PokemonHeader title="Notificaciones" />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => fetch(1)} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => markAsRead(item.id)}
            style={{
              backgroundColor: item.isRead ? '#1f2937' : '#374151',
              marginHorizontal: 12,
              marginVertical: 8,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: '#4b5563',
            }}
          >
            <Text style={{ color: '#f9fafb', fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
            <Text style={{ color: '#d1d5db' }}>{item.message}</Text>
            <Text style={{ color: '#9ca3af', marginTop: 6, fontSize: 12 }}>{new Date(item.createdAt).toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </ScreenWrapper>
  );
};

export default NotificationsPage;


