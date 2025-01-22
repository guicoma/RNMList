import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(list)"
        options={{
          title: 'List',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="grid" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}
