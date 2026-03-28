import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type Reservation = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    date : Text;
    time : Text;
    numberOfGuests : Nat;
    note : ?Text;
    timestamp : Time.Time;
  };

  type MenuItem = {
    id : Nat;
    category : Text;
    name : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
  };

  module Reservation {
    public func compare(res1 : Reservation, res2 : Reservation) : Order.Order {
      Nat.compare(res1.id, res2.id);
    };
  };

  let reservations = Map.empty<Nat, Reservation>();
  var nextId = 0;

  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  // ─── Menu Items Seed Data ────────────────────────────────────────────────────

  let menuItemsData : [MenuItem] = [
    // Best Sellers
    { id = 0; category = "Best Sellers"; name = "Mineral Water"; price = 25; description = ""; imageUrl = "/assets/generated/chhole-bhature.dim_600x400.jpg" },
    { id = 1; category = "Best Sellers"; name = "Hot Coffee"; price = 50; description = ""; imageUrl = "/assets/generated/cold-coffee-icecream.dim_600x400.jpg" },
    { id = 2; category = "Best Sellers"; name = "Masala Chhachh"; price = 55; description = ""; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    { id = 3; category = "Best Sellers"; name = "Soft Drink"; price = 40; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 4; category = "Best Sellers"; name = "Cold Coffee Plain"; price = 135; description = "Smooth and refreshing chilled coffee blended to perfection."; imageUrl = "/assets/generated/cold-coffee-icecream.dim_600x400.jpg" },
    { id = 5; category = "Best Sellers"; name = "Cold Coffee With Icecream"; price = 165; description = "Creamy chilled coffee topped with a scoop of ice cream."; imageUrl = "/assets/generated/cold-coffee-icecream.dim_600x400.jpg" },
    { id = 6; category = "Best Sellers"; name = "Green Salad"; price = 95; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 7; category = "Best Sellers"; name = "Chhole Bhature"; price = 210; description = "North Indian favorite – spicy chickpeas served with fluffy deep-fried bhature."; imageUrl = "/assets/generated/chhole-bhature.dim_600x400.jpg" },
    { id = 8; category = "Best Sellers"; name = "Paav Bhaji"; price = 210; description = "Mumbai's iconic street food – buttery pav with spicy mashed veggies."; imageUrl = "/assets/generated/paav-bhaji.dim_600x400.jpg" },
    { id = 9; category = "Best Sellers"; name = "Veg Grilled Sandwich"; price = 110; description = "Fresh veggies layered with savory spices and grilled till crispy."; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    { id = 10; category = "Best Sellers"; name = "Veg Cheese Grilled Sandwich"; price = 130; description = "Loaded with melted cheese and fresh veggies grilled to golden perfection."; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    { id = 11; category = "Best Sellers"; name = "Veg Burger"; price = 105; description = "Fresh veggie patty layered with crisp lettuce sauces and soft buns."; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    { id = 12; category = "Best Sellers"; name = "Cheese Burger"; price = 120; description = "Juicy patty topped with melted cheese and fresh veggies in a toasted bun."; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    { id = 13; category = "Best Sellers"; name = "OTC Pizza"; price = 210; description = "A cheesy overload topped with onion tomato and capsicum."; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    { id = 14; category = "Best Sellers"; name = "Masala Dosa"; price = 199; description = "Crispy South Indian dosa filled with spiced potato masala."; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 15; category = "Best Sellers"; name = "Paneer Lababdar"; price = 450; description = "Creamy mildly spiced curry made with soft paneer cubes in rich tomato gravy."; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 16; category = "Best Sellers"; name = "Kadhai Paneer"; price = 410; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 17; category = "Best Sellers"; name = "Dal Fry"; price = 250; description = "A comforting mix of lentils tempered with ghee garlic and aromatic spices."; imageUrl = "/assets/generated/dal-makhani.dim_600x400.jpg" },
    { id = 18; category = "Best Sellers"; name = "Veg Raita"; price = 95; description = ""; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    { id = 19; category = "Best Sellers"; name = "Tandoori Plain Roti"; price = 25; description = ""; imageUrl = "/assets/generated/butter-naan.dim_600x400.jpg" },
    { id = 20; category = "Best Sellers"; name = "Tandoori Butter Roti"; price = 30; description = ""; imageUrl = "/assets/generated/butter-naan.dim_600x400.jpg" },
    { id = 21; category = "Best Sellers"; name = "Butter Naan"; price = 90; description = "Soft fluffy naan brushed generously with butter."; imageUrl = "/assets/generated/butter-naan.dim_600x400.jpg" },
    { id = 22; category = "Best Sellers"; name = "Shahi Paneer"; price = 320; description = "Rich creamy paneer curry cooked in a royal cashew-tomato gravy."; imageUrl = "/assets/generated/shahi-paneer.dim_600x400.jpg" },
    // Beverages / Lassi
    { id = 23; category = "Lassi"; name = "Red Bull"; price = 150; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 24; category = "Lassi"; name = "Fresh Lime Soda"; price = 80; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 25; category = "Lassi"; name = "Salted Lassi"; price = 75; description = "Refreshing tangy yogurt drink with a pinch of salt."; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    { id = 26; category = "Lassi"; name = "Fresh Lime Water"; price = 40; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 27; category = "Lassi"; name = "Sweet Lassi"; price = 90; description = "Chilled creamy yogurt drink sweetened to perfection."; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    { id = 28; category = "Lassi"; name = "Juice (Per Glass)"; price = 69; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 29; category = "Lassi"; name = "Dekchi's Special Lassi"; price = 149; description = ""; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    // Shakes
    { id = 30; category = "Shakes"; name = "Papaya Shake"; price = 115; description = ""; imageUrl = "/assets/generated/chocolate-shake.dim_600x400.jpg" },
    { id = 31; category = "Shakes"; name = "Butterscotch Shake"; price = 125; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    { id = 32; category = "Shakes"; name = "Chocolate Shake"; price = 125; description = ""; imageUrl = "/assets/generated/chocolate-shake.dim_600x400.jpg" },
    { id = 33; category = "Shakes"; name = "Kit-Kat Shake"; price = 130; description = ""; imageUrl = "/assets/generated/chocolate-shake.dim_600x400.jpg" },
    { id = 34; category = "Shakes"; name = "Banana Shake"; price = 99; description = ""; imageUrl = "/assets/generated/chocolate-shake.dim_600x400.jpg" },
    { id = 35; category = "Shakes"; name = "Strawberry Shake"; price = 120; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    { id = 36; category = "Shakes"; name = "Vanilla Shake"; price = 115; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    { id = 37; category = "Shakes"; name = "Oreo Shake"; price = 135; description = ""; imageUrl = "/assets/generated/chocolate-shake.dim_600x400.jpg" },
    // Salad
    { id = 38; category = "Salad"; name = "Russian Salad"; price = 169; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 39; category = "Salad"; name = "Kachumber Salad"; price = 70; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 40; category = "Salad"; name = "Onion Salad"; price = 60; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 41; category = "Salad"; name = "Cucumber Salad"; price = 60; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 42; category = "Salad"; name = "Fruit Salad"; price = 140; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    { id = 43; category = "Salad"; name = "Classic Caesar Salad"; price = 120; description = ""; imageUrl = "/assets/generated/fruit-salad.dim_600x400.jpg" },
    // Chinese Starter
    { id = 44; category = "Chinese Starter"; name = "Cheese Balls"; price = 240; description = "Golden-fried balls filled with melted cheese."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    { id = 45; category = "Chinese Starter"; name = "Paneer 65"; price = 310; description = "Spicy South Indian-style paneer starter."; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 46; category = "Chinese Starter"; name = "Honey Chilli Potato"; price = 270; description = "Crispy potato fingers glazed in sweet and spicy honey-chilli sauce."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    { id = 47; category = "Chinese Starter"; name = "Chilli Mushroom Dry"; price = 285; description = "Crispy mushrooms tossed in spicy chilli sauce."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    { id = 48; category = "Chinese Starter"; name = "Veg Crispy Corn"; price = 260; description = "Crunchy golden corn tossed with spices and herbs."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    { id = 49; category = "Chinese Starter"; name = "Chilli Paneer Dry"; price = 310; description = "Paneer cubes tossed with onions capsicum and fiery chilli sauce."; imageUrl = "/assets/generated/chilli-paneer.dim_600x400.jpg" },
    { id = 50; category = "Chinese Starter"; name = "Spinach Cheese Cigar Roll"; price = 265; description = ""; imageUrl = "/assets/generated/veg-spring-roll.dim_600x400.jpg" },
    { id = 51; category = "Chinese Starter"; name = "Veg Manchurian Dry"; price = 285; description = "Crispy veggie balls tossed in spicy Indo-Chinese sauce."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    { id = 52; category = "Chinese Starter"; name = "Veg Spring Roll"; price = 245; description = "Golden crispy rolls stuffed with spiced veggies."; imageUrl = "/assets/generated/veg-spring-roll.dim_600x400.jpg" },
    { id = 53; category = "Chinese Starter"; name = "Crispy Veg In H.G. Sauce"; price = 260; description = "Crunchy fried veggies tossed in Hot Garlic sauce."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    { id = 54; category = "Chinese Starter"; name = "Chilli Potato"; price = 260; description = "Fried potato fingers in hot and tangy Indo-Chinese sauce."; imageUrl = "/assets/generated/honey-chilli-potato.dim_600x400.jpg" },
    // Chinese Main
    { id = 55; category = "Chinese Main"; name = "Chilli Paneer Gravy"; price = 310; description = "Soft paneer cubes in spicy tangy chilli garlic gravy."; imageUrl = "/assets/generated/chilli-paneer.dim_600x400.jpg" },
    { id = 56; category = "Chinese Main"; name = "Veg Manchurian Gravy"; price = 290; description = "Crispy veggie balls in spicy tangy Indo-Chinese gravy."; imageUrl = "/assets/generated/veg-noodles.dim_600x400.jpg" },
    { id = 57; category = "Chinese Main"; name = "Chilli Garlic Noodles"; price = 245; description = "Stir-fried noodles bursting with chilli and garlic."; imageUrl = "/assets/generated/veg-noodles.dim_600x400.jpg" },
    { id = 58; category = "Chinese Main"; name = "Veg Fried Rice"; price = 255; description = "Fragrant rice tossed with mixed veggies and soy."; imageUrl = "/assets/generated/veg-fried-rice.dim_600x400.jpg" },
    { id = 59; category = "Chinese Main"; name = "Tripple Schezwan Fried Rice"; price = 320; description = "A fiery combo of rice noodles and Schezwan sauce."; imageUrl = "/assets/generated/veg-fried-rice.dim_600x400.jpg" },
    { id = 60; category = "Chinese Main"; name = "Penne Alfredo Pasta (White)"; price = 299; description = "Silky white sauce pasta with creamy cheesy twist."; imageUrl = "/assets/generated/penne-pasta.dim_600x400.jpg" },
    { id = 61; category = "Chinese Main"; name = "Penne Arrabiata Pasta (Red)"; price = 290; description = "Penne in spicy tangy tomato sauce with Italian herbs."; imageUrl = "/assets/generated/penne-pasta.dim_600x400.jpg" },
    { id = 62; category = "Chinese Main"; name = "Saute Vegetable"; price = 270; description = ""; imageUrl = "/assets/generated/veg-noodles.dim_600x400.jpg" },
    { id = 63; category = "Chinese Main"; name = "Veg Hakka Noodles"; price = 230; description = "Classic Indo-Chinese noodles with fresh veggies."; imageUrl = "/assets/generated/veg-noodles.dim_600x400.jpg" },
    { id = 64; category = "Chinese Main"; name = "Veg Chowmein"; price = 230; description = "Street-style noodles stir-fried with crunchy veggies."; imageUrl = "/assets/generated/veg-noodles.dim_600x400.jpg" },
    { id = 65; category = "Chinese Main"; name = "Penne Pasta In Pink Sauce"; price = 299; description = "Creamy tangy fusion of red and white sauce."; imageUrl = "/assets/generated/penne-pasta.dim_600x400.jpg" },
    // Fast Food
    { id = 66; category = "Fast Food"; name = "Extra Bhatura"; price = 45; description = ""; imageUrl = "/assets/generated/chhole-bhature.dim_600x400.jpg" },
    { id = 67; category = "Fast Food"; name = "Extra Paav (2 Pcs)"; price = 50; description = ""; imageUrl = "/assets/generated/paav-bhaji.dim_600x400.jpg" },
    { id = 68; category = "Fast Food"; name = "Cheese Chilli Toast"; price = 139; description = ""; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    { id = 69; category = "Fast Food"; name = "Cheese Garlic Toast"; price = 149; description = ""; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    // Sandwich
    { id = 70; category = "Sandwich"; name = "Paneer Tikka Sandwich"; price = 169; description = ""; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    { id = 71; category = "Sandwich"; name = "Peri-Peri Fries"; price = 189; description = ""; imageUrl = "/assets/generated/french-fries.dim_600x400.jpg" },
    { id = 72; category = "Sandwich"; name = "French Fries"; price = 169; description = ""; imageUrl = "/assets/generated/french-fries.dim_600x400.jpg" },
    { id = 73; category = "Sandwich"; name = "Dekchi Special Sandwich"; price = 199; description = ""; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    { id = 74; category = "Sandwich"; name = "Veg Plain Sandwich"; price = 79; description = ""; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    { id = 75; category = "Sandwich"; name = "Veg Club Sandwich (Chef Style)"; price = 179; description = ""; imageUrl = "/assets/generated/veg-grilled-sandwich.dim_600x400.jpg" },
    // Burger
    { id = 76; category = "Burger"; name = "Veg Burger"; price = 105; description = ""; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    { id = 77; category = "Burger"; name = "Cheese Burger"; price = 120; description = ""; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    { id = 78; category = "Burger"; name = "Double Cheese Burger"; price = 140; description = "Double the cheese double the joy."; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    { id = 79; category = "Burger"; name = "Paneer Tikka Burger"; price = 165; description = "Juicy paneer tikka patty loaded with sauces and veggies."; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    { id = 80; category = "Burger"; name = "Chef Special Burger"; price = 180; description = ""; imageUrl = "/assets/generated/veg-burger.dim_600x400.jpg" },
    // Pizza
    { id = 81; category = "Pizza"; name = "Margaretta Pizza"; price = 299; description = ""; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    { id = 82; category = "Pizza"; name = "Four Season Pizza"; price = 329; description = ""; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    { id = 83; category = "Pizza"; name = "Classic Corn Pizza"; price = 239; description = ""; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    { id = 84; category = "Pizza"; name = "Indian Paneer Pizza"; price = 349; description = ""; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    { id = 85; category = "Pizza"; name = "Farm House Pizza"; price = 329; description = ""; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    { id = 86; category = "Pizza"; name = "Dekchi Special Pizza"; price = 389; description = ""; imageUrl = "/assets/generated/dekchi-pizza.dim_600x400.jpg" },
    // South Indian
    { id = 87; category = "South Indian"; name = "Paneer Masala Dosa"; price = 299; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 88; category = "South Indian"; name = "Chilli Paneer Dosa"; price = 299; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 89; category = "South Indian"; name = "Cheese Chilli Paneer Dosa"; price = 329; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 90; category = "South Indian"; name = "Vegetable Uttapam"; price = 199; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 91; category = "South Indian"; name = "Steamed Idli"; price = 129; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 92; category = "South Indian"; name = "Fried Idli"; price = 189; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 93; category = "South Indian"; name = "Masala Idli"; price = 210; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 94; category = "South Indian"; name = "Plain Dosa"; price = 149; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 95; category = "South Indian"; name = "Mysoor Masala Dosa"; price = 229; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 96; category = "South Indian"; name = "Masala Dosa"; price = 199; description = "Crispy South Indian crepe filled with spiced potato masala."; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 97; category = "South Indian"; name = "Chef Special Dosa"; price = 349; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 98; category = "South Indian"; name = "Student Idli Packing"; price = 129; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 99; category = "South Indian"; name = "Student Idli (2pc)"; price = 129; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    { id = 100; category = "South Indian"; name = "Student Dosa Packing"; price = 119; description = ""; imageUrl = "/assets/generated/masala-dosa.dim_600x400.jpg" },
    // Tandoor Starter
    { id = 101; category = "Tandoor Starter"; name = "Masala Papad"; price = 50; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 102; category = "Tandoor Starter"; name = "Roasted Papad"; price = 30; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 103; category = "Tandoor Starter"; name = "Tandoori Veg Platter"; price = 439; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 104; category = "Tandoor Starter"; name = "Paneer Malai Tikka"; price = 389; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 105; category = "Tandoor Starter"; name = "Lehsuni Paneer Tikka"; price = 389; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 106; category = "Tandoor Starter"; name = "Achari Paneer Tikka"; price = 289; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 107; category = "Tandoor Starter"; name = "Paneer Angara Tikka"; price = 319; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 108; category = "Tandoor Starter"; name = "Paneer Tikka Plain"; price = 319; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 109; category = "Tandoor Starter"; name = "Hariyali Paneer Tikka"; price = 349; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 110; category = "Tandoor Starter"; name = "Veg Kathi Roll"; price = 289; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 111; category = "Tandoor Starter"; name = "Paneer Kathi Roll"; price = 329; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    // Paneer & Main Course
    { id = 112; category = "Paneer"; name = "Paneer Butter Masala"; price = 399; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 113; category = "Paneer"; name = "Matar Paneer"; price = 329; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 114; category = "Paneer"; name = "Palak Paneer"; price = 399; description = ""; imageUrl = "/assets/generated/palak-paneer.dim_600x400.jpg" },
    { id = 115; category = "Paneer"; name = "Jaipuri Paneer"; price = 399; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 116; category = "Paneer"; name = "Paneer Tikka Masala"; price = 339; description = ""; imageUrl = "/assets/generated/paneer-tikka.dim_600x400.jpg" },
    { id = 117; category = "Paneer"; name = "Paneer Do Pyaza"; price = 399; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 118; category = "Paneer"; name = "Paneer Burji"; price = 380; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 119; category = "Paneer"; name = "Paneer Toofani"; price = 410; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 120; category = "Paneer"; name = "Khoya Paneer Masala"; price = 470; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 121; category = "Paneer"; name = "Kadhai Veg"; price = 360; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 122; category = "Paneer"; name = "Mixed Veg"; price = 270; description = ""; imageUrl = "/assets/generated/palak-paneer.dim_600x400.jpg" },
    { id = 123; category = "Paneer"; name = "Veg Jalfrezi"; price = 330; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 124; category = "Paneer"; name = "Matar Mushroom"; price = 339; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 125; category = "Paneer"; name = "Mushroom Masala"; price = 310; description = ""; imageUrl = "/assets/generated/mushroom-soup.dim_600x400.jpg" },
    { id = 126; category = "Paneer"; name = "Mushroom Do Pyaza"; price = 389; description = ""; imageUrl = "/assets/generated/mushroom-soup.dim_600x400.jpg" },
    { id = 127; category = "Paneer"; name = "Jodhpuri Gatta Masala"; price = 360; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 128; category = "Paneer"; name = "Bhindi Masala"; price = 330; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 129; category = "Paneer"; name = "Jeera Aalu"; price = 280; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 130; category = "Paneer"; name = "Dum Aalu Chutney Wala"; price = 349; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 131; category = "Paneer"; name = "Aalu Gobhi Adraki"; price = 310; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 132; category = "Paneer"; name = "Hariyali Veg"; price = 329; description = ""; imageUrl = "/assets/generated/palak-paneer.dim_600x400.jpg" },
    { id = 133; category = "Paneer"; name = "Sev Tamatar"; price = 250; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 134; category = "Paneer"; name = "Sev Bhaji"; price = 299; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 135; category = "Paneer"; name = "Navratan Korma"; price = 430; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 136; category = "Paneer"; name = "Nargis Kofta"; price = 280; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 137; category = "Paneer"; name = "Veg Kofta Curry"; price = 330; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 138; category = "Paneer"; name = "Jaipuri Veg"; price = 380; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 139; category = "Paneer"; name = "Palak Corn"; price = 330; description = ""; imageUrl = "/assets/generated/palak-paneer.dim_600x400.jpg" },
    { id = 140; category = "Paneer"; name = "Soya Chap Masala"; price = 380; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 141; category = "Paneer"; name = "Methi Matar Malai"; price = 370; description = ""; imageUrl = "/assets/generated/palak-paneer.dim_600x400.jpg" },
    { id = 142; category = "Paneer"; name = "Chana Masala"; price = 320; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 143; category = "Paneer"; name = "Kadhi Pakora"; price = 320; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 144; category = "Paneer"; name = "Dekchi Special Anguri Veg"; price = 419; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 145; category = "Paneer"; name = "Kaju Curry"; price = 380; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    { id = 146; category = "Paneer"; name = "Malai Kofta"; price = 330; description = ""; imageUrl = "/assets/generated/paneer-butter-masala.dim_600x400.jpg" },
    // Dal
    { id = 147; category = "Dal"; name = "Double Dal Tadka"; price = 249; description = "Yellow dal tempered with ghee cumin and garlic."; imageUrl = "/assets/generated/dal-makhani.dim_600x400.jpg" },
    { id = 148; category = "Dal"; name = "Dal Panchmel"; price = 295; description = ""; imageUrl = "/assets/generated/dal-makhani.dim_600x400.jpg" },
    { id = 149; category = "Dal"; name = "Dal Makhani"; price = 299; description = "Slow-cooked black lentils in rich buttery creamy tomato gravy."; imageUrl = "/assets/generated/dal-makhani.dim_600x400.jpg" },
    // Rice
    { id = 150; category = "Rice"; name = "Kashmiri Pulao"; price = 239; description = ""; imageUrl = "/assets/generated/veg-biryani.dim_600x400.jpg" },
    { id = 151; category = "Rice"; name = "Veg Pulao"; price = 219; description = ""; imageUrl = "/assets/generated/veg-biryani.dim_600x400.jpg" },
    { id = 152; category = "Rice"; name = "Steamed Rice"; price = 179; description = ""; imageUrl = "/assets/generated/veg-biryani.dim_600x400.jpg" },
    { id = 153; category = "Rice"; name = "Peas Pulao"; price = 199; description = ""; imageUrl = "/assets/generated/veg-biryani.dim_600x400.jpg" },
    { id = 154; category = "Rice"; name = "Jeera Rice"; price = 210; description = ""; imageUrl = "/assets/generated/veg-biryani.dim_600x400.jpg" },
    { id = 155; category = "Rice"; name = "Chef Special Biryani With Raita"; price = 389; description = ""; imageUrl = "/assets/generated/veg-biryani.dim_600x400.jpg" },
    // Curd
    { id = 156; category = "Curd"; name = "Plain Curd"; price = 85; description = ""; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    { id = 157; category = "Curd"; name = "Fruit Raita"; price = 139; description = "Cool and creamy yogurt with juicy fresh fruits."; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    { id = 158; category = "Curd"; name = "Boondi Raita"; price = 89; description = "Refreshing yogurt mixed with crispy boondi."; imageUrl = "/assets/generated/sweet-lassi.dim_600x400.jpg" },
    // Dessert
    { id = 159; category = "Dessert"; name = "Gulab Jamun"; price = 80; description = ""; imageUrl = "/assets/generated/gulab-jamun-icecream.dim_600x400.jpg" },
    { id = 160; category = "Dessert"; name = "Gulab Jamun With Icecream"; price = 110; description = ""; imageUrl = "/assets/generated/gulab-jamun-icecream.dim_600x400.jpg" },
    // Mocktail
    { id = 161; category = "Mocktail"; name = "Kiwi Paradise"; price = 160; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 162; category = "Mocktail"; name = "Ginger Mint Mojito"; price = 139; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 163; category = "Mocktail"; name = "Mint Cucumber Salty"; price = 139; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 164; category = "Mocktail"; name = "Masala Soda"; price = 89; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 165; category = "Mocktail"; name = "Cranberry Mojito"; price = 149; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 166; category = "Mocktail"; name = "Virgin Mint Mojito"; price = 129; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 167; category = "Mocktail"; name = "Blue Lagoon"; price = 139; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 168; category = "Mocktail"; name = "Mint Added Red Bull"; price = 220; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 169; category = "Mocktail"; name = "Sweet Sunrise"; price = 120; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 170; category = "Mocktail"; name = "Mocktail Hugama"; price = 169; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 171; category = "Mocktail"; name = "Mirinda Salty"; price = 120; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 172; category = "Mocktail"; name = "Orange Mint Mojito"; price = 149; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 173; category = "Mocktail"; name = "Fruit Punch"; price = 179; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 174; category = "Mocktail"; name = "Spicy Mint Mojito"; price = 149; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    { id = 175; category = "Mocktail"; name = "Spicy Guava"; price = 149; description = ""; imageUrl = "/assets/generated/mint-mojito.dim_600x400.jpg" },
    // Ice Cream
    { id = 176; category = "Ice Cream"; name = "Chocolate Icecream"; price = 89; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    { id = 177; category = "Ice Cream"; name = "Butterscotch Icecream"; price = 99; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    { id = 178; category = "Ice Cream"; name = "Vanilla Icecream"; price = 70; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    { id = 179; category = "Ice Cream"; name = "Strawberry Icecream"; price = 89; description = ""; imageUrl = "/assets/generated/butterscotch-icecream.dim_600x400.jpg" },
    // Soup
    { id = 180; category = "Soup"; name = "Veg Minestrone Soup"; price = 110; description = ""; imageUrl = "/assets/generated/mushroom-soup.dim_600x400.jpg" },
    { id = 181; category = "Soup"; name = "Cream Of Mushroom Soup"; price = 129; description = ""; imageUrl = "/assets/generated/mushroom-soup.dim_600x400.jpg" },
    { id = 182; category = "Soup"; name = "Veg Lemon Coriander Soup"; price = 110; description = ""; imageUrl = "/assets/generated/mushroom-soup.dim_600x400.jpg" },
  ];

  public query func getMenuItems() : async [MenuItem] {
    menuItemsData;
  };

  public query func getMenuItemsByCategory(category : Text) : async [MenuItem] {
    menuItemsData.filter( func(item : MenuItem) : Bool {
      item.category == category;
    });
  };

  public shared ({ caller = _ }) func createReservation(name : Text, phoneNumber : Text, date : Text, time : Text, numberOfGuests : Nat, note : ?Text) : async Nat {
    let id = getNextId();
    let reservation : Reservation = {
      id;
      name;
      phoneNumber;
      date;
      time;
      numberOfGuests;
      note;
      timestamp = Time.now();
    };
    reservations.add(id, reservation);
    id;
  };

  public query ({ caller = _ }) func getReservation(id : Nat) : async Reservation {
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation does not exist") };
      case (?reservation) { reservation };
    };
  };

  public query ({ caller = _ }) func getAllReservations() : async [Reservation] {
    reservations.values().toArray().sort();
  };
};
