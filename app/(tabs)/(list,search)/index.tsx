import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";

import * as API from "@/lib/api";
import { Character } from "@/types";

import CharacterCard from "@/components/CharacterCard";
import { ThemedView } from "@/components/ThemedView";

export default function ListTab(){
    const [data, setData] = useState<Character[]>([]);
    const [pageLoaded, setPageLoaded] = useState(1);
    const [isEndPage, setIsEndPage] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(true);
    const {width} = useWindowDimensions();

    const getRNMCharactersFromApi = async () => {
        if(isEndPage) return;
        try {
            setLoading(true);
            const response = await API.getPagedCharacters(pageLoaded);
            setIsEndPage(response.info.next === null);
            setPageLoaded(prevPage => prevPage + 1);
            setData(prevData => prevData.concat(response.results));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getRNMCharactersFromApi();
    }, []);

    return (
        <ThemedView style={{flex: 1}}>
            <SafeAreaView style={styles.container}>
                {data.length > 0 &&
                    <FlatList
                        data={data}
                        key={Platform.OS === 'web' ? Math.floor(width/300) : 1}
                        numColumns={Platform.OS === 'web' ? Math.floor(width/300) : 1}
                        renderItem={({item}) => <CharacterCard character={item} />}
                        keyExtractor={(item,index) => `character-${index}-${item.id}`}
                        onEndReached={getRNMCharactersFromApi}
                        onEndReachedThreshold={0.5}
                        style={styles.list}
                    />
                }
                <ActivityIndicator size="large" animating={isLoading} />
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    list: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    }
});