export function collectionDateSort(a: { data: { pubDate: Date } }, b: { data: { pubDate: Date } }) {
  return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
}

export function getFormattedDate(dateInput: Date | string | undefined): string {
  if (!dateInput) return '';
  
  const date = typeof dateInput === 'string' 
    ? new Date(dateInput) 
    : dateInput;

  if (isNaN(date.getTime())) {
    console.warn('Invalid date:', dateInput);
    return '';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}