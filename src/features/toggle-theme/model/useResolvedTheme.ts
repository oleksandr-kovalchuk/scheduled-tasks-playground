import { DARK_COLOR_SCHEME_QUERY, type Theme } from '@/features/toggle-theme/model/theme'
import { useThemeStore } from '@/features/toggle-theme/model/themeStore'
import { useMediaQuery } from '@/shared/lib/useMediaQuery'

export function useResolvedTheme(): Theme {
  const theme = useThemeStore((state) => state.theme)
  const prefersDark = useMediaQuery(DARK_COLOR_SCHEME_QUERY)

  if (theme) return theme
  return prefersDark ? 'dark' : 'light'
}
