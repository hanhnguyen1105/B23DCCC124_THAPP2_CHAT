import {
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Globe2,
  ImagePlus,
  Languages,
  LockKeyhole,
  LogOut,
  LucideIcon,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Phone,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  SquarePen,
  UsersRound,
  Video,
  Vibrate,
  X,
} from 'lucide-react-native';

export const icons = {
  bell: Bell,
  check: Check,
  checkAll: CheckCheck,
  back: ChevronLeft,
  next: ChevronRight,
  eye: Eye,
  eyeOff: EyeOff,
  globe: Globe2,
  image: ImagePlus,
  language: Languages,
  lock: LockKeyhole,
  logout: LogOut,
  message: MessageCircle,
  moon: Moon,
  more: MoreHorizontal,
  phone: Phone,
  search: Search,
  send: Send,
  settings: Settings,
  shield: ShieldCheck,
  sparkles: Sparkles,
  compose: SquarePen,
  contacts: UsersRound,
  video: Video,
  vibration: Vibrate,
  close: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  size = 20,
  color = '#5145E5',
  strokeWidth = 2,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const Component = icons[name];
  return <Component color={color} size={size} strokeWidth={strokeWidth} />;
}
