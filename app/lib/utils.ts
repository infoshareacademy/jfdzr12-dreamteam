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
    const onlyLettersRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/;
    return onlyLettersRegex.test(trimmedValue);
}

export function validateInputTimeFormat(value: string): boolean {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(value);
}

export function validateInputPhoneNumber(value: string): boolean {
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length >= 6;
}