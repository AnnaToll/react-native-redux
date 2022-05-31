import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Character } from '../interfaces/interfaces'


type RootStackParamList = {
    Costume: {item: Character}
};

type Props = NativeStackScreenProps<RootStackParamList, 'Costume'>;


const Costumes = ({ navigation }: Props) => {

    const items = useSelector((state: RootState) => state.characters.lists.costumeMade)

    return (
        <View style={styles.container}>
            <FlatList 
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Costume', { item: item })}
                    >
                        <View key={item.id} style={styles.itemContainer}>
                            <Image 
                                style={{ ...styles.lgImg, aspectRatio: item.image.ratio || 0.7 }}
                                source={{ uri: item.image.uri}}
                            />
                            <View style={styles.itemRightContainer}>
                                <Text style={styles.headline}>{item.name}</Text>
                                <View style={styles.costumeImagesContainer}>
                                    <View style={styles.line}/>
                                    {item.costumeImages.map(costumeImage => (
                                        <Image style={styles.smImg} key={`${Date.now()}${Math.floor(Math.random() * 1000)}`} source={{ uri: costumeImage.uri }} />
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={styles.line}/>
                    </TouchableOpacity>
                )}
            
            />

        </View>
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
        height: 80,
        marginTop: 6,
    },
})