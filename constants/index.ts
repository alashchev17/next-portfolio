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
