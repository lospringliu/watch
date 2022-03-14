export const sleep = time => new Promise(resolve => setTimeout(() => resolve(""), time || 1000))

export function getRandomIndex(items: any[]): number{
  return Math.floor(Math.random() * items.length)
}
export function getRandomSlice<T>(items: T[], length: number = 1): T[]{
  let randomIndex = Math.floor(Math.random() * items.length)
  return randomIndex > items.length - length ? items.slice(items.length - length, items.length): items.slice(randomIndex, randomIndex + length)
}
export function getRandomElement<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}
export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5)
}