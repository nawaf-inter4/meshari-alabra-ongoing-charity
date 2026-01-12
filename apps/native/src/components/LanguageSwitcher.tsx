import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  { code: "ar", name: "العربية", flag: "sa" },
  { code: "en", name: "English", flag: "us" },
  { code: "ur", name: "اردو", flag: "pk" },
  { code: "tr", name: "Türkçe", flag: "tr" },
  { code: "id", name: "Indonesia", flag: "id" },
  { code: "ms", name: "Melayu", flag: "my" },
  { code: "bn", name: "বাংলা", flag: "bd" },
  { code: "fr", name: "Français", flag: "fr" },
  { code: "zh", name: "中文", flag: "cn" },
  { code: "it", name: "Italiano", flag: "it" },
  { code: "ja", name: "日本語", flag: "jp" },
  { code: "ko", name: "한국어", flag: "kr" }
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[styles.button, { backgroundColor: colors.secondary }]}
      >
        <Text style={[styles.flag, { color: colors.foreground }]}>
          {currentLanguage.name.substring(0, 2)}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.foreground} />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <ScrollView>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => {
                    setLocale(lang.code);
                    setIsOpen(false);
                  }}
                  style={[
                    styles.languageItem,
                    locale === lang.code && { backgroundColor: colors.gold, opacity: 0.8 },
                  ]}
                >
                  <Text
                    style={[
                      styles.languageText,
                      { color: locale === lang.code ? '#0F172A' : colors.foreground },
                    ]}
                  >
                    {lang.name}
                  </Text>
                  {locale === lang.code && (
                    <Ionicons name="checkmark" size={20} color="#0F172A" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    gap: 4,
  },
  flag: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    borderRadius: 12,
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  languageText: {
    fontSize: 16,
  },
});
