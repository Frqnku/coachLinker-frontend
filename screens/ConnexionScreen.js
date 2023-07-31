import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function ConnexionScreen({ navigation }) {
    const handleSignin = () => {

        navigation.navigate('Localisation')
    }

    return (
        <View>
            <Text>ConnexionScreen</Text>
            <Pressable onPress={() => handleSignin()}>
                <Text>Se connecter</Text>
            </Pressable>
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