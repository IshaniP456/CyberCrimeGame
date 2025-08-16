// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ✅ adjust these import paths if your files live elsewhere
import Scenario1Screen from './screens/Scenario1Screen';
import CharactersScreen from './screens/CharactersScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for the Characters flow (list -> detail)
function CharactersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
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
        options={({ route }) => ({
          title: route.params?.character?.name ?? 'Profile',
        })}
      />
    </Stack.Navigator>
  );
}

// Stack for Scenario (you can add more scenarios later)
function ScenarioStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Scenario1"
        component={Scenario1Screen}
        options={{ title: 'Scenario #1' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Scenario"
          screenOptions={{
            headerShown: false,            // headers are provided by the nested stacks
            tabBarLabelStyle: { fontWeight: '700' },
          }}
        >
          <Tab.Screen name="Scenario" component={ScenarioStack} />
          <Tab.Screen name="CharactersTab" component={CharactersStack} options={{ title: 'Characters' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
