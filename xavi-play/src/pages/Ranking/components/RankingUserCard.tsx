import React from 'react';
import { View, Text, Image } from 'react-native';
import { rankingStyles } from '@/styles/ranking.styles';
import { RankingUser } from '@/types/ranking';

interface Props {
  user: RankingUser;
  index: number;
}

const getPositionStyle = (index: number) => {
  switch (index) {
    case 0:
      return rankingStyles.position1;
    case 1:
      return rankingStyles.position2;
    case 2:
      return rankingStyles.position3;
    default:
      return rankingStyles.positionOther;
  }
};

const getPositionText = (index: number) => {
  switch (index) {
    case 0:
      return '🥇';
    case 1:
      return '🥈';
    case 2:
      return '🥉';
    default:
      return `${index + 1}`;
  }
};

export const RankingUserCard: React.FC<Props> = ({ user, index }) => {
  const positionStyle = getPositionStyle(index);
  const positionText = getPositionText(index);

  return (
    <View key={user.id} style={rankingStyles.rankingCard}>
      <View style={[rankingStyles.positionContainer, positionStyle]}>
        <Text style={rankingStyles.positionText}>{positionText}</Text>
      </View>

      <View style={rankingStyles.userInfo}>
        <Text style={rankingStyles.userName}>{user.name}</Text>
        <Text style={rankingStyles.userSection}>{user.section}</Text>

        <View style={rankingStyles.statsContainer}>
          <View style={rankingStyles.statItem}>
            <Text style={rankingStyles.statValue}>{user.level}</Text>
            <Text style={rankingStyles.statLabel}>Nivel</Text>
          </View>
          <View style={rankingStyles.statItem}>
            <Text style={rankingStyles.statValue}>{user.experience}</Text>
            <Text style={rankingStyles.statLabel}>Exp</Text>
          </View>
          <View style={rankingStyles.statItem}>
            <Text style={rankingStyles.statValue}>{user.xavicoints}</Text>
            <Text style={rankingStyles.statLabel}>XaviCoins</Text>
          </View>
        </View>

        {user.pokemon && (
          <View style={rankingStyles.pokemonContainer}>
            <Image source={{ uri: user.pokemon.imageUrl }} style={rankingStyles.pokemonImage} resizeMode="contain" />
            <Text style={rankingStyles.pokemonName}>{user.pokemon.name}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RankingUserCard;

