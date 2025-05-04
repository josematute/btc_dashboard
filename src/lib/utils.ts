import { clsx, type ClassValue } from "clsx"
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

export function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString()
}

export function shortenHash(hash: string, length = 8) {
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`
}
