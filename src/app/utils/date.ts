export function getDate(epoch: string) {
  return new Date(+epoch * 1000);
}
