import fs from "fs/promises";
import path from "path";
import { getDbPool, initDbSchema, getStorageDir } from "./db";
import { products as defaultProducts } from "@/data/products";

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  inStock: boolean;
  updatedAt: string;
}

const INVENTORY_FILE = "inventory.json";

function getInventoryFilePath(): string {
  return path.join(getStorageDir(), INVENTORY_FILE);
}

function getDefaultInventory(): InventoryItem[] {
  return defaultProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    stock: p.inStock ? 150 : 0,
    inStock: p.inStock,
    updatedAt: new Date().toISOString(),
  }));
}

async function ensureInventoryStorage(): Promise<void> {
  const dir = getStorageDir();
  const filePath = getInventoryFilePath();
  try {
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(
        filePath,
        JSON.stringify(getDefaultInventory(), null, 2),
        "utf-8"
      );
    }
  } catch (err) {
    console.error("Failed to ensure inventory storage:", err);
  }
}

export async function getAllInventory(): Promise<InventoryItem[]> {
  const pool = getDbPool();
  if (pool) {
    await initDbSchema();
    try {
      const { rows } = await pool.query(
        "SELECT * FROM products_inventory ORDER BY id ASC"
      );
      if (rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          price: parseFloat(r.price),
          stock: parseInt(r.stock, 10),
          inStock: Boolean(r.in_stock),
          updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : "",
        }));
      }

      // Seed if empty in DB
      const defaults = getDefaultInventory();
      for (const item of defaults) {
        await pool.query(
          `INSERT INTO products_inventory (id, name, price, stock, in_stock, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO NOTHING`,
          [item.id, item.name, item.price, item.stock, item.inStock, item.updatedAt]
        );
      }
      return defaults;
    } catch (err) {
      console.error("Postgres error in getAllInventory:", err);
    }
  }

  await ensureInventoryStorage();
  try {
    const raw = await fs.readFile(getInventoryFilePath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return getDefaultInventory();
  }
}

export async function updateProductStock(
  id: string,
  stock: number,
  inStock: boolean,
  price?: number
): Promise<InventoryItem | null> {
  const now = new Date().toISOString();
  const pool = getDbPool();

  if (pool) {
    await initDbSchema();
    try {
      const query = price !== undefined
        ? `UPDATE products_inventory SET stock = $1, in_stock = $2, price = $3, updated_at = $4 WHERE id = $5 RETURNING *`
        : `UPDATE products_inventory SET stock = $1, in_stock = $2, updated_at = $3 WHERE id = $4 RETURNING *`;
      
      const values = price !== undefined
        ? [stock, inStock, price, now, id]
        : [stock, inStock, now, id];

      const { rows } = await pool.query(query, values);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          name: r.name,
          price: parseFloat(r.price),
          stock: parseInt(r.stock, 10),
          inStock: Boolean(r.in_stock),
          updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : "",
        };
      }
    } catch (err) {
      console.error("Postgres error updating stock:", err);
    }
  }

  await ensureInventoryStorage();
  try {
    const filePath = getInventoryFilePath();
    const raw = await fs.readFile(filePath, "utf-8");
    const items: InventoryItem[] = JSON.parse(raw);
    const idx = items.findIndex((i) => i.id === id);

    if (idx !== -1) {
      items[idx].stock = stock;
      items[idx].inStock = inStock;
      if (price !== undefined) {
        items[idx].price = price;
        try {
          const productsFilePath = path.join(process.cwd(), "src/data/products.ts");
          let productsContent = await fs.readFile(productsFilePath, "utf-8");
          productsContent = productsContent.replace(/price:\s*\d+,/, `price: ${price},`);
          await fs.writeFile(productsFilePath, productsContent, "utf-8");
        } catch (e) {
          console.error("Failed to update products.ts with new price:", e);
        }
      }
      items[idx].updatedAt = now;
      await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
      return items[idx];
    }
  } catch (err) {
    console.error("File error updating stock:", err);
  }

  return null;
}
