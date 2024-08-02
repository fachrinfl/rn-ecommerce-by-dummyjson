export type ProductParams = {
  limit: number;
  skip?: number;
  q?: string;
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  quantity?: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductByIdResponse = Product;

export type ProductByCategoryParams = {
  limit: number;
  skip?: number;
  q?: string;
};
