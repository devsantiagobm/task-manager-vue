

export function dateToText(date: string | Date) {
    return new Date(date).toLocaleDateString('en', {
        day: '2-digit', month: 'long',
        year: 'numeric'
    })
}