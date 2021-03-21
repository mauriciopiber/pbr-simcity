import { IItem, IBuilding } from './types/types';
/** Define buildings */

const industry: IBuilding = {
  name: 'Industry',
  slots: (4*4+5*3),
  parallel: true,
  nextSlot: null,
}

const supplies: IBuilding = {
  name: 'Supplies Store',
  slots: 8,
  parallel: false,
  nextSlot: 40,
}

const hardware: IBuilding = {
  name: 'Hardware Store',
  slots: 8,
  parallel: false,
  nextSlot: 40,
}

const farmer: IBuilding = {
  name: 'Farmer\'s Market',
  slots: 5,
  parallel: false,
  nextSlot: 26,
}

const furniture: IBuilding = {
  name: 'Furniture Store',
  slots: 4,
  parallel: false,
  nextSlot: 20,
}

const gardening : IBuilding = {
  name: 'Bardening Supplies',
  slots: 3,
  parallel: false,
  nextSlot: 14,
}

const donut: IBuilding = {
  name: 'Donut Shop',
  slots: 3,
  parallel: false,
  nextSlot: 14,
}

const fashion: IBuilding = {
  name: 'Fashion Store',
  slots: 2,
  parallel: false,
  nextSlot: 8,
}

const fastFood: IBuilding = {
  name: 'Fast Food Restaurant',
  slots: 0,
  parallel: false,
  nextSlot: null,
}

const home: IBuilding = {
  name: 'Home Appliances',
  slots: 0,
  parallel: false,
  nextSlot: null,
}

export const buildingsList: IBuilding[] = [
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
]



/* Define Items */
const metal: IItem = {
  name: 'Metal',
  productionTime: 1,
  level: 1,
  building: industry,
  maxValue: 10,
  depends: [],
}

const woods: IItem = {
  name: 'Wood',
  productionTime: 3,
  level: 2,
  building: industry,
  maxValue: 20,
  depends: [],
}


const plastic: IItem  = {
  name: 'Plastic',
  productionTime: 9,
  level: 5,
  building: industry,
  maxValue: 25,
  depends: [],
}

const seeds: IItem = {
  name: 'Seeds',
  productionTime: 20,
  level: 7,
  building: industry,
  maxValue: 30,
  depends: [],
}


const minerals: IItem = {
  name: 'Minerals',
  productionTime: 30,
  level: 11,
  building: industry,
  maxValue: 40,
  depends: [],
}

const chemicals: IItem = {
  name: 'Chemicals',
  productionTime: 120,
  level: 13,
  building: industry,
  maxValue: 60,
  depends: [],
}


const textiles: IItem = {
  name: 'Textiles',
  productionTime: 180,
  level: 15,
  building: industry,
  maxValue: 90,
  depends: [],
}

const sugar: IItem = {
  name: 'Sugar and Spices',
  productionTime: 240,
  level: 17,
  building: industry,
  maxValue: 110,
  depends: [],
}

const glass: IItem = {
  name: 'Glass',
  productionTime: 300,
  level: 19,
  building: industry,
  maxValue: 120,
  depends: [],
}

const animalFeed: IItem = {
  name: 'Animal Feed',
  productionTime: 360,
  level: 23,
  building: industry,
  maxValue: 140,
  depends: [],
};

const electricalComponents = {
  name: 'Electrical Components',
  productionTime: 420,
  level: 29,
  building: industry,
  maxValue: 160,
  depends: [],
};

const nails: IItem = {
  name: 'Nails',
  productionTime: 5,
  level: 1,
  building: supplies,
  maxValue: 80,
  depends: [
    {
      item: metal,
      quantity: 2,
    }
  ]
}


const planks: IItem = {
  name: 'Planks',
  productionTime: 30,
  level: 3,
  building: supplies,
  maxValue: 120,
  depends: [
    {
      item: woods,
      quantity: 2,
    }
  ]
}

const bricks: IItem = {
  name: 'Bricks',
  productionTime: 20,
  level: 13,
  building: supplies,
  maxValue: 190,
  depends: [
    {
      item: minerals,
      quantity: 2,
    }
  ]
}

const cement: IItem = {
  name: 'Cement',
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
    }
  ]
}

const glue: IItem = {
  name: 'Glue',
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
    }
  ]
}

const paint: IItem = {
  name: 'Paint',
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
      quantity: 1
    },
    {
      item: chemicals,
      quantity: 2,
    }
  ]
}


const hammer: IItem = {
  name: 'Hammer',
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
      quantity: 1
    }
  ]
}


const measuringTape: IItem = {
  name: 'Measuring Tape',
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
      quantity: 1
    }
  ]
}

const shovel: IItem = {
  name: 'Shovel',
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
      quantity: 1
    },
    {
      item: plastic,
      quantity: 1
    }
  ]
}

const cookingUtensils: IItem = {
  name: 'Cooking Utensils',
  productionTime: 45,
  level: 9,
  building: hardware,
  maxValue: 250,
  depends: [
    {
      item: metal,
      quantity: 2,
    },
    {
      item: woods,
      quantity: 2
    },
    {
      item: plastic,
      quantity: 2
    }
  ]
}

const ladder: IItem = {
  name: 'Ladder',
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
      quantity: 2
    },
  ]
}

const drill: IItem = {
  name: 'Drill',
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
      quantity: 2
    },
    {
      item: electricalComponents,
      quantity: 1,
    }
  ]
}

const grass: IItem = {
  name: 'Grass',
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
      quantity: 1
    },
  ]
}

const treeSaplings: IItem = {
  name: 'Tree Saplings',
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
      quantity: 1
    },
  ]
}

const gardenFurniture: IItem = {
  name: 'Garden Furniture',
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
      quantity: 2
    },
  ]
}

const firePit: IItem = {
  name: 'Fire Pit',
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
      quantity: 2
    },
  ]

}

const LawnMower: IItem = {
  name: 'Lawn Mower',
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
      quantity: 1
    },
    {
      item: paint,
      quantity: 1
    },
  ]

}

const gardenGnomes: IItem = {
  name: 'Garden Gnomes',
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
      quantity: 1
    },
  ]

}



const vegetables: IItem = {
  name: 'Vegetables',
  productionTime: 20,
  level: 8,
  building: farmer,
  maxValue: 160,
  depends: [
    {
      item: seeds,
      quantity: 2,
    },
  ]
}

const flourBag: IItem = {
  name: 'Flour Bag',
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
    }
  ]

}

const fruit: IItem = {
  name: 'Fruit and Berries',
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
      quantity: 1
    }
  ]
}

const cream: IItem = {
  name: 'Cream',
  productionTime: 75,
  level: 23,
  building: farmer,
  maxValue: 440,
  depends: [
    {
      item: animalFeed,
      quantity: 1,
    }
  ]

}

const corn: IItem = {
  name: 'Corn',
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
      quantity: 4
    }
  ]
}

const cheese: IItem = {
  name: 'Cheese',
  productionTime: 105,
  level: 26,
  maxValue: 660,
  building: farmer,
  depends: [
    {
      item: animalFeed,
      quantity: 2,
    }
  ]
}

const beef: IItem = {
  name: 'Beef',
  productionTime: 150,
  level: 27,
  maxValue: 860,
  building: farmer,
  depends: [
    {
      item: animalFeed,
      quantity: 3,
    }
  ]

}


const chairs: IItem = {
  name: 'Chairs',
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
      quantity: 1
    }
  ]
}

const tables: IItem = {
  name: 'Tables',
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
    }
  ]
}

const homeTextiles: IItem = {
  name: 'Home Textiles',
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
    }
  ]
}

const cupboard: IItem = {
  name: 'Cupboard',
  level: 26,
  maxValue: 900,
  productionTime: 45,
  building: furniture,
  depends: [
    {
      item: glass,
      quantity: 2,
    }, {
      item: planks,
      quantity: 2,
    }, {
      item: paint,
      quantity: 1
    }
  ]

}

const couch: IItem = {
  name: 'Couch',
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
    }
  ]
}


const donuts: IItem = {
  name: 'Donuts',
  level: 18,
  maxValue: 950,
  productionTime: 45,
  building: donut,
  depends: [
    {
      item: sugar,
      quantity: 1
    },
    {
      item: flourBag,
      quantity: 1,
    }
  ]
}

const greenSmoothie: IItem = {
  name: 'Green Smoothie',
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
    }
  ]
}

const breadRoll: IItem = {
  name: 'Bread Roll',
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
    }
  ]

}

const cherryCheesecake: IItem = {
  name: 'Cherry Cheesecake',
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
    }
  ]
}

const frozenYogurt: IItem = {
  name: 'Frozen Yogurt',
  level: 28,
  maxValue: 1750,
  productionTime: 240,
  building: donut,
  depends: [
    {
      item: sugar,
      quantity: 1,
    }, {
      item: fruit,
      quantity: 1,
    }, {
      item: cream,
      quantity: 1,
    }
  ]
}

const coffee: IItem = {
  name: 'Coffee',
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
    }
  ]
}

const cap: IItem = {
  name: 'Cap',
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
    }
  ]

}

const shoes: IItem = {
  name: 'Shoes',
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
    }
  ]
}

const watch: IItem = {
  name: 'Watch',
  level: 22,
  maxValue: 580,
  productionTime: 90,
  building: fashion,
  depends: [

    {
      item: plastic,
      quantity: 2,
    }, {
      item: chemicals,
      quantity: 1
    }, {
      item: glass,
      quantity: 1,
    }
  ]

}

const businessSuits: IItem = {
  name: 'Business Suits',
  level: 32,
  maxValue: 1170,
  productionTime: 210,
  building: fashion,
  depends: [
    {
      item: textiles,
      quantity: 3,
    }, {
      item: glue,
      quantity: 1,
    }, {
      item: measuringTape,
      quantity: 1,
    }
  ]

}

const backpack: IItem = {
  name: 'Backpack',
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
    }, {
      item: measuringTape,
      quantity: 1,
    }
  ]

}

const iceCream: IItem = {
  name: 'Ice Cream',
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
    }
  ]
}

const pizza: IItem = {
  name: 'Pizza',
  level: 28,
  maxValue: 2560,
  productionTime: 24,
  building: fastFood,
  depends: [
    {
      item: flourBag,
      quantity: 1,
    }, {
      item: cheese,
      quantity: 1,
    }, {
      item: beef,
      quantity: 1,
    }
  ]

}



const cheeseFries: IItem = {
  name: 'Cheese Fries',
  level: 33,
  maxValue: 1050,
  productionTime: 20,
  building: fastFood,
  depends: [
    {
      item: cheese,
      quantity: 1,
    }, {
      item: vegetables,
      quantity: 1,
    }
  ]

}

const lemonade: IItem = {
  name: 'Lemonade',
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
      quantity: 2
    },
    {
      item: fruit,
      quantity: 1,
    }
  ]

}



const bbqGrill: IItem = {
  name: 'BBG Grill',
  level: 29,
  maxValue: 530,
  productionTime: 165,
  building: home,
  depends: [
    {
      item: metal,
      quantity: 3,
    }, {
      item: cookingUtensils,
      quantity: 1,
    }
  ]
}

const refrigerator: IItem = {
  name: 'Refrigerator',
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
    }
  ]

}

const lightingSystem: IItem = {
  name: 'Lighting System',
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
    }
  ]


}

const tv: IItem = {
  name: 'TV',
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
    }
  ]

}

const microwaveOven: IItem = {
  name: 'Microwave Oven',
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
      quantity: 1
    }
  ]

}

const popCorn: IItem = {
  name: 'Pop Corn',
  level: 43,
  productionTime: 30,
  maxValue: 1250,
  building: fastFood,
  depends: [
    {
      item: corn,
      quantity: 2
    },
    {
      item: microwaveOven,
      quantity: 1,
    }
  ]
}

const burgers: IItem = {
  name: 'Burgers',
  level: 31,
  maxValue: 3620,
  productionTime: 35,
  building: fastFood,
  depends: [
    {
      item: beef,
      quantity: 1,
    }, {
      item: cheese,
      quantity: 1,
    }, {
      item: bbqGrill,
      quantity: 1,
    }
  ]

}
// const grass

// const treeSaplings

// const ladder

export const itemsList: IItem[] = [
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
  microwaveOven
]



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
