import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';

import { common } from '../../styles/common';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder,
}: Props) {
  return (
    <View style={common.inputBar}>
      <Search color="#AAA" size={18} />
      <TextInput
        placeholder={placeholder}
        style={common.input}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#AAA"
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <X color="#AAA" size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
}