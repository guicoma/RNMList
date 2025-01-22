import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import * as API from '@/lib/api';
import { extractArrayURLIds } from "@/lib/utils";

import { Character, Episode } from "@/types";

import CharacterListItem from "@/components/CharacterListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import NotFoundScreen from "./+not-found";

export default function EpisodePage() {
    const {id} = useLocalSearchParams<{id: string}>();
    const [episode, setEpisode] = useState<Episode>();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingCharacters, setIsLoadingCharacters] = useState<boolean>(true);
    const navigation = useNavigation()

    const getEpisodeInfo = async () => {
        try {
            setIsLoading(true);
            const response = await API.getEpisode(id);
            setEpisode(response);
            let characterIds = extractArrayURLIds(response.characters);
            getCharacters(characterIds);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const getCharacters = async (charaterIds:string[]) => {
        try {
            setIsLoadingCharacters(true);
            const response = await API.getCharacters(charaterIds);
            setCharacters(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingCharacters(false);
        }
    }

    useEffect(() => {
        getEpisodeInfo();
        navigation.setOptions({ headerTitle: `Episode ${id}` })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.container}>
                <ScrollView>
                        {
                            isLoading? <ActivityIndicator size='large' />
                            : (episode == null)? <NotFoundScreen />
                            : <View style={styles.details}>
                                <ThemedText type="title">{episode?.name}</ThemedText>
                                <ThemedText type="subtitle">{episode?.episode}</ThemedText>
                                <ThemedText>Aired: {episode?.air_date}</ThemedText>
                                <ThemedText>Characters:</ThemedText>
                                <View>
                                    {
                                        isLoadingCharacters? <ActivityIndicator size='small' />
                                        : characters.map((character, index) => (<CharacterListItem key={index} character={character} />))
                                    }
                                </View>
                            </View>
                        }
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