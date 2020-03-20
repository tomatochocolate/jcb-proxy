/**
 * numeral.js
 */
import numeral from 'numeral/src/numeral'
import 'numeral/src/formats/currency'
import 'numeral/src/formats/percentage'

const decimal = {
    base: 1024,
    suffixes: [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
}
numeral.register('format', 'bytes', {
    regexps: {
        format: /([0\s]b)/,
        unformat: new RegExp('(' + decimal.suffixes.join('|').replace('B', 'B(?!PS)') + ')')
    },
    format (value, format, roundingFunction) {
        let output
        let bytes = decimal
        let suffix = numeral._.includes(format, ' b') ? ' ' : ''
        let power
        let min
        let max

        // check for space before
        format = format.replace(/\s?i?b/, '')
        for (power = 0; power <= bytes.suffixes.length; power++) {
            min = Math.pow(bytes.base, power)
            max = Math.pow(bytes.base, power + 1)

            if (value === null || value === 0 || (value >= min && value < max)) {
                suffix += bytes.suffixes[power]

                if (min > 0) value = value / min
                break
            }
        }
        output = numeral._.numberToFormat(value, format, roundingFunction)
        return output + suffix
    },
    unformat (string) {
        let value = numeral._.stringToNumber(string)
        let power
        let bytesMultiplier

        if (value) {
            for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                if (numeral._.includes(string, decimal.suffixes[power])) {
                    bytesMultiplier = Math.pow(decimal.base, power)
                    break
                }
            }
            value *= (bytesMultiplier || 1)
        }
        return value
    }
})
numeral.register('locale', 'chs', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: '千',
        million: '百万',
        billion: '十亿',
        trillion: '兆'
    },
    ordinal (number) {
        return '.'
    },
    currency: {
        symbol: '¥'
    }
})

numeral.locale('chs')
export default numeral
