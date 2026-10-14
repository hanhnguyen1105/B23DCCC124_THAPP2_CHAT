import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  useMemo,
  useState,
} from 'react';
import { StatusBar } from 'react-native';
import {
  initialChats,
  initialNotifications,
} from './data';
import { Icon, IconName } from './components/Icon';
import { AppContext, useAppContext } from './context';
import { RootStackParamList, TabParamList } from './navigationTypes';
import {
  ChatScreen,
  ContactsScreen,
  HomeScreen,
  LoginScreen,
  NotificationsScreen,
  SettingsScreen,
  colors,
} from './screens';
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, IconName> = {
  Messages: 'message',
  Contacts: 'contacts',
  Notifications: 'bell',
  Settings: 'settings',
};

function MainTabs() {
  const { isDark, notifications, chats } = useAppContext();
  const palette = colors(isDark);
  const unreadNotifications = notifications.filter(item => !item.read).length;
  const unreadChats = chats.reduce((total, chat) => total + chat.unreadCount, 0);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
          height: 62,
          paddingBottom: 7,
          paddingTop: 5,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} name={tabIcons[route.name]} size={size} />
        ),
        tabBarBadge:
          route.name === 'Messages'
            ? unreadChats || undefined
            : route.name === 'Notifications' && unreadNotifications > 0
              ? unreadNotifications
              : undefined,
        tabBarBadgeStyle: {
          backgroundColor: palette.primary,
          fontSize: 9,
          minWidth: 15,
          height: 15,
        },
      })}>
      <Tabs.Screen
        name="Messages"
        component={HomeScreen}
        options={{ title: 'Tin nhắn' }}
      />
      <Tabs.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Danh bạ' }}
      />
      <Tabs.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Thông báo' }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Cài đặt' }}
      />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  const [chats, setChats] = useState(initialChats);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [user, setUser] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const value = useMemo(
    () => ({
      chats,
      setChats,
      notifications,
      setNotifications,
      user,
      setUser,
      isDark,
      setIsDark,
      notificationsEnabled,
      setNotificationsEnabled,
    }),
    [chats, notifications, user, isDark, notificationsEnabled],
  );

  return (
    <AppContext.Provider value={value}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors(isDark).background },
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ animation: 'slide_from_right' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
