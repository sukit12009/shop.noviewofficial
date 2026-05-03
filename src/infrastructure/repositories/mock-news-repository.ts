import type { NewsRepository } from '../../core/repositories/news-repository';
import type { News } from '../../core/entities/news';

const MOCK_NEWS: News[] = [
  {
    id: 'news-1',
    title: '🎉 เปิดตัว NOVIEW SHOP อย่างเป็นทางการแล้ว!',
    excerpt: 'NOVIEW SHOP ร้านค้าออนไลน์อย่างเป็นทางการของ NADAO เปิดให้บริการแล้ววันนี้ พร้อมสินค้า Merch และ Official Goods จากทุกศิลปินในสังกัด',
    content: `NOVIEW SHOP ร้านค้าออนไลน์อย่างเป็นทางการของ NADAO เปิดให้บริการแล้ววันนี้!

เราภูมิใจที่จะแนะนำ NOVIEW SHOP แพลตฟอร์มช็อปปิ้งออนไลน์อย่างเป็นทางการสำหรับแฟนๆ ของ NADAO ทุกคน ที่นี่คุณจะพบกับสินค้า Merchandise และ Official Goods คุณภาพสูงจากศิลปินในสังกัดทั้งหมด

**สิ่งที่มีให้ในร้าน:**
- TADA MERCH — เสื้อผ้า กระเป๋า และของสะสมจากแบรนด์ NONAME และ DICE
- NADAO OFFICIAL GOODS — Light Stick, Tote Bag, Sticker และอีกมากมาย
- หน้า TADA Artist — สินค้า Exclusive สำหรับแฟนคลับ TADA โดยเฉพาะ
- หน้า BUS Artist — สินค้า Exclusive สำหรับแฟนคลับ BUS โดยเฉพาะ

**ฟีเจอร์เด่น:**
- ระบบ Wishlist — บันทึกสินค้าที่ชื่นชอบได้ทุกเมื่อ
- เลือกสี/ไซซ์ได้ครบ
- รองรับทั้งภาษาไทยและอังกฤษ
- ระบบตะกร้าสินค้าที่ใช้งานง่าย

ขอบคุณทุกคนที่ให้การสนับสนุน NADAO มาโดยตลอด เราตั้งใจสร้างประสบการณ์ช็อปปิ้งที่ดีที่สุดให้กับแฟนๆ ทุกคน 💛`,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    category: 'announcement',
    publishedAt: '2026-05-01T10:00:00+07:00',
    isPinned: true,
  },
  {
    id: 'news-2',
    title: 'TADA Fan Meeting 2026 — สินค้า Exclusive พร้อมจำหน่ายแล้ว',
    excerpt: 'สินค้าสุดพิเศษสำหรับงาน TADA Fan Meeting 2026 เปิดให้สั่งซื้อล่วงหน้าผ่าน NOVIEW SHOP ได้แล้ว จำนวนจำกัด!',
    content: `สินค้า Exclusive สำหรับงาน TADA Fan Meeting 2026 พร้อมจำหน่ายแล้วบน NOVIEW SHOP!

งาน **TADA Fan Meeting 2026** ใกล้เข้ามาแล้ว และเราได้เตรียมสินค้าพิเศษสุดสำหรับงานนี้ไว้ให้แฟนๆ ทุกคนแล้ว

**สินค้า Exclusive ที่มีจำหน่าย:**
- TADA Concert Wristband (Glow-in-the-dark)
- TADA x NOVIEW Collab T-Shirt (White / Black)
- TADA Signed Polaroid Set — **จำนวนจำกัด 200 เซ็ต**
- TADA Official Fan Light

**รายละเอียดงาน:**
- วันที่ : 15 มิถุนายน 2026
- สถานที่ : Hall 9 IMPACT Arena เมืองทองธานี
- รอบ : 14:00 น. และ 19:00 น.

สั่งซื้อสินค้าล่วงหน้าได้เลยที่หน้า TADA ใน NOVIEW SHOP สินค้าบางรายการมีจำนวนจำกัด แนะนำให้รีบสั่งก่อนหมด!

**หมายเหตุ:** สินค้าจะจัดส่งหลังงาน 2–3 สัปดาห์`,
    imageUrl: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=800&q=80',
    category: 'event',
    publishedAt: '2026-04-28T09:00:00+07:00',
    isPinned: true,
  },
  {
    id: 'news-3',
    title: 'สินค้าใหม่! BUS The Sophomore Album (Signed Edition)',
    excerpt: 'BUS ออกอัลบั้มใหม่ "The Sophomore" พร้อม Signed Edition จำนวนจำกัด 500 ชุด วางจำหน่ายผ่าน NOVIEW SHOP เท่านั้น',
    content: `BUS กลับมาพร้อมอัลบั้มใหม่ "The Sophomore" แล้ว!

หลังจากที่ทุกคนรอคอยมานาน วันนี้ **BUS** ได้ออกอัลบั้มชุดใหม่อย่างเป็นทางการ พร้อมกับ Signed Edition สุดพิเศษที่มีจำนวนจำกัดเพียง **500 ชุดทั่วโลก** และจำหน่ายผ่าน NOVIEW SHOP เท่านั้น!

**รายละเอียดอัลบั้ม:**
- ชื่ออัลบั้ม : The Sophomore
- จำนวนเพลง : 8 tracks
- รูปแบบ : CD + Digital

**สิ่งที่ได้รับใน Signed Edition:**
- CD 1 แผ่น
- Photobook 48 หน้า (ภาพถ่ายโดย BUS เอง)
- 2 Photocards (Random จาก 10 แบบ)
- 1 Mini Poster
- ลายเซ็นโดย BUS (ลายเซ็นจริง ไม่ใช่ Pre-print)

**ราคา:** ฿1,290

สั่งซื้อได้แล้ววันนี้ที่ **BUS Artist Page** บน NOVIEW SHOP ก่อนหมด!`,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    category: 'product',
    publishedAt: '2026-04-20T12:00:00+07:00',
  },
  {
    id: 'news-4',
    title: 'โปรโมชัน! ซื้อครบ ฿1,500 ส่งฟรีทั่วประเทศ',
    excerpt: 'ตั้งแต่วันนี้ถึง 31 พฤษภาคม 2026 สั่งซื้อสินค้าครบ ฿1,500 ขึ้นไป รับสิทธิ์จัดส่งฟรีทั่วประเทศไทย ไม่มีขั้นต่ำ',
    content: `🎊 โปรโมชันพิเศษ! ส่งฟรีทั่วประเทศเมื่อซื้อครบ ฿1,500

เพื่อขอบคุณแฟนๆ ทุกคนที่ให้การสนับสนุน NOVIEW SHOP เราขอมอบโปรโมชันพิเศษ **ส่งฟรีทั่วประเทศ** สำหรับออร์เดอร์ที่มียอดซื้อครบ ฿1,500 ขึ้นไป

**รายละเอียดโปรโมชัน:**
- ระยะเวลา : 1–31 พฤษภาคม 2026
- ยอดซื้อขั้นต่ำ : ฿1,500 ต่อออร์เดอร์
- ขนส่ง : ส่งผ่าน Kerry Express และ Flash Express
- พื้นที่ : ทั่วประเทศไทย (ยกเว้น เกาะที่ต้องนั่งเรือ)

**นอกจากนั้น ใช้โค้ด NOVIEW10 รับส่วนลดเพิ่ม 10%!**

โค้ดสามารถใช้ได้พร้อมกับโปรโมชันส่งฟรี ยิ่งซื้อยิ่งประหยัด อย่าพลาดนะ! 💛`,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    category: 'promotion',
    publishedAt: '2026-04-30T08:00:00+07:00',
    isPinned: false,
  },
  {
    id: 'news-5',
    title: 'แจ้งการจัดส่งช่วงวันหยุดยาว Songkran 2026',
    excerpt: 'แจ้งปรับตารางจัดส่งช่วงเทศกาลสงกรานต์ 11–15 เมษายน 2026 ออร์เดอร์ที่สั่งในช่วงดังกล่าวจะจัดส่งหลังวันที่ 16 เมษายน',
    content: `แจ้งกำหนดการจัดส่งช่วงเทศกาลสงกรานต์ 2026

เนื่องจากวันหยุดยาวเทศกาลสงกรานต์ 11–15 เมษายน 2026 ทีมงาน NOVIEW SHOP ขอแจ้งปรับตารางการจัดส่งสินค้าดังนี้

**ช่วงวันหยุด (11–15 เมษายน 2026):**
- รับออร์เดอร์ตามปกติ แต่ยังไม่ดำเนินการจัดส่ง
- ระบบชำระเงินทำงานตามปกติ

**หลังวันหยุด (ตั้งแต่ 16 เมษายน 2026):**
- ทีมงานจะดำเนินการจัดส่งออร์เดอร์ที่ค้างทั้งหมดโดยเร็วที่สุด
- คาดว่าสินค้าจะถึงมือลูกค้าภายใน 3–5 วันทำการหลังจัดส่ง

หากมีข้อสงสัยหรือต้องการสอบถามเพิ่มเติม กรุณาติดต่อทีมงานผ่านช่องทาง:
- LINE OA : @noviewshop
- Email : support@noviewshop.com

ขออภัยในความไม่สะดวก และขอบคุณที่ให้การสนับสนุนเสมอมา 🙏`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    category: 'announcement',
    publishedAt: '2026-04-08T10:00:00+07:00',
  },
  {
    id: 'news-6',
    title: 'NADAO Official Goods รุ่นใหม่มาแล้ว — Fan Meeting 2024 Photobook',
    excerpt: 'NADAO Official Goods รุ่นใหม่ล่าสุดเปิดตัวแล้ว ไฮไลต์คือ Fan Meeting 2024 Photobook 96 หน้า และ NADAO Official Thermos รุ่น Limited',
    content: `NADAO Official Goods รุ่นใหม่ล่าสุดมาแล้ว!

ทีม NADAO ได้เตรียมสินค้า Official Goods ชุดใหม่ไว้ให้แฟนๆ ทุกคน หลายรายการเป็น Limited Edition ที่ผลิตมาในจำนวนจำกัด

**สินค้าใหม่ที่น่าสนใจ:**

🔵 **NADAO Fan Meeting 2024 Photobook**
- 96 หน้า ปกแข็ง Hardcover
- รวมภาพ Behind The Scene งาน Fan Meeting ครั้งแรก
- ราคา ฿890

🔵 **NADAO Official Thermos 350ml**
- Stainless Steel 304 คุณภาพสูง
- รักษาความร้อน/เย็นได้ 8 ชั่วโมง
- สกรีนโลโก้ด้วย Laser Engraving
- ราคา ฿590

🔵 **NADAO Multi-Artist Badge Set** (6 ชิ้น)
- Tin Button Badge ขนาด 44mm
- ครบทุก IP ของ NADAO
- ราคา ฿320

🔵 **NADAO Year Book 2024**
- 128 หน้า สรุปกิจกรรมทั้งปี 2024
- ฟรีโปสการ์ด Random
- ราคา ฿750

สินค้าทั้งหมดสามารถสั่งซื้อได้แล้ววันนี้ที่ NADAO Official Goods Section บน NOVIEW SHOP`,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    category: 'product',
    publishedAt: '2026-04-15T11:00:00+07:00',
  },
  {
    id: 'news-7',
    title: 'นโยบายการคืนสินค้าและเปลี่ยนสินค้าของ NOVIEW SHOP',
    excerpt: 'NOVIEW SHOP ปรับปรุงนโยบายการคืนและเปลี่ยนสินค้าใหม่ เพื่อให้ลูกค้าได้รับประสบการณ์ที่ดีที่สุด อ่านรายละเอียดได้ที่นี่',
    content: `นโยบายการคืนสินค้าและเปลี่ยนสินค้า (อัปเดต พฤษภาคม 2026)

เพื่อให้ลูกค้าทุกคนได้รับประสบการณ์การช็อปปิ้งที่ดีที่สุด NOVIEW SHOP ขอแจ้งนโยบายการคืนและเปลี่ยนสินค้าฉบับปรับปรุงดังนี้

**เงื่อนไขการคืนสินค้า:**
- คืนได้ภายใน **7 วัน** นับจากวันที่ได้รับสินค้า
- สินค้าต้องอยู่ในสภาพเดิม ไม่ผ่านการใช้งาน
- แท็กและบรรจุภัณฑ์ต้องครบถ้วน
- **ยกเว้น:** สินค้า Signed Edition, Limited Edition และสินค้าที่ระบุว่า Non-refundable

**ขั้นตอนการคืนสินค้า:**
1. ติดต่อ Support ผ่าน LINE OA : @noviewshop ภายใน 7 วัน
2. แนบรูปภาพสินค้าที่ต้องการคืน
3. ทีมงานจะตรวจสอบและแจ้งผลภายใน 2 วันทำการ
4. จัดส่งสินค้าคืนตามที่อยู่ที่ได้รับแจ้ง (ค่าส่งคืนลูกค้าเป็นผู้รับผิดชอบ)
5. รับเงินคืนภายใน 7–14 วันทำการ

**ช่องทางติดต่อ:**
- LINE OA : @noviewshop
- Email : support@noviewshop.com
- เวลาทำการ : จันทร์–ศุกร์ 10:00–18:00 น.`,
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    category: 'announcement',
    publishedAt: '2026-04-01T09:00:00+07:00',
  },
  {
    id: 'news-8',
    title: 'Flash Sale! ลด 20% ทุกสินค้า TADA MERCH วันเดียวเท่านั้น',
    excerpt: 'วันพรุ่งนี้เท่านั้น! สินค้าทุกชิ้นใน TADA MERCH ลด 20% ตั้งแต่เที่ยงคืนถึงเที่ยงคืน ใช้โค้ด TADA20 ที่ตะกร้าสินค้า',
    content: `⚡ Flash Sale พิเศษ! ลด 20% ทุกสินค้า TADA MERCH

วันพรุ่งนี้ **15 พฤษภาคม 2026** เท่านั้น! เราจัด Flash Sale ลดราคา **20%** ทุกสินค้าในหมวด TADA MERCH ตั้งแต่ 00:00 น. จนถึง 23:59 น.

**วิธีรับส่วนลด:**
1. เพิ่มสินค้าจาก TADA MERCH ลงตะกร้า
2. ไปที่หน้า Checkout
3. ใส่โค้ด **TADA20** ในช่องส่วนลด
4. รับส่วนลดทันที 20%

**สินค้าที่ร่วมรายการ:**
- Sleeping Set (White)
- NONAME Logo Crewneck
- DICE THE FIRST ALBUM
- Everyday Set (BLUE)
- DICE YEAR TWO STICKER
- Official Oversized Hoodie
- Signature Tote Bag
- NONAME Drawstring Bag

**หมายเหตุ:**
- ไม่สามารถใช้ร่วมกับโค้ดส่วนลดอื่นได้
- จำกัด 1 ออร์เดอร์ต่อ 1 บัญชี
- สต็อกมีจำกัด First Come First Served!`,
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    category: 'promotion',
    publishedAt: '2026-05-14T20:00:00+07:00',
    isPinned: false,
  },
];

export class MockNewsRepository implements NewsRepository {
  async getNews(): Promise<News[]> {
    await new Promise((r) => setTimeout(r, 400));
    return [...MOCK_NEWS].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  async getNewsById(id: string): Promise<News | null> {
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_NEWS.find((n) => n.id === id) ?? null;
  }
}
