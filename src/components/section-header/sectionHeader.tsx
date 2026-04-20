import React from 'react';
import { View, Text } from 'react-native';
import { Bell } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';
import GoBackButton from '../go-back/goback';

export default function SectionHeader() {
  return (
    <View style={common.headerSimple}>
      <GoBackButton />

      <Text style={common.screenTitle}>
        Rescisão trabalhista ...
      </Text>

      <Bell color={COLORS.navy} size={24} />
    </View>
  );
}