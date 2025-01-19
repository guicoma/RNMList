import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Character, Location } from "@/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CharacterListItem from "@/components/CharacterListItem";
import { extractArrayURLIds } from "@/lib/utils";
import * as API from '@/lib/api';


export default function LocationPage() {
    const { id, name } = useLocalSearchParams<{id: string, name: string}>();
    const [data, setData] = useState<Location>();
    const [residents, setResidents] = useState<Character[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingResidents, setIsLoadingResidents] = useState<boolean>(true);

    const getResidents = async (residentsUrls:string[]) => {
        try {
            setIsLoadingResidents(true);
            let residentsIds:string[] = extractArrayURLIds(residentsUrls);
            const response = await API.getCharacters(residentsIds);
            setResidents(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingResidents(false);
        }
    }

    const getLocationDetails = async () => {
        try {
            setIsLoading(true);
            const location = await API.getLocation(id);
            setData(location);
            getResidents(location.residents);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getLocationDetails();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.container}>
                <ScrollView style={styles.details}>
                {
                    isLoading? <ActivityIndicator size='large' />
                    :data? <View>
                            <ThemedText type="title" style={styles.title}>{data.name}</ThemedText>
                            <ThemedText>Type: {data.type}</ThemedText>
                            <ThemedText>Dimension: {data.dimension}</ThemedText>
                            <ThemedText>Created: {data.created}</ThemedText>
                            <ThemedText>Residents ({residents?.length}):</ThemedText>
                            {
                                isLoadingResidents? <ActivityIndicator size='small' />
                                : residents? residents.map((resident) => <CharacterListItem key={resident.id} character={resident} />)
                                : <ThemedText>No residents found</ThemedText>
                            }
                        </View>
                    : <ThemedText>No info found</ThemedText>
                }
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    details: {
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    title: {
        marginBottom: 8,
    }
})