export const fetchProductsBySearch = async (searchTerm: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?searchTerm=${searchTerm}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
