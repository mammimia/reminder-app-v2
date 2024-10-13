import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SectionTitle from '../../components/SectionTitle';

const RecentPayments = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Recent Payments"
        handleSeeAll={() => {
          navigation.navigate('Payments');
        }}
      />
    </View>
  );
};

export default RecentPayments;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
});
