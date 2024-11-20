import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import styles from '../styles/estilos';

const LoadingSpinner = ({ size = 50, color = '#43A047' }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [rotateValue]);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.spinnerContainer}>
      <Animated.View 
        style={[
          styles.spinner, 
          { 
            width: size, 
            height: size, 
            borderColor: color,
            transform: [{ rotate: rotation }] 
          }
        ]}
      />
    </View>
  );
};

export default LoadingSpinner;