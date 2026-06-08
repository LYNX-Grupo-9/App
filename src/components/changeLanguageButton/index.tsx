import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import i18n from '@/src/i18n';

export function LanguageToggle() {
    const { i18n: { language } } = useTranslation();

    const isPt = language.startsWith('en');

    function toggle() {
      i18n.changeLanguage(isPt ? 'pt' : 'en');
    }

  return (
    <TouchableOpacity onPress={toggle} style={styles.btn}>
      <Text style={styles.text}>{isPt ? 'EN' : 'PT'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0F6E56',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F6E56',
  },
});