import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FarmsScreen } from '../screens/FarmsScreen';
import { FarmDetailScreen } from '../screens/FarmDetailScreen';
import { SurveyFormScreen } from '../screens/SurveyFormScreen';
import { SurveysListScreen } from '../screens/SurveysListScreen';
import { colors } from '../theme';
import type {
  CollectTabParamList,
  FarmsStackParamList,
  RootStackParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<CollectTabParamList>();
const FarmsStack = createNativeStackNavigator<FarmsStackParamList>();

function FarmDetailHeader({ navigation, route }: NativeStackHeaderProps) {
  const params = route.params as FarmsStackParamList['FarmDetail'];
  return (
    <AppHeader
      title={params?.title ?? 'Точка'}
      onBack={() => navigation.goBack()}
    />
  );
}

function SurveyFormHeader({ navigation, route }: NativeStackHeaderProps) {
  const params = route.params as RootStackParamList['SurveyForm'];
  const title = params?.surveyId ? 'Изменить визит' : 'Новый визит';
  return <AppHeader title={title} onBack={() => navigation.goBack()} />;
}

function FarmsStackNavigator() {
  return (
    <FarmsStack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <FarmsStack.Screen
        name="FarmsHome"
        component={FarmsScreen}
        options={{ headerShown: false }}
      />
      <FarmsStack.Screen
        name="FarmDetail"
        component={FarmDetailScreen}
        options={{ header: FarmDetailHeader }}
      />
    </FarmsStack.Navigator>
  );
}

function TabLabel({
  label,
  focused,
}: {
  label: string;
  focused: boolean;
}) {
  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: focused ? '700' : '500',
        color: focused ? colors.primary : colors.textMuted,
      }}
    >
      {label}
    </Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Farms"
        component={FarmsStackNavigator}
        options={{
          title: 'Точки',
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Точки" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Surveys"
        component={SurveysListScreen}
        options={{
          title: 'Визиты',
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Визиты" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function CollectNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <RootStack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SurveyForm"
          component={SurveyFormScreen}
          options={{
            presentation: 'modal',
            header: SurveyFormHeader,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
