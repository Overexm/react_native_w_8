import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import SplashScreen from '../SplashScreen/SplashScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppContext} from '../../context/AppContext';

async function fetchPlaces() {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/Overexm/2e602c690de92ce4cbcc2710d6f5e01a/raw/2ab1dd0b1e8b9f1b29253d1ff816eef984caa8d5/data.json',
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const HomeScreen = () => {
  const [state, dispatch] = useAppContext();
  const {isError, isFetching, data} = useQuery('places', fetchPlaces);

  if (isFetching) return <SplashScreen />;
  if (isError) return <ErrorScreen />;

  const handleFavouriteBtn = item => {
    dispatch({
      type: 'addToList',
      payload: item,
    });
  };

  const renderHeartIcon = id => {
    const idx = state.list.findIndex(item => item.id === id);

    if (idx >= 0) {
      return <AntDesign name="heart" size={25} color="#ef476f" />;
    }

    return <AntDesign name="hearto" size={25} color="#fff" />;
  };

  const renderCard = item => {
    return (
      <View style={styles.placeCard}>
        <ImageBackground
          resizeMode="stretch"
          source={{uri: item.image.trim()}}
          style={styles.cardImageView}>
          <TouchableOpacity
            style={styles.heartTouchable}
            onPress={() => handleFavouriteBtn(item)}>
            {renderHeartIcon(item.id)}
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        contentContainerStyle={styles.placesList}
        data={data}
        renderItem={({item}) => renderCard(item)}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  placesList: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  placeCard: {
    height: 200,
    width: '45%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    overflow: 'hidden',
  },
  cardImageView: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    textAlign: 'center',
    margin: 2,
  },
  heartTouchable: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
