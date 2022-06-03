import { StyleSheet, View, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import { closePhotoPicker, savePhoto, editCameraData } from '../redux/reducers/charactersListsSlice';

const PhotoPicker = () => {

    const dispatch = useDispatch()
    const { hasPermission, canAskAgain } = useSelector((state: RootState) => state.characters.cameraData)


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

    return (
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
    )

}

export default PhotoPicker

const styles = StyleSheet.create({
    separator: {
      marginVertical: 5
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
  });
  