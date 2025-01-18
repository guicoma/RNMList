import CharacterCard from "@/components/CharacterCard";
import { ThemedView } from "@/components/ThemedView";
import { Character } from "@/types";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, StyleSheet, useWindowDimensions } from "react-native";

export default function ListScreen(){
    const [data, setData] = useState<Character[]>([]);
    const [pageLoaded, setPageLoaded] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const {width} = useWindowDimensions();

    const getRNMCharactersFromApi = async () => {
        setLoading(true);
        //Just for the illusion of loading
        setTimeout(async() => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageLoaded}`);
                const json = await response.json()
                setPageLoaded(prevPage => prevPage + 1);
                setData(prevData => prevData.concat(json.results));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };


    useEffect(() => {
        getRNMCharactersFromApi();
    }, []);

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={data}
                key={Platform.OS === 'web' ? Math.floor(width/300) : 1}
                numColumns={Platform.OS === 'web' ? Math.floor(width/300) : 1}
                renderItem={({item}) => <CharacterCard character={item} />}
                keyExtractor={(item,index) => `character-${item.id}`}
                onEndReached={getRNMCharactersFromApi}
                style={{paddingTop: 16}}
            ></FlatList>
            <ActivityIndicator size="large" animating={isLoading} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
    }
});