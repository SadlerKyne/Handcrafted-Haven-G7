import dbConnect from "./dbConnect";
import User from "../models/User";
import Product from "../models/Product";
import Notification from "../models/Notification";

export type SellerProfile = {
  id: string;
  name: string;
  shopName: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
  location: string;
  sellerVerified: boolean;
  role: "buyer" | "seller";
  createdAt: string;
  updatedAt: string;
};

export type SellerProduct = {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  imageUrl: string | null;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};

export type SellerNotification = {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  buyerName: string;
  read: boolean;
  createdAt: string;
};

type NotificationDoc = {
  _id: { toString(): string };
  orderId: { toString(): string };
  productId: { toString(): string };
  productTitle: string;
  quantity: number;
  buyerName: string;
  read: boolean;
  createdAt?: Date;
};

type UserDoc = {
  _id: { toString(): string };
  name: string;
  email: string;
  role: "buyer" | "seller";
  shopName?: string;
  bio?: string;
  avatarUrl?: string | null;
  location?: string;
  sellerVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type ProductDoc = {
  _id: { toString(): string };
  sellerId: { toString(): string };
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  imageUrl?: string | null;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

function toSellerProfile(user: UserDoc): SellerProfile {
  return {
    id: user._id.toString(),
    name: user.name,
    shopName: user.shopName || "",
    email: user.email,
    bio: user.bio || "",
    avatarUrl: user.avatarUrl ?? null,
    location: user.location || "",
    sellerVerified: Boolean(user.sellerVerified),
    role: user.role,
    createdAt: (user.createdAt ?? new Date()).toISOString(),
    updatedAt: (user.updatedAt ?? new Date()).toISOString(),
  };
}

function toSellerProduct(product: ProductDoc): SellerProduct {
  return {
    id: product._id.toString(),
    sellerId: product.sellerId.toString(),
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    images: product.images || [],
    imageUrl: product.imageUrl ?? product.images?.[0] ?? null,
    stockQuantity: product.stockQuantity,
    createdAt: (product.createdAt ?? new Date()).toISOString(),
    updatedAt: (product.updatedAt ?? new Date()).toISOString(),
  };
}

export async function getSellerProfile(sellerId: string): Promise<SellerProfile | null> {
  await dbConnect();
  const user = await User.findById(sellerId).lean<UserDoc>();
  if (!user) return null;
  return toSellerProfile(user);
}

export async function updateSellerProfile(
  sellerId: string,
  updates: Partial<Pick<SellerProfile, "name" | "shopName" | "bio" | "avatarUrl" | "location">>
): Promise<SellerProfile | null> {
  await dbConnect();
  const user = await User.findByIdAndUpdate(
    sellerId,
    { $set: updates },
    { new: true }
  ).lean<UserDoc>();
  if (!user) return null;
  return toSellerProfile(user);
}

export async function getSellerProducts(sellerId: string): Promise<SellerProduct[]> {
  await dbConnect();
  const products = await Product.find({ sellerId })
    .sort({ createdAt: -1 })
    .lean<ProductDoc[]>();
  return products.map(toSellerProduct);
}

export async function getRecentProducts(limit = 8): Promise<SellerProduct[]> {
  await dbConnect();
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<ProductDoc[]>();
  return products.map(toSellerProduct);
}

export async function getSellerProductById(id: string): Promise<SellerProduct | null> {
  await dbConnect();
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;
  const product = await Product.findById(id).lean<ProductDoc>();
  if (!product) return null;
  return toSellerProduct(product);
}

export async function createSellerProduct(
  sellerId: string,
  input: Omit<SellerProduct, "id" | "sellerId" | "imageUrl" | "createdAt" | "updatedAt">
): Promise<SellerProduct> {
  await dbConnect();
  const product = await Product.create({
    ...input,
    sellerId,
  });
  return toSellerProduct(product.toObject({ virtuals: true }) as ProductDoc);
}

export async function updateSellerProduct(
  id: string,
  sellerId: string,
  updates: Partial<Omit<SellerProduct, "id" | "sellerId" | "imageUrl" | "createdAt" | "updatedAt">>
): Promise<SellerProduct | null> {
  await dbConnect();
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;
  const product = await Product.findOneAndUpdate(
    { _id: id, sellerId },
    { $set: updates },
    { new: true }
  ).lean<ProductDoc>();
  if (!product) return null;
  return toSellerProduct(product);
}

export async function deleteSellerProduct(id: string, sellerId: string): Promise<boolean> {
  await dbConnect();
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return false;
  const result = await Product.findOneAndDelete({ _id: id, sellerId });
  return Boolean(result);
}

export type ProductFilter = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function searchProducts(filter: ProductFilter): Promise<SellerProduct[]> {
  await dbConnect();

  const mongoFilter: Record<string, unknown> = {};

  if (filter.q) {
    const pattern = new RegExp(escapeRegExp(filter.q.trim()), "i");
    mongoFilter.$or = [{ title: pattern }, { description: pattern }];
  }

  if (filter.category) {
    mongoFilter.category = new RegExp(`^${escapeRegExp(filter.category.trim())}$`, "i");
  }

  if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
    const priceFilter: Record<string, number> = {};
    if (filter.minPrice !== undefined && !isNaN(filter.minPrice)) {
      priceFilter.$gte = filter.minPrice;
    }
    if (filter.maxPrice !== undefined && !isNaN(filter.maxPrice)) {
      priceFilter.$lte = filter.maxPrice;
    }
    if (Object.keys(priceFilter).length > 0) {
      mongoFilter.price = priceFilter;
    }
  }

  const products = await Product.find(mongoFilter)
    .sort({ createdAt: -1 })
    .lean<ProductDoc[]>();
  return products.map(toSellerProduct);
}

function toSellerNotification(notification: NotificationDoc): SellerNotification {
  return {
    id: notification._id.toString(),
    orderId: notification.orderId.toString(),
    productId: notification.productId.toString(),
    productTitle: notification.productTitle,
    quantity: notification.quantity,
    buyerName: notification.buyerName,
    read: notification.read,
    createdAt: (notification.createdAt ?? new Date()).toISOString(),
  };
}

export type OrderNotificationInput = {
  sellerId: string;
  orderId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  buyerName: string;
};

export async function createOrderNotifications(inputs: OrderNotificationInput[]): Promise<void> {
  if (inputs.length === 0) return;
  await dbConnect();
  await Notification.insertMany(inputs);
}

export async function getSellerNotifications(sellerId: string): Promise<SellerNotification[]> {
  await dbConnect();
  const notifications = await Notification.find({ sellerId })
    .sort({ createdAt: -1 })
    .lean<NotificationDoc[]>();
  return notifications.map(toSellerNotification);
}

export async function markNotificationRead(id: string, sellerId: string): Promise<boolean> {
  await dbConnect();
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return false;
  const result = await Notification.updateOne({ _id: id, sellerId }, { $set: { read: true } });
  return result.matchedCount > 0;
}

export async function markAllNotificationsRead(sellerId: string): Promise<void> {
  await dbConnect();
  await Notification.updateMany({ sellerId, read: false }, { $set: { read: true } });
}
