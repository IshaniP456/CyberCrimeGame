import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ScenarioListScreen from './screens/ScenarioListScreen';
import Scenario1Screen from './screens/ScenarioScreens/Scenario1Screen';
import Scenario2Screen from './screens/ScenarioScreens/Scenario2Screen';
import Scenario3Screen from './screens/ScenarioScreens/Scenario3Screen';
import Scenario4Screen from './screens/ScenarioScreens/Scenario4Screen';
import Scenario5Screen from './screens/ScenarioScreens/Scenario5Screen';
import Scenario6Screen from './screens/ScenarioScreens/Scenario6Screen';
import Scenario7Screen from './screens/ScenarioScreens/Scenario7Screen';

import CharactersScreen from './screens/CharactersScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ScenariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScenarioList"
        component={ScenarioListScreen}
        options={{ title: 'Scenarios' }} // <-- no headerRight here anymore
      />
      <Stack.Screen name="Scenario1" component={Scenario1Screen} options={{ title: 'Scenario #1' }} />
      <Stack.Screen name="Scenario2" component={Scenario2Screen} options={{ title: 'Scenario #2' }} />
      <Stack.Screen name="Scenario3" component={Scenario3Screen} options={{ title: 'Scenario #3' }} />
      <Stack.Screen name="Scenario4" component={Scenario4Screen} options={{ title: 'Scenario #4' }} />
      <Stack.Screen name="Scenario5" component={Scenario5Screen} options={{ title: 'Scenario #5' }} />
      <Stack.Screen name="Scenario6" component={Scenario6Screen} options={{ title: 'Scenario #6' }} />
      <Stack.Screen name="Scenario7" component={Scenario7Screen} options={{ title: 'Scenario #7' }} />
    </Stack.Navigator>
  );
}

function CharactersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Characters" component={CharactersScreen} options={{ title: 'Characters' }} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#ff6b00',
          tabBarIcon: ({ color, size }) =>
            route.name === 'Scenarios'
              ? <Ionicons name="list" size={size} color={color} />
              : <Ionicons name="person" size={size} color={color} />,
        })}
      >
        <Tab.Screen name="Scenarios" component={ScenariosStack} />
        <Tab.Screen name="Characters" component={CharactersStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
