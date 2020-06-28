const FriedEgg = {
    name: "Fried Egg",
    image: "fried_egg.jpg"
};

const FriedPlantain = {
    name: "Fried Plantain",
    image: "dodo.jpg"
}

const PlantainAndEgg = [
    FriedPlantain,
    FriedEgg
];

const meats = [
    {
        name: "Fried Beef",
        image: "fried_beef.jpg"
    },

    {
        name: "Fried Chicken",
        image: "fried_chicken.jpg"
    },

    {
        name: "Fried Snail",
        image: "fried_snail.jpg"
    }
];

const drinks = [
    {
        name: 'Water',
        image: 'bottle_water.jpg',
    },

    {
        name: 'Coke',
        image: 'coke.jpg',
    },

    {
        name: 'Fanta',
        image: 'fanta.jpg',
    },

    {
        name: 'Fruit Juice',
        image: 'cocktail.jpg',
    }
]


const items =  [
    {
        name: "Fried Rice",
        image: "fried_rice.jpg",
        hasMeat: true,
        sub_items: PlantainAndEgg
    },

    {
        name: "Jollof Rice",
        image: "jollof_rice.jpg",
        hasMeat: true,
        sub_items: PlantainAndEgg
    },

    {
        name: "Indomie",
        image: "indomie.jpg",
        hasMeat: true,
        sub_items: PlantainAndEgg
    },

    {
        name: "Yam",
        image: "yam.jpg",
        hasMeat: true,
        sub_items: [FriedEgg]
    },

    {
        name: "Pancake",
        image: "pancake.jpg",
        hasMeat: false,
        sub_items: []
    },

    {
        name: "Bread",
        image: "bread.jpg",
        hasMeat: false,
        sub_items: [FriedEgg]
    }
]

export {items, meats, drinks}