import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";

import { extractArrayURLIds, extractURLId, isEmpty } from "@/lib/utils";
import { Character } from "@/types";

import { ThemedText } from "./ThemedText";

interface CharacterSheetProps {
    character: Character;
}

export default function CharacterSheet({ character }: CharacterSheetProps) {
    const navigation = useNavigation<any>();
    const [episodesIds, setEpisodesIds] = useState<string[]>([]);
    
    const goToOriginDetails = () => {
        const id = extractURLId(character.origin.url);
        navigation.navigate('location', {id});
    }
    const goToLocationDetails = () => {
        const id = extractURLId(character.location.url);
        navigation.navigate('location', {id});
    }
    const goToEpisode = (id:string) => {
        navigation.navigate('episode', {id});
    }

    useEffect(() => {
        let ids:string[] = extractArrayURLIds(character.episode);
        setEpisodesIds(ids);
    }, [])

    return (
        <View style={styles.details}>
            <Image source={{ uri: character.image }}
                   style={styles.image}
            />
            <View style={styles.info}>
                <ThemedText type="title">{character.name}</ThemedText>
                <ThemedText type="subtitle">
                    {character.species}
                    {character.type? `/${character.type}` : ''}
                    {character.gender? `/${character.gender}` : ''}
                </ThemedText>
                <ThemedText>Status: {character.status} </ThemedText>
                <ThemedText>
                    From:&nbsp;
                    {
                        isEmpty(character.origin.url)? character.origin.name
                        :   <ThemedText type="link"
                                        onPress={goToOriginDetails}>
                                {character.origin.name}
                            </ThemedText>
                    }
                </ThemedText>
                <ThemedText>
                    Currently:&nbsp;
                    {
                        isEmpty(character.location.url)? character.location.name
                        :   <ThemedText type="link" 
                                        onPress={goToLocationDetails}>
                                {character.location.name}
                            </ThemedText>
                    }
                </ThemedText>
                <ThemedText>Appears in:</ThemedText>
                <View style={styles.list}>
                    {
                        episodesIds.map((id, index, array) => 
                            <ThemedText key={id}
                                        type="link"
                                        onPress={() => goToEpisode(id)}>
                                Episode {id}
                                {index < array.length-1? ', ' : ''}
                            </ThemedText>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 16,
        flexWrap: 'wrap',
        padding: 16,
        paddingTop: 32,
    },
    info: {
        flexDirection: 'column',
        minWidth: 250,
        flex: 1,
    },
    list: {
        paddingLeft: 8,
        flexDirection: 'row',
        columnGap: 8,
        flexWrap: 'wrap',
    }
})