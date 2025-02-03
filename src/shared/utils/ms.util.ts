type unit = 'hours' | 'days'
export enum MsUnit {
    HOURS = 'hours',
    DAYS = 'days'
}

export function ms(value: number, unit: unit) {
    const results = {
        hours: value * 60 * 60 * 1000,
        days: value * 24 * 60 * 60 * 1000
    }

    return results[unit];
}