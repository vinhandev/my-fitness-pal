import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

type Props = {
  current: number;
  onChange: (value: number) => void;
  step: number;
  min: number;
  max: number;
  color: string;
  defaultValue: number;
};
export default function SwipeSelector({
  current,
  max,
  min,
  onChange,
  step,
  defaultValue,
  color,
}: Props) {
  const ref = useRef<ScrollView>(null);

  const itemWidth = 20;
  const listLength = Math.round((max - min) / step);

  const metricsList: number[] = [];
  for (let index = 0; index <= listLength; index++) {
    metricsList.push(index * step + min);
  }

  useEffect(() => {
    if (ref.current) {
      console.log('??', Math.round((current - min) / step) * itemWidth);

      setTimeout(
        () =>
          ref.current.scrollTo({
            x: Math.round((defaultValue - min) / step) * itemWidth,
            animated: true,
          }),
        100
      );
    }
  }, []);

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        height: 20,
      }}
    >
      <View
        style={{
          width: 0.5,
          height: 30,
          backgroundColor: 'red',
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 1,
        }}
      />
      <View
        style={{
          width: Dimensions.get('window').width,
        }}
      >
        <ScrollView
          ref={ref}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) =>
            onChange(
              metricsList[Math.round(e.nativeEvent.contentOffset.x / itemWidth)]
            )
          }
          scrollEventThrottle={1}
          horizontal
        >
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: Dimensions.get('window').width * 0.5,
              paddingRight: Dimensions.get('window').width * 0.5 - 1,
              alignItems: 'flex-end',
            }}
          >
            {metricsList.map((item, index) => (
              <View
                key={index}
                style={{
                  width: index === metricsList.length - 1 ? 1 : itemWidth,
                }}
              >
                <View
                  style={{
                    zIndex: -1,
                    width: 0.5,
                    height: index % 5 === 0 ? 25 : 15,
                    backgroundColor: index % 5 === 0 ? '#000' : 'grey',
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
