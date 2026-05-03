import type {
  ProductRepository,
  GetProductsParams,
  GetProductsResult,
} from '../../core/repositories/product-repository';
import type { Product } from '../../core/entities/product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sleeping Set (White)',
    description: 'ชุดนอนสุดน่ารักจาก 789 NONAME ประกอบด้วยรองเท้า ตุ๊กตา และหน้ากากนอน',
    price: 1700,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    ],
    stock: 20,
    category: 'NONAME',
    isNew: true,
    colors: [{ label: 'White', value: '#F5F5F0' }],
    sizes: ['M (22-24 cm)', 'L (25-27 cm.)'],
    details: "Sleeping Set (White)\n\n1. 789 'NONAME' Slipper\n- Weight : 200 g.\n\n2. 789 'NONAME' Plushie\n- Size : 30 cm.\n\n3. 789 'NONAME' Sleep Mask\n-Packaging Size 20 x 12 cm\n- Weight 40 g.",
    sizeChart: "ขนาด M : เหมาะสำหรับเท้าขนาด 22-24 cm\nขนาด L : เหมาะสำหรับเท้าขนาด 25-27 cm\n\n* วัดขนาดเท้าจากส้นถึงปลายเท้า",
  },
  {
    id: '2',
    name: 'NONAME Logo Crewneck',
    description: 'เสื้อ Crewneck สกรีนโลโก้ 789 NONAME ทรง Relaxed Fit ผ้า Cotton Fleece นุ่มสบาย',
    price: 990,
    imageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    ],
    stock: 40,
    category: 'NONAME',
    isNew: true,
    colors: [
      { label: 'Sand', value: '#C2B280' },
      { label: 'Navy', value: '#1B2A4A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: "NONAME Logo Crewneck\n\n- ผ้า : Cotton Fleece 280 GSM\n- สกรีนโลโก้ 789 NONAME ด้านหน้า\n- ทรง Relaxed Fit\n- ซักเครื่องได้ (น้ำเย็น)",
    sizeChart: "S : รอบอก 92 cm / ความยาว 64 cm\nM : รอบอก 100 cm / ความยาว 67 cm\nL : รอบอก 108 cm / ความยาว 70 cm\nXL : รอบอก 116 cm / ความยาว 73 cm",
  },
  {
    id: '3',
    name: 'DICE THE FIRST ALBUM : POSSIBILITIES',
    description: 'อัลบั้มเต็มชุดแรกจาก DICE พร้อม photobook, photocard และของพิเศษ',
    price: 1050,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&q=80',
    ],
    stock: 30,
    category: 'DICE',
    isNew: true,
    details: "DICE THE FIRST ALBUM : POSSIBILITIES\n\n- 1x Photobook (80 pages)\n- 1x CD\n- 2x Photocards (Random)\n- 1x Mini Poster\n- 1x Sticker Sheet\n- 1x Folded Poster",
    sizeChart: "",
  },
  {
    id: '4',
    name: 'Everyday Set (BLUE)',
    description: 'เซ็ตของใช้ประจำวันสีฟ้า ประกอบด้วยกระเป๋า sticker และ keychain',
    price: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    stock: 15,
    category: 'NONAME',
    isNew: false,
    colors: [{ label: 'Blue', value: '#3B82F6' }],
    details: "Everyday Set (BLUE)\n\n1. NONAME Shoulder Bag\n- Size : 28 x 22 cm\n\n2. NONAME Sticker Set\n- 10 designs\n\n3. NONAME Keychain\n- Size : 5 cm",
    sizeChart: "กระเป๋า : กว้าง 28 cm x สูง 22 cm x ลึก 6 cm",
  },
  {
    id: '5',
    name: 'DICE YEAR TWO STICKER',
    description: 'สติกเกอร์ครบรอบ 2 ปี DICE ลายพิเศษ Limited Edition',
    price: 250,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1579541591970-288a18775fc3?w=600&q=80',
    ],
    stock: 100,
    category: 'DICE',
    isNew: true,
    details: "DICE YEAR TWO STICKER\n\n- จำนวน 12 ชิ้น\n- ขนาดแผ่น : A5\n- วัสดุ : กันน้ำ",
    sizeChart: "",
  },
  {
    id: '6',
    name: 'Official Oversized Hoodie',
    description: 'Hoodie ทรง oversized สกรีนลาย NADAO ด้านหน้า ผ้า cotton fleece นุ่มสบาย',
    price: 1590,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
    ],
    stock: 3,
    category: 'OFFICIAL GOODS',
    isNew: false,
    colors: [
      { label: 'Black', value: '#1a1a1a' },
      { label: 'White', value: '#F5F5F0' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: "Official Oversized Hoodie\n\n- ผ้า : Cotton Fleece 100%\n- ทรง Oversized\n- สกรีนลาย NADAO ด้านหน้า\n- ซักเครื่องได้\n\nวิธีดูแลรักษา:\n- ซักน้ำเย็น\n- ไม่ควรใช้น้ำยาฟอกขาว\n- รีดไฟต่ำ",
    sizeChart: "S : รอบอก 96 cm / ความยาว 68 cm\nM : รอบอก 104 cm / ความยาว 71 cm\nL : รอบอก 112 cm / ความยาว 74 cm\nXL : รอบอก 120 cm / ความยาว 77 cm",
  },
  {
    id: '7',
    name: 'Signature Tote Bag',
    description: 'กระเป๋า tote สไตล์ minimal ลายเซ็น NADAO สกรีนด้านข้าง',
    price: 890,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
    ],
    stock: 25,
    category: 'OFFICIAL GOODS',
    isNew: false,
    colors: [
      { label: 'Black', value: '#1a1a1a' },
      { label: 'Cream', value: '#F5F0E8' },
    ],
    details: "Signature Tote Bag\n\n- วัสดุ : Canvas 100%\n- ขนาด : 35 x 40 cm\n- ความยาวสายถือ : 60 cm\n- มีช่องซิปด้านใน\n- สกรีนลายด้วย Water-based Ink",
    sizeChart: "ความกว้าง : 35 cm\nความสูง : 40 cm\nความลึก : 10 cm\nสายถือ : 60 cm",
  },
  {
    id: '8',
    name: 'NONAME Drawstring Bag',
    description: 'กระเป๋า Drawstring ผ้า Ripstop น้ำหนักเบา สกรีนโลโก้ 789 NONAME',
    price: 390,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    stock: 60,
    category: 'NONAME',
    isNew: false,
    colors: [
      { label: 'Black', value: '#1a1a1a' },
      { label: 'White', value: '#F5F5F0' },
    ],
    details: "NONAME Drawstring Bag\n\n- วัสดุ : Ripstop Nylon\n- ขนาด : 35 × 45 cm\n- น้ำหนัก : 80 g\n- สกรีนโลโก้ 789 NONAME\n- รับน้ำหนักได้สูงสุด 10 kg",
    sizeChart: "ความกว้าง : 35 cm\nความสูง : 45 cm\nน้ำหนัก : 80 g",
  },
];

export class MockProductRepository implements ProductRepository {
  async getProducts(params: GetProductsParams): Promise<GetProductsResult> {
    const { page = 1, limit = 20 } = params;
    await new Promise((r) => setTimeout(r, 600));
    const start = (page - 1) * limit;
    const paginated = MOCK_PRODUCTS.slice(start, start + limit);
    return { products: paginated, total: MOCK_PRODUCTS.length, page };
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  }
}
