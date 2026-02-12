export function generateOtkId(): string {
  const randomNumbers = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0');
  return `otk-${randomNumbers}`;
}
