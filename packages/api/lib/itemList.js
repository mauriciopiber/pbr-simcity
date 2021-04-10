"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsList = exports.buildingsList = void 0;
/** Define buildings */
const industry = {
    name: 'Industry',
    slots: (6 * 5) + (2 * 4),
    parallel: true,
    nextSlot: null,
    slug: 'industry',
};
const supplies = {
    name: 'Supplies Store',
    slots: 8,
    parallel: false,
    nextSlot: 40,
    slug: 'supplies',
};
const hardware = {
    name: 'Hardware Store',
    slots: 8,
    parallel: false,
    nextSlot: 40,
    slug: 'hardware',
};
const farmer = {
    name: "Farmer's Market",
    slots: 6,
    parallel: false,
    nextSlot: 32,
    slug: 'farmers',
};
const furniture = {
    name: 'Furniture Store',
    slots: 4,
    parallel: false,
    nextSlot: 20,
    slug: 'furniture',
};
const gardening = {
    name: 'Gardening Supplies',
    slots: 5,
    parallel: false,
    nextSlot: 26,
    slug: 'gardening',
};
const donut = {
    name: 'Donut Shop',
    slots: 6,
    parallel: false,
    nextSlot: 32,
    slug: 'donut',
};
const fashion = {
    name: 'Fashion Store',
    slots: 4,
    parallel: false,
    nextSlot: 20,
    slug: 'fashion',
};
const fastFood = {
    name: 'Fast Food Restaurant',
    slots: 3,
    parallel: false,
    nextSlot: 14,
    slug: 'fast-food',
};
const home = {
    name: 'Home Appliances',
    slots: 3,
    parallel: false,
    nextSlot: 14,
    slug: 'home-appliances',
};
exports.buildingsList = [
    industry,
    supplies,
    hardware,
    farmer,
    furniture,
    gardening,
    donut,
    fashion,
    fastFood,
    home,
];
/* Define Items */
const metal = {
    name: 'Metal',
    productionTime: 1,
    level: 1,
    building: industry,
    maxValue: 10,
    depends: [],
    slug: 'metal',
};
const woods = {
    name: 'Wood',
    productionTime: 3,
    level: 2,
    building: industry,
    maxValue: 20,
    depends: [],
    slug: 'wood',
};
const plastic = {
    name: 'Plastic',
    productionTime: 9,
    level: 5,
    building: industry,
    maxValue: 25,
    depends: [],
    slug: 'plastic',
};
const seeds = {
    name: 'Seeds',
    productionTime: 20,
    level: 7,
    building: industry,
    maxValue: 30,
    depends: [],
    slug: 'seeds',
};
const minerals = {
    name: 'Minerals',
    productionTime: 30,
    level: 11,
    building: industry,
    maxValue: 40,
    depends: [],
    slug: 'minerals',
};
const chemicals = {
    name: 'Chemicals',
    productionTime: 120,
    level: 13,
    building: industry,
    maxValue: 60,
    depends: [],
    slug: 'chemicals',
};
const textiles = {
    name: 'Textiles',
    productionTime: 180,
    level: 15,
    building: industry,
    maxValue: 90,
    depends: [],
    slug: 'textiles',
};
const sugar = {
    name: 'Sugar and Spices',
    productionTime: 240,
    level: 17,
    building: industry,
    maxValue: 110,
    depends: [],
    slug: 'sugar',
};
const glass = {
    name: 'Glass',
    productionTime: 300,
    level: 19,
    building: industry,
    maxValue: 120,
    depends: [],
    slug: 'glass',
};
const animalFeed = {
    name: 'Animal Feed',
    productionTime: 360,
    level: 23,
    building: industry,
    maxValue: 140,
    depends: [],
    slug: 'animal-feed',
};
const electricalComponents = {
    name: 'Electrical Components',
    productionTime: 420,
    level: 29,
    building: industry,
    maxValue: 160,
    depends: [],
    slug: 'electrical-components',
};
const nails = {
    name: 'Nails',
    productionTime: 5,
    level: 1,
    building: supplies,
    maxValue: 80,
    slug: 'nails',
    depends: [
        {
            item: metal,
            quantity: 2,
        },
    ],
};
const planks = {
    name: 'Planks',
    slug: 'planks',
    productionTime: 30,
    level: 3,
    building: supplies,
    maxValue: 120,
    depends: [
        {
            item: woods,
            quantity: 2,
        },
    ],
};
const bricks = {
    name: 'Bricks',
    slug: 'bricks',
    productionTime: 20,
    level: 13,
    building: supplies,
    maxValue: 190,
    depends: [
        {
            item: minerals,
            quantity: 2,
        },
    ],
};
const cement = {
    name: 'Cement',
    slug: 'cement',
    productionTime: 50,
    level: 14,
    building: supplies,
    maxValue: 440,
    depends: [
        {
            item: minerals,
            quantity: 2,
        },
        {
            item: chemicals,
            quantity: 1,
        },
    ],
};
const glue = {
    name: 'Glue',
    slug: 'glue',
    productionTime: 60,
    level: 15,
    building: supplies,
    maxValue: 440,
    depends: [
        {
            item: plastic,
            quantity: 1,
        },
        {
            item: chemicals,
            quantity: 2,
        },
    ],
};
const paint = {
    name: 'Paint',
    slug: 'paint',
    productionTime: 60,
    level: 16,
    building: supplies,
    maxValue: 320,
    depends: [
        {
            item: metal,
            quantity: 2,
        },
        {
            item: minerals,
            quantity: 1,
        },
        {
            item: chemicals,
            quantity: 2,
        },
    ],
};
const hammer = {
    name: 'Hammer',
    slug: 'hammer',
    productionTime: 14,
    level: 4,
    building: hardware,
    maxValue: 90,
    depends: [
        {
            item: metal,
            quantity: 1,
        },
        {
            item: woods,
            quantity: 1,
        },
    ],
};
const measuringTape = {
    name: 'Measuring Tape',
    slug: 'measuring-tape',
    productionTime: 20,
    level: 6,
    building: hardware,
    maxValue: 110,
    depends: [
        {
            item: metal,
            quantity: 1,
        },
        {
            item: plastic,
            quantity: 1,
        },
    ],
};
const shovel = {
    name: 'Shovel',
    slug: 'shovel',
    productionTime: 30,
    level: 9,
    building: hardware,
    maxValue: 150,
    depends: [
        {
            item: metal,
            quantity: 1,
        },
        {
            item: woods,
            quantity: 1,
        },
        {
            item: plastic,
            quantity: 1,
        },
    ],
};
const cookingUtensils = {
    name: 'Cooking Utensils',
    slug: 'cooking-utensils',
    productionTime: 45,
    level: 17,
    building: hardware,
    maxValue: 250,
    depends: [
        {
            item: metal,
            quantity: 2,
        },
        {
            item: woods,
            quantity: 2,
        },
        {
            item: plastic,
            quantity: 2,
        },
    ],
};
const ladder = {
    name: 'Ladder',
    slug: 'ladder',
    productionTime: 60,
    level: 20,
    building: hardware,
    maxValue: 420,
    depends: [
        {
            item: metal,
            quantity: 2,
        },
        {
            item: planks,
            quantity: 2,
        },
    ],
};
const drill = {
    name: 'Drill',
    slug: 'drill',
    productionTime: 120,
    level: 30,
    building: hardware,
    maxValue: 590,
    depends: [
        {
            item: metal,
            quantity: 2,
        },
        {
            item: plastic,
            quantity: 2,
        },
        {
            item: electricalComponents,
            quantity: 1,
        },
    ],
};
const grass = {
    name: 'Grass',
    slug: 'grass',
    productionTime: 30,
    level: 14,
    building: gardening,
    maxValue: 310,
    depends: [
        {
            item: seeds,
            quantity: 1,
        },
        {
            item: shovel,
            quantity: 1,
        },
    ],
};
const treeSaplings = {
    name: 'Tree Saplings',
    slug: 'tree-saplings',
    productionTime: 90,
    level: 16,
    building: gardening,
    maxValue: 420,
    depends: [
        {
            item: seeds,
            quantity: 2,
        },
        {
            item: shovel,
            quantity: 1,
        },
    ],
};
const gardenFurniture = {
    name: 'Garden Furniture',
    slug: 'garden-furniture',
    productionTime: 135,
    level: 21,
    building: gardening,
    maxValue: 820,
    depends: [
        {
            item: planks,
            quantity: 2,
        },
        {
            item: textiles,
            quantity: 2,
        },
        {
            item: plastic,
            quantity: 2,
        },
    ],
};
const firePit = {
    name: 'Fire Pit',
    slug: 'fire-pit',
    productionTime: 240,
    level: 28,
    building: gardening,
    maxValue: 1740,
    depends: [
        {
            item: shovel,
            quantity: 1,
        },
        {
            item: bricks,
            quantity: 2,
        },
        {
            item: cement,
            quantity: 2,
        },
    ],
};
const LawnMower = {
    name: 'Lawn Mower',
    slug: 'lawn-mower',
    productionTime: 120,
    level: 30,
    building: gardening,
    maxValue: 840,
    depends: [
        {
            item: metal,
            quantity: 3,
        },
        {
            item: electricalComponents,
            quantity: 1,
        },
        {
            item: paint,
            quantity: 1,
        },
    ],
};
const gardenGnomes = {
    name: 'Garden Gnomes',
    slug: 'garden-gnomes',
    productionTime: 90,
    level: 34,
    building: gardening,
    maxValue: 1600,
    depends: [
        {
            item: cement,
            quantity: 2,
        },
        {
            item: glue,
            quantity: 1,
        },
    ],
};
const vegetables = {
    name: 'Vegetables',
    slug: 'vegetables',
    productionTime: 20,
    level: 8,
    building: farmer,
    maxValue: 160,
    depends: [
        {
            item: seeds,
            quantity: 2,
        },
    ],
};
const flourBag = {
    name: 'Flour Bag',
    slug: 'flour-bag',
    productionTime: 30,
    level: 17,
    building: farmer,
    maxValue: 570,
    depends: [
        {
            item: seeds,
            quantity: 2,
        },
        {
            item: textiles,
            quantity: 2,
        },
    ],
};
const fruit = {
    name: 'Fruit and Berries',
    slug: 'fruit-and-berries',
    productionTime: 90,
    level: 18,
    building: farmer,
    maxValue: 730,
    depends: [
        {
            item: seeds,
            quantity: 2,
        },
        {
            item: treeSaplings,
            quantity: 1,
        },
    ],
};
const cream = {
    name: 'Cream',
    slug: 'cream',
    productionTime: 75,
    level: 23,
    building: farmer,
    maxValue: 440,
    depends: [
        {
            item: animalFeed,
            quantity: 1,
        },
    ],
};
const corn = {
    name: 'Corn',
    slug: 'corn',
    productionTime: 60,
    level: 24,
    building: farmer,
    maxValue: 280,
    depends: [
        {
            item: minerals,
            quantity: 1,
        },
        {
            item: seeds,
            quantity: 4,
        },
    ],
};
const cheese = {
    name: 'Cheese',
    slug: 'cheese',
    productionTime: 105,
    level: 26,
    maxValue: 660,
    building: farmer,
    depends: [
        {
            item: animalFeed,
            quantity: 2,
        },
    ],
};
const beef = {
    name: 'Beef',
    slug: 'beef',
    productionTime: 150,
    level: 27,
    maxValue: 860,
    building: farmer,
    depends: [
        {
            item: animalFeed,
            quantity: 3,
        },
    ],
};
const chairs = {
    name: 'Chairs',
    slug: 'chairs',
    productionTime: 20,
    level: 10,
    maxValue: 300,
    building: furniture,
    depends: [
        {
            item: woods,
            quantity: 2,
        },
        {
            item: nails,
            quantity: 1,
        },
        {
            item: hammer,
            quantity: 1,
        },
    ],
};
const tables = {
    name: 'Tables',
    slug: 'tables',
    productionTime: 30,
    level: 16,
    maxValue: 500,
    building: furniture,
    depends: [
        {
            item: nails,
            quantity: 2,
        },
        {
            item: planks,
            quantity: 1,
        },
        {
            item: hammer,
            quantity: 1,
        },
    ],
};
const homeTextiles = {
    name: 'Home Textiles',
    slug: 'home-textiles',
    productionTime: 75,
    maxValue: 610,
    level: 25,
    building: furniture,
    depends: [
        {
            item: textiles,
            quantity: 2,
        },
        {
            item: measuringTape,
            quantity: 1,
        },
    ],
};
const cupboard = {
    name: 'Cupboard',
    slug: 'cupboard',
    level: 26,
    maxValue: 900,
    productionTime: 45,
    building: furniture,
    depends: [
        {
            item: glass,
            quantity: 2,
        },
        {
            item: planks,
            quantity: 2,
        },
        {
            item: paint,
            quantity: 1,
        },
    ],
};
const couch = {
    name: 'Couch',
    slug: 'couch',
    level: 33,
    maxValue: 1810,
    productionTime: 150,
    building: furniture,
    depends: [
        {
            item: textiles,
            quantity: 3,
        },
        {
            item: glue,
            quantity: 1,
        },
        {
            item: drill,
            quantity: 1,
        },
    ],
};
const donuts = {
    name: 'Donuts',
    slug: 'donuts',
    level: 18,
    maxValue: 950,
    productionTime: 45,
    building: donut,
    depends: [
        {
            item: sugar,
            quantity: 1,
        },
        {
            item: flourBag,
            quantity: 1,
        },
    ],
};
const greenSmoothie = {
    name: 'Green Smoothie',
    slug: 'green-smoothie',
    level: 20,
    maxValue: 1150,
    productionTime: 30,
    building: donut,
    depends: [
        {
            item: vegetables,
            quantity: 1,
        },
        {
            item: fruit,
            quantity: 1,
        },
    ],
};
const breadRoll = {
    name: 'Bread Roll',
    slug: 'bread-roll',
    level: 24,
    maxValue: 1840,
    productionTime: 60,
    building: donut,
    depends: [
        {
            item: flourBag,
            quantity: 2,
        },
        {
            item: cream,
            quantity: 1,
        },
    ],
};
const cherryCheesecake = {
    name: 'Cherry Cheesecake',
    slug: 'cherry-cheesecake',
    level: 27,
    maxValue: 2240,
    productionTime: 90,
    building: donut,
    depends: [
        {
            item: flourBag,
            quantity: 1,
        },
        {
            item: fruit,
            quantity: 1,
        },
        {
            item: cheese,
            quantity: 1,
        },
    ],
};
const frozenYogurt = {
    name: 'Frozen Yogurt',
    slug: 'frozen-yogurt',
    level: 28,
    maxValue: 1750,
    productionTime: 240,
    building: donut,
    depends: [
        {
            item: sugar,
            quantity: 1,
        },
        {
            item: fruit,
            quantity: 1,
        },
        {
            item: cream,
            quantity: 1,
        },
    ],
};
const coffee = {
    name: 'Coffee',
    slug: 'coffee',
    level: 33,
    maxValue: 750,
    productionTime: 60,
    building: donut,
    depends: [
        {
            item: seeds,
            quantity: 2,
        },
        {
            item: sugar,
            quantity: 1,
        },
        {
            item: cream,
            quantity: 1,
        },
    ],
};
const cap = {
    name: 'Cap',
    slug: 'cap',
    level: 19,
    maxValue: 600,
    productionTime: 60,
    building: fashion,
    depends: [
        {
            item: textiles,
            quantity: 2,
        },
        {
            item: measuringTape,
            quantity: 1,
        },
    ],
};
const shoes = {
    name: 'Shoes',
    slug: 'shoes',
    level: 21,
    maxValue: 980,
    productionTime: 75,
    building: fashion,
    depends: [
        {
            item: plastic,
            quantity: 1,
        },
        {
            item: textiles,
            quantity: 2,
        },
        {
            item: glue,
            quantity: 1,
        },
    ],
};
const watch = {
    slug: 'watch',
    name: 'Watch',
    level: 22,
    maxValue: 580,
    productionTime: 90,
    building: fashion,
    depends: [
        {
            item: plastic,
            quantity: 2,
        },
        {
            item: chemicals,
            quantity: 1,
        },
        {
            item: glass,
            quantity: 1,
        },
    ],
};
const businessSuits = {
    name: 'Business Suits',
    slug: 'business-suits',
    level: 32,
    maxValue: 1170,
    productionTime: 210,
    building: fashion,
    depends: [
        {
            item: textiles,
            quantity: 3,
        },
        {
            item: glue,
            quantity: 1,
        },
        {
            item: measuringTape,
            quantity: 1,
        },
    ],
};
const backpack = {
    name: 'Backpack',
    slug: 'backpack',
    level: 34,
    maxValue: 430,
    productionTime: 150,
    building: fashion,
    depends: [
        {
            item: plastic,
            quantity: 2,
        },
        {
            item: textiles,
            quantity: 2,
        },
        {
            item: measuringTape,
            quantity: 1,
        },
    ],
};
const iceCream = {
    name: 'Ice Cream Sandwich',
    slug: 'ice-cream-sandwich',
    level: 25,
    maxValue: 2560,
    productionTime: 14,
    building: fastFood,
    depends: [
        {
            item: cream,
            quantity: 1,
        },
        {
            item: breadRoll,
            quantity: 1,
        },
    ],
};
const pizza = {
    name: 'Pizza',
    slug: 'pizza',
    level: 28,
    maxValue: 2560,
    productionTime: 24,
    building: fastFood,
    depends: [
        {
            item: flourBag,
            quantity: 1,
        },
        {
            item: cheese,
            quantity: 1,
        },
        {
            item: beef,
            quantity: 1,
        },
    ],
};
const cheeseFries = {
    name: 'Cheese Fries',
    slug: 'cheese-fries',
    level: 33,
    maxValue: 1050,
    productionTime: 20,
    building: fastFood,
    depends: [
        {
            item: cheese,
            quantity: 1,
        },
        {
            item: vegetables,
            quantity: 1,
        },
    ],
};
const lemonade = {
    name: 'Lemonade',
    slug: 'lemonade',
    level: 37,
    productionTime: 60,
    maxValue: 1690,
    building: fastFood,
    depends: [
        {
            item: sugar,
            quantity: 2,
        },
        {
            item: glass,
            quantity: 2,
        },
        {
            item: fruit,
            quantity: 1,
        },
    ],
};
const bbqGrill = {
    name: 'BBG Grill',
    slug: 'bbg-grill',
    level: 29,
    maxValue: 530,
    productionTime: 165,
    building: home,
    depends: [
        {
            item: metal,
            quantity: 3,
        },
        {
            item: cookingUtensils,
            quantity: 1,
        },
    ],
};
const refrigerator = {
    name: 'Refrigerator',
    slug: 'refrigerator',
    level: 35,
    maxValue: 1060,
    productionTime: 210,
    building: home,
    depends: [
        {
            item: plastic,
            quantity: 2,
        },
        {
            item: chemicals,
            quantity: 2,
        },
        {
            item: electricalComponents,
            quantity: 2,
        },
    ],
};
const lightingSystem = {
    name: 'Lighting System',
    slug: 'lighting-system',
    level: 36,
    maxValue: 890,
    productionTime: 105,
    building: home,
    depends: [
        {
            item: glass,
            quantity: 1,
        },
        {
            item: chemicals,
            quantity: 1,
        },
        {
            item: electricalComponents,
            quantity: 1,
        },
    ],
};
const tv = {
    name: 'TV',
    slug: 'tv',
    level: 38,
    maxValue: 1280,
    productionTime: 150,
    building: home,
    depends: [
        {
            item: plastic,
            quantity: 2,
        },
        {
            item: glass,
            quantity: 2,
        },
        {
            item: electricalComponents,
            quantity: 2,
        },
    ],
};
const microwaveOven = {
    name: 'Microwave Oven',
    slug: 'microwave-oven',
    level: 42,
    maxValue: 480,
    productionTime: 120,
    building: home,
    depends: [
        {
            item: metal,
            quantity: 4,
        },
        {
            item: glass,
            quantity: 1,
        },
        {
            item: electricalComponents,
            quantity: 1,
        },
    ],
};
const popCorn = {
    name: 'Pop Corn',
    slug: 'pop-corn',
    level: 43,
    productionTime: 30,
    maxValue: 1250,
    building: fastFood,
    depends: [
        {
            item: corn,
            quantity: 2,
        },
        {
            item: microwaveOven,
            quantity: 1,
        },
    ],
};
const burgers = {
    name: 'Burgers',
    slug: 'burgers',
    level: 31,
    maxValue: 3620,
    productionTime: 35,
    building: fastFood,
    depends: [
        {
            item: beef,
            quantity: 1,
        },
        {
            item: breadRoll,
            quantity: 1,
        },
        {
            item: bbqGrill,
            quantity: 1,
        },
    ],
};
// const grass
// const treeSaplings
// const ladder
exports.itemsList = [
    /** Industry */
    metal,
    woods,
    plastic,
    seeds,
    minerals,
    chemicals,
    textiles,
    sugar,
    glass,
    animalFeed,
    electricalComponents,
    /** Supplies */
    nails,
    planks,
    bricks,
    cement,
    glue,
    paint,
    /** Hardware */
    hammer,
    measuringTape,
    shovel,
    cookingUtensils,
    ladder,
    drill,
    /** Gardening */
    grass,
    treeSaplings,
    gardenFurniture,
    firePit,
    LawnMower,
    gardenGnomes,
    /** Farmers */
    vegetables,
    flourBag,
    fruit,
    cream,
    corn,
    cheese,
    beef,
    /** Furniture */
    chairs,
    tables,
    homeTextiles,
    cupboard,
    couch,
    /** Donuts */
    donuts,
    greenSmoothie,
    breadRoll,
    cherryCheesecake,
    frozenYogurt,
    coffee,
    /** Fashion */
    cap,
    shoes,
    watch,
    businessSuits,
    backpack,
    /** Fast Food */
    iceCream,
    pizza,
    burgers,
    cheeseFries,
    lemonade,
    popCorn,
    /** Home */
    bbqGrill,
    refrigerator,
    lightingSystem,
    tv,
    microwaveOven,
];
// const donuts
// const greenSmoothie
// const flourBag
// const fruitAndBerries
// const chairs
// const tables
// const items: IItem[] = [
//   metal,
//   woods,
//   seeds,
//   vegetables,
// ]
