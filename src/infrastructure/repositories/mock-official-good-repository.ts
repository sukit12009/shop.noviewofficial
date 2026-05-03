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
    name: 'NADAO Fan Meeting 2024 Photobook',
    price: 890,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
    ],
    details:
      'NADAO Fan Meeting 2024 Photobook\n\n- จำนวน : 96 หน้า\n- ขนาด : A4\n- พิมพ์บนกระดาษ Art Matt 150 gsm\n- ปกแข็ง Hardcover\n- รวมภาพถ่าย Behind The Scene งาน Fan Meeting ครั้งที่ 1 ของ NADAO',
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
    name: 'NADAO Multi-Artist Badge Set',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    details:
      'NADAO Multi-Artist Badge Set\n\n- จำนวน : 6 ชิ้น ต่อเซ็ต\n- วัสดุ : Tin Button Badge\n- ขนาด : 44 mm ต่อชิ้น\n- ลายภาพครบทุก IP ของ NADAO\n- บรรจุในกล่องพิเศษ',
    sizeChart: 'เส้นผ่าศูนย์กลาง : 44 mm ต่อชิ้น',
  },
  {
    id: 'og-5',
    name: 'NADAO Official Thermos 350ml',
    price: 590,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
      'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600&q=80',
    ],
    details:
      'NADAO Official Thermos 350ml\n\n- วัสดุ : Stainless Steel 304\n- ความจุ : 350 ml\n- รักษาความร้อน/เย็นได้ 8 ชั่วโมง\n- สกรีนโลโก้ NADAO Laser Engraved\n- บรรจุในกล่องของขวัญ',
    sizeChart: 'ความจุ : 350 ml\nความสูง : 18 cm\nเส้นผ่าศูนย์กลาง : 7 cm',
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
    name: 'NADAO Year Book 2024',
    price: 750,
    imageUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    ],
    details:
      'NADAO Year Book 2024\n\n- จำนวน : 128 หน้า\n- ขนาด : B5\n- พิมพ์สีทั้งเล่ม\n- สรุปกิจกรรมทุก IP ของ NADAO ตลอดปี 2024\n- ฟรีโปสการ์ดพิเศษ 1 ใบ (Random)',
    sizeChart: '',
  },
];

// ─── TADA Artist Exclusive Items ──────────────────────────────────────────────

const MOCK_TADA_GOODS: OfficialGood[] = [
  {
    id: 'tada-1',
    name: 'TADA Concert Wristband',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    details: 'TADA Concert Wristband\n\n- วัสดุ : Silicone อย่างดี\n- ขนาด : Free Size\n- พิมพ์ชื่อ TADA และโลโก้ Embossed\n- ฟรี Glow-in-the-dark effect\n- บรรจุในซองแพ็คพิเศษ',
    sizeChart: 'เส้นรอบวง : 20 cm (Free Size)',
  },
  {
    id: 'tada-2',
    name: 'TADA x NOVIEW Collab T-Shirt',
    price: 890,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80',
    ],
    colors: [
      { label: 'White', value: '#F5F5F0' },
      { label: 'Black', value: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: 'TADA x NOVIEW Collab T-Shirt\n\n- ผ้า : Cotton 100% หนา 180 GSM\n- สกรีนลาย TADA x NOVIEW ด้านหน้าและด้านหลัง\n- ทรง Unisex\n- ซักเครื่องได้ (น้ำเย็น)',
    sizeChart: 'S : รอบอก 88 cm\nM : รอบอก 96 cm\nL : รอบอก 104 cm\nXL : รอบอก 112 cm',
  },
  {
    id: 'tada-3',
    name: 'TADA Acrylic Stand Set (3 ชิ้น)',
    price: 490,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
      'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&q=80',
    ],
    details: 'TADA Acrylic Stand Set\n\n- จำนวน : 3 ชิ้น ต่อเซ็ต\n- วัสดุ : Acrylic ใส 5 mm\n- ขนาด : 8 × 10 cm (ต่อชิ้น)\n- พิมพ์ภาพ Full Color 2 ด้าน\n- มีฐานรองแบบ A-frame\n- บรรจุในกล่องของขวัญ',
    sizeChart: 'ขนาดต่อชิ้น : 8 × 10 cm\nความหนา : 5 mm',
  },
  {
    id: 'tada-4',
    name: 'TADA Official Fan Light',
    price: 990,
    imageUrl: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=600&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    ],
    details: 'TADA Official Fan Light\n\n- ขนาด : 28 cm\n- น้ำหนัก : 120 g\n- ใช้ถ่าน AA 2 ก้อน (ไม่รวม)\n- 5 โหมดแสง รวมถึง Strobe\n- มาพร้อม Strap ผ้า\n- สกรีนชื่อ TADA บนด้าม',
    sizeChart: 'ความยาว : 28 cm\nน้ำหนัก : 120 g',
  },
  {
    id: 'tada-5',
    name: 'TADA Signed Polaroid Set',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&q=80',
    isSoldOut: true,
    images: [
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    ],
    details: 'TADA Signed Polaroid Set\n\n- จำนวน : 5 ใบ ต่อเซ็ต\n- ขนาด : Polaroid Standard 6.8 × 10.4 cm\n- ลายเซ็นจริง (ไม่ใช่ Pre-print)\n- Random จาก 10 แบบ\n- บรรจุในกล่องกำมะหยี่พิเศษ\n\n* จำนวนจำกัด 200 เซ็ต',
    sizeChart: 'ขนาด : 6.8 × 10.4 cm',
  },
  {
    id: 'tada-6',
    name: 'TADA Embroidered Cap',
    price: 690,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80',
    ],
    colors: [
      { label: 'Black', value: '#1a1a1a' },
      { label: 'Beige', value: '#E8DCC8' },
    ],
    details: 'TADA Embroidered Cap\n\n- วัสดุ : Twill Cotton\n- ปักชื่อ TADA ด้านหน้า (Embroidery)\n- ปรับขนาดได้ด้วย Buckle ด้านหลัง\n- Free Size',
    sizeChart: 'เส้นรอบศีรษะ : ปรับได้ 54–60 cm',
  },
];

// ─── BUS Artist Exclusive Items ───────────────────────────────────────────────

const MOCK_BUS_GOODS: OfficialGood[] = [
  {
    id: 'bus-1',
    name: 'BUS The Sophomore Album (Signed)',
    price: 1290,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&q=80',
    ],
    details: 'BUS The Sophomore Album\n\n- CD 1 แผ่น\n- Photobook 48 หน้า\n- 2 Photocards (Random)\n- 1 Mini Poster\n- ลายเซ็นโดย BUS (ลายเซ็นจริง)\n\n* จำนวนจำกัด 500 ชุด',
    sizeChart: '',
  },
  {
    id: 'bus-2',
    name: 'BUS A3 Concert Poster',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1579541591970-288a18775fc3?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1579541591970-288a18775fc3?w=600&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    ],
    details: 'BUS A3 Concert Poster\n\n- ขนาด : A3 (29.7 × 42 cm)\n- พิมพ์ 4 สีบนกระดาษ Art Matt 200 gsm\n- ลายเซ็นนักร้อง BUS (Pre-print)\n- บรรจุในหลอดกระดาษ',
    sizeChart: 'ขนาด : A3 (29.7 × 42 cm)',
  },
  {
    id: 'bus-3',
    name: 'BUS Oversized Hoodie',
    price: 1590,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
    ],
    colors: [
      { label: 'Charcoal', value: '#36454F' },
      { label: 'Cream', value: '#F5F0E8' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: 'BUS Oversized Hoodie\n\n- ผ้า : Cotton Fleece 320 GSM\n- ปักโลโก้ BUS ด้านหน้า\n- ทรง Oversized\n- ซักเครื่องได้ (น้ำเย็น ไม่ปั่นแห้ง)',
    sizeChart: 'S : รอบอก 96 cm / ความยาว 68 cm\nM : รอบอก 104 cm / ความยาว 71 cm\nL : รอบอก 112 cm / ความยาว 74 cm\nXL : รอบอก 120 cm / ความยาว 77 cm',
  },
  {
    id: 'bus-4',
    name: 'BUS Acrylic Keychain',
    price: 290,
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    details: 'BUS Acrylic Keychain\n\n- วัสดุ : Acrylic 5 mm\n- ขนาด : 5 × 7 cm\n- พิมพ์ภาพ Full Color 2 ด้าน\n- มาพร้อม Key Ring สแตนเลส\n- มี 3 แบบให้เลือก (Random)',
    sizeChart: 'ขนาด : 5 × 7 cm\nความหนา : 5 mm',
  },
  {
    id: 'bus-5',
    name: 'BUS Enamel Pin Set',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    details: 'BUS Enamel Pin Set\n\n- จำนวน : 4 ชิ้น ต่อเซ็ต\n- วัสดุ : Hard Enamel ชุบทอง\n- ขนาด : 2–3 cm (ต่อชิ้น)\n- ลาย BUS, โลโก้, Signature, มาสคอต\n- บรรจุในกล่องพิเศษ',
    sizeChart: 'ขนาด : 2–3 cm ต่อชิ้น',
  },
  {
    id: 'bus-6',
    name: 'BUS Season Greeting Card Set',
    price: 250,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80',
    isSoldOut: false,
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80',
    ],
    details: 'BUS Season Greeting Card Set\n\n- จำนวน : 6 ใบ ต่อเซ็ต\n- ขนาด : A5\n- พิมพ์บนกระดาษ Art Matt 300 gsm\n- ลายมือ BUS (Pre-print)\n- บรรจุในซองกำมะหยี่',
    sizeChart: 'ขนาด : A5 (14.8 × 21 cm)',
  },
];

// ─── All artist goods merged — used by getOfficialGoodById to enable /products/[id] ───

const ALL_GOODS = [...MOCK_OFFICIAL_GOODS, ...MOCK_TADA_GOODS, ...MOCK_BUS_GOODS];

export class MockOfficialGoodRepository implements OfficialGoodRepository {
  async getOfficialGoods(): Promise<OfficialGood[]> {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_OFFICIAL_GOODS;
  }

  async getOfficialGoodById(id: string): Promise<OfficialGood | null> {
    await new Promise((r) => setTimeout(r, 400));
    return ALL_GOODS.find((g) => g.id === id) ?? null;
  }
}

export class MockTadaGoodsRepository implements OfficialGoodRepository {
  async getOfficialGoods(): Promise<OfficialGood[]> {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_TADA_GOODS;
  }

  async getOfficialGoodById(id: string): Promise<OfficialGood | null> {
    await new Promise((r) => setTimeout(r, 400));
    return ALL_GOODS.find((g) => g.id === id) ?? null;
  }
}

export class MockBusGoodsRepository implements OfficialGoodRepository {
  async getOfficialGoods(): Promise<OfficialGood[]> {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_BUS_GOODS;
  }

  async getOfficialGoodById(id: string): Promise<OfficialGood | null> {
    await new Promise((r) => setTimeout(r, 400));
    return ALL_GOODS.find((g) => g.id === id) ?? null;
  }
}
