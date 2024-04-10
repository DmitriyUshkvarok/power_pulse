export function convertSeconds(remainingTime: number) {
  let date = new Date(1970, 0, 0, 0, 0, +remainingTime || 0);
  let time = date.toLocaleTimeString('ru');
  console.log(time);
  return time.slice(3, 8);
}
