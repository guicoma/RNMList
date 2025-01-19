import { CharacterStatus } from "@/types";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function StatusBadge({status}: {status: CharacterStatus}) {
    const theme = useColorScheme() ?? 'light';
    const statusColor = Colors[theme].badge;

    return (
        <View style={[styles.badge,{backgroundColor: statusColor[status]}]}>
            <Text style={styles.text}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        alignItems  : 'baseline',
        flexDirection: 'row',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    text: {
        color: 'white'
    }
})