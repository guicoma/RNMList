import CharacterListItem from "@/components/CharacterListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Character, Episode } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function EpisodePage() {
    const {id} = useLocalSearchParams<{id: string}>();
    const [episode, setEpisode] = useState<Episode>();
    const [characters, setCharacters] = useState<Character[]>([]);

    const getEpisodeInfo = async () => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            const json = await response.json();
            setEpisode(json);
            let characterIds = json.characters.map((url:string) => url.split('/').pop());
            getCharacters(characterIds);
        } catch (error) {
            console.error(error);
        }
    }

    const getCharacters = async (charaterIds:string[]) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${charaterIds.join(',')}`);
        const json = await response.json();
        setCharacters(json);
    }

    useEffect(() => {
        getEpisodeInfo();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.container}>
                <ScrollView>
                    <View style={styles.details}>
                        <ThemedText type="title">{episode?.name}</ThemedText>
                        <ThemedText type="subtitle">{episode?.episode}</ThemedText>
                        <ThemedText>Aired: {episode?.air_date}</ThemedText>
                        <ThemedText>Characters:</ThemedText>
                        <View>
                            {characters? characters.map((character, index) => (<CharacterListItem key={index} character={character} />))
                            :null}
                        </View>
                    </View>
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    details: {
        paddingTop: 16,
        paddingHorizontal: 16,
    }
})