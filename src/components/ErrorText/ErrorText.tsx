import { Text } from 'react-native';

type Props = {
  error: string;
  invalid: boolean;
};
export default function ErrorText({ error, invalid }: Props) {
  if (!invalid) return null;

  return <Text>{error}</Text>;
}
