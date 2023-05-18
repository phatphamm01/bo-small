export const formatTitle = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};
