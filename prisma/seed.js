const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  const products = [
    {
      title: "Florence",
      image_url:
        "https://binsta.dev/api/v1/files/Q3BoetVT85/transform?format=webp&size=lg&quality=hi",
      price: 235,
    },
    {
      title: "Kensington Heritage Gown",
      image_url:
        "https://binsta.dev/api/v1/files/v8ChYHnB_c/transform?format=webp&size=lg&quality=hi",
      price: 150,
    },
    {
      title: "Ode Brew Grinder TP 1",
      image_url:
        "https://binsta.dev/api/v1/files/6Ulk_2o8Wx/transform?format=webp&size=lg&quality=hi",
      price: 300,
    },
    {
      title: "LV Barcelona",
      image_url:
        "https://binsta.dev/api/v1/files/ex5Ii7Z3Oq/transform?format=webp&size=lg&quality=hi",
      price: 7495,
    },
    {
      title: "controller-1",
      image_url:
        "https://binsta.dev/api/v1/files/G3VciBicpc/transform?format=webp&size=lg&quality=hi",
      price: 100,
    },
    {
      title: "IL-Y field",
      image_url:
        "https://binsta.dev/api/v1/files/wcqvub1iqY/transform?format=webp&size=lg&quality=hi",
      price: 945,
    },
  ];

  const brands = [
    { title: "Birkenstock" },
    { title: "Gucci" },
    { title: "teenage engineering" },
    { title: "Mies van der Rohe" },
    { title: "Louis Vuitton" },
    { title: "Xbox" },
    { title: "fellow" },
    { title: "braun" },
    { title: "illy" },
    { title: "the white company" },
    { title: "burberry" },
  ];

  // Insert products and brands
  const createdProducts = await db.product.createMany({ data: products });
  const createdBrands = await db.brand.createMany({ data: brands });

  // Create the many-to-many relation between products and brands
  const brandsOnProducts = [
    { productId: 2, brandId: 3 },
    { productId: 2, brandId: 4 },
    { productId: 3, brandId: 12 },
    { productId: 3, brandId: 13 },
    { productId: 4, brandId: 9 },
    { productId: 4, brandId: 10 },
    { productId: 5, brandId: 6 },
    { productId: 5, brandId: 7 },
    { productId: 6, brandId: 5 },
    { productId: 6, brandId: 8 },
    { productId: 7, brandId: 5 },
    { productId: 7, brandId: 11 },
  ];

  await db.brandsOnProducts.createMany({ data: brandsOnProducts });

  console.log("Database seeding complete");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
