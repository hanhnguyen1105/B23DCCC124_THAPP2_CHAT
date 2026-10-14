import { ImageSourcePropType } from 'react-native';

const portraits = [
  require('./assets/avatars/portrait-1.jpg'),
  require('./assets/avatars/portrait-2.jpg'),
  require('./assets/avatars/portrait-3.jpg'),
  require('./assets/avatars/portrait-4.jpg'),
  require('./assets/avatars/portrait-5.jpg'),
  require('./assets/avatars/portrait-6.jpg'),
] satisfies ImageSourcePropType[];

export function avatarSource(id = 1): ImageSourcePropType {
  const index = Math.abs(Math.trunc(id)) % portraits.length;
  return portraits[index];
}
