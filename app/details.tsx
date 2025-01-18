import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Character } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from "react-native";

export default function CharacterDetails(){
    const { id, name } = useLocalSearchParams<{id: string, name: string}>();
    const [data, setData] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigation();
    navigation.setOptions({ headerTitle: name, })

    const getCharacterDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCharacterDetails();
    }, []);

    return (
        <ThemedView style={styles.container}>
            {isLoading ? <ActivityIndicator size={"large"} /> :
                    data? <ScrollView>
                        <View style={styles.details}>

                            <Image source={{ uri: data.image }} style={styles.image} />
                            <View style={{flexDirection: 'column', minWidth: 250, flex: 1, flexWrap: 'wrap'}}>
                                <ThemedText type="title">{data.name} ({data.status})</ThemedText>
                                <ThemedText type="subtitle">{data.species}{data.type? `-${data.type}` : ''}</ThemedText>
                                <ThemedText type="subtitle">{data.gender}</ThemedText>
                                <ThemedText type="subtitle">From: {data.origin.name}</ThemedText>
                                <ThemedText type="subtitle">Currently: {data.location.name}</ThemedText>
                            </View>
                        </View>
                        </ScrollView> : <ThemedText>Character not found</ThemedText>
            }
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 32,
    },
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
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
})