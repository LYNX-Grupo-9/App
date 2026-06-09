import React from 'react';
import { Text, View } from 'react-native';
import { common } from '../../styles/common';
import GoBackButton from '../go-back/goback';

export default function SectionHeader({ title }: { title: string }) {
  return (
    <View style={[common.headerSimple, {display: 'flex', flexDirection: 'row', width: '100%', justifyContent: "space-between"}]}>
      <GoBackButton />
      <Text style={[common.screenTitle, {width: 350}]} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );
}