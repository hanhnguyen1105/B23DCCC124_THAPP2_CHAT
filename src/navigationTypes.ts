import {
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TabParamList = {
  Messages: undefined;
  Contacts: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<TabParamList> | undefined;
  Chat: { chatId: string };
};

export function useRootNavigation() {
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const rootNavigation =
    navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  if (!rootNavigation) {
    throw new Error('A root stack navigator is required for this screen');
  }
  return rootNavigation;
}
