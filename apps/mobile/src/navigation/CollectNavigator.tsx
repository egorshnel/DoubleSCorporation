import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { useRole } from '../data/RoleContext';
import { AggregationScreen } from '../screens/AggregationScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { CabinetScreen } from '../screens/CabinetScreen';
import { FarmDetailScreen } from '../screens/FarmDetailScreen';
import { FarmsScreen } from '../screens/FarmsScreen';
import { RoleSelectScreen } from '../screens/RoleSelectScreen';
import { RoutesScreen } from '../screens/RoutesScreen';
import { SurveyFormScreen } from '../screens/SurveyFormScreen';
import { SurveysListScreen } from '../screens/SurveysListScreen';
import { colors } from '../theme';
import type {
  FarmsStackParamList,
  ProducerTabParamList,
  ProcessorTabParamList,
  RootStackParamList,
  WholesalerTabParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const FarmsStack = createNativeStackNavigator<FarmsStackParamList>();
const WholesalerTab = createBottomTabNavigator<WholesalerTabParamList>();
const ProducerTab = createBottomTabNavigator<ProducerTabParamList>();
const ProcessorTab = createBottomTabNavigator<ProcessorTabParamList>();

function FarmDetailHeader({ navigation, route }: NativeStackHeaderProps) {
  const params = route.params as FarmsStackParamList['FarmDetail'];
  return (
    <AppHeader
      title={params?.title ?? 'Хозяйство'}
      onBack={() => navigation.goBack()}
    />
  );
}

function SurveyFormHeader({ navigation, route }: NativeStackHeaderProps) {
  const params = route.params as RootStackParamList['SurveyForm'];
  const title = params?.surveyId ? 'Изменить опрос' : 'Новый опрос';
  return <AppHeader title={title} onBack={() => navigation.goBack()} />;
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
        fontSize: 11,
        fontWeight: focused ? '700' : '500',
        color: focused ? colors.primary : colors.textMuted,
      }}
    >
      {label}
    </Text>
  );
}

function PointsStack() {
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

function WholesalerTabs() {
  return (
    <WholesalerTab.Navigator
      initialRouteName="Cabinet"
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
      <WholesalerTab.Screen
        name="Points"
        component={PointsStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Поставщики" focused={focused} />
          ),
        }}
      />
      <WholesalerTab.Screen
        name="Visits"
        component={SurveysListScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Сборы" focused={focused} />
          ),
        }}
      />
      <WholesalerTab.Screen
        name="Deals"
        component={AggregationScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Сделки" focused={focused} />
          ),
        }}
      />
      <WholesalerTab.Screen
        name="Routes"
        component={RoutesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Маршруты" focused={focused} />
          ),
        }}
      />
      <WholesalerTab.Screen
        name="Cabinet"
        component={CabinetScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Кабинет" focused={focused} />
          ),
        }}
      />
    </WholesalerTab.Navigator>
  );
}

function ProducerTabs() {
  return (
    <ProducerTab.Navigator
      initialRouteName="Cabinet"
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
      <ProducerTab.Screen
        name="Deals"
        component={AggregationScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Заявки" focused={focused} />
          ),
        }}
      />
      <ProducerTab.Screen
        name="Monitor"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Мониторинг" focused={focused} />
          ),
        }}
      />
      <ProducerTab.Screen
        name="Cabinet"
        component={CabinetScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Кабинет" focused={focused} />
          ),
        }}
      />
    </ProducerTab.Navigator>
  );
}

function ProcessorTabs() {
  return (
    <ProcessorTab.Navigator
      initialRouteName="Cabinet"
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
      <ProcessorTab.Screen
        name="Deals"
        component={AggregationScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Спрос" focused={focused} />
          ),
        }}
      />
      <ProcessorTab.Screen
        name="Monitor"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Мониторинг" focused={focused} />
          ),
        }}
      />
      <ProcessorTab.Screen
        name="Cabinet"
        component={CabinetScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Кабинет" focused={focused} />
          ),
        }}
      />
    </ProcessorTab.Navigator>
  );
}

function RoleMain() {
  const { role } = useRole();
  if (role === 'producer') {
    return <ProducerTabs />;
  }
  if (role === 'processor') {
    return <ProcessorTabs />;
  }
  return <WholesalerTabs />;
}

export function CollectNavigator() {
  const { role } = useRole();

  return (
    <NavigationContainer key={role ?? 'select'}>
      <RootStack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        {role == null ? (
          <RootStack.Screen
            name="RoleSelect"
            component={RoleSelectScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <RootStack.Screen
              name="Main"
              component={RoleMain}
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
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
