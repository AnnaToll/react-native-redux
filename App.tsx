import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CostumeStacks from './components/CostumesStacks';
import { PersistGate } from 'redux-persist/integration/react';





const Drawer = createDrawerNavigator();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

export default AppWrapper





const App = () => {

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

