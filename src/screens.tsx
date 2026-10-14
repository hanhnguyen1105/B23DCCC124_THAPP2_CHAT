import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  useMemo,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from './context';
import { RootStackParamList, useRootNavigation } from './navigationTypes';
import { Chat, Contact, initialContacts } from './data';
import { avatarSource } from './avatarAssets';
import { Icon } from './components/Icon';
import type { IconName } from './components/Icon';
import { StyleSheet } from 'react-native';

export const colors = (dark: boolean) => ({
  background: dark ? '#11121A' : '#F8F7FC',
  surface: dark ? '#1C1D28' : '#FFFFFF',
  raised: dark ? '#252637' : '#F0EFFB',
  text: dark ? '#F4F3FA' : '#25263A',
  muted: dark ? '#A5A5B8' : '#85869A',
  border: dark ? '#303143' : '#ECEAF4',
  primary: '#5145E5',
  primarySoft: dark ? '#2D2A56' : '#EEECFF',
  green: '#16865A',
  red: '#D84545',
});

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

function Avatar({
  id,
  name,
  size = 52,
  online = false,
}: {
  id?: number;
  name: string;
  size?: number;
  online?: boolean;
}) {
  const { isDark } = useAppContext();
  const palette = colors(isDark);
  const imageSize = { width: size, height: size, borderRadius: size / 2 };
  return (
    <View style={{ height: size, width: size }}>
      <Image
        accessibilityLabel={`Ảnh đại diện ${name}`}
        source={avatarSource(id)}
        style={[imageSize, { backgroundColor: palette.raised }]}
      />
      {online && (
        <View
          style={[
            styles.onlineDot,
            { borderColor: palette.surface, width: size * 0.24, height: size * 0.24 },
          ]}
        />
      )}
    </View>
  );
}

function ScreenHeader({ title }: { title: string }) {
  const { user, isDark } = useAppContext();
  const palette = colors(isDark);
  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.brand, { color: palette.primary }]}>NOVACHAT</Text>
        <Text style={[styles.headerTitle, { color: palette.text }]}>{title}</Text>
      </View>
      <Avatar id={1} name={user || 'Nova Chat'} size={40} />
    </View>
  );
}

function SearchField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel: string;
}) {
  const { isDark } = useAppContext();
  const palette = colors(isDark);
  return (
    <View style={[styles.searchBox, { backgroundColor: palette.raised }]}>
      <Icon color={palette.muted} name="search" size={18} />
      <TextInput
        accessibilityLabel={accessibilityLabel}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        style={[styles.searchInput, { color: palette.text }]}
      />
      {value.length > 0 && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Xóa nội dung tìm kiếm"
          onPress={() => onChangeText('')}>
          <Icon color={palette.muted} name="close" size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function EmptyState({ label }: { label: string }) {
  const { isDark } = useAppContext();
  return (
    <Text style={[styles.empty, { color: colors(isDark).muted }]}>{label}</Text>
  );
}

export function LoginScreen({ navigation }: LoginProps) {
  const { setUser, isDark } = useAppContext();
  const palette = colors(isDark);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  function signIn() {
    const cleanedAccount = account.trim();
    if (!cleanedAccount || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }
    setError('');
    setUser(cleanedAccount);
    navigation.replace('Main');
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.loginContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.loginBrand}>
            <View style={[styles.logoMark, { backgroundColor: palette.surface }]}>
              <Icon color={palette.primary} name="sparkles" size={28} />
            </View>
            <Text style={[styles.loginTitle, { color: palette.text }]}>
              Nova<Text style={{ color: palette.primary }}>Chat</Text>
            </Text>
            <Text style={[styles.loginSubtitle, { color: palette.muted }]}>
              Đăng nhập để tiếp tục trải nghiệm
            </Text>
          </View>

          <View style={[styles.loginCard, { backgroundColor: palette.surface }]}>
            <Text style={[styles.fieldLabel, { color: palette.text }]}>Tài khoản</Text>
            <TextInput
              accessibilityLabel="Tài khoản"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={value => {
                setAccount(value);
                setError('');
              }}
              placeholder="Email hoặc Số điện thoại"
              placeholderTextColor={palette.muted}
              style={[
                styles.loginInput,
                { backgroundColor: palette.raised, color: palette.text },
              ]}
              value={account}
            />
            <View style={styles.passwordLabelRow}>
              <Text style={[styles.fieldLabel, { color: palette.text }]}>Mật khẩu</Text>
              <TouchableOpacity onPress={() => Alert.alert('Quên mật khẩu?', 'Vui lòng liên hệ quản trị viên để đặt lại mật khẩu demo.')}>
                <Text style={[styles.linkText, { color: palette.primary }]}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.passwordInputBox, { backgroundColor: palette.raised }]}>
              <TextInput
                accessibilityLabel="Mật khẩu"
                onChangeText={value => {
                  setPassword(value);
                  setError('');
                }}
                placeholder="Nhập mật khẩu"
                placeholderTextColor={palette.muted}
                secureTextEntry={!showPassword}
                style={[styles.passwordInput, { color: palette.text }]}
                value={password}
                onSubmitEditing={signIn}
                returnKeyType="done"
              />
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                onPress={() => setShowPassword(value => !value)}>
                <Icon color={palette.muted} name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </TouchableOpacity>
            </View>
            <View style={styles.rememberRow}>
              <View style={styles.rememberLabel}>
                <Icon color={palette.primary} name="shield" size={17} />
                <Text style={[styles.bodyText, { color: palette.text }]}>Ghi nhớ đăng nhập</Text>
              </View>
              <Switch
                accessibilityLabel="Ghi nhớ đăng nhập"
                value={remember}
                onValueChange={setRemember}
                trackColor={{ false: palette.border, true: '#AAA4FF' }}
                thumbColor={remember ? palette.primary : '#FFFFFF'}
              />
            </View>
            {!!error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Đăng nhập"
              onPress={signIn}
              style={[styles.primaryButton, { backgroundColor: palette.primary }]}>
              <Text style={styles.primaryButtonText}>Đăng nhập  →</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.loginFooter, { color: palette.muted }]}>
            Dùng tài khoản bất kỳ để trải nghiệm bản demo.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function HomeScreen() {
  const { chats, setChats, isDark } = useAppContext();
  const palette = colors(isDark);
  const navigation = useRootNavigation();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('vi');
    return chats.filter(chat =>
      `${chat.name} ${chat.message}`.toLocaleLowerCase('vi').includes(normalized),
    );
  }, [chats, query]);

  function openChat(chat: Chat) {
    setChats(items =>
      items.map(item => (item.id === chat.id ? { ...item, unreadCount: 0 } : item)),
    );
    navigation.navigate('Chat', { chatId: chat.id });
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: palette.background }]}>
      <ScreenHeader title="Tin nhắn" />
      <SearchField
        accessibilityLabel="Tìm kiếm cuộc trò chuyện"
        onChangeText={setQuery}
        placeholder="Tìm kiếm cuộc trò chuyện, người dùng..."
        value={query}
      />
      <View style={styles.listSectionHeader}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Gần đây</Text>
        <Text style={[styles.sectionMeta, { color: palette.muted }]}>
          {filtered.length} cuộc trò chuyện
        </Text>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState label="Không tìm thấy cuộc trò chuyện" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Mở cuộc trò chuyện với ${item.name}`}
            onPress={() => openChat(item)}
            style={[styles.chatRow, { borderBottomColor: palette.border }]}>
            <Avatar id={item.avatar} name={item.name} online={item.online} />
            <View style={styles.rowDetails}>
              <View style={styles.rowTopLine}>
                <Text numberOfLines={1} style={[styles.personName, { color: palette.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.rowTime,
                    { color: item.unreadCount ? palette.primary : palette.muted },
                  ]}>
                  {item.time}
                </Text>
              </View>
              <View style={styles.rowBottomLine}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.preview,
                    { color: item.unreadCount ? palette.text : palette.muted },
                    item.unreadCount ? styles.unreadPreview : undefined,
                  ]}>
                  {item.message}
                </Text>
                {item.unreadCount > 0 && (
                  <View style={[styles.unreadBadge, { backgroundColor: palette.primary }]}>
                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Tạo cuộc trò chuyện mới"
        onPress={() => navigation.navigate('Main', { screen: 'Contacts' })}
        style={[styles.composeButton, { backgroundColor: palette.primary }]}>
        <Icon color="#FFFFFF" name="compose" size={23} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export function ContactsScreen() {
  const { chats, setChats, isDark } = useAppContext();
  const palette = colors(isDark);
  const navigation = useRootNavigation();
  const [query, setQuery] = useState('');
  const contacts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('vi');
    return initialContacts.filter(contact =>
      contact.name.toLocaleLowerCase('vi').includes(normalized),
    );
  }, [query]);

  function openContact(contact: Contact) {
    const existing = chats.find(chat => chat.id === contact.chatId);
    if (!existing) {
      const newChat: Chat = {
        id: contact.chatId,
        name: contact.name,
        message: 'Bắt đầu cuộc trò chuyện mới',
        time: 'Bây giờ',
        avatar: contact.avatar,
        unreadCount: 0,
        online: contact.online,
        messages: [],
      };
      setChats(items => [newChat, ...items]);
    } else {
      setChats(items =>
        items.map(item =>
          item.id === contact.chatId ? { ...item, unreadCount: 0 } : item,
        ),
      );
    }
    navigation.navigate('Chat', { chatId: contact.chatId });
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: palette.background }]}>
      <ScreenHeader title="Danh bạ" />
      <SearchField
        accessibilityLabel="Tìm kiếm danh bạ"
        onChangeText={setQuery}
        placeholder="Tìm kiếm bạn bè theo tên hoặc SĐT..."
        value={query}
      />
      <View style={styles.listSectionHeader}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Bạn bè</Text>
        <Text style={[styles.sectionMeta, { color: palette.muted }]}>
          {contacts.length} người
        </Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState label="Không tìm thấy người dùng" />}
        renderItem={({ item, index }) => {
          const letter = item.name[0].toLocaleUpperCase('vi');
          const previousLetter = contacts[index - 1]?.name[0].toLocaleUpperCase('vi');
          return (
            <View>
              {letter !== previousLetter && (
                <Text style={[styles.contactLetter, { color: palette.primary }]}>{letter}</Text>
              )}
              <View style={[styles.contactRow, { borderBottomColor: palette.border }]}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Mở cuộc trò chuyện với ${item.name}`}
                  onPress={() => openContact(item)}
                  style={styles.contactPressable}>
                  <Avatar id={item.avatar} name={item.name} size={46} online={item.online} />
                  <View style={styles.contactText}>
                    <Text style={[styles.personName, { color: palette.text }]}>{item.name}</Text>
                    <Text style={[styles.contactStatus, { color: item.online ? palette.green : palette.muted }]}>
                      {item.online ? '● Đang hoạt động' : item.lastActive || 'Ngoại tuyến'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Nhắn tin cho ${item.name}`}
                  onPress={() => openContact(item)}
                  style={styles.contactAction}>
                  <Icon color={palette.primary} name="message" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Gọi cho ${item.name}`}
                  onPress={() => Alert.alert('Gọi điện', `Tính năng gọi ${item.name} sẽ sớm có mặt.`)}
                  style={styles.contactAction}>
                  <Icon color={palette.muted} name="phone" size={17} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export function NotificationsScreen() {
  const { notifications, setNotifications, isDark } = useAppContext();
  const palette = colors(isDark);
  const unreadCount = notifications.filter(item => !item.read).length;

  function markRead(id: string) {
    setNotifications(items =>
      items.map(item => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: palette.background }]}>
      <ScreenHeader title="Thông báo" />
      <View style={styles.notificationHeading}>
        <View style={styles.headingTitleRow}>
          <Text style={[styles.notificationTitle, { color: palette.text }]}>Thông báo</Text>
          {unreadCount > 0 && (
            <View style={[styles.countPill, { backgroundColor: palette.primary }]}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.markAllButton}
          accessibilityRole="button"
          disabled={unreadCount === 0}
          onPress={() =>
            setNotifications(items => items.map(item => ({ ...item, read: true })))
          }>
          <Icon
            color={unreadCount ? palette.primary : palette.muted}
            name="checkAll"
            size={15}
          />
          <Text style={[styles.markAllText, { color: unreadCount ? palette.primary : palette.muted }]}>
            Đọc tất cả
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationList}
        ListEmptyComponent={<EmptyState label="Bạn chưa có thông báo nào" />}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.read ? 'Đã đọc' : 'Chưa đọc'}: ${item.title}. Nhấn để đánh dấu đã đọc`}
            onPress={() => markRead(item.id)}
            style={[
              styles.notificationCard,
              {
                backgroundColor: palette.surface,
                borderColor: item.read ? palette.border : '#E9E6FF',
                opacity: item.read ? 0.68 : 1,
              },
            ]}>
            {item.avatar ? (
              <Avatar id={item.avatar} name={item.title} size={38} />
            ) : (
              <View style={[styles.notificationIcon, { backgroundColor: palette.primarySoft }]}>
                <Icon
                  color={palette.primary}
                  name={
                    item.kind === 'call'
                      ? 'phone'
                      : item.kind === 'system'
                        ? 'shield'
                        : 'sparkles'
                  }
                  size={17}
                />
              </View>
            )}
            <View style={styles.notificationDetails}>
              <View style={styles.notificationTopLine}>
                <Text numberOfLines={1} style={[styles.notificationName, { color: palette.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.rowTime, { color: palette.muted }]}>{item.time}</Text>
              </View>
              <Text numberOfLines={3} style={[styles.notificationBody, { color: palette.muted }]}>
                {item.body}
              </Text>
              {!item.read && (
                <View style={styles.notificationBottom}>
                  <Text style={[styles.markReadText, { color: palette.primary }]}>
                    {item.kind === 'message' ? '3 bạn chung' : item.kind === 'group' ? '● Nhắc đến bạn' : ' '}
                  </Text>
                  <Text style={{ color: palette.muted }}>✓</Text>
                </View>
              )}
            </View>
            {!item.read && <View style={[styles.unreadDot, { backgroundColor: palette.primary }]} />}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

export function SettingsScreen() {
  const {
    user,
    setUser,
    isDark,
    setIsDark,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useAppContext();
  const palette = colors(isDark);
  const navigation = useRootNavigation();
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const formattedUser = user.includes('@') ? user : `${user}@gmail.com`;

  function logout() {
    setUser('');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: palette.background }]}>
      <ScreenHeader title="Cài đặt" />
      <ScrollView contentContainerStyle={styles.settingsContent}>
        <View style={[styles.profileCard, { backgroundColor: palette.surface }]}>
          <Avatar id={1} name={user || 'Nova Chat'} size={58} />
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, { color: palette.text }]}>{user || 'Người dùng NovaChat'}</Text>
            <Text style={[styles.profileEmail, { color: palette.muted }]}>{formattedUser}</Text>
            <Text style={[styles.profilePhone, { color: palette.muted }]}>+84 987 654 321</Text>
          </View>
        </View>

        <View style={[styles.settingsCard, { backgroundColor: palette.surface }]}>
          <SettingToggle
            icon="bell"
            title="Nhận thông báo"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            palette={palette}
          />
          <SettingToggle
            icon="vibration"
            title="Chế độ rung"
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            palette={palette}
          />
          <SettingToggle
            icon="moon"
            title="Chế độ tối (Dark mode)"
            value={isDark}
            onValueChange={setIsDark}
            palette={palette}
          />
          <SettingRow
            icon="language"
            title="Ngôn ngữ ứng dụng"
            value="Tiếng Việt"
            palette={palette}
            onPress={() => Alert.alert('Ngôn ngữ', 'NovaChat hiện đang sử dụng Tiếng Việt.')}
          />
          <SettingRow
            icon="lock"
            title="Đổi mật khẩu / Bảo mật"
            palette={palette}
            onPress={() => Alert.alert('Bảo mật', 'Tính năng này sẽ sớm có mặt.')}
          />
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={logout}
          style={[styles.logoutButton, { borderColor: '#F1C9C9', backgroundColor: palette.surface }]}>
          <Icon color={palette.red} name="logout" size={16} />
          <Text style={[styles.logoutText, { color: palette.red }]}>Đăng xuất</Text>
        </TouchableOpacity>
        <Text style={[styles.versionText, { color: palette.muted }]}>NovaChat v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingToggle({
  icon,
  title,
  value,
  onValueChange,
  palette,
}: {
  icon: IconName;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  palette: ReturnType<typeof colors>;
}) {
  return (
    <View style={[styles.settingRow, { borderBottomColor: palette.border }]}>
      <View style={styles.settingLabel}>
        <View style={[styles.settingIcon, { backgroundColor: palette.primarySoft }]}>
          <Icon color={palette.primary} name={icon} size={17} />
        </View>
        <Text style={[styles.settingTitle, { color: palette.text }]}>{title}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.border, true: '#AAA4FF' }}
        thumbColor={value ? palette.primary : '#FFFFFF'}
      />
    </View>
  );
}

function SettingRow({
  icon,
  title,
  value,
  palette,
  onPress,
}: {
  icon: IconName;
  title: string;
  value?: string;
  palette: ReturnType<typeof colors>;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.settingRow, { borderBottomColor: palette.border }]}>
      <View style={styles.settingLabel}>
        <View style={[styles.settingIcon, { backgroundColor: palette.primarySoft }]}>
          <Icon color={palette.primary} name={icon} size={17} />
        </View>
        <Text style={[styles.settingTitle, { color: palette.text }]}>{title}</Text>
      </View>
      <Text style={[styles.settingValue, { color: palette.muted }]}>{value || '›'}</Text>
    </TouchableOpacity>
  );
}

export function ChatScreen({ route, navigation }: ChatProps) {
  const { chats, setChats, isDark } = useAppContext();
  const palette = colors(isDark);
  const [draft, setDraft] = useState('');
  const chat = chats.find(item => item.id === route.params.chatId);

  function sendMessage() {
    const text = draft.trim();
    if (!text || !chat) {
      return;
    }
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setChats(items =>
      items.map(item =>
        item.id === chat.id
          ? {
              ...item,
              message: `Bạn: ${text}`,
              time,
              messages: [...item.messages, { id: `${Date.now()}`, text, sender: 'me', time }],
            }
          : item,
      ),
    );
    setDraft('');
  }

  if (!chat) {
    return (
      <View style={[styles.screen, styles.chatMissing, { backgroundColor: palette.background }]}>
        <Text style={{ color: palette.text }}>Không tìm thấy cuộc trò chuyện.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.linkText, { color: palette.primary }]}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={[styles.chatHeader, { backgroundColor: palette.surface, borderBottomColor: palette.border }]}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Quay lại" onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon color={palette.text} name="back" size={24} />
          </TouchableOpacity>
          <Avatar id={chat.avatar} name={chat.name} size={42} online={chat.online} />
          <View style={styles.chatHeaderDetails}>
            <Text numberOfLines={1} style={[styles.personName, { color: palette.text }]}>{chat.name}</Text>
            <Text style={[styles.contactStatus, { color: chat.online ? palette.green : palette.muted }]}>
              {chat.online ? '● Đang hoạt động' : 'Hoạt động gần đây'}
            </Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Gọi thoại cho ${chat.name}`}
            onPress={() => Alert.alert('Đang gọi thoại', `Đang gọi ${chat.name}...`)}
            style={[styles.chatHeaderAction, { backgroundColor: palette.primarySoft }]}>
            <Icon color={palette.primary} name="phone" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Gọi video cho ${chat.name}`}
            onPress={() => Alert.alert('Đang gọi video', `Đang gọi video cho ${chat.name}...`)}
            style={[styles.chatHeaderAction, { backgroundColor: palette.primarySoft }]}>
            <Icon color={palette.primary} name="video" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Tùy chọn cuộc trò chuyện"
            onPress={() => Alert.alert('Tùy chọn', `Cuộc trò chuyện với ${chat.name}`)}
            style={styles.headerAction}>
            <Icon color={palette.muted} name="more" size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={chat.messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          ListEmptyComponent={<EmptyState label="Hãy gửi lời chào để bắt đầu trò chuyện!" />}
          renderItem={({ item }) => {
            const mine = item.sender === 'me';
            return (
              <View style={[styles.messageLine, mine ? styles.messageLineMine : undefined]}>
                <View
                  style={[
                    styles.messageBubble,
                    mine
                      ? { backgroundColor: palette.primary }
                      : { backgroundColor: palette.surface, borderColor: palette.border, borderWidth: 1 },
                  ]}>
                  <Text style={[styles.messageText, { color: mine ? '#FFFFFF' : palette.text }]}>{item.text}</Text>
                  <Text style={[styles.messageTime, { color: mine ? '#E0DEFF' : palette.muted }]}>{item.time}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={[styles.composer, { backgroundColor: palette.surface, borderTopColor: palette.border }]}>
          <TextInput
            accessibilityLabel="Nhập tin nhắn"
            multiline
            onChangeText={setDraft}
            onSubmitEditing={sendMessage}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={palette.muted}
            style={[styles.messageInput, { backgroundColor: palette.raised, color: palette.text }]}
            value={draft}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Gửi tin nhắn"
            disabled={!draft.trim()}
            onPress={sendMessage}
            style={[
              styles.sendButton,
              { backgroundColor: draft.trim() ? palette.primary : palette.raised },
            ]}>
            <Icon color={draft.trim() ? '#FFFFFF' : palette.muted} name="send" size={17} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
  },
  brand: { fontSize: 9, fontWeight: '800', letterSpacing: 1.15, marginBottom: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.35 },
  avatarFallback: { alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontWeight: '700' },
  onlineDot: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: '#13A76A',
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: 14,
    flexDirection: 'row',
    height: 46,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 13,
  },
  searchGlyph: { fontSize: 25, marginRight: 9, marginTop: -5 },
  searchInput: { flex: 1, fontSize: 13, height: '100%', paddingVertical: 0 },
  clearSearch: { fontSize: 23, paddingLeft: 8 },
  listSectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 7,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionMeta: { fontSize: 11 },
  listContent: { paddingHorizontal: 16, paddingBottom: 82, flexGrow: 1 },
  chatRow: { alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', minHeight: 75, paddingVertical: 10 },
  rowDetails: { flex: 1, marginLeft: 12, minWidth: 0 },
  rowTopLine: { alignItems: 'center', flexDirection: 'row', marginBottom: 5 },
  personName: { flex: 1, fontSize: 13, fontWeight: '700', marginRight: 8 },
  rowTime: { fontSize: 9, fontWeight: '600' },
  rowBottomLine: { alignItems: 'center', flexDirection: 'row' },
  preview: { flex: 1, fontSize: 11, marginRight: 8 },
  unreadPreview: { fontWeight: '600' },
  unreadBadge: { alignItems: 'center', borderRadius: 9, height: 18, justifyContent: 'center', minWidth: 18, paddingHorizontal: 5 },
  unreadText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
  empty: { fontSize: 13, padding: 30, textAlign: 'center' },
  composeButton: {
    alignItems: 'center',
    borderRadius: 28,
    bottom: 18,
    elevation: 5,
    height: 54,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 54,
  },
  composeGlyph: { color: '#FFFFFF', fontSize: 25, fontWeight: '500', marginTop: -3 },
  loginContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 24 },
  loginBrand: { alignItems: 'center', marginBottom: 24 },
  logoMark: { alignItems: 'center', borderRadius: 17, elevation: 3, height: 58, justifyContent: 'center', marginBottom: 13, width: 58 },
  logoGlyph: { fontSize: 30, fontWeight: '900' },
  loginTitle: { fontSize: 27, fontWeight: '800', letterSpacing: -0.7 },
  loginSubtitle: { fontSize: 12, marginTop: 5 },
  loginCard: { borderRadius: 14, elevation: 3, padding: 16 },
  fieldLabel: { fontSize: 11, fontWeight: '700', marginBottom: 7 },
  loginInput: { borderRadius: 11, fontSize: 13, height: 46, marginBottom: 15, paddingHorizontal: 13 },
  passwordLabelRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  linkText: { fontSize: 11, fontWeight: '600' },
  passwordInputBox: { alignItems: 'center', borderRadius: 11, flexDirection: 'row', height: 46, marginBottom: 8, paddingHorizontal: 12 },
  passwordInput: { flex: 1, fontSize: 13, height: '100%', paddingVertical: 0 },
  rememberRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  rememberLabel: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  bodyText: { fontSize: 11 },
  errorText: { color: '#C83E4D', fontSize: 12, marginBottom: 10 },
  primaryButton: { alignItems: 'center', borderRadius: 11, height: 46, justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  loginFooter: { fontSize: 11, marginTop: 15, textAlign: 'center' },
  contactLetter: { fontSize: 13, fontWeight: '800', marginBottom: 2, marginTop: 8 },
  contactRow: { alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', minHeight: 69 },
  contactPressable: { alignItems: 'center', flex: 1, flexDirection: 'row', paddingVertical: 9 },
  contactText: { flex: 1, marginLeft: 12 },
  contactStatus: { fontSize: 10, marginTop: 4 },
  contactAction: { alignItems: 'center', height: 42, justifyContent: 'center', width: 38 },
  notificationHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 3, paddingBottom: 12 },
  headingTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  notificationTitle: { fontSize: 18, fontWeight: '700' },
  countPill: { alignItems: 'center', borderRadius: 10, height: 18, justifyContent: 'center', minWidth: 18, paddingHorizontal: 4 },
  markAllText: { fontSize: 10, fontWeight: '600' },
  notificationList: { paddingHorizontal: 13, paddingBottom: 20, flexGrow: 1 },
  notificationCard: { alignItems: 'flex-start', borderRadius: 12, borderWidth: 1, flexDirection: 'row', marginBottom: 9, minHeight: 94, padding: 10 },
  notificationIcon: { alignItems: 'center', borderRadius: 19, height: 38, justifyContent: 'center', width: 38 },
  notificationDetails: { flex: 1, marginLeft: 9, minWidth: 0 },
  notificationTopLine: { alignItems: 'center', flexDirection: 'row', marginBottom: 4 },
  notificationName: { flex: 1, fontSize: 11, fontWeight: '700', marginRight: 5 },
  notificationBody: { fontSize: 10, lineHeight: 15 },
  notificationBottom: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 },
  markReadText: { fontSize: 9, fontWeight: '600' },
  unreadDot: { borderRadius: 4, height: 7, marginLeft: 5, marginTop: 2, width: 7 },
  settingsContent: { paddingHorizontal: 14, paddingBottom: 22 },
  profileCard: { alignItems: 'center', borderRadius: 13, flexDirection: 'row', marginBottom: 12, padding: 13 },
  profileDetails: { flex: 1, marginLeft: 12 },
  profileName: { fontSize: 14, fontWeight: '700' },
  profileEmail: { fontSize: 10, marginTop: 4 },
  profilePhone: { fontSize: 10, marginTop: 3 },
  settingsCard: { borderRadius: 13, marginBottom: 14, paddingHorizontal: 12 },
  settingRow: { alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-between', minHeight: 54 },
  settingLabel: { alignItems: 'center', flex: 1, flexDirection: 'row' },
  settingIcon: { alignItems: 'center', borderRadius: 16, height: 31, justifyContent: 'center', marginRight: 10, width: 31 },
  settingTitle: { fontSize: 12, fontWeight: '600' },
  settingValue: { fontSize: 11 },
  logoutButton: { alignItems: 'center', borderRadius: 10, borderWidth: 1, flexDirection: 'row', height: 43, justifyContent: 'center' },
  logoutText: { fontSize: 13, fontWeight: '700', marginLeft: 8 },
  versionText: { fontSize: 9, marginTop: 10, textAlign: 'center' },
  chatHeader: { alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', minHeight: 63, paddingHorizontal: 10 },
  backButton: { alignItems: 'center', justifyContent: 'center', width: 32 },
  backGlyph: { fontSize: 34, lineHeight: 38, marginTop: -4 },
  chatHeaderDetails: { flex: 1, marginLeft: 10 },
  headerAction: { alignItems: 'center', justifyContent: 'center', width: 36 },
  chatHeaderAction: { alignItems: 'center', borderRadius: 18, height: 34, justifyContent: 'center', marginLeft: 3, width: 34 },
  markAllButton: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  messageList: { flexGrow: 1, justifyContent: 'flex-end', padding: 16 },
  messageLine: { alignItems: 'flex-start', marginVertical: 5 },
  messageLineMine: { alignItems: 'flex-end' },
  messageBubble: { borderRadius: 15, maxWidth: '82%', paddingHorizontal: 12, paddingVertical: 8 },
  messageText: { fontSize: 13, lineHeight: 19 },
  messageTime: { alignSelf: 'flex-end', fontSize: 9, marginTop: 3 },
  composer: { alignItems: 'flex-end', borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: 9, paddingHorizontal: 12, paddingVertical: 9 },
  messageInput: { borderRadius: 20, flex: 1, fontSize: 13, maxHeight: 100, minHeight: 42, paddingHorizontal: 15, paddingVertical: 10 },
  sendButton: { alignItems: 'center', borderRadius: 22, height: 42, justifyContent: 'center', width: 42 },
  chatMissing: { alignItems: 'center', justifyContent: 'center', gap: 12 },
});
