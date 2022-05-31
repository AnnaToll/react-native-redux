import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SavedItems from "./SavedItems"
import CharactersList from './CharactersList';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import CameraComponent from './CameraComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import SearchResult from './SearchResult';
import { searchCharacter, closePhotoPicker, savePhoto, editCameraData } from '../redux/reducers/charactersListsSlice';


const Home = () => {

  const dispatch = useDispatch()
  const [displayInfo, setDisplayInfo] = useState<string>('Star wars-karaktärer');
  const searchResult = useSelector((state: RootState) => state.characters.searchResult)
  const { isActive: photoPickerIsActive } = useSelector((state: RootState) => state.characters.photoPicker)
  const { isOpen: isCameraOpen, hasPermission, canAskAgain } = useSelector((state: RootState) => state.characters.cameraData)


  const saveLibraryPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
    if (!result.cancelled) {
        let counter = 0;
        const getImgRatio = () => {
            Image.getSize(result.uri, (width, height) => {
                let ratio = Math.round((width / height) * 100) / 100
                dispatch(savePhoto({ uri: result.uri, ratio }))
            }, () => {
                if (counter < 3) {
                    counter++
                    getImgRatio()
                } else {
                    dispatch(savePhoto({ uri: result.uri, ratio: 0.7 })) 
                }
            }) 
        }

        getImgRatio()

    }
    
    else if (result.cancelled)
      dispatch(closePhotoPicker())
  }


  const openCamera = async () => {
    if (hasPermission)
      dispatch(editCameraData({ isOpen: true }))
    else if (!canAskAgain)
      return
    else {
      const permission = await Camera.requestCameraPermissionsAsync();
      dispatch(editCameraData({
        hasPermission: permission.granted,
        canAskAgain: permission.canAskAgain,
        isOpen: permission.granted ? true : false 
      }))
    }
  }


  const handleInput = (value: string) => { 

    dispatch(searchCharacter(value))

    if (value.length === 0)
      setDisplayInfo('Star wars-karaktärer')
    else
      setDisplayInfo('Sökning slutförd.')
  }


  return (
        <>
          {isCameraOpen ?
            <CameraComponent />
            :
            <View style={styles.container}>
            
              {photoPickerIsActive && 
                <TouchableOpacity 
                  style={styles.photoOptionsContainer}
                >
                  <Button 
                    title='Bläddra'
                    onPress={saveLibraryPhoto}
                  />
                  <View style={styles.separator}></View>
                  <Button 
                    title='Ta ny bild'
                    onPress={openCamera}
                  />
                  <View style={styles.separator}></View>
                  <Button 
                    title='Avbryt'
                    onPress={() => dispatch(closePhotoPicker())}
                  />
                </TouchableOpacity> 
              }
              <View>
                <View style={styles.searchContainer}>
                  <TextInput 
                    style={styles.input}
                    placeholder='Hitta Star Wars karaktär'
                    onChangeText={handleInput}
                  />
                  <AntDesign style={styles.searchIcon} name="search1" size={21} color="black" />
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View style={styles.listContainer}>
                  <View style={styles.charactersContainer}>
                    { displayInfo === 'Star wars-karaktärer' ?
                      <>
                        <Text style={styles.h2}>{displayInfo}</Text>
                        <CharactersList />
                      </>
                      :
                      <>
                        <Text style={styles.h2}>{searchResult === [] ? 'Söker...' : displayInfo}</Text>
                        <SearchResult /> 
                      </>
                      }
                  </View>
                  <SavedItems 
                  />
                </View>
              </View>
              <StatusBar style="auto" />
            
          </View>
        }
      </>
  );
}

export default Home;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 5
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  photoOptionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 48,
    marginBottom: 28,
  },
  input: {
    borderColor: '#d4d5d6',
    flex: 1,
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 8,
  },
  mainContainer: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
  },
  charactersContainer: {
    flex: 10,
    marginRight: 17,
    height: '100%',
  },
  h2: {
    marginBottom: 8,
    color: '#434445',
  },
});
