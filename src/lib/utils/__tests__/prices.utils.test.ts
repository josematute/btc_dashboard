import { expect, describe, it } from 'vitest'
import { formatCurrency, formatAssetPrice, removeNonDigitsAndCommas } from '@/lib/utils/prices.utils'

describe('formatCurrency', () => {
  it('should format basic numbers with default 2 decimals', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00')
    expect(formatCurrency(1000.5)).toBe('$1,000.50')
    expect(formatCurrency(1000.555)).toBe('$1,000.56')
  })

  it('should format with custom decimal places', () => {
    expect(formatCurrency(1000.555, 0)).toBe('$1,001')
    expect(formatCurrency(1000.555, 1)).toBe('$1,000.6')
    expect(formatCurrency(1000.555, 2)).toBe('$1,000.56')
    expect(formatCurrency(1000.555, 3)).toBe('$1,000.555')
  })

  it('should handle edge cases', () => {
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(-1000)).toBe('-$1,000.00')
    expect(formatCurrency(0.01)).toBe('$0.01')
    expect(formatCurrency(0.001)).toBe('$0.00')
  })

  it('should handle very large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
    expect(formatCurrency(1234567890.12)).toBe('$1,234,567,890.12')
  })
})

describe('formatWithCommas', () => {
  describe('basic formatting without preserveSignificantDigits', () => {
    it('should add commas to large numbers', () => {
      expect(formatAssetPrice('1000')).toBe('1,000')
      expect(formatAssetPrice('1000000')).toBe('1,000,000')
      expect(formatAssetPrice('1234567')).toBe('1,234,567')
    })

    it('should preserve decimal places', () => {
      expect(formatAssetPrice('1000.5')).toBe('1,000.5')
      expect(formatAssetPrice('1000.555')).toBe('1,000.555')
    })

    it('should handle numbers without commas needed', () => {
      expect(formatAssetPrice('100')).toBe('100')
      expect(formatAssetPrice('0.5')).toBe('0.5')
    })

    it('should handle edge cases', () => {
      expect(formatAssetPrice('')).toBe('')
      expect(formatAssetPrice('.')).toBe('.')
      expect(formatAssetPrice('0')).toBe('0')
    })
  })

  describe('with preserveSignificantDigits = true', () => {
    it('should limit large numbers to 2 decimal places', () => {
      expect(formatAssetPrice('1000.555', true)).toBe('1,000.55')
      expect(formatAssetPrice('1234567.999', true)).toBe('1,234,568')
      expect(formatAssetPrice('100.1', true)).toBe('100.1')
      expect(formatAssetPrice('100.10', true)).toBe('100.1')
    })

    it('should preserve leading zeros + first 2 non-zero digits for small numbers', () => {
      expect(formatAssetPrice('0.000930129', true)).toBe('0.00093')
      expect(formatAssetPrice('0.0234', true)).toBe('0.023')
      expect(formatAssetPrice('0.00023423432', true)).toBe('0.00023')
      expect(formatAssetPrice('0.56789', true)).toBe('0.56')
    })

    it('should handle very small numbers correctly', () => {
      expect(formatAssetPrice('0.000000021395', true)).toBe('0.000000021')
      expect(formatAssetPrice('0.0000000001', true)).toBe('0.0000000001')
      expect(formatAssetPrice('0.1', true)).toBe('0.10')
    })

    it('should handle zero and edge cases', () => {
      expect(formatAssetPrice('0', true)).toBe('0')
      expect(formatAssetPrice('0.0', true)).toBe('0')
      expect(formatAssetPrice('0.00', true)).toBe('0')
    })

    it('should handle numbers between 0.01 and 1', () => {
      expect(formatAssetPrice('0.123456', true)).toBe('0.12')
      expect(formatAssetPrice('0.99999', true)).toBe('0.99')
      expect(formatAssetPrice('0.5', true)).toBe('0.5')
    })

    it('should handle numbers with existing commas', () => {
      expect(formatAssetPrice('1,000.555', true)).toBe('1,000.55')
      expect(formatAssetPrice('1,234,567.999', true)).toBe('1,234,568')
    })

    it('should handle scientific notation edge cases', () => {
      // These test the fix for very small numbers that could become scientific notation
      expect(formatAssetPrice('0.000000000023', true)).toBe('0.000000000023')
      expect(formatAssetPrice('0.0000000000001', true)).toBe('0.0000000000001')
    })
  })

  describe('edge cases and error handling', () => {
    it('should handle invalid number strings gracefully', () => {
      expect(formatAssetPrice('abc', true)).toBe('abc')
      expect(formatAssetPrice('123abc', true)).toBe('123')
    })

    it('should preserve existing commas in invalid cases', () => {
      expect(formatAssetPrice('1,000,abc')).toBe('1,000abc')
    })

    it('should handle multiple decimal points', () => {
      expect(formatAssetPrice('1.2.3')).toBe('1.2.3')
    })
  })

  describe('removeNonDigitsAndCommas', () => {
    it('should remove non-digits and commas', () => {
      expect(removeNonDigitsAndCommas('1,000,000.6')).toBe('1000000.6')
      expect(removeNonDigitsAndCommas('1,000.555')).toBe('1000.555')
      expect(removeNonDigitsAndCommas('1,000,abc')).toBe('1000')
      expect(removeNonDigitsAndCommas('abc')).toBe('')
      expect(removeNonDigitsAndCommas('1.2.3')).toBe('1.2.3')
    })
  })
})
