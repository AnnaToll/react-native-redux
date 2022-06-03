import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import IconContainerTouchable from './IconContainer';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { openPhotoPicker, editSelectedCharactersBtn } from '../redux/reducers/charactersListsSlice'


export const SavedItems = () => {

    const liked = useSelector((state: RootState) => state.characters.lists.likedCharacters)
    const selectedBtn = useSelector((state: RootState) => state.characters.savedCharactersBtn)
    const costumeMade = useSelector((state: RootState) => state.characters.lists.costumeMade)
    const dispatch = useDispatch();

    return (
        <View style={styles.savedContainer}>
            <Text style={styles.h2}>Sparade</Text>
            <View>
                <Button 
                    onPress={() => dispatch(editSelectedCharactersBtn({ btn: 'liked'}))}
                    title='Gillar'
                    color={selectedBtn === 'liked' ? '#eba836' : 'grey'}
                />
                <View style={styles.separator}/>
                <Button 
                    onPress={() => dispatch(editSelectedCharactersBtn({ btn: 'costume'}))}
                    title='Kostym'
                    color={selectedBtn === 'liked' ? 'grey' : '#eba836'}
                />
            </View>
            <View style={styles.savedCharacterContainer}>
                <Text>{selectedBtn === 'liked' && liked.length === 0 
                || selectedBtn !== 'liked' && costumeMade.length === 0 
                ? 'Inget sparat' : ''}
                </Text>
                <FlatList 
                    data={selectedBtn === 'liked' ? liked : costumeMade}
                    renderItem={({ item }) => (
                    <View key={item.id}>
                      <Image
                          style={{ ...styles.img, aspectRatio: item.image.ratio }}
                          source={{ uri: item.image.uri }}
                      />
                      <Text style={styles.name}>{item.name}</Text>
                      <View style={styles.savedIconContainer}>
                          <IconContainerTouchable id={item.id} clickedIcon={'liked'}>
                            <MaterialIcons 
                                name={item.status === 'liked' ? 'favorite' : 'favorite-outline'} 
                                size={25} 
                                color="grey" 
                                style={styles.savedIcons}
                            />
                          </IconContainerTouchable>
                          <IconContainerTouchable id={item.id} clickedIcon={'costume made'}>
                            <AntDesign 
                                name={item.status === 'costume made' ? 'android1' : 'android'} 
                                size={22} 
                                color="grey"
                                style={styles.savedIcons}
                            />
                          </IconContainerTouchable>
                      </View>
                      {
                        selectedBtn !== 'liked' && 
                        <>
                          {item.costumeImages.map(costumeImage => (
                            <View 
                              style={styles.costumeImagesContainer}
                              key={Math.floor((Date.now() * Math.random()) * 10)}
                            >
                              <Image 
                                style={{ ...styles.imgSmall, aspectRatio: costumeImage.ratio }}
                                source={{ uri: costumeImage.uri}}
                              />
                            </View>
                          ))}
                          <Button
                            title='+ bild'
                            color={'#cccccc'}
                            onPress={() => dispatch(openPhotoPicker({id: item.id}))}
                          />
                          <View style={styles.separatorLg} />
                        </>
                      }

                    </View>
                )}
                />
            </View>
        </View>
    
    );
     
}

export default SavedItems;

const styles = StyleSheet.create({
    separator: {
      marginVertical: 5
    },
    separatorLg: {
      marginVertical: 12,
    },
    h2: {
      marginBottom: 8,
      color: '#434445',
    },
    name: {
      fontWeight: 'bold',
    },
    savedContainer: {
      flex: 5,
      height: '100%',
    },
    savedCharacterContainer: {
      backgroundColor: 'white',
      marginTop: 10,
      padding: 14,
      flex: 1,
    },
    costumeImagesContainer: {
      position: 'relative',
      width: '100%',
      aspectRatio: 1,
      marginBottom: 6,
      overflow: 'hidden',
    },
    imgSmall: {
      position: 'absolute',
      top: 0,
      width: '100%',
      marginBottom: 6,
    },
    img: {
      width: '100%',
      resizeMode: 'cover',
      marginBottom: 6,
    },
    savedIconContainer: {
      flexDirection: 'row',
      flex: 1,
      marginTop: 3,
      marginBottom: 7,
    },
    savedIcons: {
      marginRight: 5,
    }
  });
  