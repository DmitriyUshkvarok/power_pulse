export function convertSeconds(remainingTime: number) {
  let date = new Date(1970, 0, 0, 0, 0, +remainingTime || 0);
  let time = date.toLocaleTimeString('ru');
  return time.slice(3, 8);
}

export function fullConvertSeconds(remainingTime: number) {
  let date = new Date(1970, 0, 0, 0, 0, +remainingTime || 0);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
