import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { switchMode } from '../reducers/darkMode';

export default function OptionScreen() {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(state => state.darkMode.value)

    const handleSwitch = () => {
        dispatch(switchMode())
    }

    return (
        <View style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
            <Text style={[isDarkMode ? styles.darkText : styles.lightText]}>OptionScreen</Text>
            <Pressable onPress={handleSwitch}>
                <Text style={[isDarkMode ? styles.darkText : styles.lightText]}>{isDarkMode ? 'Désactiver' : 'Activer'} le Dark mode</Text>
            </Pressable>
            {/* ajouter la possibilité d'activer localisation */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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