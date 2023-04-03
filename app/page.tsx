import Image from "next/image";
import styles from "./page.module.css";
import Logo from "@/components/Logo";
import { cache } from "react";
import { db } from "@/lib/db";
import { BrandsOnProducts, Product } from "@prisma/client";

const getProducts = cache(async () => {
  return await db.product.findMany({
    include: {
      brands: {
        select: {
          brand: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });
});

export default async function Home() {
  const products = await getProducts();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.nav}>
          <Logo />
          <span className={styles.about}>
            {"a midjourney experiment by "}
            <a
              target="_blank"
              rel="noopener"
              href="https://twitter.com/andynbrooker"
            >
              @andynbrooker
            </a>
          </span>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {products.map((value) => (
            <ProductListing key={value.id} product={value} />
          ))}
        </div>
      </div>
    </main>
  );
}

type ProductListing = {
  product: Product & {
    brands: {
      brand: {
        title: string;
      };
    }[];
  };
};

const ProductListing = ({ product }: ProductListing) => {
  return (
    <div style={{ padding: 0 }}>
      <div
        className={styles.photoContainer}
        style={{
          aspectRatio: "3 / 4",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Image fill src={product.image_url} alt="coffee" />
      </div>

      <div
        style={{
          padding: "24px 8px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ fontSize: "12px", color: "var(--concrete-secondary)" }}>
            {product.brands
              .map((item) => item.brand.title.toLowerCase())
              .join(" x ")}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 500 }}>
              {product.title}
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500 }}>
              £{product.price.toLocaleString("en-US")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
