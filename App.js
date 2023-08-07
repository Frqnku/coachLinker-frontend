import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ActivateLocationScreen from './screens/ActivateLocationScreen';
import AddInfoCoachScreen from './screens/AddInfoCoachScreen';
import AddInfoStudentScreen from './screens/AddInfoStudentScreen';
import AgendaCoachScreen from './screens/AgendaCoachScreen';
import ChooseRoleScreen from './screens/ChooseRoleScreen';
import CoachingStudentScreen from './screens/CoachingStudentScreen';
import CoachMenuScreen from './screens/CoachMenuScreen';
import CoachProfileScreen from './screens/CoachProfileScreen';
import ConnexionScreen from './screens/ConnexionScreen';
import MessageScreen from './screens/MessageScreen';
import OptionScreen from './screens/OptionScreen';
import StudentMenuScreen from './screens/StudentMenuScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';
import VerificationScreen from './screens/VerificationScreen';


// import React, { useEffect } from 'react';
// import * as Font from 'expo-font';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Update import
import { persistStore, persistReducer } from 'redux-persist'; // Import Redux Persist
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStoragee
import darkMode from './reducers/darkMode';
import { useSelector, useDispatch } from 'react-redux';
import users from './reducers/users';
import coachs from './reducers/coachs';
import student from './reducers/student';
import booking from './reducers/booking';


// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['darkMode','users','student','coachs', 'booking'] 
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const isDarkMode = useSelector(state => state.darkMode.value)
  const isCoach = useSelector(state => state.users.value.signUp.isCoach)

  return (
    <Tab.Navigator 
    initialRouteName='Menu'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Message') {
          iconName = 'envelope';
        } else if (route.name === 'Profil') {
          iconName = 'user';
        } else if (route.name === 'Menu') {
          iconName = 'home';
        } else if (route.name === 'Option') {
          iconName = 'gear';
        } else if (route.name === 'Agenda') {
          iconName = 'calendar';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#F4A100',
      tabBarActiveBackgroundColor: "#FFF3DD",
      tabBarInactiveTintColor: isDarkMode ? "#FFF" : '#000',
      tabBarInactiveBackgroundColor: isDarkMode ? "#000" : "#FFF",
      tabBarStyle: { borderTopWidth: 0 },
      headerShown: false,
    })}>
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profil" component={isCoach ? CoachProfileScreen : StudentProfileScreen} />
      <Tab.Screen name="Menu" component={isCoach ? CoachMenuScreen : StudentMenuScreen} />
      <Tab.Screen name="Option" component={OptionScreen} />
      <Tab.Screen name="Agenda" component={isCoach ? AgendaCoachScreen : CoachingStudentScreen} />
    </Tab.Navigator>
  );
};

// à changer plus tard
export default function App() {
  const isValidate = useSelector(state => state.users.value.signUp.isValidate)
  const isLogged = useSelector(state => state.users.value.token)
  const isCoach = useSelector(state => state.users.value.signUp.isCoach)
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
      <NavigationContainer>  
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={!isLogged ? ConnexionScreen : ((isValidate && isCoach) || !isCoach ? TabNavigator : VerificationScreen)} />
            <Stack.Screen name="Localisation" component={ActivateLocationScreen} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
            <Stack.Screen name="AddInfoStudent" component={AddInfoStudentScreen} />
            <Stack.Screen name="AddInfoCoach" component={AddInfoCoachScreen} />
            <Stack.Screen name='Verification' component={VerificationScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}