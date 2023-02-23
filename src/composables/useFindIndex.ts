import type { ICharacter } from "@/interfaces/interfaces";

export default () => ({
  getIndex: ({ id, array }: { id: number; array: ICharacter[] }): number => {
    return array.findIndex((item) => item.id === id);
  },
});
