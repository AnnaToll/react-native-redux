import { Character } from '../interfaces/interfaces'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhoto } from '../redux/reducers/charactersListsSlice'
import { RootState } from '../redux/store'



type RootStackParamList = {
    Costume: {item: Character}
};

type Props = NativeStackScreenProps<RootStackParamList, 'Costume'>;


const Costume = ({ route }: Props) => {

    const { item } = route.params
    const dispatch = useDispatch()
    const character = useSelector((state: RootState) => state.characters.lists.costumeMade.find(character => character.id === item.id)!)


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.charName}>{character.name}</Text>
                <Image style={{ ...styles.image, aspectRatio: character.image.ratio ? character.image.ratio : 0.7 }}
                    source={{ uri: character.image.uri }}
                />
                {character.costumeImages.map(costumeImage => (
                    <View 
                        key={`${Date.now()}${Math.floor(Math.random() * 10000)}`}
                        style={styles.costumeImageContainer}
                    >
                        <Image 
                            style={{ ...styles.costumeImage, aspectRatio: costumeImage.ratio }} 
                            source={{ uri: costumeImage.uri }}
                        />
                        <Pressable 
                            style={styles.deleteIcon}
                            onPress={() => dispatch(deletePhoto({ uri: costumeImage.uri, id: character.id }))}
                        >
                            <AntDesign 
                                name='delete' 
                                size={28} 
                                color="black" 
                            />
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    )

}

export default Costume

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    charName: {
        fontSize: 28,
        marginBottom: 15,
    },
    image: {
        width: '100%',
        marginBottom: 20,
    },
    costumeImageContainer: {
        position: 'relative',
    },
    costumeImage: {
        width: '100%',
        marginBottom: 20,
    },
    deleteIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
})