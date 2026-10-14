const React = require('react');
const { View } = require('react-native');

const names = [
  'Bell',
  'Check',
  'CheckCheck',
  'ChevronLeft',
  'ChevronRight',
  'Eye',
  'EyeOff',
  'Globe2',
  'ImagePlus',
  'Languages',
  'LockKeyhole',
  'LogOut',
  'MessageCircle',
  'Moon',
  'MoreHorizontal',
  'Phone',
  'Search',
  'Send',
  'Settings',
  'ShieldCheck',
  'Sparkles',
  'SquarePen',
  'UsersRound',
  'Video',
  'Vibrate',
  'X',
];

module.exports = Object.fromEntries(
  names.map(name => [
    name,
    props =>
      React.createElement(View, {
        ...props,
        accessibilityLabel: `icon-${name}`,
      }),
  ]),
);
