import { expect, describe, it, vi, beforeEach } from 'vitest'
import { formatBytes, formatNumber, formatDate, shortenHash, copyToClipboard } from '@/lib/utils/string.utils'

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: vi.fn()
}))

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve())
  }
})

describe('formatBytes', () => {
  it('should format zero bytes', () => {
    expect(formatBytes(0)).toBe('0 Bytes')
  })

  it('should format bytes with default 2 decimals', () => {
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1536)).toBe('1.5 KB')
    expect(formatBytes(1048576)).toBe('1 MB')
    expect(formatBytes(1073741824)).toBe('1 GB')
  })

  it('should format bytes with custom decimals', () => {
    expect(formatBytes(1536, 0)).toBe('2 KB')
    expect(formatBytes(1536, 1)).toBe('1.5 KB')
    expect(formatBytes(1536, 3)).toBe('1.5 KB')
    expect(formatBytes(1536, 4)).toBe('1.5 KB')
  })

  it('should handle negative decimals', () => {
    expect(formatBytes(1536, -1)).toBe('2 KB')
    expect(formatBytes(1536, -5)).toBe('2 KB')
  })

  it('should format large file sizes', () => {
    expect(formatBytes(1099511627776)).toBe('1 TB')
    expect(formatBytes(1125899906842624)).toBe('1 PB')
  })

  it('should handle small byte values', () => {
    expect(formatBytes(1)).toBe('1 Bytes')
    expect(formatBytes(512)).toBe('512 Bytes')
    expect(formatBytes(1023)).toBe('1023 Bytes')
  })

  it('should format fractional results correctly', () => {
    expect(formatBytes(1536, 2)).toBe('1.5 KB')
    expect(formatBytes(2560, 2)).toBe('2.5 KB')
    expect(formatBytes(1572864, 2)).toBe('1.5 MB')
  })
})

describe('formatNumber', () => {
  it('should format numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000')
    expect(formatNumber(1000000)).toBe('1,000,000')
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('should handle small numbers', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(1)).toBe('1')
    expect(formatNumber(999)).toBe('999')
  })

  it('should handle negative numbers', () => {
    expect(formatNumber(-1000)).toBe('-1,000')
    expect(formatNumber(-1234567)).toBe('-1,234,567')
  })

  it('should handle decimal numbers', () => {
    expect(formatNumber(1000.5)).toBe('1,000.5')
    expect(formatNumber(1234567.89)).toBe('1,234,567.89')
  })

  it('should handle very large numbers', () => {
    expect(formatNumber(1000000000)).toBe('1,000,000,000')
    expect(formatNumber(1234567890123)).toBe('1,234,567,890,123')
  })
})

describe('formatDate', () => {
  it('should format Unix timestamps correctly', () => {
    // January 1, 2020 00:00:00 UTC
    const timestamp = 1577836800
    const result = formatDate(timestamp)

    // The result shows local time, so it might be Dec 31, 2019 in some timezones
    expect(result).toMatch(/(2019|2020)/)
    expect(result).toMatch(/(Dec|Jan)/)
    expect(result).toMatch(/(31|1)/)
  })

  it('should format different timestamps', () => {
    // December 31, 2023 23:59:59 UTC
    const timestamp = 1704067199
    const result = formatDate(timestamp)

    expect(result).toMatch(/2023/)
    expect(result).toMatch(/Dec/)
    expect(result).toMatch(/31/)
  })

  it('should handle zero timestamp (Unix epoch)', () => {
    const timestamp = 0
    const result = formatDate(timestamp)

    // Unix epoch in local time might show as Dec 31, 1969 depending on timezone
    expect(result).toMatch(/(1969|1970)/)
    expect(result).toMatch(/(Dec|Jan)/)
    expect(result).toMatch(/(31|1)/)
  })

  it('should include time components', () => {
    const timestamp = 1577836800 // Known timestamp
    const result = formatDate(timestamp)

    // Should include hours, minutes, seconds
    expect(result).toMatch(/\d{1,2}:\d{2}:\d{2}/)
  })
})

describe('shortenHash', () => {
  it('should shorten hash with default length', () => {
    const hash = 'abcdefghijklmnopqrstuvwxyz1234567890'
    const result = shortenHash(hash)

    expect(result).toBe('abcdefgh...34567890')
    expect(result.length).toBe(19) // 8 + 3 + 8 (last 8 chars)
  })

  it('should shorten hash with custom length', () => {
    const hash = 'abcdefghijklmnopqrstuvwxyz1234567890'
    const result = shortenHash(hash, 4)

    expect(result).toBe('abcd...7890')
    expect(result.length).toBe(11) // 4 + 3 + 4
  })

  it('should handle undefined hash', () => {
    expect(shortenHash(undefined)).toBe('Unknown')
    expect(shortenHash()).toBe('Unknown')
  })

  it('should handle empty string', () => {
    expect(shortenHash('')).toBe('Unknown')
  })

  it('should handle short hashes', () => {
    const hash = 'abc123'
    const result = shortenHash(hash, 8)

    // For very short strings, it might show the whole string or handle gracefully
    expect(result).toBe('abc123...abc123')
  })

  it('should handle very long length parameter', () => {
    const hash = 'abcdefghijklmnop'
    const result = shortenHash(hash, 20)

    // Should handle cases where length > hash.length/2
    expect(result).toContain('...')
  })

  it('should handle Bitcoin-like hashes', () => {
    const btcHash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
    const result = shortenHash(btcHash)

    expect(result).toBe('00000000...0a8ce26f')
    expect(result.length).toBe(19) // 8 + 3 + 8 (last 8 chars)
  })
})

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should copy text to clipboard and show toast', async () => {
    const text = 'test text'
    const message = {
      title: 'Copied!',
      description: 'Text copied to clipboard'
    }

    const { toast } = await import('sonner')

    copyToClipboard(text, message)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    expect(toast).toHaveBeenCalledWith(message.title, {
      description: message.description
    })
  })

  it('should handle long text', async () => {
    const longText = 'a'.repeat(1000)
    const message = {
      title: 'Success',
      description: 'Long text copied'
    }

    const { toast } = await import('sonner')

    copyToClipboard(longText, message)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(longText)
    expect(toast).toHaveBeenCalledWith(message.title, {
      description: message.description
    })
  })

  it('should handle empty text', async () => {
    const text = ''
    const message = {
      title: 'Copied',
      description: 'Empty text copied'
    }

    const { toast } = await import('sonner')

    copyToClipboard(text, message)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('')
    expect(toast).toHaveBeenCalledWith(message.title, {
      description: message.description
    })
  })

  it('should handle special characters', async () => {
    const text = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const message = {
      title: 'Special chars copied',
      description: 'Special characters copied to clipboard'
    }

    const { toast } = await import('sonner')

    copyToClipboard(text, message)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    expect(toast).toHaveBeenCalledWith(message.title, {
      description: message.description
    })
  })

  it('should handle Bitcoin addresses and hashes', async () => {
    const btcAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    const message = {
      title: 'Address Copied',
      description: 'Bitcoin address copied to clipboard'
    }

    const { toast } = await import('sonner')

    copyToClipboard(btcAddress, message)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(btcAddress)
    expect(toast).toHaveBeenCalledWith(message.title, {
      description: message.description
    })
  })
})
