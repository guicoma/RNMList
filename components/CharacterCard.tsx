import { Character } from "@/types"
import { ThemedText } from "./ThemedText"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import StatusBadge from "./StatusBadge";
import { useNavigation } from "expo-router";


export default function CharacterCard({character}: {character: Character}) {
    const navigation = useNavigation<any>();
    const goToCharacterDetails = () => {
        const params = { id: character.id, name: character.name };
        navigation.navigate('details', params);
    }

    return (
        <TouchableOpacity onPress={goToCharacterDetails}
                          activeOpacity={0.5}
                          style={styles.card}>
            <View style={styles.titleContainer}>
                <View style={styles.cardHeader}>
                    <ThemedText style={styles.title}>{character.name}</ThemedText>
                    <StatusBadge status={character.status} />
                </View>
                <ThemedText style={styles.subtitle}>{character.origin.name}</ThemedText>
            </View>
            <Image source={{uri: character.image}}
                   style={styles.cardImage} />
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 8,
        position: 'relative',
        minHeight: 250,
        marginVertical: 8,
        marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: '0 5px 5px rgba(0,0,0,0.5)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 2,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 8,
        position: 'absolute',
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
    }
})