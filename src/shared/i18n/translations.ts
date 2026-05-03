export const translations = {
  TH: {
    // Header
    nav: {
      shop: 'SHOP',
      artist: 'ARTIST',
      news: 'NEWS',
      login: 'เข้าสู่ระบบ',
      logout: 'ออกจากระบบ',
      searchAriaLabel: 'ค้นหา',
      cartAriaLabel: 'ตะกร้าสินค้า',
    },
    // Footer
    footer: {
      termsOfService: 'ข้อกำหนดการใช้งาน',
      contactUs: 'ติดต่อเรา',
      followUs: 'ติดตามเรา',
    },
    // Hero Banner
    hero: {
      shopNow: 'ช็อปเลย',
      prevSlide: 'สไลด์ก่อนหน้า',
      nextSlide: 'สไลด์ถัดไป',
      goToSlide: (n: number) => `ไปสไลด์ที่ ${n}`,
    },
    // Product sections
    products: {
      viewAll: 'ดูทั้งหมด',
      officialStoreLabel: 'Official Store',
      addToCart: 'เพิ่มในตะกร้า',
      addedToCart: '✓ เพิ่มในตะกร้าแล้ว',
    },
    // Product detail
    productDetail: {
      addToWishlist: 'เพิ่มในรายการโปรด',
      color: 'สี',
      size: 'ไซซ์',
      quantity: 'จำนวน',
      pleaseSelectColor: 'กรุณาเลือกสี',
      pleaseSelectSize: 'กรุณาเลือกไซซ์',
      soldOut: 'สินค้าหมด',
      addedToCartSuccess: 'เพิ่มในตะกร้าแล้ว!',
      addToCartBtn: 'เพิ่มในตะกร้า',
      noteNoShipping: '- ราคาสินค้าไม่รวมค่าจัดส่ง และค่าธรรมเนียมชำระสินค้า',
      noteInternational:
        '- สำหรับการจัดส่งสินค้าไปยังต่างประเทศ ราคาค่าจัดส่งอาจมีการเปลี่ยนแปลงขึ้นอยู่กับพื้นที่แต่ละประเทศ',
    },
    // Checkout
    checkout: {
      breadcrumbHome: 'หน้าแรก',
      title: 'จ่ายเลย',
      myCart: 'ตะกร้าของฉัน',
      itemCount: (n: number) => `${n} รายการ`,
      emptyCart: 'ตะกร้าของคุณว่างเปล่า',
      backToShop: 'กลับไปเลือกสินค้า',
      couponInvalid: (code: string) =>
        `รหัส "${code}" ไม่ถูกต้องหรือหมดอายุแล้ว`,
      confirmAlert:
        'ขอบคุณสำหรับการสั่งซื้อ! ระบบชำระเงินจะเปิดในขั้นตอนถัดไป',
    },
    // Cart item row
    cartItem: {
      productLabel: 'สินค้า',
      price: 'ราคา',
      quantity: 'จำนวน',
      total: 'ราคารวม',
      remove: 'ลบ',
      decreaseAriaLabel: 'ลดจำนวน',
      increaseAriaLabel: 'เพิ่มจำนวน',
    },
    // Shipping section
    shipping: {
      sectionTitle: 'ตัวเลือกการจัดส่ง',
      addressLabel: 'ที่อยู่สำหรับการจัดส่ง',
      noAddressMessage: 'กรุณาใส่ที่อยู่เพื่อจัดส่ง',
      editBtn: 'แก้ไข',
      modalTitle: 'ที่อยู่สำหรับการจัดส่ง',
      fullName: 'ชื่อ-นามสกุล',
      phone: 'เบอร์โทรศัพท์',
      address: 'ที่อยู่ (บ้านเลขที่ / ถนน / ซอย)',
      district: 'แขวง/ตำบล',
      province: 'จังหวัด',
      postalCode: 'รหัสไปรษณีย์',
      cancel: 'ยกเลิก',
      save: 'บันทึก',
    },
    // Order summary
    orderSummary: {
      title: 'สินค้าในตะกร้าของฉัน',
      subtotal: 'ราคารวม',
      shipping: 'ค่าส่ง',
      couponPlaceholder: 'บัตรของขวัญหรือรหัสส่วนลด',
      applyBtn: 'ใช้ส่วนลด',
      discount: 'ส่วนลด',
      pointDiscount: 'ส่วนลดจากคะแนน',
      total: 'ราคารวม',
      confirmBtn: 'ยืนยันการสั่งซื้อ →',
    },
    // Profile
    profile: {
      breadcrumbHome: 'หน้าแรก',
      title: 'โปรไฟล์',
      points: (n: number) => `${n} คะแนน`,
      tabInformation: 'ข้อมูล',
      tabWishlist: (n: number) => `รายการโปรด (${n})`,
      tabHistory: 'ประวัติการสั่งซื้อ',
      editDeliveryAddress: 'แก้ไขที่อยู่จัดส่ง',
      logout: 'ออกจากระบบ',
      ketchupId: 'Ketchup ID',
      fullName: 'ชื่อ-นามสกุล',
      phone: 'เบอร์โทรศัพท์',
      email: 'อีเมล',
      address: 'ที่อยู่',
      notProvided: '-',
      emptyWishlist: 'ยังไม่มีรายการโปรด',
      emptyHistory: 'ยังไม่มีประวัติการสั่งซื้อ',
      loginRequired: 'กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์',
      loginBtn: 'เข้าสู่ระบบ',
    },
    // Category page UI — titles come from src/shared/config/categories.ts
    category: {
      breadcrumbHome: 'หน้าแรก',
      showing: (from: number, to: number, total: number) =>
        `แสดง ${from}-${to} จาก ${total} รายการ`,
      showLabel: 'แสดง',
      sortLabel: 'เรียงโดย',
      sortDefault: 'ค่าเริ่มต้น',
      sortPriceAsc: 'ราคา: ต่ำ → สูง',
      sortPriceDesc: 'ราคา: สูง → ต่ำ',
      sortNewest: 'ใหม่ล่าสุด',
      noProducts: 'ไม่พบสินค้า',
      prevPage: 'ก่อนหน้า',
      nextPage: 'ถัดไป',
      addToCart: 'เพิ่มในตะกร้า',
      added: '✓ เพิ่มแล้ว',
    },
  },

  EN: {
    // Header
    nav: {
      shop: 'SHOP',
      artist: 'ARTIST',
      news: 'NEWS',
      login: 'LOGIN',
      logout: 'LOGOUT',
      searchAriaLabel: 'Search',
      cartAriaLabel: 'Shopping cart',
    },
    // Footer
    footer: {
      termsOfService: 'Terms of Service',
      contactUs: 'Contact Us',
      followUs: 'Follow us',
    },
    // Hero Banner
    hero: {
      shopNow: 'SHOP NOW',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
      goToSlide: (n: number) => `Go to slide ${n}`,
    },
    // Product sections
    products: {
      viewAll: 'VIEW ALL',
      officialStoreLabel: 'Official Store',
      addToCart: 'Add to Cart',
      addedToCart: '✓ Added to Cart',
    },
    // Product detail
    productDetail: {
      addToWishlist: 'Add to Wishlist',
      color: 'Color',
      size: 'Size',
      quantity: 'Qty',
      pleaseSelectColor: 'Please select a color',
      pleaseSelectSize: 'Please select a size',
      soldOut: 'Sold Out',
      addedToCartSuccess: 'Added to Cart!',
      addToCartBtn: 'Add to Cart',
      noteNoShipping:
        '- Product price does not include shipping or payment fees.',
      noteInternational:
        '- For international shipping, rates may vary depending on the destination.',
    },
    // Checkout
    checkout: {
      breadcrumbHome: 'Home',
      title: 'Checkout',
      myCart: 'My Cart',
      itemCount: (n: number) => `${n} item${n !== 1 ? 's' : ''}`,
      emptyCart: 'Your cart is empty.',
      backToShop: 'Back to Shopping',
      couponInvalid: (code: string) =>
        `Code "${code}" is invalid or has expired.`,
      confirmAlert:
        'Thank you for your order! The payment page will open in the next step.',
    },
    // Cart item row
    cartItem: {
      productLabel: 'Product',
      price: 'Price',
      quantity: 'Qty',
      total: 'Total',
      remove: 'Remove',
      decreaseAriaLabel: 'Decrease quantity',
      increaseAriaLabel: 'Increase quantity',
    },
    // Shipping section
    shipping: {
      sectionTitle: 'Delivery Options',
      addressLabel: 'Shipping Address',
      noAddressMessage: 'Please enter your delivery address.',
      editBtn: 'Edit',
      modalTitle: 'Shipping Address',
      fullName: 'Full Name',
      phone: 'Phone Number',
      address: 'Address (house no. / street / alley)',
      district: 'District / Sub-district',
      province: 'Province / City',
      postalCode: 'Postal Code',
      cancel: 'Cancel',
      save: 'Save',
    },
    // Order summary
    orderSummary: {
      title: 'My Cart Items',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      couponPlaceholder: 'Gift card or discount code',
      applyBtn: 'Apply',
      discount: 'Discount',
      pointDiscount: 'Point Discount',
      total: 'Total',
      confirmBtn: 'Confirm Order →',
    },
    // Profile
    profile: {
      breadcrumbHome: 'Home',
      title: 'Profile',
      points: (n: number) => `${n} points`,
      tabInformation: 'Information',
      tabWishlist: (n: number) => `Wishlist (${n})`,
      tabHistory: 'History',
      editDeliveryAddress: 'Edit Delivery Address',
      logout: 'Logout',
      ketchupId: 'Ketchup ID',
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      notProvided: '-',
      emptyWishlist: 'No items in your wishlist.',
      emptyHistory: 'No order history yet.',
      loginRequired: 'Please log in to view your profile.',
      loginBtn: 'Log In',
    },
    // Category
    category: {
      breadcrumbHome: 'Home',
      showing: (from: number, to: number, total: number) =>
        `Showing ${from}-${to} of ${total} results`,
      showLabel: 'Show',
      sortLabel: 'Sort by',
      sortDefault: 'Default',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortNewest: 'Newest',
      noProducts: 'No products found.',
      prevPage: 'Prev',
      nextPage: 'Next',
      addToCart: 'Add to Cart',
      added: '✓ Added',
    },
  },
} as const;

export type Translations = typeof translations.TH;
