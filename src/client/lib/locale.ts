// From https://www.heroui.com/docs/api-references/heroui-provider
const heroUiSupportedLocales = [
  "fr-FR",
  "fr-CA",
  "de-DE",
  "en-US",
  "en-GB",
  "ja-JP",
  "da-DK",
  "nl-NL",
  "fi-FI",
  "it-IT",
  "nb-NO",
  "es-ES",
  "sv-SE",
  "pt-BR",
  "zh-CN",
  "zh-TW",
  "ko-KR",
  "bg-BG",
  "hr-HR",
  "cs-CZ",
  "et-EE",
  "hu-HU",
  "lv-LV",
  "lt-LT",
  "pl-PL",
  "ro-RO",
  "ru-RU",
  "sr-SP",
  "sk-SK",
  "sl-SI",
  "tr-TR",
  "uk-UA",
  "ar-AE",
  "ar-DZ",
  "AR-EG",
  "ar-SA",
  "el-GR",
  "he-IL",
  "fa-AF",
  "am-ET",
  "hi-IN",
  "th-TH",
];

export const getHeroUiLocale = () => {
  const browserLocale = navigator.language;

  return heroUiSupportedLocales.includes(browserLocale)
    ? browserLocale
    : "en-GB";
};
