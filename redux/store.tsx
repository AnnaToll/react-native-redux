import { configureStore } from '@reduxjs/toolkit'
import charactersListsSlice from './reducers/charactersListsSlice'


const store = configureStore({
  reducer: {
    characters: charactersListsSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch