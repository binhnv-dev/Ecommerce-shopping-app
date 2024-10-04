import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Animated, ImageBackground } from 'react-native';

interface LoadingIndicatorProps {
  inline?: boolean;
  backdrop?: boolean;
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ inline = false, backdrop = false, message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, inline ? styles.inline : styles.fixed]}>
      {backdrop && (
        <ImageBackground
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your background image URL
          style={styles.absolute}
          blurRadius={10}
        />
      )}
      <Animated.View style={{ opacity: fadeAnim }}>
        <ActivityIndicator size="large" color="#ffffff" />
        {message && <Text style={styles.message}>{message}</Text>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inline: {
    position: 'relative',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  message: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoadingIndicator;