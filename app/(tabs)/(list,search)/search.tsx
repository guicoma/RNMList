import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { FlatList, Platform, SafeAreaView, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import * as API from "@/lib/api";
import { Character } from "@/types";
import CharacterCard from "@/components/CharacterCard";

export default function SearchTab() {
    const [searching, setSearching] = useState<boolean>();
    const [loadingMore, setLoadingMore] = useState<boolean>();
    const [name, setName] = useState<string>();
    const [results, setResults] = useState<Character[]>();
    const borderColor = useThemeColor({}, 'inputBorder');
    const color = useThemeColor({}, 'text');
    const {width} = useWindowDimensions();


    const searchCharacter = async () => {
        try{
            setSearching(true);
            let params = { name }
            const response = await API.searchCharacter(params);
            setResults(response.results);
        } catch {

        } finally {
            setSearching(false);
        }
    }


    return (
        <ThemedView style={{flex: 1}}>
            <SafeAreaView style={styles.container}>
                <TextInput placeholder="Search" onChangeText={setName} onSubmitEditing={searchCharacter} style={[styles.input, {borderColor, color}]} />
                {
                    (!results)
                    ? <ThemedText>No results found</ThemedText>
                    : <FlatList
                    data={results}
                    key={Platform.OS === 'web' ? Math.floor(width/300) : 1}
                    numColumns={Platform.OS === 'web' ? Math.floor(width/300) : 1}
                    renderItem={({item}) => <CharacterCard character={item} />}
                    keyExtractor={(item,index) => `character-${index}-${item.id}`}
                    style={styles.list}
                    />
                }
            </SafeAreaView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 26,
        padding: 10
    },
    list: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    }
});