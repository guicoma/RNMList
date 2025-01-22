import { Stack } from "expo-router"
import { useMemo } from "react"

const Layout = ({ segment }: { segment: string }) => {

   // use `segment` to conditionally set the root screen
   const rootScreen = useMemo(() => {
      switch (segment) {
         case '(list)':
               return <Stack.Screen name="index" options={{ title: 'Rick and Morty Characters', headerShown: false }} />
         case '(search)':
               return <Stack.Screen name="search" options={{ title: 'Search', headerShown: false }} />
      }
   }, [segment])

   // shared routes go here
   return (
      <Stack>
         {rootScreen}
        <Stack.Screen name="details" options={{ headerBackTitle: "Back" }} />
        <Stack.Screen name="location" options={{ title: "Location" }} />
        <Stack.Screen name="episode" options={{ title: "Episode" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
   )
}

export default Layout