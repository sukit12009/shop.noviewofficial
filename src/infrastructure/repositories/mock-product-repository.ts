import type {
  ProductRepository,
  GetProductsParams,
  GetProductsResult,
} from '../../core/repositories/product-repository';
import type { Product } from '../../core/entities/product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    description: 'Essential everyday cotton t-shirt with a relaxed fit.',
    price: 590,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 120,
    category: 'Tops',
    isNew: false,
  },
  {
    id: '2',
    name: 'Slim Chino Pants',
    description: 'Versatile slim-cut chinos, perfect for any occasion.',
    price: 1290,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
    stock: 45,
    category: 'Bottoms',
    isNew: true,
  },
  {
    id: '3',
    name: 'Oversized Hoodie',
    description: 'Soft fleece hoodie with a comfortable oversized silhouette.',
    price: 1590,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400',
    stock: 3,
    category: 'Tops',
    isNew: true,
  },
  {
    id: '4',
    name: 'Canvas Sneakers',
    description: 'Lightweight canvas sneakers with rubber sole, available in multiple colors.',
    price: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 60,
    category: 'Footwear',
    isNew: true,
  },
  {
    id: '5',
    name: 'Linen Shirt',
    description: 'Breathable linen shirt, ideal for warm weather styling.',
    price: 990,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    stock: 80,
    category: 'Tops',
    isNew: false,
  },
  {
    id: '6',
    name: 'Leather Tote Bag',
    description: 'Genuine leather tote with spacious interior and zip pocket.',
    price: 3290,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    stock: 20,
    category: 'Bags',
    isNew: true,
  },
  {
    id: '7',
    name: 'Denim Jacket',
    description: 'Classic washed denim jacket with button-front closure.',
    price: 2190,
    imageUrl: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400',
    stock: 5,
    category: 'Outerwear',
    isNew: false,
  },
  {
    id: '8',
    name: 'Wool Beanie',
    description: 'Ribbed knit beanie in 100% merino wool. One size fits all.',
    price: 490,
    imageUrl: 'https://images.unsplash.com/photo-1510598155908-33c88c5f92e3?w=400',
    stock: 0,
    category: 'Accessories',
    isNew: false,
  },
];

export class MockProductRepository implements ProductRepository {
  async getProducts(params: GetProductsParams): Promise<GetProductsResult> {
    const { page = 1, limit = 20 } = params;

    await new Promise((r) => setTimeout(r, 600));

    const start = (page - 1) * limit;
    const paginated = MOCK_PRODUCTS.slice(start, start + limit);

    return {
      products: paginated,
      total: MOCK_PRODUCTS.length,
      page,
    };
  }
}
