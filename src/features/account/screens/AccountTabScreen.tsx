import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const AccountTabScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Account Tab Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountTabScreen;
