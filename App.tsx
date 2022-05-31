import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store'
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CostumeStacks from './components/CostumesStacks';
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper


const App = () => {

  useEffect(() => {

  }, [])

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen 
          name='Home' 
          component={Home} 
          options={{ headerTitle: 'Star Wars-karaktärer'}} 
        />
        <Drawer.Screen 
          name='CostumeStacks' 
          component={CostumeStacks} 
          options={{ headerTitle: 'Mina kostymer'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

