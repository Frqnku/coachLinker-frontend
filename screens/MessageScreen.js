import { StyleSheet, Text, View } from 'react-native';
import GoodMorning from '../components/GoodMorning';

export default function MessageScreen() {


    return (
        <View style={styles.container}>
            <GoodMorning/>
            <Text>MessageScreen</Text>
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