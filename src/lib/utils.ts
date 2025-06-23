import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num)
}

// Format blocks' timestamp to a readable date
export function formatDate(timestamp: number) {
  // Bitcoin timestamps are in seconds since UNIX epoch
  const date = new Date(timestamp * 1000)

  // Format date with more readable output
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function shortenHash(hash?: string, length = 8) {
  if (!hash) return "Unknown";
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`
}

export function copyToClipboard(text: string, message: { title: string; description: string }) {
  navigator.clipboard.writeText(text)
  toast(message.title, {
    description: message.description
  })
}
