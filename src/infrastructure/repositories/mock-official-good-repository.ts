import type { OfficialGoodRepository } from '../../core/repositories/official-good-repository';
import type { OfficialGood } from '../../core/entities/official-good';

const MOCK_OFFICIAL_GOODS: OfficialGood[] = [
  {
    id: 'og-1',
    name: 'NADAO Official Light Stick Ver.2',
    price: 1490,
    imageUrl: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=600&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    ],
    details:
      'NADAO Official Light Stick Ver.2\n\n- ขนาด : 30 cm\n- น้ำหนัก : 150 g\n- ใช้ถ่าน AA 3 ก้อน (ไม่รวมในกล่อง)\n- มีการแสดง 7 สี\n- มาพร้อม Strap และ Fandom Name\n- บรรจุในกล่องของขวัญพิเศษ',
    sizeChart: '',
  },
  {
    id: 'og-2',
    name: 'TADA Season 3 Photobook',
    price: 890,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    isSoldOut: true,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
    ],
    details:
      'TADA Season 3 Photobook\n\n- จำนวน : 120 หน้า\n- ขนาด : A4 Landscape\n- พิมพ์บนกระดาษ Art Matt 150 g\n- ปกแข็ง Hardcover\n- รวมภาพถ่ายพิเศษ Behind The Scene ทั้ง Season 3',
    sizeChart: '',
  },
  {
    id: 'og-3',
    name: 'NADAO Logo Tote Bag',
    price: 590,
    imageUrl: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
    ],
    colors: [
      { label: 'Black', value: '#1a1a1a' },
      { label: 'Natural', value: '#F5F0E8' },
    ],
    details:
      'NADAO Logo Tote Bag\n\n- วัสดุ : Canvas 100%\n- ขนาด : กว้าง 38 cm × สูง 42 cm\n- ความยาวสาย : 60 cm\n- สกรีนโลโก้ NADAO ด้วย Water-based Ink\n- มีช่องซิปด้านใน 1 ช่อง',
    sizeChart:
      'ความกว้าง : 38 cm\nความสูง : 42 cm\nความลึก : 10 cm\nความยาวสาย : 60 cm',
  },
  {
    id: 'og-4',
    name: 'BUS Official Acrylic Keychain',
    price: 290,
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    details:
      'BUS Official Acrylic Keychain\n\n- วัสดุ : Acrylic 5 mm\n- ขนาด : 5 × 7 cm\n- พิมพ์ภาพ 2 ด้าน\n- มาพร้อม Key Ring สแตนเลส\n- บรรจุในซองแพ็คพิเศษ',
    sizeChart: 'ขนาด : 5 × 7 cm\nความหนา : 5 mm',
  },
  {
    id: 'og-5',
    name: 'TADA x NADAO Ceramic Mug',
    price: 490,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    isSoldOut: true,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
      'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600&q=80',
    ],
    details:
      'TADA x NADAO Ceramic Mug\n\n- วัสดุ : Ceramic\n- ความจุ : 350 ml\n- ปลอดภัยสำหรับ Microwave และ Dishwasher\n- พิมพ์ลาย TADA x NADAO\n- บรรจุในกล่องของขวัญ',
    sizeChart: 'ความจุ : 350 ml\nความสูง : 10 cm\nเส้นผ่าศูนย์กลาง : 8 cm',
  },
  {
    id: 'og-6',
    name: 'Official Fan Poster Set (A3)',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1579541591970-288a18775fc3?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1579541591970-288a18775fc3?w=600&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    ],
    details:
      'Official Fan Poster Set (A3)\n\n- จำนวน : 4 แผ่น\n- ขนาด : A3 (29.7 × 42 cm)\n- พิมพ์ 4 สี บนกระดาษ Art Matt 200 g\n- ลายเซ็นนักแสดงทุกคน\n- บรรจุในหลอดกระดาษป้องกันการพับ',
    sizeChart: 'ขนาด : A3 (29.7 × 42 cm)\nน้ำหนักกระดาษ : 200 gsm',
  },
  {
    id: 'og-7',
    name: 'NADAO Sticker Pack Vol.1',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&q=80',
    ],
    details:
      'NADAO Sticker Pack Vol.1\n\n- จำนวน : 15 ชิ้น\n- ขนาดแผ่น : A5\n- วัสดุ : Vinyl กันน้ำ\n- ลายสุดน่ารักจากทุก IP ของ NADAO\n- เหมาะสำหรับตกแต่ง Laptop, Notebook, หรือกระเป๋า',
    sizeChart: '',
  },
  {
    id: 'og-8',
    name: 'BUS Signed Mini Album',
    price: 1290,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    isSoldOut: true,
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&q=80',
    ],
    details:
      'BUS Signed Mini Album\n\n- CD 1 แผ่น\n- Photobook 32 หน้า\n- 2 Photocards (Random)\n- 1 Mini Poster\n- ลายเซ็นโดย BUS (ลายเซ็นจริง ไม่ใช่ Pre-print)\n\n* จำนวนจำกัด 300 ชุดทั่วโลก',
    sizeChart: '',
  },
];

export class MockOfficialGoodRepository implements OfficialGoodRepository {
  async getOfficialGoods(): Promise<OfficialGood[]> {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_OFFICIAL_GOODS;
  }

  async getOfficialGoodById(id: string): Promise<OfficialGood | null> {
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_OFFICIAL_GOODS.find((g) => g.id === id) ?? null;
  }
}
