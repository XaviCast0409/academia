import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotificationStore } from '@/store/notificationStore';

interface Props {
  onPress?: () => void;
}

const NotificationBell: React.FC<Props> = ({ onPress }) => {
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ padding: 4 }}>
      <View>
        <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        {unreadCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -2,
              top: -2,
              backgroundColor: '#ef4444',
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#111827',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 2,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBell;


