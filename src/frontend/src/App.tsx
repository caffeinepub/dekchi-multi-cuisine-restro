import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Calendar,
  Car,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Music,
  Phone,
  Star,
  Twitter,
  Users,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Menu Data ────────────────────────────────────────────────────────────────

interface MenuItem {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  image: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "best-sellers",
    label: "Best Sellers",
    image: "/assets/generated/chhole-bhature.dim_600x400.jpg",
    items: [
      { name: "Mineral Water", price: 25 },
      { name: "Hot Coffee", price: 50 },
      { name: "Masala Chhachh", price: 55 },
      { name: "Soft Drink", price: 40 },
      {
        name: "Cold Coffee Plain",
        price: 135,
        description:
          "Smooth and refreshing chilled coffee blended to perfection.",
        image: "/assets/generated/cold-coffee-icecream.dim_600x400.jpg",
      },
      {
        name: "Cold Coffee With Icecream",
        price: 165,
        description:
          "Creamy, chilled coffee topped with a scoop of ice cream for a rich and refreshing treat.",
        image: "/assets/generated/cold-coffee-icecream.dim_600x400.jpg",
      },
      { name: "Green Salad", price: 95 },
      {
        name: "Chhole Bhature",
        price: 210,
        description:
          "North Indian favorite – spicy chickpeas served with fluffy, deep-fried bhature.",
        image: "/assets/generated/chhole-bhature.dim_600x400.jpg",
      },
      {
        name: "Paav Bhaji",
        price: 210,
        description:
          "Mumbai's iconic street food – buttery pav served with spicy, flavorful mashed veggies.",
        image: "/assets/generated/paav-bhaji.dim_600x400.jpg",
      },
      {
        name: "Veg Grilled Sandwich",
        price: 110,
        description:
          "Fresh veggies layered with savory spices and grilled till crispy and golden.",
        image: "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg",
      },
      {
        name: "Veg Cheese Grilled Sandwich",
        price: 130,
        description:
          "Loaded with melted cheese and fresh veggies, grilled to golden perfection.",
      },
      {
        name: "Veg Burger",
        price: 105,
        description:
          "Fresh veggie patty layered with crisp lettuce, sauces, and soft buns.",
        image: "/assets/generated/veg-burger.dim_600x400.jpg",
      },
      {
        name: "Cheese Burger",
        price: 120,
        description:
          "Juicy patty topped with melted cheese and fresh veggies in a toasted bun.",
      },
      {
        name: "OTC Pizza",
        price: 210,
        description:
          "A cheesy overload topped with onion, tomato, and capsicum.",
        image: "/assets/generated/dekchi-pizza.dim_600x400.jpg",
      },
      {
        name: "Masala Dosa",
        price: 199,
        description:
          "Crispy South Indian dosa filled with spiced potato masala.",
        image: "/assets/generated/masala-dosa.dim_600x400.jpg",
      },
      {
        name: "Paneer Lababdar",
        price: 450,
        description:
          "Creamy, mildly spiced curry made with soft paneer cubes in rich tomato gravy.",
      },
      { name: "Kadhai Paneer", price: 410 },
      {
        name: "Dal Fry",
        price: 250,
        description:
          "A comforting mix of lentils tempered with ghee, garlic, and aromatic spices.",
      },
      { name: "Veg Raita", price: 95 },
      { name: "Tandoori Plain Roti", price: 25 },
      { name: "Tandoori Butter Roti", price: 30 },
      {
        name: "Butter Naan",
        price: 90,
        description:
          "Soft, fluffy naan brushed generously with butter for a melt-in-mouth experience.",
        image: "/assets/generated/butter-naan.dim_600x400.jpg",
      },
      {
        name: "Shahi Paneer",
        price: 320,
        description:
          "Rich and creamy paneer curry cooked in a royal, mildly spiced cashew-tomato gravy.",
        image: "/assets/generated/shahi-paneer.dim_600x400.jpg",
      },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    image: "/assets/generated/sweet-lassi.dim_600x400.jpg",
    items: [
      { name: "Red Bull", price: 150 },
      { name: "Fresh Lime Soda", price: 80 },
      {
        name: "Salted Lassi",
        price: 75,
        description:
          "Cool and savory yogurt-based drink, perfectly balanced with salt and spices.",
      },
      { name: "Fresh Lime Water", price: 40 },
      {
        name: "Sweet Lassi",
        price: 90,
        description:
          "Thick and creamy yogurt drink blended with sugar for a refreshing sweetness.",
        image: "/assets/generated/sweet-lassi.dim_600x400.jpg",
      },
      { name: "Juice (Per Glass)", price: 69 },
      { name: "Dekchi's Special Lassi", price: 149 },
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    image: "/assets/generated/chocolate-shake.dim_600x400.jpg",
    items: [
      { name: "Papaya Shake", price: 115 },
      { name: "Butterscotch Shake", price: 125 },
      {
        name: "Chocolate Shake",
        price: 125,
        image: "/assets/generated/chocolate-shake.dim_600x400.jpg",
      },
      { name: "Kit-Kat Shake", price: 130 },
      { name: "Banana Shake", price: 99 },
      { name: "Strawberry Shake", price: 120 },
      { name: "Vanilla Shake", price: 115 },
      { name: "Oreo Shake", price: 135 },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    image: "/assets/generated/fruit-salad.dim_600x400.jpg",
    items: [
      { name: "Russian Salad", price: 169 },
      { name: "Kachumber Salad", price: 70 },
      { name: "Onion Salad", price: 60 },
      { name: "Cucumber Salad", price: 60 },
      {
        name: "Fruit Salad",
        price: 140,
        image: "/assets/generated/fruit-salad.dim_600x400.jpg",
      },
      { name: "Classic Caesar Salad", price: 120 },
    ],
  },
  {
    id: "chinese-starter",
    label: "Chinese Starter",
    image: "/assets/generated/honey-chilli-potato.dim_600x400.jpg",
    items: [
      {
        name: "Cheese Balls",
        price: 240,
        description: "Golden-fried balls filled with melted cheese.",
      },
      {
        name: "Paneer 65",
        price: 310,
        description:
          "Spicy South Indian-style paneer starter tossed in flavorful masala.",
      },
      {
        name: "Honey Chilli Potato",
        price: 270,
        description:
          "Crispy potato fingers glazed in sweet and spicy honey-chilli sauce.",
        image: "/assets/generated/honey-chilli-potato.dim_600x400.jpg",
      },
      {
        name: "Chilli Mushroom Dry",
        price: 285,
        description: "Crispy mushrooms tossed in spicy chilli sauce.",
      },
      {
        name: "Veg Crispy Corn",
        price: 260,
        description:
          "Crunchy golden corn tossed with spices, herbs, and a hint of lemon.",
      },
      {
        name: "Chilli Paneer Dry",
        price: 310,
        description:
          "Paneer cubes tossed with onions, capsicum, and fiery chilli sauce.",
        image: "/assets/generated/chilli-paneer.dim_600x400.jpg",
      },
      { name: "Spinach Cheese Cigar Roll", price: 265 },
      {
        name: "Veg Manchurian Dry",
        price: 285,
        description:
          "Crispy veggie balls tossed in spicy, tangy Indo-Chinese sauce.",
      },
      {
        name: "Veg Spring Roll",
        price: 245,
        description: "Golden, crispy rolls stuffed with spiced veggies.",
        image: "/assets/generated/veg-spring-roll.dim_600x400.jpg",
      },
      {
        name: "Crispy Veg In H.G. Sauce",
        price: 260,
        description: "Crunchy fried veggies tossed in spicy Hot Garlic sauce.",
      },
      {
        name: "Chilli Potato",
        price: 260,
        description:
          "Fried potato fingers coated in hot and tangy Indo-Chinese sauce.",
      },
    ],
  },
  {
    id: "chinese-main",
    label: "Chinese Main",
    image: "/assets/generated/veg-noodles.dim_600x400.jpg",
    items: [
      {
        name: "Chilli Paneer Gravy",
        price: 310,
        description:
          "Soft paneer cubes cooked in spicy, tangy chilli garlic gravy.",
        image: "/assets/generated/chilli-paneer.dim_600x400.jpg",
      },
      {
        name: "Veg Manchurian Gravy",
        price: 290,
        description: "Crispy veggie balls in spicy, tangy Indo-Chinese gravy.",
      },
      {
        name: "Chilli Garlic Noodles",
        price: 245,
        description:
          "Stir-fried noodles bursting with bold chilli and garlic flavors.",
        image: "/assets/generated/veg-noodles.dim_600x400.jpg",
      },
      {
        name: "Veg Fried Rice",
        price: 255,
        description: "Fragrant rice tossed with mixed veggies and soy.",
        image: "/assets/generated/veg-fried-rice.dim_600x400.jpg",
      },
      {
        name: "Tripple Schezwan Fried Rice",
        price: 320,
        description: "A fiery combo of rice, noodles & Schezwan sauce.",
      },
      {
        name: "Penne Alfredo Pasta (White)",
        price: 299,
        description: "Silky smooth white sauce pasta with creamy cheesy twist.",
        image: "/assets/generated/penne-pasta.dim_600x400.jpg",
      },
      {
        name: "Penne Arrabiata Pasta (Red)",
        price: 290,
        description:
          "Penne in spicy tangy tomato-based sauce with Italian herbs.",
      },
      { name: "Saute Vegetable", price: 270 },
      {
        name: "Veg Hakka Noodles",
        price: 230,
        description: "Classic Indo-Chinese noodles tossed with fresh veggies.",
      },
      {
        name: "Veg Chowmein",
        price: 230,
        description: "Street-style noodles stir-fried with crunchy veggies.",
      },
      {
        name: "Penne Pasta In Pink Sauce",
        price: 299,
        description: "Creamy and tangy fusion of red and white sauce.",
      },
    ],
  },
  {
    id: "fast-food",
    label: "Fast Food",
    image: "/assets/generated/french-fries.dim_600x400.jpg",
    items: [
      { name: "Extra Bhatura", price: 45 },
      { name: "Extra Paav (2 Pcs)", price: 50 },
      { name: "Cheese Chilli Toast", price: 139 },
      { name: "Cheese Garlic Toast", price: 149 },
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    image: "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg",
    items: [
      { name: "Paneer Tikka Sandwich", price: 169 },
      { name: "Peri-Peri Fries", price: 189 },
      {
        name: "French Fries",
        price: 169,
        image: "/assets/generated/french-fries.dim_600x400.jpg",
      },
      { name: "Dekchi Special Sandwich", price: 199 },
      { name: "Veg Plain Sandwich", price: 79 },
      {
        name: "Veg Club Sandwich (Chef Style)",
        price: 179,
        image: "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg",
      },
    ],
  },
  {
    id: "burger",
    label: "Burger",
    image: "/assets/generated/veg-burger.dim_600x400.jpg",
    items: [
      {
        name: "Veg Burger",
        price: 105,
        image: "/assets/generated/veg-burger.dim_600x400.jpg",
      },
      { name: "Cheese Burger", price: 120 },
      {
        name: "Double Cheese Burger",
        price: 140,
        description: "Double the cheese, double the joy.",
      },
      {
        name: "Paneer Tikka Burger",
        price: 165,
        description: "Juicy paneer tikka patty loaded with sauces and veggies.",
      },
      { name: "Chef Special Burger", price: 180 },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    image: "/assets/generated/dekchi-pizza.dim_600x400.jpg",
    items: [
      { name: "Margaretta Pizza", price: 299 },
      { name: "Four Season Pizza", price: 329 },
      { name: "Classic Corn Pizza", price: 239 },
      {
        name: "Indian Paneer Pizza",
        price: 349,
        image: "/assets/generated/dekchi-pizza.dim_600x400.jpg",
      },
      { name: "Farm House Pizza", price: 329 },
      {
        name: "Dekchi Special Pizza",
        price: 389,
        image: "/assets/generated/dekchi-pizza.dim_600x400.jpg",
      },
    ],
  },
  {
    id: "south-indian",
    label: "South Indian",
    image: "/assets/generated/masala-dosa.dim_600x400.jpg",
    items: [
      { name: "Paneer Masala Dosa", price: 299 },
      { name: "Chilli Paneer Dosa", price: 299 },
      { name: "Cheese Chilli Paneer Dosa", price: 329 },
      { name: "Vegetable Uttapam", price: 199 },
      { name: "Steamed Idli", price: 129 },
      { name: "Fried Idli", price: 189 },
      { name: "Masala Idli", price: 210 },
      {
        name: "Plain Dosa",
        price: 149,
        image: "/assets/generated/masala-dosa.dim_600x400.jpg",
      },
      {
        name: "Mysoor Masala Dosa",
        price: 229,
        image: "/assets/generated/masala-dosa.dim_600x400.jpg",
      },
      {
        name: "Masala Dosa",
        price: 199,
        image: "/assets/generated/masala-dosa.dim_600x400.jpg",
      },
      { name: "Chef Special Dosa", price: 349 },
      { name: "Student Idli Packing", price: 129 },
      { name: "Student Idli (2pc)", price: 129 },
      { name: "Student Dosa Packing", price: 119 },
    ],
  },
  {
    id: "tandoor-starter",
    label: "Tandoor Starter",
    image: "/assets/generated/paneer-tikka.dim_600x400.jpg",
    items: [
      { name: "Masala Papad", price: 50 },
      { name: "Roasted Papad", price: 30 },
      { name: "Tandoori Veg Platter", price: 439 },
      { name: "Paneer Malai Tikka", price: 389 },
      { name: "Lehsuni Paneer Tikka", price: 389 },
      { name: "Achari Paneer Tikka", price: 289 },
      {
        name: "Paneer Angara Tikka",
        price: 319,
        image: "/assets/generated/paneer-tikka.dim_600x400.jpg",
      },
      {
        name: "Paneer Tikka Plain",
        price: 319,
        image: "/assets/generated/paneer-tikka.dim_600x400.jpg",
      },
      { name: "Hariyali Paneer Tikka", price: 349 },
      { name: "Veg Kathi Roll", price: 289 },
      { name: "Paneer Kathi Roll", price: 329 },
      { name: "Mushroom Tikka", price: 310 },
      { name: "Dahi Ke Kebab", price: 310 },
      { name: "Mix Veg Pakora", price: 210 },
      { name: "Paneer Pakora", price: 270 },
      { name: "Hara Bhara Kebab", price: 319 },
      { name: "Tandoori Stuffed Mushroom", price: 319 },
      { name: "Soya Malai Tikka", price: 339 },
      { name: "Soya Masala Tikka", price: 310 },
      { name: "Chef Special Paneer Multani Tikka", price: 399 },
      { name: "Dekchi Special Sigri Platter", price: 699 },
    ],
  },
  {
    id: "indian-main",
    label: "Indian Main",
    image: "/assets/generated/paneer-butter-masala.dim_600x400.jpg",
    items: [
      {
        name: "Paneer Butter Masala",
        price: 399,
        image: "/assets/generated/paneer-butter-masala.dim_600x400.jpg",
      },
      { name: "Matar Paneer", price: 329 },
      {
        name: "Palak Paneer",
        price: 399,
        image: "/assets/generated/palak-paneer.dim_600x400.jpg",
      },
      { name: "Jaipuri Paneer", price: 399 },
      { name: "Paneer Tikka Masala", price: 339 },
      { name: "Paneer Do Pyaza", price: 399 },
      { name: "Paneer Burji", price: 380 },
      { name: "Paneer Toofani", price: 410 },
      { name: "Khoya Paneer Masala", price: 470 },
      { name: "Kadhai Veg", price: 360 },
      { name: "Mixed Veg", price: 270 },
      { name: "Veg Jalfrezi", price: 330 },
      { name: "Matar Mushroom", price: 339 },
      { name: "Mushroom Masala", price: 310 },
      { name: "Mushroom Do Pyaza", price: 389 },
      { name: "Jodhpuri Gatta Masala", price: 360 },
      { name: "Bhindi Masala", price: 330 },
      { name: "Jeera Aalu", price: 280 },
      { name: "Dum Aalu Chutney Wala", price: 349 },
      { name: "Aalu Gobhi Adraki", price: 310 },
      { name: "Hariyali Veg", price: 329 },
      { name: "Sev Tamatar", price: 250 },
      { name: "Sev Bhaji", price: 299 },
      { name: "Navratan Korma", price: 430 },
      { name: "Nargis Kofta", price: 280 },
      { name: "Veg Kofta Curry", price: 330 },
      { name: "Jaipuri Veg", price: 380 },
      { name: "Palak Corn", price: 330 },
      { name: "Soya Chap Masala", price: 380 },
      { name: "Methi Matar Malai", price: 370 },
      { name: "Chana Masala", price: 320 },
      { name: "Kadhi Pakora", price: 320 },
      { name: "Dekchi Special Anguri Veg", price: 419 },
      { name: "Kaju Curry", price: 380 },
      { name: "Malai Kofta", price: 330 },
    ],
  },
  {
    id: "dal",
    label: "Dal",
    image: "/assets/generated/dal-makhani.dim_600x400.jpg",
    items: [
      {
        name: "Double Dal Tadka",
        price: 249,
        description: "Yellow dal tempered with ghee, cumin, and garlic.",
      },
      { name: "Dal Panchmel", price: 295 },
      {
        name: "Dal Makhani",
        price: 299,
        description:
          "Slow-cooked black lentils in a rich, buttery, creamy tomato gravy.",
        image: "/assets/generated/dal-makhani.dim_600x400.jpg",
      },
    ],
  },
  {
    id: "rice",
    label: "Rice",
    image: "/assets/generated/veg-biryani.dim_600x400.jpg",
    items: [
      { name: "Kashmiri Pulao", price: 239 },
      { name: "Veg Pulao", price: 219 },
      { name: "Steamed Rice", price: 179 },
      { name: "Peas Pulao", price: 199 },
      { name: "Jeera Rice", price: 210 },
      {
        name: "Chef Special Biryani With Raita",
        price: 389,
        image: "/assets/generated/veg-biryani.dim_600x400.jpg",
      },
    ],
  },
  {
    id: "curd",
    label: "Curd",
    image: "/assets/generated/sweet-lassi.dim_600x400.jpg",
    items: [
      { name: "Plain Curd", price: 85 },
      {
        name: "Fruit Raita",
        price: 139,
        description: "Cool and creamy yogurt blended with juicy, fresh fruits.",
      },
      {
        name: "Boondi Raita",
        price: 89,
        description: "Refreshing yogurt mixed with crispy boondi.",
      },
    ],
  },
  {
    id: "dessert",
    label: "Dessert",
    image: "/assets/generated/gulab-jamun-icecream.dim_600x400.jpg",
    items: [
      { name: "Gulab Jamun", price: 80 },
      {
        name: "Gulab Jamun With Icecream",
        price: 110,
        image: "/assets/generated/gulab-jamun-icecream.dim_600x400.jpg",
      },
    ],
  },
  {
    id: "mocktail",
    label: "Mocktail",
    image: "/assets/generated/mint-mojito.dim_600x400.jpg",
    items: [
      { name: "Kiwi Paradise", price: 160 },
      {
        name: "Ginger Mint Mojito",
        price: 139,
        image: "/assets/generated/mint-mojito.dim_600x400.jpg",
      },
      { name: "Mint Cucumber Salty", price: 139 },
      { name: "Masala Soda", price: 89 },
      { name: "Cranberry Mojito", price: 149 },
      {
        name: "Virgin Mint Mojito",
        price: 129,
        image: "/assets/generated/mint-mojito.dim_600x400.jpg",
      },
      { name: "Blue Lagoon", price: 139 },
      { name: "Mint Added Red Bull", price: 220 },
      { name: "Sweet Sunrise", price: 120 },
      { name: "Mocktail Hugama", price: 169 },
      { name: "Mirinda Salty", price: 120 },
      { name: "Orange Mint Mojito", price: 149 },
      { name: "Fruit Punch", price: 179 },
      { name: "Spicy Mint Mojito", price: 149 },
      { name: "Spicy Guava", price: 149 },
    ],
  },
  {
    id: "ice-cream",
    label: "Ice Cream",
    image: "/assets/generated/butterscotch-icecream.dim_600x400.jpg",
    items: [
      { name: "Chocolate Icecream", price: 89 },
      {
        name: "Butterscotch Icecream",
        price: 99,
        image: "/assets/generated/butterscotch-icecream.dim_600x400.jpg",
      },
      { name: "Vanilla Icecream", price: 70 },
      { name: "Strawberry Icecream", price: 89 },
    ],
  },
  {
    id: "soup",
    label: "Soup",
    image: "/assets/generated/mushroom-soup.dim_600x400.jpg",
    items: [
      { name: "Veg Minestrone Soup", price: 110 },
      {
        name: "Cream Of Mushroom Soup",
        price: 129,
        image: "/assets/generated/mushroom-soup.dim_600x400.jpg",
      },
      { name: "Veg Lemon Coriander Soup", price: 110 },
    ],
  },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5.0,
    text: "Best paneer tikka in Sikar! The rooftop ambience is stunning and food quality is exceptional.",
    date: "March 2025",
  },
  {
    name: "Priya Agarwal",
    rating: 4.8,
    text: "Loved the cold coffee and masala dosa. Very clean and friendly staff. Will visit again!",
    date: "February 2025",
  },
  {
    name: "Amit Kumar",
    rating: 4.9,
    text: "Dekchi Special Pizza is absolutely amazing. Great variety of menu from Indian to Chinese.",
    date: "January 2025",
  },
  {
    name: "Sunita Meena",
    rating: 4.7,
    text: "Perfect family dining spot. Kids loved the shakes and we enjoyed the paneer dishes.",
    date: "March 2025",
  },
  {
    name: "Vikram Singh",
    rating: 5.0,
    text: "The rooftop seating is beautiful at night. Dal makhani and naan were finger-licking good!",
    date: "February 2025",
  },
  {
    name: "Kavya Joshi",
    rating: 4.8,
    text: "Best restaurant in Sikar for multi-cuisine. Mocktails are refreshing and food is authentic.",
    date: "March 2025",
  },
];

// ─── Gallery Images ────────────────────────────────────────────────────────────

const galleryImages = [
  {
    src: "/assets/uploads/image-019d34af-4a08-73ea-b5c5-c687f8a2703c-1.png",
    alt: "DEKCHI Restro – Night Exterior",
    span: "col-span-2",
  },
  {
    src: "/assets/uploads/image-019d34af-4b15-7398-a5be-d92952d143a4-2.png",
    alt: "DEKCHI Rooftop Seating",
    span: "col-span-2",
  },
  {
    src: "/assets/generated/paneer-tikka.dim_600x400.jpg",
    alt: "Paneer Tikka",
  },
  {
    src: "/assets/generated/chhole-bhature.dim_600x400.jpg",
    alt: "Chhole Bhature",
  },
  {
    src: "/assets/generated/cold-coffee-icecream.dim_600x400.jpg",
    alt: "Cold Coffee",
  },
  { src: "/assets/generated/masala-dosa.dim_600x400.jpg", alt: "Masala Dosa" },
  {
    src: "/assets/generated/paneer-butter-masala.dim_600x400.jpg",
    alt: "Paneer Butter Masala",
  },
  {
    src: "/assets/generated/dekchi-pizza.dim_600x400.jpg",
    alt: "Dekchi Special Pizza",
  },
  { src: "/assets/generated/dal-makhani.dim_600x400.jpg", alt: "Dal Makhani" },
  { src: "/assets/generated/mint-mojito.dim_600x400.jpg", alt: "Mint Mojito" },
];

// ─── Star Rating Component ─────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-muted text-muted"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-amber-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ─── Menu Item Card ─────────────────────────────────────────────────────────────

function MenuCard({
  item,
  categoryImage,
}: { item: MenuItem; categoryImage: string }) {
  const img = item.image ?? categoryImage;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 right-2">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            ₹{item.price}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-sm text-foreground leading-tight">
          {item.name}
        </h4>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [activeMenuTab, setActiveMenuTab] = useState("best-sellers");
  const navRef = useRef<HTMLElement>(null);

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "about", "menu", "gallery", "reviews", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      for (const obs of observers) {
        obs?.disconnect();
      }
    };
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }

  function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Table booked! We'll confirm via WhatsApp shortly.");
    setBookingForm({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      message: "",
    });
  }

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "menu", label: "Menu" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Toaster richColors position="top-right" />

      {/* ── Sticky Navbar ────────────────────────────────────────── */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <Utensils className="w-6 h-6 text-primary" />
            <span className="font-playfair font-bold text-xl text-foreground">
              DEKCHI
            </span>
            <Badge
              variant="outline"
              className="text-xs border-primary/50 text-primary hidden sm:inline-flex"
            >
              Since 2024
            </Badge>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-ocid="nav.link"
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === link.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden md:flex"
              onClick={() => scrollTo("contact")}
              data-ocid="nav.primary_button"
            >
              Book a Table
            </Button>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border px-4 pb-4"
            >
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/uploads/image-019d34af-4a08-73ea-b5c5-c687f8a2703c-1.png"
            alt="DEKCHI Multi Cuisine Restro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <Badge className="bg-primary/20 text-primary border-primary/50 text-sm px-4 py-1">
              ✦ Since 2024 ✦
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
          >
            DEKCHI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-amber-300 font-light mb-3 font-playfair italic"
          >
            Multi Cuisine Restro
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto"
          >
            Pure Veg · Indian · Chinese · South Indian · Fast Food · Rooftop
            Dining
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
              onClick={() => scrollTo("menu")}
              data-ocid="hero.primary_button"
            >
              View Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10 font-semibold px-8"
              onClick={() => scrollTo("contact")}
              data-ocid="hero.secondary_button"
            >
              Book a Table
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-white/70 text-sm"
          >
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> 10 AM – 11 PM Daily
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Sikar, Rajasthan
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.8
              Rated
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* ── About Section ────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                Our Story
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
                A Feast for Every <span className="text-primary">Craving</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Since 2024, DEKCHI Multi Cuisine Restro has been Sikar's most
                beloved dining destination — where every meal is crafted with
                love, quality ingredients, and bold flavors across Indian,
                Chinese, South Indian, and Fast Food cuisines.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Set in New Janta Colony, our restaurant features stunning
                rooftop seating under the open sky, a cozy indoor area, and a
                warm ambience perfect for family gatherings, celebrations, and
                everyday dining. We are 100% Pure Vegetarian.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Utensils className="w-5 h-5" />,
                    label: "Pure Veg",
                    sub: "100% Vegetarian",
                  },
                  {
                    icon: <Award className="w-5 h-5" />,
                    label: "Multi Cuisine",
                    sub: "Indian • Chinese • More",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    label: "Family Friendly",
                    sub: "Group & Private Dining",
                  },
                  {
                    icon: <Music className="w-5 h-5" />,
                    label: "Rooftop",
                    sub: "Open-Air Seating",
                  },
                  {
                    icon: <Car className="w-5 h-5" />,
                    label: "Free Parking",
                    sub: "Ample Space",
                  },
                  {
                    icon: <Wifi className="w-5 h-5" />,
                    label: "Fast Service",
                    sub: "10 AM – 11 PM",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border"
                  >
                    <span className="text-primary mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/assets/uploads/image-019d34af-4a08-73ea-b5c5-c687f8a2703c-1.png"
                alt="DEKCHI Restaurant Exterior"
                className="col-span-2 rounded-2xl w-full h-64 object-cover shadow-2xl"
              />
              <img
                src="/assets/generated/paneer-tikka.dim_600x400.jpg"
                alt="Paneer Tikka"
                className="rounded-xl w-full h-40 object-cover"
              />
              <img
                src="/assets/uploads/image-019d34af-4b15-7398-a5be-d92952d143a4-2.png"
                alt="Rooftop Dining"
                className="rounded-xl w-full h-40 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Strip ───────────────────────────────────────── */}
      <div className="bg-primary/10 border-y border-primary/20 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {[
              "🍽️ Dine In",
              "🛵 Takeaway",
              "🌿 Pure Veg",
              "🌙 Rooftop Seating",
              "🎉 Party Hall",
              "👨‍👩‍👧 Family Friendly",
              "🅿️ Free Parking",
              "🎵 Live Music",
            ].map((f) => (
              <span key={f} className="text-muted-foreground font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menu Section ─────────────────────────────────────────── */}
      <section id="menu" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
              Our Menu
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="text-primary">Flavours</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From North Indian classics to Chinese delights, South Indian
              specialties to refreshing mocktails — we have it all.
            </p>
          </motion.div>

          <Tabs
            value={activeMenuTab}
            onValueChange={setActiveMenuTab}
            data-ocid="menu.tab"
          >
            {/* Scrollable tab list */}
            <div className="overflow-x-auto pb-2 mb-8">
              <TabsList className="flex w-max gap-1 bg-card border border-border p-1 rounded-2xl h-auto">
                {menuCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="whitespace-nowrap text-xs px-3 py-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    data-ocid="menu.tab"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {menuCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h3 className="font-playfair text-2xl font-bold">
                      {cat.label}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {cat.items.length} items
                    </p>
                  </div>
                </div>

                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  data-ocid="menu.list"
                >
                  {cat.items.map((item, idx) => (
                    <div key={item.name} data-ocid={`menu.item.${idx + 1}`}>
                      <MenuCard item={item} categoryImage={cat.image} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── Gallery Section ───────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
              Gallery
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">
              A Glimpse of <span className="text-primary">DEKCHI</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`relative overflow-hidden rounded-2xl group ${
                  img.span ?? ""
                } ${idx < 2 ? "h-64 md:h-72" : "h-48"}`}
                data-ocid={`gallery.item.${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-sm font-semibold drop-shadow">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Section ───────────────────────────────────────── */}
      <section id="reviews" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
              Reviews
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-2">
              What Our Guests <span className="text-primary">Say</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-amber-400">4.8</span>
              <span className="text-muted-foreground">
                avg. from 500+ reviews
              </span>
            </div>
          </motion.div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="reviews.list"
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
                data-ocid={`reviews.item.${idx + 1}`}
              >
                <StarRating rating={review.rating} />
                <p className="text-muted-foreground mt-4 mb-4 italic leading-relaxed text-sm">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservation + Contact Section ─────────────────────────── */}
      <section id="contact" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
              Reserve &amp; Visit
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">
              Book a <span className="text-primary">Table</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleBooking}
                className="bg-card rounded-2xl p-8 border border-border space-y-5"
                data-ocid="booking.modal"
              >
                <h3 className="font-playfair text-2xl font-bold">
                  Make a Reservation
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label
                      htmlFor="booking-name"
                      className="text-sm font-medium"
                    >
                      Full Name
                    </label>
                    <Input
                      id="booking-name"
                      placeholder="Your name"
                      value={bookingForm.name}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, name: e.target.value })
                      }
                      required
                      data-ocid="booking.input"
                    />
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label
                      htmlFor="booking-phone"
                      className="text-sm font-medium"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="booking-phone"
                      placeholder="+91 XXXXXXXXXX"
                      value={bookingForm.phone}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          phone: e.target.value,
                        })
                      }
                      required
                      data-ocid="booking.input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1 col-span-3 sm:col-span-1">
                    <label
                      htmlFor="booking-date"
                      className="text-sm font-medium"
                    >
                      Date
                    </label>
                    <Input
                      id="booking-date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, date: e.target.value })
                      }
                      required
                      data-ocid="booking.input"
                    />
                  </div>
                  <div className="space-y-1 col-span-3 sm:col-span-1">
                    <label
                      htmlFor="booking-time"
                      className="text-sm font-medium"
                    >
                      Time
                    </label>
                    <Input
                      id="booking-time"
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, time: e.target.value })
                      }
                      required
                      data-ocid="booking.input"
                    />
                  </div>
                  <div className="space-y-1 col-span-3 sm:col-span-1">
                    <label
                      htmlFor="booking-guests"
                      className="text-sm font-medium"
                    >
                      Guests
                    </label>
                    <Input
                      id="booking-guests"
                      type="number"
                      min="1"
                      max="50"
                      value={bookingForm.guests}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          guests: e.target.value,
                        })
                      }
                      required
                      data-ocid="booking.input"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="booking-message"
                    className="text-sm font-medium"
                  >
                    Special Requests (Optional)
                  </label>
                  <Textarea
                    id="booking-message"
                    placeholder="Birthday celebration, dietary needs, etc."
                    value={bookingForm.message}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        message: e.target.value,
                      })
                    }
                    rows={3}
                    data-ocid="booking.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  data-ocid="booking.submit_button"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Confirm Reservation
                </Button>
              </form>
            </motion.div>

            {/* Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-6 border border-border space-y-5">
                <h3 className="font-playfair text-2xl font-bold">Find Us</h3>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-muted-foreground text-sm leading-relaxed">
                      Piprali Rd, opp. Gurukripa Jee Academy G10,
                      <br />
                      New Janta Colony, Sikar,
                      <br />
                      Rajasthan 332001
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Opening Hours</div>
                    <div className="text-muted-foreground text-sm">
                      10:00 AM – 11:00 PM (All Days)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a
                      href="tel:+917568100920"
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      data-ocid="contact.link"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href="https://wa.me/917568100920?text=Hi%20DEKCHI%2C%20I%20want%20to%20book%20a%20table"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                    data-ocid="contact.primary_button"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 mr-2" /> Order on
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href="tel:+917568100920"
                    className="flex-1"
                    data-ocid="contact.secondary_button"
                  >
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" /> Call Now
                    </Button>
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.3!2d75.14!3d27.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDEKCHI+Multi+Cuisine+Restro+Sikar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DEKCHI Location Map"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-primary" />
                <span className="font-playfair font-bold text-lg">DEKCHI</span>
                <Badge
                  variant="outline"
                  className="text-xs border-primary/30 text-primary"
                >
                  Since 2024
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Multi Cuisine Restro serving authentic flavors in the heart of
                Sikar, Rajasthan. 100% Pure Vegetarian.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <Instagram className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  Piprali Rd, opp. Gurukripa Jee Academy G10, New Janta Colony,
                  Sikar, Rajasthan 332001
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  10:00 AM – 11:00 PM Daily
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>
              &copy; {currentYear} DEKCHI Multi Cuisine Restro. Built with ❤️
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ─────────────────────────────── */}
      <a
        href="https://wa.me/917568100920?text=Hi%20DEKCHI%2C%20I%20want%20to%20order%20food!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.button"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
