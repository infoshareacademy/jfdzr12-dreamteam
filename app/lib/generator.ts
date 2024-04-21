import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function* uniqueGuestCodeGen() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let lastId = "";

  while (true) {
    let id = '';
    do {
      id = '';
      for (let i = 0; i < 4; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (id === lastId);

    lastId = id;

    yield id;
  }
}

export const uniqueGuestCode = uniqueGuestCodeGen()
console.log(uniqueGuestCode.next().value)






// function* uniqueGuestCodeGen2(): Generator<string> {
//   let id = "0000";
//   while (true) {
//     yield id++;
//   }
// }

// const uniqueGuestCodeGen2 = uniqueGuestCodeGen2()
// console.log(uniqueGuestCodeGen2.next().value)