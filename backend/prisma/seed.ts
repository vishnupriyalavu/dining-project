import "dotenv/config"
import { prisma } from "../src/config/prisma"

async function main() {

  const foods = [
    {
      name: "Margherita Pizza",
      description: "Classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil.",
      price: 2500,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      featured: true
    },
    {
      name: "Pepperoni Pizza",
      description: "Delicious pizza topped with spicy pepperoni slices and melted mozzarella cheese.",
      price: 3200,
      image: "https://images.unsplash.com/photo-1601924582975-7e0c9e29e9f4"
    },
    {
      name: "Veg Burger",
      description: "Grilled vegetable patty burger served with lettuce, tomato, and creamy sauce.",
      price: 150,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      name: "Chicken Burger",
      description: "Juicy grilled chicken burger with cheese, lettuce, and special burger sauce.",
      price: 200,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      featured: true
    },
    {
      name: "French Fries",
      description: "Crispy golden fries served with tomato ketchup and seasoning.",
      price: 120,
      image: "https://images.unsplash.com/photo-1576107232684-1279f390859f"
    },
    {
      name: "Pasta Alfredo",
      description: "Creamy Alfredo pasta made with parmesan cheese and rich garlic cream sauce.",
      price: 2800,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5"
    },
    {
      name: "Grilled Chicken",
      description: "Tender grilled chicken served with herbs, spices, and roasted vegetables.",
      price: 3500,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    },
    {
      name: "Paneer Tikka",
      description: "Indian grilled paneer cubes marinated with spices and cooked in a tandoor.",
      price: 270,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
    },
    {
      name: "Chicken Biryani",
      description: "Traditional aromatic basmati rice cooked with marinated chicken and spices.",
      price: 300,
      image: "https://images.unsplash.com/photo-1633945274309-2c16f4d3f1a0",
      featured: true
    },
    {
      name: "Chocolate Cake",
      description: "Rich and moist chocolate cake layered with creamy chocolate frosting.",
      price: 220,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    }
  ]

  await prisma.food.deleteMany()   // prevents duplicates

  await prisma.food.createMany({
    data: foods
  })

  console.log(" 10 food items inserted")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
