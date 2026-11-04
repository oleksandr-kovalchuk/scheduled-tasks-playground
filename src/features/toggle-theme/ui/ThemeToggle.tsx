import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/features/toggle-theme/model/themeStore'
import { useResolvedTheme } from '@/features/toggle-theme/model/useResolvedTheme'
import { Button } from '@/shared/ui/Button'

export function ThemeToggle() {
  const { t } = useTranslation()
  const theme = useResolvedTheme()
  const setTheme = useThemeStore((state) => state.setTheme)
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t(isDark ? 'toggleTheme.switchToLight' : 'toggleTheme.switchToDark')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun aria-hidden className="size-4" /> : <Moon aria-hidden className="size-4" />}
    </Button>
  )
}
