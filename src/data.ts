export type ChatMessage = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
};

export type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: number;
  unreadCount: number;
  online: boolean;
  messages: ChatMessage[];
};

export type Contact = {
  id: string;
  chatId: string;
  name: string;
  avatar: number;
  online: boolean;
  lastActive?: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  avatar?: number;
  read: boolean;
  kind: 'message' | 'call' | 'group' | 'system';
};

export const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Hoàng Yến',
    message: 'Chị vừa xem qua bản prototype mới, góp ý nhé!',
    time: '10:42',
    avatar: 47,
    unreadCount: 3,
    online: true,
    messages: [
      { id: '1-1', text: 'Chào Yến, bạn xem bản prototype mới chưa?', sender: 'me', time: '10:38' },
      { id: '1-2', text: 'Chị vừa xem qua bản prototype mới, góp ý nhé!', sender: 'them', time: '10:42' },
    ],
  },
  {
    id: '2',
    name: 'Nova Design Squad 🎨',
    message: 'Minh Triết: Đã cập nhật spec token cho team rồi',
    time: '09:15',
    avatar: 12,
    unreadCount: 5,
    online: false,
    messages: [
      { id: '2-1', text: 'Mọi người xem giúp mình bản cập nhật nhé.', sender: 'them', time: '09:02' },
      { id: '2-2', text: 'Đã cập nhật spec token cho team rồi', sender: 'them', time: '09:15' },
    ],
  },
  {
    id: '3',
    name: 'Trần Minh Triết',
    message: 'Tin nhắn thoại (0:45)',
    time: '08:30',
    avatar: 68,
    unreadCount: 1,
    online: true,
    messages: [
      { id: '3-1', text: 'Mình gửi bạn một tin nhắn thoại nhé.', sender: 'them', time: '08:30' },
    ],
  },
  {
    id: '4',
    name: 'Lê Thu Hương',
    message: 'Đã gửi 2 hình ảnh layout mới',
    time: 'Hôm qua',
    avatar: 44,
    unreadCount: 0,
    online: false,
    messages: [
      { id: '4-1', text: 'Đã gửi 2 hình ảnh layout mới', sender: 'them', time: 'Hôm qua' },
    ],
  },
  {
    id: '5',
    name: 'Dự án Nova Chat App 2.0',
    message: 'Bạn: File Figma components hệ thống đã sẵn sàng',
    time: 'Hôm qua',
    avatar: 15,
    unreadCount: 0,
    online: false,
    messages: [
      { id: '5-1', text: 'File Figma components hệ thống đã sẵn sàng', sender: 'me', time: 'Hôm qua' },
    ],
  },
  {
    id: '6',
    name: 'Nguyễn Đức Nam',
    message: 'Cuối tuần này có ghé quán cafe Acoustic không?',
    time: 'Thứ Hai',
    avatar: 53,
    unreadCount: 0,
    online: true,
    messages: [
      { id: '6-1', text: 'Cuối tuần này có ghé quán cafe Acoustic không?', sender: 'them', time: 'Thứ Hai' },
    ],
  },
  {
    id: '7',
    name: 'Phan Lan Chi',
    message: 'Cảm ơn bạn nhiều nha! Mình nhận được rồi',
    time: '15/05',
    avatar: 49,
    unreadCount: 0,
    online: false,
    messages: [
      { id: '7-1', text: 'Cảm ơn bạn nhiều nha! Mình nhận được rồi', sender: 'them', time: '15/05' },
    ],
  },
  {
    id: '8',
    name: 'Bảo Châu',
    message: 'Hẹn gặp bạn vào ngày mai nhé!',
    time: 'Thứ Hai',
    avatar: 32,
    unreadCount: 0,
    online: true,
    messages: [
      { id: '8-1', text: 'Hẹn gặp bạn vào ngày mai nhé!', sender: 'them', time: 'Thứ Hai' },
    ],
  },
];

export const initialContacts: Contact[] = [
  { id: 'contact-1', chatId: 'contact-1', name: 'An Nhiên', avatar: 44, online: true },
  { id: 'contact-2', chatId: 'contact-2', name: 'Anh Tuấn', avatar: 12, online: false, lastActive: 'Hoạt động 15 phút trước' },
  { id: 'contact-3', chatId: '8', name: 'Bảo Châu', avatar: 32, online: true },
  { id: 'contact-4', chatId: 'contact-4', name: 'Bích Phương', avatar: 49, online: false, lastActive: 'Ngoại tuyến' },
  { id: 'contact-5', chatId: 'contact-5', name: 'Hải Đăng', avatar: 68, online: true },
  { id: 'contact-6', chatId: 'contact-6', name: 'Hoàng Nam', avatar: 53, online: false, lastActive: 'Hoạt động 2 giờ trước' },
  { id: 'contact-7', chatId: '1', name: 'Hoàng Yến', avatar: 47, online: true },
  { id: 'contact-8', chatId: '4', name: 'Lê Thu Hương', avatar: 44, online: false, lastActive: 'Hoạt động hôm qua' },
  { id: 'contact-9', chatId: '6', name: 'Nguyễn Đức Nam', avatar: 53, online: true },
  { id: 'contact-10', chatId: '3', name: 'Trần Minh Triết', avatar: 68, online: true },
  { id: 'contact-11', chatId: 'contact-11', name: 'Thùy Trang', avatar: 49, online: true },
];

export const initialNotifications: AppNotification[] = [
  {
    id: '1',
    title: 'Lan Anh đã gửi lời mời kết bạn',
    body: '“Chào bạn, mình thấy bạn qua nhóm React Native & Design System Hà Nội. Kết bạn nhé!”',
    time: '5 phút trước',
    avatar: 47,
    read: false,
    kind: 'message',
  },
  {
    id: '2',
    title: 'Cuộc gọi video nhỡ từ Trần Minh Triết',
    body: 'Đã nhỡ cuộc gọi trực tiếp kéo dài chuông lúc 14:18.',
    time: '32 phút trước',
    avatar: 68,
    read: false,
    kind: 'call',
  },
  {
    id: '3',
    title: 'Nhóm Team Mobile UI/UX',
    body: 'Hoàng Nam: @All file Figma prototype v2.4 đã sẵn sàng để dev review nhé anh em!',
    time: '1 giờ trước',
    avatar: 12,
    read: false,
    kind: 'group',
  },
  {
    id: '4',
    title: 'Cảnh báo đăng nhập thiết bị mới',
    body: 'Tài khoản của bạn đã đăng nhập từ iPhone 15 Pro tại Hà Nội. Vui lòng kiểm tra nếu không phải bạn.',
    time: '4 giờ trước',
    read: true,
    kind: 'system',
  },
  {
    id: '5',
    title: 'Quốc Bảo đã mời bạn vào nhóm',
    body: 'Nhóm trao đổi kinh nghiệm chụp ảnh film và mirrorless tại Việt Nam.',
    time: 'Hôm qua lúc 19:42',
    avatar: 32,
    read: true,
    kind: 'group',
  },
  {
    id: '6',
    title: 'NovaChat v3.2.0 đã cập nhật',
    body: 'Bổ sung gửi ảnh chất lượng HD cùng nhiều cải tiến ổn định và bảo mật.',
    time: '2 ngày trước',
    read: true,
    kind: 'system',
  },
];
