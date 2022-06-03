import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SavedItems from "./SavedItems"
import CharactersList from './CharactersList';
import CameraComponent from './CameraComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import SearchResult from './SearchResult';
import { searchCharacter } from '../redux/reducers/charactersListsSlice';
import PhotoPicker from './PhotoPicker';


const Home = () => {

  const dispatch = useDispatch()
  const [displayInfo, setDisplayInfo] = useState<string>('Star wars-karaktärer');
  const searchResult = useSelector((state: RootState) => state.characters.searchResult)
  const { isOpen: isCameraOpen } = useSelector((state: RootState) => state.characters.cameraData)
  const { isActive: photoPickerIsActive } = useSelector((state: RootState) => state.characters.photoPicker)



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
             { photoPickerIsActive && <PhotoPicker /> }
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
