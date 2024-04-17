import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from './slices';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducer = combineReducers({
  user,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
