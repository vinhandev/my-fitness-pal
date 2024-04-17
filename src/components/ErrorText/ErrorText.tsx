import { Text } from 'react-native';
import { Colors } from '../../assets';

type Props = {
  error: string;
  isError: boolean;
};
export default function ErrorText({ error, isError }: Props) {
  if (!isError) return null;

  return (
    <Text
      style={{
        fontSize: 12,
        color: Colors.red,
      }}
    >
      {error}
    </Text>
  );
}
