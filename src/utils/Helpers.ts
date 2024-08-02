import {Product} from '../api/types/product';

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

export const calculateTotal = (items: Product[]): string => {
  let total: number = 0;

  items.forEach(item => {
    let discountedPrice = item.price;
    if (item.discountPercentage) {
      discountedPrice = item.price * (1 - item.discountPercentage / 100);
    }
    total += (item.quantity ?? 0) * discountedPrice;
  });

  return total.toFixed(2) as string;
};
