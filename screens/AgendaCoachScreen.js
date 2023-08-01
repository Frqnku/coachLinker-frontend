import { StyleSheet, Text, View } from 'react-native';
import GoodMorning from '../components/GoodMorning';

export default function AgendaScreen() {


    return (
        <View style={styles.container}>
            <GoodMorning/>
            <Text>AgendaScreen</Text>
            {/* afficher l'écran de disponibilités modifiables */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
    }
})