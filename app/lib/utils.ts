import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getLastEventID } from "~/db/last-event-id";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


async function* UniqueCodeGenerator() {
  while (true) {
      const lastEventID = await getLastEventID();
      const nextEventID = lastEventID + 1;
      yield nextEventID;
  }
}

export const uniqueCodeGenerator = UniqueCodeGenerator();