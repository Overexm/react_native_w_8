import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext} from '../../context/AppContext';

const LikeListScreen = () => {
  const [state, dispatch] = useAppContext();

  const renderPlace = ({item}) => (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.image.trim()}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity
        onPress={() => dispatch({type: 'removeFromList', payload: item.id})}>
        <MaterialCommunityIcons name="heart-off-outline" size={20} />
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <View style={styles.main}>
      <FlatList
        keyExtractor={(item, idx) => idx.toString()}
        data={state.list}
        renderItem={renderPlace}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
  },
});

export default LikeListScreen;
