import { Character } from "@/types";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function CharacterListItem({character}: {character: Character}) {
    return (
        <View style={styles.item}>
            <Image source={{uri: character.image}}
                   style={styles.image}
            />
            <ThemedText>{character.name}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    item : {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    image: {
        width: 16,
        height: 16,
        borderRadius: 25,
        marginHorizontal: 4,
    }
})