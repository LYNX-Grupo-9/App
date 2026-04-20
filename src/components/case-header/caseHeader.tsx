import React from 'react';
import { View, Text } from 'react-native';
import { common } from '../../styles/common';

export default function CaseHeader() {
  return (
    <View style={common.rowSpaced}>
      <View style={common.tagStatusGreen}>
        <Text style={common.tagStatusText}>ATIVO</Text>
      </View>

      <Text style={common.dateText}>
        Protocolado em 12 Out.
      </Text>
    </View>
  );
}