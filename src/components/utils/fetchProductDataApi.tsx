export const productIndexes = [
  "Strawberries",
  "Romaine Lettuce",
  "Red Leaf Lettuce",
  "Potatoes",
  "Oranges",
  "Iceberg Lettuce",
  "Green Leaf Lettuce",
  "Celery",
  "Cauliflower",
  "Carrots",
  "Cantaloupe",
  "Broccoli Crowns",
  "Avocados",
  "Broccoli Bunches",
  "Asparagus",
  "Flame Grapes",
  "Thompson Grapes",
  "Honeydews",
  "Tomatoes",
  "Plums",
  "Peaches",
  "Nectarines",
];

export const productObject: { [key: string]: string } = {
  Strawberries: "Клубника",
  "Romaine Lettuce": "Салат Романо",
  "Red Leaf Lettuce": "Краснолистный салат",
  Potatoes: "Картофель",
  Oranges: "Апельсины",
  "Iceberg Lettuce": "Салат Айсберг",
  "Green Leaf Lettuce": "Зеленолистный салат",
  Celery: "Сельдерей",
  Cauliflower: "Цветная капуста",
  Carrots: "Морковь",
  Cantaloupe: "Дыня Канталупа",
  "Broccoli Crowns": "Соцветия брокколи",
  Avocados: "Авокадо",
  "Broccoli Bunches": "Пучки брокколи",
  Asparagus: "Спаржа",
  "Flame Grapes": "Виноград Флейм",
  "Thompson Grapes": "Виноград Томпсон",
  Honeydews: "Дыня Медовая",
  Tomatoes: "Помидоры",
  Plums: "Сливы",
  Peaches: "Персики",
  Nectarines: "Нектарины",
};

class FetchProductDataApi {
  async fetch() {
    const productsData = productIndexes.map((_, index) => {
      return {
        farmprice: Number((Math.random() * 9.5 + 0.5).toFixed(2)), // Random price 0.5-10.0
        product_code: index, // Random code 0-99
        year: 2020 + Math.floor(Math.random() * 4), // Random year 2020-2023
        month: 1 + Math.floor(Math.random() * 12), // Random month 1-12
        day: 1 + Math.floor(Math.random() * 28), // Random day 1-28
        day_of_week: Math.floor(Math.random() * 7), // Random day 0-6
      };
    });

    return productsData;
  }
}

export const fetchProductDataApi = new FetchProductDataApi();
