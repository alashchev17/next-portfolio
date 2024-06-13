import { ACCEPTED_IMAGE_MIME_TYPES } from '@/constants'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkFileType(file: File) {
  // file type checking
  if (ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type)) {
    return true
  }
  return false
}
