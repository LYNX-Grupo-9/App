import React from 'react';
import { View, Text } from 'react-native';

import { common } from '../../styles/common';

type Props = {
  status?: string;
  createdAt?: string;
};

export default function CaseHeader({ status, createdAt }: Props) {
  return (
    <View style={common.rowSpaced}>
      <View style={getStatusStyle(status)}>
        <Text style={getStatusTextStyle(status)}>
          {formatStatus(status)}
        </Text>
      </View>

      <Text style={common.dateText}>
        {formatDate(createdAt)}
      </Text>
    </View>
  );
}

function normalizeStatus(status?: string) {
  return status
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('_', ' ')
    .toLowerCase() ?? '';
}

function getStatusStyle(status?: string) {
  const value = normalizeStatus(status);

  if (value.includes('cancelado')) return common.tagStatusRed;
  if (value.includes('finalizado')) return common.tagStatusGray;
  if (value.includes('andamento')) return common.tagStatusYellow;
  if (value.includes('analise')) return common.tagStatusBlue;
  if (value.includes('aberto')) return common.tagStatusGreen;

  return common.tagStatusGreen;
}

function getStatusTextStyle(status?: string) {
  const value = normalizeStatus(status);

  if (value.includes('cancelado')) return common.tagStatusTextRed;
  if (value.includes('finalizado')) return common.tagStatusTextGray;
  if (value.includes('andamento')) return common.tagStatusTextYellow;
  if (value.includes('analise')) return common.tagStatusTextBlue;
  if (value.includes('aberto')) return common.tagStatusTextGreen;

  return common.tagStatusTextGreen;
}

function formatStatus(status?: string) {
  if (!status) return 'EM ABERTO';

  return status.replace('_', ' ').toUpperCase();
}

function formatDate(date?: string) {
  if (!date) return 'Data não informada';

  const d = new Date(`${date}T00:00:00`);

  return `Protocolado em ${d.getDate()} ${getMonth(d.getMonth())}.`;
}

function getMonth(month: number) {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  return months[month];
}