import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { State } from '../store/slices';

export default function App() {
  const user = useSelector((state: { user: State }) => state.user);

  console.log(user);

  if (user.name !== '') {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/onboarding" />;
}
