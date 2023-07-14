import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable, useColorScheme} from 'react-native';

import Colors from '../../constants/Colors';
import React, { useEffect } from "react";
import {AntDesign, Feather} from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
console.warn = () => {};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Trips',
                    tabBarIcon: ({color}) => <Fontisto name="holiday-village" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="addExcursion"
                options={{
                    title: 'Add excursion',
                    tabBarIcon: ({color}) => <AntDesign name="pluscircleo" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="mapTab"
                options={{
                    title: 'Map',
                    tabBarIcon: ({color}) => <Feather name="map" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'settings',
                    tabBarIcon: ({color}) => <Feather name="settings" size={24} color="black" />,
                }}
            />
        </Tabs>

    );
}
