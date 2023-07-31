import { StyleSheet, Text, View } from 'react-native';

export default function OptionScreen() {


    return (
        <View>
            <Text>OptionScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
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