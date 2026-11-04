import type { Translation } from '@/shared/i18n/translation'

export const uk = {
  app: {
    name: 'Scheduled Tasks Playground',
    documentTitle: 'Завдання · Scheduled Tasks Playground',
  },
  tasksPage: {
    heading: 'Завдання',
    description:
      'Невеликий застосунок, який отримує нові функції по одній. Кожна з них приходить як пул-реквест від запланованого завдання Claude.',
  },
  taskList: {
    label: 'Завдання',
    emptyTitle: 'Завдань ще немає',
    emptyHint: 'Додайте перше завдання в полі вище.',
    // Phrased around a colon to avoid plural forms of "active", which Ukrainian inflects by number.
    summary: 'Активних: {{active}} з {{total}}',
  },
  taskTitle: {
    required: 'Вкажіть назву завдання',
    tooLong: 'Не більше {{max}} символів',
  },
  addTask: {
    inputLabel: 'Назва завдання',
    placeholder: 'Що потрібно зробити?',
    submit: 'Додати',
  },
  editTask: {
    inputLabel: 'Редагувати «{{title}}»',
    hint: 'Двічі клацніть, щоб редагувати',
  },
  deleteTask: {
    label: 'Видалити «{{title}}»',
  },
  toggleTask: {
    markCompleted: 'Позначити «{{title}}» як виконане',
    markActive: 'Позначити «{{title}}» як активне',
  },
  filterTasks: {
    label: 'Фільтр завдань',
    all: 'Усі',
    active: 'Активні',
    completed: 'Виконані',
  },
  clearCompleted: {
    label: 'Очистити виконані',
  },
  toggleTheme: {
    switchToLight: 'Увімкнути світлу тему',
    switchToDark: 'Увімкнути темну тему',
  },
  switchLanguage: {
    label: 'Мова',
  },
} satisfies Translation
