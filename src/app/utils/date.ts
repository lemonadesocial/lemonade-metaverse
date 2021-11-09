export function getDate(epoch: string): Date {
  return new Date(+epoch * 1000);
}
