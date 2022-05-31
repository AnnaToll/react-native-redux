import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity, StyleSheet, Image, View, Button, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { savePhoto, closePhotoPicker } from '../redux/reducers/charactersListsSlice'


const CameraComponent = () => {

    const camera = useRef<Camera>(null);
    const [uriPhoto, setUriPhoto] = useState<string>('');
    const [currentView, setCurrentView] = useState<string>('camera')
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handlePressSnapPhoto = async () => {

        if (camera.current && isCameraReady) {
            const photo = await camera.current.takePictureAsync();
            setUriPhoto(photo.uri);
            setCurrentView('preview');
        }
    }

    const handlePressSave = () => {
        let counter = 0;
        const getImgRatio = () => {
            Image.getSize(uriPhoto, (width, height) => {
                let ratio = Math.round((width / height) * 100) / 100
                dispatch(savePhoto({ uri: uriPhoto, ratio }))
              }, () => {
                if (counter < 3) {
                    counter++
                    getImgRatio()
                } else {
                    dispatch(savePhoto({ uri: uriPhoto, ratio: 0.7 })) 
                }
              }) 
        }

        getImgRatio()
    }


    return (
        <View style={styles.cameraContainer}>
            <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => dispatch(closePhotoPicker())}
            >   
                <Text>Avbryt</Text>
            </TouchableOpacity>
            { currentView === 'camera' ? 
                <Camera 
                    type={CameraType.back}
                    ref={camera}
                    style={styles.camera}
                    onCameraReady={() => setIsCameraReady(true)}
                >
                    <TouchableOpacity
                        onPress={handlePressSnapPhoto}
                        style={styles.snapPhotoButton}
                    />                
                </Camera>
                :
                <View style={styles.previewContainer}>
                    <Image style={styles.previewImage} source={{ uri: uriPhoto }}/>
                    <View style={styles.previewButtonsContainer}>
                        <Button 
                            title='Spara'
                            onPress={ handlePressSave }
                        />
                        <Button 
                            title='Ta nytt foto'
                            onPress={() => setCurrentView('camera')}
                        />
                    </View>
                </View>
            }
        </View>
    );
}

export default CameraComponent;

const styles = StyleSheet.create({
    cameraContainer: {
        position: 'relative',
        flex: 1,
        width: '100%',
        zIndex: 0,
    },
    cancelButton: {
        position: 'absolute',
        top: 18,
        right: 20,
        backgroundColor: '#d6d6d6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        zIndex: 5,
        borderRadius: 5,
    },
    camera: {
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: 1,
        alignItems: 'center',
    },
    snapPhotoButton: {
        position: 'absolute',
        bottom: 50,
        zIndex: 5,
        backgroundColor: '#ffbe45',
        width: 66,
        height: 66,
        borderRadius: 33,
    },
    previewContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    previewImage: {
        height: '100%',
        width: '100%',
    },
    previewButtonsContainer: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
    },
    
})