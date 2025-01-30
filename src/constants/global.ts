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

export const brand = [
  "CityRide",
  "UrbanMotion",
  "TrailPro",
  "KidBike",
  "GreenWheel",
  "Velocita",
  "HealthBike",
  "SpeedBikes",
  "ElectraBike",
];
export const modelOptions = model.map((item) => ({
  value: item,
  label: item,
}));

export const categoryOptions = category.map((item) => ({
  value: item,
  label: item,
}));

export const brandOptions = brand.map((item) => ({
  value: item,
  label: item,
}));
