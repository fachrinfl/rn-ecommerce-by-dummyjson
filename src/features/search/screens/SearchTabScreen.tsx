import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SearchTabScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Search Tab Screen</Text>
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

export default SearchTabScreen;
