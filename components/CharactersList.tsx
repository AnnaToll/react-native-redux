import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Character } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { addAllCharacters, addImgRatio } from '../redux/reducers/charactersListsSlice'
import IconContainerTouchable from './IconContainer';


type CompleteCharacter = Character & { image: string };


const CharactersList = () => {

  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters.lists.allCharacters)
  const isInitDataFetched = useSelector((state: RootState) => state.characters.isInitDataFetched)

  const fetchCharacters = async () => {
    const data = await fetch('https://akabab.github.io/starwars-api/api/all.json');
    const result = await data.json();

    const newArrData = result.map((character: CompleteCharacter) => {

      return {
        id: character.id,
        name: character.name,
        image: {
          uri: character.image,
          ratio: 0.7,
        },
        species: character.species,
        homeworld: character.homeworld,
        status: 'not saved',
        costumeImages: []
      }
    })
    dispatch(addAllCharacters(newArrData))
  }


  useEffect(() => {
    if (!isInitDataFetched) {
      fetchCharacters()
    }
  }, [])


  const getImgRatio = (width: number, height: number, id: number) => {
    let ratio = Math.round((width / height) * 100) / 100
    dispatch(addImgRatio({ id, ratio }))
  }


    return (
        <>
          <FlatList 
            data={characters}
            initialNumToRender={2}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.characterContainer}>
                <Image
                    onLoad={({nativeEvent: {source: {width, height}}}) => getImgRatio(width, height, item.id)}
                    style={{ ...styles.img, aspectRatio: item.image.ratio }}
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
                          color="black" 
                        />
                      </IconContainerTouchable>
                      <IconContainerTouchable id={item.id} clickedIcon={'costume made'}>
                        <AntDesign 
                          name={item.status === 'costume made' ? 'android1' : 'android'} 
                          size={22} 
                          color="black" 
                        />
                      </IconContainerTouchable>
                    </View>
                </View>
              </View>
            )}
          />
        </>
    )

}

export default CharactersList;


const styles = StyleSheet.create({
    characterContainer: {
      backgroundColor: '#fff',
      marginBottom: 15,
      padding: 20,
      borderRadius: 7,
    },
    img: {
      width: '100%',
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