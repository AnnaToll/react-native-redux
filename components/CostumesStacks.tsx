import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Costumes from './Costumes';
import Costume from './Costume';

const Stack = createNativeStackNavigator()

const CostumeStacks = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Costumes'
                component={Costumes}
                options={{ title: 'Mina Kostymer' }}
            />
            <Stack.Screen 
                name='Costume'
                component={Costume}
                options={{ title: 'Mina Kostymer' }}
            />
        </Stack.Navigator>
    )
}

export default CostumeStacks