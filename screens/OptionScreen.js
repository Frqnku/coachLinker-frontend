import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { useSelector, useDispatch } from 'react-redux';
import { switchMode } from '../reducers/darkMode';

export default function OptionScreen({ navigation }) {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(state => state.darkMode.value)

    const disconnect = () => {
        /* dispatch(disconnect()) */
        navigation.navigate('Home')
    }
    const activateLocation = () => {
        /* dispatch(activateLocation()) */
    }
    const handleSwitch = () => {
        dispatch(switchMode())
    }

    return (
        <SafeAreaView style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
            <View style={styles.top}>
                <MaterialIcons name='arrow-back' size={24} color={isDarkMode ? '#fff' : '#000'} onPress={() => navigation.navigate('Menu')}/>
                <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Paramètres</Text>
                <Text> </Text>
            </View>
            
            <View style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
                <Pressable
                style={[styles.clickableOption, isDarkMode ? styles.darkCard : styles.lightCard]}
                onPress={disconnect}>
                    <MaterialIcons name='logout' size={24} color={isDarkMode ? '#fff' : '#000'}/>
                    <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Se déconnecter</Text>
                </Pressable>
                <Pressable
                style={[styles.clickableOption, isDarkMode ? styles.darkCard : styles.lightCard]}
                onPress={activateLocation}>
                    <FontAwesome name='location-arrow' size={24} color={isDarkMode ? '#fff' : '#000'} />
                    <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>Activer la localisation</Text>
                </Pressable>
                <Pressable
                style={[styles.clickableOption, isDarkMode ? styles.darkCard : styles.lightCard]}
                onPress={handleSwitch}>
                    <FontAwesome name={isDarkMode ? 'sun-o' : 'moon-o'} size={24} color={isDarkMode ? '#fff' : '#000'} />
                    <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>{isDarkMode ? 'Désactiver' : 'Activer'} le Dark mode</Text>
                </Pressable>
            </View>
            {/* ajouter la possibilité d'activer localisation */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-beetween',
        alignItems: 'center',
        paddingTop: 15
    },
    card: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    clickableOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        height: 70,
    },
    darkBg: {
        backgroundColor: '#000'
    },
    darkText: {
        color: '#fff'
    },
    darkCard: {
        backgroundColor: '#2E2E2E'
    },
    lightBg: {
        backgroundColor: '#f2f2f2'
    },
    lightCard: {
        backgroundColor: '#fff'
    },
    lightText: {
        color: '#000'
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 20
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 50
    }
})

// const dispatch = useDispatch()
// dispatch(switchMode())

// const isDarkMode = useSelector(state => state.darkmode.value)

// <View style={[styles.sameStyle, isDarkMode ? styles.darkBg : styles.lightBg]}>
// <Text style={[styles.sameStyle, isDarkMode ? styles.darkText : styles.lightText]}>Exemple</Text>
// </View>

/* 
sameStyle: {
    height: 200,
    width: '100%'
    justifyContent: 'center',
    alignItems: 'center'
},
darkBg: {
    backgroundColor: '#000'
},
lightBg: {
    backgroundColor: '#f2f2f2'
},
darkText: {
    color: '#fff'
},
lightText: {
    color: '#000'
}
 */