import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LikeListScreen from '../screens/LikeList/LikeListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
const Stack = createStackNavigator();

const AppContext = () => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#CC9FF9',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
              }}
              onPress={() => navigation.navigate('Favourite list')}>
              <MaterialCommunityIcons
                name="heart-multiple"
                color="#fff"
                size={25}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        options={() => ({
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#CC9FF9',
          },
        })}
        name="Favourite list"
        component={LikeListScreen}
      />
    </Stack.Navigator>
  );
};

export default AppContext;
