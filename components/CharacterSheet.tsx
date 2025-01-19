import { useEffect, useState } from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { useNavigation } from "expo-router";

import { extractArrayURLIds, extractURLId, isEmpty } from "@/lib/utils";
import { Character } from "@/types";

import { ThemedText } from "./ThemedText";
import StatusBadge from "./StatusBadge";
import { Colors } from "@/constants/Colors";

interface CharacterSheetProps {
    character: Character;
}


export default function CharacterSheet({ character }: CharacterSheetProps) {
    const navigation = useNavigation<any>();
    const [episodesIds, setEpisodesIds] = useState<string[]>([]);

    const theme = useColorScheme() || 'light';
    const backgroundColor = Colors[theme].details.background;
    const borderBottomColor = Colors[theme].details.border;

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
        <View style={styles.sheet}>
            <Image source={{ uri: character.image }}
                style={styles.image}
            />
            <View style={styles.info}>
                <ThemedText type="title">{character.name}</ThemedText>
                <ThemedText type="subtitle">
                    {character.species}
                    {character.type? `, ${character.type}` : ''}
                    {character.gender? `, ${character.gender}` : ''}
                </ThemedText>
                <View style={{...styles.details, backgroundColor}}>
                    <View style={{...styles.item, borderBottomColor}}>
                        <ThemedText style={styles.label}>Status</ThemedText>
                        <StatusBadge status={character.status} />
                    </View>
                    <View style={{...styles.item, borderBottomColor}}>
                        <ThemedText style={styles.label}>Origin</ThemedText>
                        {
                            isEmpty(character.origin.url)? <ThemedText>{character.origin.name}</ThemedText>
                            :   <ThemedText type="link"
                                            onPress={goToOriginDetails}>
                                    {character.origin.name}
                                </ThemedText>
                        }
                    </View>
                    <View style={{...styles.item, borderBottomColor}}>
                            <ThemedText style={styles.label}>Last seen</ThemedText>
                            {
                                isEmpty(character.location.url)? <ThemedText>{character.location.name}</ThemedText>
                                :   <ThemedText type="link" 
                                                onPress={goToLocationDetails}>
                                        {character.location.name}
                                    </ThemedText>
                            }
                    </View>
                    <View style={styles.itemLast}>
                        <ThemedText style={styles.label}>Appears in</ThemedText>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 260,
        height: 260,
        borderRadius: 8,
    },
    sheet: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 16,
        flexWrap: 'wrap',
        padding: 16,
    },
    info: {
        flexDirection: 'column',
        minWidth: 250,
        flex: 1,
        gap: 6
    },
    details: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        maxWidth: 600,
        marginTop: 3,
    },
    item: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
    itemLast: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    list: {
        paddingLeft: 22,
        flexDirection: 'row',
        columnGap: 2,
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'flex-end'
    }
})