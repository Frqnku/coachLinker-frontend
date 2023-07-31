import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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
import CoachMenuScreen from './screens/CoachMenuScreen';
import CoachProfileScreen from './screens/CoachProfileScreen';
import ConnexionScreen from './screens/ConnexionScreen';
import MessageScreen from './screens/MessageScreen';
import OptionScreen from './screens/OptionScreen';
import StudentMenuScreen from './screens/StudentMenuScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';
import VerificationScreen from './screens/VerificationScreen';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Update import
import { persistStore, persistReducer } from 'redux-persist'; // Import Redux Persist
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStoragee

// Redux Persist Config
const persistConfig = {
  key: 'coachLinker',
  storage: AsyncStorage,
  blacklist: ['user'] // Mettre tous les reducers à l'exception de ceux qu'on veut rendre persistant
};
const rootReducer = combineReducers({
  //user: user
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Message') {
          iconName = 'envelope';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        } else if (route.name === 'Menu') {
          iconName = 'house';
        } else if (route.name === 'Option') {
          iconName = 'gear';
        } else if (route.name === 'Agenda') {
          iconName = 'calendar';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profile" component={isCoach ? CoachProfileScreen : StudentProfileScreen} />
      <Tab.Screen name="Menu" component={isCoach ? CoachMenuScreen : StudentMenuScreen} />
      <Tab.Screen name="Option" component={OptionScreen} />
      <Tab.Screen name="Agenda" component={isCoach ? AgendaCoachScreen : CoachingStudentScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>  
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={!isLogged ? ConnexionScreen : (isValidate ? TabNavigator : VerificationScreen)} /> {/* Si pas log alors écran de connexion sinon si validé alors écran d'accueil sinon écran de verification */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
