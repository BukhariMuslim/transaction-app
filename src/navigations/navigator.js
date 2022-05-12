import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransactionListPage, TransactionDetailPage} from '@screens';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="transactionListPageScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="transactionListPageScreen"
          getComponent={() => TransactionListPage.default}
        />
        <Stack.Screen
          name="transactionDetailPageScreen"
          getComponent={() => TransactionDetailPage.default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
