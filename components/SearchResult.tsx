import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import IconContainerTouchable from './IconContainer';


const SearchResult = () => {

  const searchResultArr = useSelector((state: RootState) => state.characters.searchResult)

    return (
        <>
          <FlatList 
            data={searchResultArr}
            initialNumToRender={4}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.characterContainer}>
                <Image
                    style={styles.img}
                    source={{ uri: item.image.uri }}
                />
                <View style={styles.charInfoContainer}>
                    <View>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text>Art: {item.species}</Text>
                      <Text>Från: {item.homeworld}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <IconContainerTouchable id={item.id} clickedIcon={'liked'}>
                        <MaterialIcons 
                            style={styles.heartIcon} 
                            name={item.status === 'liked' ? 'favorite' : 'favorite-outline'}
                            size={25} 
                            color="black" />
                      </IconContainerTouchable>
                      <IconContainerTouchable id={item.id} clickedIcon={'costume made'}>
                        <AntDesign 
                            name={item.status === 'costume made' ? 'android1' : 'android'} 
                            size={22} 
                            color="black" />
                      </IconContainerTouchable>
                    </View>
                </View>
              </View>
            )}
          />
        </>
    )

}

export default SearchResult;


const styles = StyleSheet.create({
    characterContainer: {
      backgroundColor: '#fff',
      marginBottom: 15,
      padding: 20,
      borderRadius: 7,
    },
    img: {
      width: '100%',
      height: 250,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    charInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name: {
      fontWeight: 'bold',
    },
    iconContainer : {
      height: '100%',
    },
    heartIcon: {
      marginBottom: 10,
    },
  });