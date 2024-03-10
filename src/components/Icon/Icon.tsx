import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  variant: 'back' | 'search' | 'plus' | 'verified' | 'down' | 'close' | 'scanner';
  size: number;
  color: string;
};
export default function Icon({ color, size, variant }: Props) {
  switch (variant) {
    case 'back':
      return <Ionicons name="arrow-back" size={size} color={color} />;
    case 'scanner':
      return <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
    case 'search':
      return <Ionicons name="search" size={size} color={color} />;
    case 'verified':
      return <MaterialIcons name="verified-user" size={size} color={color} />;
    case 'plus':
      return <Ionicons name="add" size={size} color={color} />;
    case 'down':
      return <Ionicons name="caret-down-sharp" size={size} color={color} />;
    case 'close':
      return <Ionicons name="close" size={size} color={color} />;
    default:
      break;
  }
}
