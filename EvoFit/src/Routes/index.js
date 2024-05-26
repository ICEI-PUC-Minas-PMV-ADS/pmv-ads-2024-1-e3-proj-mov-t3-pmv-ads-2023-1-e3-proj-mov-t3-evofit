import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/HomeScreen";
import Workout from "../pages/Workout";
import SettingScreen from "../pages/SettingScreen";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Gestão de Treinos" component={HomeScreen} />
        <Tab.Screen name="Workout" component={Workout} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
