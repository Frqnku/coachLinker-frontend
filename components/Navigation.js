import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ActivateLocationScreen from '../screens/ActivateLocationScreen';
import AddInfoCoachScreen from '../screens/AddInfoCoachScreen';
import AddInfoStudentScreen from '../screens/AddInfoStudentScreen';
import AgendaCoachScreen from '../screens/AgendaCoachScreen';
import ChooseRoleScreen from '../screens/ChooseRoleScreen';
import CoachingStudentScreen from '../screens/CoachingStudentScreen';
import CoachMenuScreen from '../screens/CoachMenuScreen';
import CoachProfileScreen from '../screens/CoachProfileScreen';
import ConnexionScreen from '../screens/ConnexionScreen';
import MessageScreen from '../screens/MessageScreen';
import OptionScreen from '../screens/OptionScreen';
import StudentMenuScreen from '../screens/StudentMenuScreen';
import StudentProfileScreen from '../screens/StudentProfileScreen';
import VerificationScreen from '../screens/VerificationScreen';
import BookScreen from '../screens/BookScreen';

import { useSelector } from 'react-redux';

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
      tabBarActiveTintColor: '#FF711A',
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

const Navigation = () => {

    const isCoach = useSelector(state => state.users.value.signUp.isCoach)
    const isValidate = useSelector(state => state.users.value.signUp.isValidate)

    const isLogged = useSelector(state => state.users.value.token)

    console.log((!isCoach))

    return (
        <NavigationContainer>  
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={!isLogged ? ConnexionScreen : ((isValidate && isCoach) || !isCoach ? TabNavigator : VerificationScreen)} />
            <Stack.Screen name="Localisation" component={ActivateLocationScreen} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
            <Stack.Screen name="AddInfoStudent" component={AddInfoStudentScreen} />
            <Stack.Screen name="AddInfoCoach" component={AddInfoCoachScreen} />
            <Stack.Screen name='Verification' component={VerificationScreen} />
            <Stack.Screen name="Book" component={BookScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
    )
    
}

export default Navigation 