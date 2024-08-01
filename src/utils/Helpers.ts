type PriceDetails = {
  originalPrice: number;
  discountedPrice: number;
  hasDiscount: boolean;
};

export const getPriceDetails = (
  price: number,
  discountPercentage: number | null,
): PriceDetails => {
  const hasDiscount = discountPercentage !== 0 && discountPercentage !== null;
  const discountedPrice = hasDiscount
    ? parseFloat((price - (price * discountPercentage) / 100).toFixed(2))
    : parseFloat(price.toFixed(2));

  return {
    originalPrice: price,
    discountedPrice: discountedPrice,
    hasDiscount: hasDiscount,
  };
};
