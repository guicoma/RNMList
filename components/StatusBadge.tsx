import { CharacterStatus } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function StatusBadge({status}: {status: CharacterStatus}) {
    const color = useThemeColor({}, `statusBadge${status}`);

    return (
        <View style={[styles.badge,{backgroundColor: color}]}>
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