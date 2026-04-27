import { Tabs } from 'expo-router';
import { Home, MessageSquare, User } from 'lucide-react-native';
import { useContext } from 'react';
import { View } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { LAWYERS } from '../../src/constants/data';
import { ReadStatusContext } from '../../src/context/ReadStatusContext';
import { common } from '../../src/styles/common';

// Small unread badge shown on the Messages tab icon
const UnreadBadge = () => {
  const { readIds } = useContext(ReadStatusContext);
  const count = LAWYERS.filter((l) => !readIds.includes(l.id)).length;
  if (count === 0) return null;
  return (
    <View
      style={[
        common.badge,
        { width: 16, height: 16, borderRadius: 8, position: 'absolute', top: -4, right: -8 },
      ]}
    />
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.teal,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: { borderTopColor: COLORS.grayBorder },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Mensagens',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MessageSquare color={color} size={size} />
              <UnreadBadge />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
