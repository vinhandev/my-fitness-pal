import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../components/Inputs/TextInput/TextInput';
import { useEffect, useState } from 'react';
import NumberInput from '../../components/Inputs/NumberInput/NumberInput';
import TextButton from '../../components/Buttons/TextButton/TextButton';
import { State, addWeightList, updateWeight } from '../../store/slices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../components';
import { router } from 'expo-router';
import SwipeSelector from '../../components/Inputs/SwipeSelector/SwipeSelector';

export default function UpdateWeight() {
  const currentWeight = useSelector(
    (state: { user: State }) => state.user.weight
  );
  const [weight, setWeight] = useState(0);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateWeight(weight));
    dispatch(
      addWeightList({
        dataPointText: `${weight} kg`,
        date: new Date().getTime(),
        value: weight,
      })
    );

    router.back();
  };

  useEffect(() => {
    setWeight(currentWeight);
  }, [currentWeight]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <View
          style={{
            paddingHorizontal: 14,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Icon variant="back" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 10 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 50,
              fontWeight: 'bold',
            }}
          >
            {weight} kg
          </Text>
          <SwipeSelector
            color={'#000'} //
            current={weight}
            max={200}
            min={0}
            onChange={setWeight}
            step={0.5}
            defaultValue={currentWeight}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 14,
          }}
        >
          <TextButton onPress={handleUpdate}>Update</TextButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
