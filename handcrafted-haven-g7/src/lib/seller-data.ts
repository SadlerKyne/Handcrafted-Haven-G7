import fs from "fs/promises";
import path from "path";

export type SellerProfile = {
  id: string;
  name: string;
  shopName: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
  location: string;
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
  imageUrl: string | null;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PROFILE_FILE = path.join(DATA_DIR, "seller-profile.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

const DEFAULT_PROFILE: SellerProfile = {
  id: "demo-seller-001",
  name: "Jane Artisan",
  shopName: "Jane's Handcrafted Studio",
  email: "artisan@handcraftedhaven.com",
  bio: "I create unique handcrafted pieces with love and attention to detail. Each item is one-of-a-kind.",
  avatarUrl: null,
  location: "Portland, OR",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSellerProfile(): Promise<SellerProfile> {
  const profile = await readJsonFile<SellerProfile | null>(PROFILE_FILE, null);
  if (!profile) {
    await writeJsonFile(PROFILE_FILE, DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }
  return profile;
}

export async function updateSellerProfile(
  updates: Partial<Omit<SellerProfile, "id" | "createdAt">>
): Promise<SellerProfile> {
  const current = await getSellerProfile();
  const updated: SellerProfile = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonFile(PROFILE_FILE, updated);
  return updated;
}

export async function getSellerProducts(): Promise<SellerProduct[]> {
  return readJsonFile<SellerProduct[]>(PRODUCTS_FILE, []);
}

export async function getSellerProductById(id: string): Promise<SellerProduct | null> {
  const products = await getSellerProducts();
  return products.find((product) => product.id === id) ?? null;
}

export async function createSellerProduct(
  input: Omit<SellerProduct, "id" | "sellerId" | "createdAt" | "updatedAt">
): Promise<SellerProduct> {
  const profile = await getSellerProfile();
  const products = await getSellerProducts();
  const now = new Date().toISOString();

  const product: SellerProduct = {
    id: `seller-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    sellerId: profile.id,
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  products.unshift(product);
  await writeJsonFile(PRODUCTS_FILE, products);
  return product;
}

export async function updateSellerProduct(
  id: string,
  updates: Partial<Omit<SellerProduct, "id" | "sellerId" | "createdAt">>
): Promise<SellerProduct | null> {
  const products = await getSellerProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  const updated: SellerProduct = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updated;
  await writeJsonFile(PRODUCTS_FILE, products);
  return updated;
}

export async function deleteSellerProduct(id: string): Promise<boolean> {
  const products = await getSellerProducts();
  const filtered = products.filter((product) => product.id !== id);
  if (filtered.length === products.length) return false;
  await writeJsonFile(PRODUCTS_FILE, filtered);
  return true;
}
