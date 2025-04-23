export function formatDate(date: string | Date): string {
  const _d = new Date(date)
  return new Intl.DateTimeFormat('it-IT', { dateStyle: 'full' }).format(_d)
}
