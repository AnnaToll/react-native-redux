import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import charactersListsSlice from './reducers/charactersListsSlice'
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'characters',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, charactersListsSlice);


const store = configureStore({
  reducer: {
    characters: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export default store

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch