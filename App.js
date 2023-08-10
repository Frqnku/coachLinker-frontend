import React from 'react';

import Navigation from './components/Navigation';

// import React, { useEffect } from 'react';
// import * as Font from 'expo-font';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Update import
import { persistStore, persistReducer } from 'redux-persist'; // Import Redux Persist
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStoragee
import darkMode from './reducers/darkMode';
import users from './reducers/users';
import coachs from './reducers/coachs';
import student from './reducers/student';
import booking from './reducers/booking';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()
// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['users','student','coachs', 'booking'] 
};
const rootReducer = combineReducers({
  darkMode,
  users,
  coachs,
  student,
  booking
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export default function App() {


    // useEffect(() => {
    //   // Charger les polices au démarrage de l'application
    //   Font.loadAsync({
    //     'Roboto-Regular': require('./assets/fonts/Roboto/'),
    //     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    //     // Ajoutez d'autres variantes de la police Roboto si nécessaire
    //   });
    // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
      </PersistGate>
    </Provider>
  );
}