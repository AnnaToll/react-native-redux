import { Character } from '../interfaces/interfaces'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';




type RootStackParamList = {
    Costume: {item: Character}
};

type Props = NativeStackScreenProps<RootStackParamList, 'Costume'>;


const Costume = ({ route }: Props) => {

    const { item } = route.params

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.charName}>{item.name}</Text>
                <Image style={{ ...styles.image, aspectRatio: item.image.ratio || 0.7 }}
                    source={{ uri: item.image.uri }}
                />
                {item.costumeImages.map(costumeImage => (
                    <Image 
                        key={`${Date.now()}${Math.floor(Math.random() * 10000)}`}
                        style={{ ...styles.costumeImage, aspectRatio: costumeImage.ratio || 0.7 }} 
                        source={{ uri: costumeImage.uri }}
                    />
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
    costumeImage: {
        width: '100%',
        marginBottom: 20,
    },
})