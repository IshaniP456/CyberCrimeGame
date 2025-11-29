// App.js
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from './src/theme/colors';

// Main screens
import HomeScreen from './screens/HomeScreen';
import ScenarioListScreen from './screens/ScenarioListScreen';
import CharactersScreen from './screens/CharactersScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import NotesScreen from './screens/NotesScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import CreditsScreen from './screens/CreditsScreen';

// Scenario screens 1–24
import Scenario1Screen from './screens/ScenarioScreens/Scenario1Screen';
import Scenario2Screen from './screens/ScenarioScreens/Scenario2Screen';
import Scenario3Screen from './screens/ScenarioScreens/Scenario3Screen';
import Scenario4Screen from './screens/ScenarioScreens/Scenario4Screen';
import Scenario5Screen from './screens/ScenarioScreens/Scenario5Screen';
import Scenario6Screen from './screens/ScenarioScreens/Scenario6Screen';
import Scenario7Screen from './screens/ScenarioScreens/Scenario7Screen';
import Scenario8Screen from './screens/ScenarioScreens/Scenario8Screen';
import Scenario9Screen from './screens/ScenarioScreens/Scenario9Screen';
import Scenario10Screen from './screens/ScenarioScreens/Scenario10Screen';
import Scenario11Screen from './screens/ScenarioScreens/Scenario11Screen';
import Scenario12Screen from './screens/ScenarioScreens/Scenario12Screen';
import Scenario13Screen from './screens/ScenarioScreens/Scenario13Screen';
import Scenario14Screen from './screens/ScenarioScreens/Scenario14Screen';
import Scenario15Screen from './screens/ScenarioScreens/Scenario15Screen';
import Scenario16Screen from './screens/ScenarioScreens/Scenario16Screen';
import Scenario17Screen from './screens/ScenarioScreens/Scenario17Screen';
import Scenario18Screen from './screens/ScenarioScreens/Scenario18Screen';
import Scenario19Screen from './screens/ScenarioScreens/Scenario19Screen';
import Scenario20Screen from './screens/ScenarioScreens/Scenario20Screen';
import Scenario21Screen from './screens/ScenarioScreens/Scenario21Screen';
import Scenario22Screen from './screens/ScenarioScreens/Scenario22Screen';
import Scenario23Screen from './screens/ScenarioScreens/Scenario23Screen';
import Scenario24Screen from './screens/ScenarioScreens/Scenario24Screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

/* ----------------- SCENARIOS STACK ----------------- */

function ScenariosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },   // 🔥 dark header
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="ScenarioList"
        component={ScenarioListScreen}
        options={{ title: 'Scenarios' }}
      />
      <Stack.Screen name="Scenario1" component={Scenario1Screen} options={{ title: 'Scenario #1' }} />
      <Stack.Screen name="Scenario2" component={Scenario2Screen} options={{ title: 'Scenario #2' }} />
      <Stack.Screen name="Scenario3" component={Scenario3Screen} options={{ title: 'Scenario #3' }} />
      <Stack.Screen name="Scenario4" component={Scenario4Screen} options={{ title: 'Scenario #4' }} />
      <Stack.Screen name="Scenario5" component={Scenario5Screen} options={{ title: 'Scenario #5' }} />
      <Stack.Screen name="Scenario6" component={Scenario6Screen} options={{ title: 'Scenario #6' }} />
      <Stack.Screen name="Scenario7" component={Scenario7Screen} options={{ title: 'Scenario #7' }} />
      <Stack.Screen name="Scenario8" component={Scenario8Screen} options={{ title: 'Scenario #8' }} />
      <Stack.Screen name="Scenario9" component={Scenario9Screen} options={{ title: 'Scenario #9' }} />
      <Stack.Screen name="Scenario10" component={Scenario10Screen} options={{ title: 'Scenario #10' }} />
      <Stack.Screen name="Scenario11" component={Scenario11Screen} options={{ title: 'Scenario #11' }} />
      <Stack.Screen name="Scenario12" component={Scenario12Screen} options={{ title: 'Scenario #12' }} />
      <Stack.Screen name="Scenario13" component={Scenario13Screen} options={{ title: 'Scenario #13' }} />
      <Stack.Screen name="Scenario14" component={Scenario14Screen} options={{ title: 'Scenario #14' }} />
      <Stack.Screen name="Scenario15" component={Scenario15Screen} options={{ title: 'Scenario #15' }} />
      <Stack.Screen name="Scenario16" component={Scenario16Screen} options={{ title: 'Scenario #16' }} />
      <Stack.Screen name="Scenario17" component={Scenario17Screen} options={{ title: 'Scenario #17' }} />
      <Stack.Screen name="Scenario18" component={Scenario18Screen} options={{ title: 'Scenario #18' }} />
      <Stack.Screen name="Scenario19" component={Scenario19Screen} options={{ title: 'Scenario #19' }} />
      <Stack.Screen name="Scenario20" component={Scenario20Screen} options={{ title: 'Scenario #20' }} />
      <Stack.Screen name="Scenario21" component={Scenario21Screen} options={{ title: 'Scenario #21' }} />
      <Stack.Screen name="Scenario22" component={Scenario22Screen} options={{ title: 'Scenario #22' }} />
      <Stack.Screen name="Scenario23" component={Scenario23Screen} options={{ title: 'Scenario #23' }} />
      <Stack.Screen name="Scenario24" component={Scenario24Screen} options={{ title: 'Scenario #24' }} />
    </Stack.Navigator>
  );
}

/* ----------------- CHARACTERS STACK ----------------- */

function CharactersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="Characters"
        component={CharactersScreen}
        options={{ title: 'Characters' }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

/* ----------------- MAIN TABS (Scenarios / Characters / Notes) ----------------- */

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff6b00',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: '#1a1a1a',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';

          if (route.name === 'Scenarios') {
            iconName = 'list';
          } else if (route.name === 'CharactersTab') {
            iconName = 'person';
          } else if (route.name === 'Notes') {
            iconName = 'document-text';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Scenarios"
        component={ScenariosStack}
        options={{ title: 'Scenarios' }}
      />
      <Tab.Screen
        name="CharactersTab"
        component={CharactersStack}
        options={{ title: 'Characters' }}
      />
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{ title: 'Notes' }}
      />
    </Tab.Navigator>
  );
}

/* ----------------- ROOT NAVIGATOR (Home + MainTabs + Info pages) ----------------- */

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      {/* Home has its own custom UI, so hide header */}
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* Main tabbed experience (Scenarios/Characters/Notes) */}
      <RootStack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      {/* Info pages (we already added custom BackButton inside them) */}
      <RootStack.Screen
        name="HowToPlay"
        component={HowToPlayScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Credits"
        component={CreditsScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

/* ----------------- APP ROOT ----------------- */

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}
