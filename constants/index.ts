export const userAvatarLinksToMap = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/dashboard',
    isPrivate: true,
    role: ['Admin', 'Moderator', 'User'],
  },
  {
    id: 2,
    label: '> Projects',
    href: '/dashboard/projects',
    isPrivate: true,
    role: ['Admin', 'Moderator'],
  },
  {
    id: 3,
    label: '> Skills',
    href: '/dashboard/skills',
    isPrivate: true,
    role: ['Admin'],
  },
  {
    id: 4,
    label: 'Login',
    href: '/login',
    isPrivate: false,
  },
]

export const MAX_IMAGE_FILE_SIZE = 1024 * 1024 * 5
export const ACCEPTED_IMAGE_MIME_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

export const DASHBOARD_STATISTICS_ITEMS = {
  titles: ['Projects', 'Skillsets', 'Experiences (coming soon)'],
  descriptions: [
    'Statistics for amount of existing projects',
    'Statistics for amount of existing skillsets',
    'Statistics for amount of existing experiences',
  ],
  links: ['/dashboard/projects', '/dashboard/skills', '/dashboard/experiences'],
}
export const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/
