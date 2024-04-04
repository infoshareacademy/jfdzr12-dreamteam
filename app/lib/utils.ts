import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateInputsStringValues(value: string): boolean {
    const trimmedValue = value.trim();
    if (trimmedValue.length < 2) {
        return false;
    }
    const atLeastTwoLettersRegex = /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ].*[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/;
    return atLeastTwoLettersRegex.test(trimmedValue);
}

export function validateInputTimeFormat(value: string): boolean {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(value);
}

export function validateInputsPhoneNumbers(value: string): boolean {
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length >= 6;
}


// interface CodeManager {
//   codes: number[];
//   min: number;
//   max: number;
// }

// function createCodeManager(min: number, max: number): CodeManager {
//   return {
//       codes: [],
//       min,
//       max,
//   }
// }

// function getRandomCode(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateUniqueCode(manager: CodeManager): number {
//   let code: number;
  
//   while(true) {
//       code = getRandomCode(manager.min, manager.max);
//       if(!manager.codes.includes(code)) {
//           break;
//       }
//   }

//   manager.codes.push(code);

//   if(manager.codes.length === manager.max - manager.min + 1) {
//       manager.codes = [];
//   }

//   console.log(manager.codes);

//   return code;
// }

// const codeManager = createCodeManager(1000, 9000);
// const eventCode = generateUniqueCode(codeManager);

function* UniqueCodeGenerator() {
  let code = 1000;

  while (true) {
      yield code++;
  }
}

export const uniqueCodeGenerator = UniqueCodeGenerator();