'use client';

import { useLangStore } from '../store/lang-store';
import { translations } from '../i18n/translations';

/**
 * Returns the translation object for the currently selected language.
 * Usage: const t = useT();  then  t.nav.login
 */
export function useT() {
  const lang = useLangStore((s) => s.lang);
  return translations[lang];
}
