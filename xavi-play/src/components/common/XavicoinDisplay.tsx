import { View, Text } from 'react-native';
import { xavicoinStyles } from '@/styles/xavicoin.styles';

interface XavicoinDisplayProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
}

const XavicoinDisplay: React.FC<XavicoinDisplayProps> = ({ 
  amount, 
  size = 'medium' 
}) => {
  return (
    <View style={[xavicoinStyles.container, xavicoinStyles[size]]}>
      <Text style={[xavicoinStyles.coinIcon, xavicoinStyles[`${size}CoinIcon`]]}>🪙</Text>
      <Text style={[xavicoinStyles.text, xavicoinStyles[`${size}Text`]]}>
        {amount}
      </Text>
    </View>
  );
};

export default XavicoinDisplay; 