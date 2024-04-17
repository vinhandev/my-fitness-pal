import { View } from 'react-native';

type Props = {
  limit: number;
  current: number;
};
export default function ProgressBar({ current, limit }: Props) {
  const percent = Math.round((current / limit) * 100);
  return (
    <View
      style={{
        height: 5,
        borderRadius: 5,
        backgroundColor: '#ddd',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#554E91',
          width: `${percent}%`,
        }}
      />
    </View>
  );
}
