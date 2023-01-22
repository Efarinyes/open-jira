

import { formatDistanceToNow, fromUnixTime } from 'date-fns'
import { ca } from 'date-fns/locale';

export const getFormatDistanceToNow = (date: number) => {
    const fromNow = formatDistanceToNow(date, { locale: ca})

    return `Entrada creada fa ${fromNow}`
}