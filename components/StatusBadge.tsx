import { CharacterStatus } from "@/types";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export default function StatusBadge({status}: {status: CharacterStatus}) {
    const statusColor = useColorScheme() === 'light' ? Colors.light.badge : Colors.dark.badge;
    
    return (
        <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>({status})</ThemedText>
            <View style={[styles.dot, {backgroundColor: statusColor[status]}]} />
        </View>
    )

}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        alignItems  : 'center',
        flexDirection: 'row',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 20,
        marginHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        textTransform: 'lowercase',
        fontSize: 12,
    },
})