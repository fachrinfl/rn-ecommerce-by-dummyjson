import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const CartTabScreen: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log({cart});

  return (
    <View style={styles.container}>
      <Text>Cart Tab Screen</Text>
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

export default CartTabScreen;
