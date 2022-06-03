import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Character } from '../interfaces/interfaces'
import { openPhotoPicker } from '../redux/reducers/charactersListsSlice'
import PhotoPicker from './PhotoPicker';
import CameraComponent from './CameraComponent';


type RootStackParamList = {
    Costume: {item: Character}
};

type Props = NativeStackScreenProps<RootStackParamList, 'Costume'>;


const Costumes = ({ navigation }: Props) => {

    const items = useSelector((state: RootState) => state.characters.lists.costumeMade)
    const { isActive: photoPickerIsActive } = useSelector((state: RootState) => state.characters.photoPicker)
    const { isOpen: isCameraOpen } = useSelector((state: RootState) => state.characters.cameraData)

    const dispatch = useDispatch();

    return (
        <>
          {isCameraOpen ?
            <CameraComponent />
            :
            <View style={styles.container}>
                { photoPickerIsActive && <PhotoPicker /> }
                <FlatList 
                    data={items}
                    renderItem={({ item }) => (
                        <>
                            <View key={item.id} style={styles.itemContainer}>
                                <Image 
                                    style={{ ...styles.lgImg, aspectRatio: item.image.ratio }}
                                    source={{ uri: item.image.uri}}
                                />
                                <View style={styles.itemRightContainer}>
                                    <Pressable onPress={() => navigation.navigate('Costume', { item: item })}>
                                        <Text style={styles.headline}>{item.name}</Text>
                                    </Pressable>
                                    <View style={styles.costumeImagesContainer}>
                                        <View style={styles.line}/>
                                        {item.costumeImages.map(costumeImage => (
                                            <Image style={styles.smImg} key={`${Date.now()}${Math.floor(Math.random() * 1000)}`} source={{ uri: costumeImage.uri }} />
                                        ))}
                                        <Pressable 
                                            style={{ ...styles.smImg, ...styles.addImgBtn }}
                                            onPress={() => dispatch(openPhotoPicker({id: item.id}))}
                                        >
                                            <Text>+ Add</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line}/>
                        </>
                    )}
                />
            </View>
            }
        </>
    )
}

export default Costumes;

const styles = StyleSheet.create({
    line: {
        width: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    itemContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
    },
    lgImg: {
        width: '50%',
        marginRight: 18,
    },
    itemRightContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 15,  
    },
    costumeImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    smImg: {
        width: '48%',
        height: 50,
        aspectRatio: 1,
        marginTop: 6,
    },
    addImgBtn: { 
        backgroundColor: '#dedede',
        justifyContent: 'center',
        alignItems: 'center',
    },
})