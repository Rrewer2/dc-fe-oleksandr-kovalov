export default () => ({
  cutName: ({ str, maxNameLength }: { str: string; maxNameLength: number }) => {
    if (str.length > maxNameLength)
      return str.slice(0, maxNameLength - 3) + "...";
    return str;
  },
});
