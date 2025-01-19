import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Character, LocationParams } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function CharacterDetails(){
    const { id, name } = useLocalSearchParams<{id: string, name: string}>();
    const [data, setData] = useState<Character>();
    const [episodes, setEpisodes] = useState<string[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasOriginUrl, setHasOriginUrl] = useState<boolean>(false);
    const [originParams, setOriginParams] = useState<LocationParams>();
    const [locationParams, setLocationParams] = useState<LocationParams>();
    const [hasLocationUrl, setHasLocationUrl] = useState<boolean>(false);

    const navigation = useNavigation<any>();

    const getCharacterDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const json = await response.json();
            setData(json);
            setHasOriginUrl(json.origin.url !== "");
            setHasLocationUrl(json.location.url !== "");
            setOriginParams({id: json.origin.url.split('/').pop(), name: json.origin.name});
            setLocationParams({id: json.location.url.split('/').pop(), name: json.location.name});
            let episodeIds:string[] = [];
            json.episode.forEach((url:string) => {
                let id = url.split('/').pop();
                if(id) episodeIds.push(id);
            });
            setEpisodes(episodeIds);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const goToOriginDetails = () => {
        navigation.navigate('location', originParams);
    }
    const goToLocationDetails = () => {
        navigation.navigate('location', locationParams);
    }
    const goToEpisode = (episodeId:string) => {
        navigation.navigate('episode', {id: episodeId});
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
                    : data? <View style={styles.details}>

                                <Image source={{ uri: data.image }} style={styles.image} />
                                <View style={styles.info}>
                                    <ThemedText type="title">{data.name}</ThemedText>
                                    <ThemedText type="subtitle">
                                        {data.species}
                                        {data.type? `/${data.type}` : ''}
                                        {data.gender? `/${data.gender}` : ''}
                                    </ThemedText>
                                    <ThemedText>Status: {data.status} </ThemedText>
                                    <ThemedText>
                                        From:&nbsp;
                                        {
                                            hasOriginUrl? <ThemedText type="link" onPress={goToOriginDetails}>{data.origin.name}</ThemedText>
                                            : data.origin.name
                                        }
                                    </ThemedText>
                                    <ThemedText>
                                        Currently:&nbsp;
                                        {
                                            hasLocationUrl? <ThemedText type="link" onPress={goToLocationDetails}>{data.location.name}</ThemedText>
                                            : data.location.name
                                        }
                                    </ThemedText>
                                    <ThemedText>Appears in:</ThemedText>
                                    <View style={styles.list}>
                                        {episodes?.map((episode) => <ThemedText key={episode} type="link" onPress={() => goToEpisode(episode)}>Episode {episode}</ThemedText>)}
                                        {/* <FlatList data={episodes}
                                        style={{flexGrow: 0}}
                                            renderItem={({item}) => <ThemedText type="link" onPress={() => goToEpisode(item)}>Episode {item}</ThemedText>}
                                        /> */}
                                    </View>
                                </View>
                            </View>
                    : <ThemedText>Character not found</ThemedText>
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
    },
})