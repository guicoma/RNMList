import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import NotFoundScreen from "../../+not-found";
import * as API from "@/lib/api";
import { ThemedView } from "@/components/ThemedView";
import { Character } from "@/types";
import CharacterSheet from "@/components/CharacterSheet";

export default function CharacterDetails(){
    const { id, name } = useLocalSearchParams<{id: string, name: string}>();
    const [data, setData] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigation = useNavigation<any>();

    const getCharacterDetails = async () => {
        try {
            setIsLoading(true);
            const response = await API.getCharacter(id);
            setData(response);
        } catch (error) {
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        navigation.setOptions({ headerTitle: name, })
        getCharacterDetails();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.container}>
                <ScrollView>
                {
                    isLoading? <ActivityIndicator size={"large"} />
                    : (data == null)? <NotFoundScreen />
                    : <CharacterSheet character={data} /> 
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
    
})