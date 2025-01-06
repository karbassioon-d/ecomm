import { faker } from '@faker-js/faker';

export const generateProducts = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })), 
    description: faker.commerce.productDescription(),
    image: faker.image.urlPicsumPhotos({ width: 640, height: 480 }), 
    category: faker.commerce.department(),
  }));
};
