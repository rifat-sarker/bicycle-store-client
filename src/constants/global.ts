export const model = ["Mountain", "Road", "Hybrid", "BMX", "Electric"];

export const category = [
  "Outdoor",
  "Sport",
  "Urban",
  "Adventure",
  "Electric",
  "Kids",
  "Racing",
  "Fitness",
];

export const modelOptions = model.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const categoryOptions = category.map((item) => ({
  value: item,
  label: item,
}));
