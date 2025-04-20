export function generateRandomBoolean() {
  const array = new Uint8Array(1);
  crypto.getRandomValues(array);
  return array[0] % 2 === 0;
}

export function generateRandomUsername(length: number = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  let username = "";
  array.forEach((byte) => {
    username += chars[byte % chars.length];
  });

  return username;
}
