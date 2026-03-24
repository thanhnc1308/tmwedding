export const vi = {
  envelope: {
    greeting: 'Trân trọng kính mời',
    defaultGuest: 'Bạn',
    weddingOf: 'đến dự lễ thành hôn của',
    openCta: 'Nhấn vào đây để mở thiệp mời',
  },
  banner: {
    weddingCeremony: 'Lễ thành hôn',
    at: 'VÀO LÚC',
    dateTime: '15:00 CHỦ NHẬT, NGÀY 05 THÁNG 04 NĂM 2026',
  },
  heading: {
    invitationLine1: 'TRÂN TRỌNG KÍNH MỜI {guestPronoun} TỚI THAM DỰ TIỆC',
    invitationLine2: 'CHUNG VUI CÙNG {wePronoun}',
    atTime: 'Vào lúc',
  },
  eventInfo: {
    date: 'Chủ Nhật, ngày 05 tháng 04 năm 2026',
    lunarDate: '(Tức ngày 18 tháng 02 năm Bính Ngọ)',
    monthPrefix: 'Tháng',
    weekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] as readonly string[],
    at: 'Tại',
    groomVenue: 'Tư gia Nhà Trai',
    groomAddress: 'Xóm 6, Thôn Trà Bồ, xã Đoàn Đào, tỉnh Hưng Yên',
    brideVenue: 'Tư gia Nhà Gái',
    brideAddress: 'Xóm 1, Thôn Đặng Xá, xã Tiên Hoa, tỉnh Hưng Yên',
    getDirections: 'Xem đường đi',
  },
  countdown: {
    days: 'Ngày',
    hours: 'Giờ',
    minutes: 'Phút',
    seconds: 'Giây',
  },
  timeline: {
    title: 'Lịch trình nghi lễ',
    groomEvents: [
      { time: '10h', title: 'Đón khách' },
      { time: '11h', title: 'Bữa trưa vui vẻ' },
      { time: '13h30', title: 'Lễ vu quy' },
      { time: '15h', title: 'Lễ thành hôn' },
    ] as readonly { time: string; title: string }[],
    brideEvents: [
      { time: '9h30', title: 'Đón khách' },
      { time: '10h', title: 'Bữa trưa vui vẻ' },
      { time: '13h30', title: 'Lễ vu quy' },
      { time: '15h', title: 'Lễ thành hôn' },
    ] as readonly { time: string; title: string }[],
  },
  gallery: {
    title: 'Một số khoảnh khắc của {wePronoun}',
  },
  gift: {
    message1:
      'Sự hiện diện và lời chúc của {guestPronoun} là món quà quý giá nhất đối với {wePronoun}!',
    message2:
      'Nếu {guestPronoun} muốn gửi gắm thêm tình cảm, có thể tìm thấy thông tin bên dưới đây. {wePronoun} vô cùng trân trọng.',
    brideTitle: 'Cô Dâu',
    groomTitle: 'Chú Rể',
    accountName: 'Tên TK',
    accountNumber: 'Số TK',
    bankName: 'Ngân hàng',
    copyAccount: 'Sao chép số tài khoản',
    copiedToast: 'Đã sao chép số tài khoản',
    giftBoxAlt: 'Hộp quà mừng',
  },
  rsvp: {
    intro:
      'Để {wePronoun} có thể đón tiếp {guestPronoun} một cách trọn vẹn nhất, hãy xác nhận sự có mặt của {guestPronoun} nhé.',
    nameLabel: 'Tên của {guestPronoun}',
    attendanceQuestion:
      '{name} sẽ đến chia vui trong tiệc cưới của {wePronoun} chứ?',
    acceptOption: 'Rất sẵn lòng có mặt',
    declineOption: 'Rất tiếc phải từ chối',
    guestCountLabel: 'Và số lượng người tham gia',
    guestCountPlaceholder: 'Ví dụ: 1',
    messageLabel:
      '{guestPronoun} có muốn để lại lời nhắn, hay lời chúc gì cho {wePronoun} không ^^?',
    messagePlaceholder: 'Lời chúc...',
    submitButton: 'Gửi phản hồi',
    thankYouTitle: 'Cảm ơn {guestPronoun} đã phản hồi!',
    thankYouMessage:
      '{wePronoun} rất vui khi nhận được phản hồi của {guestPronoun}.\nHẹn gặp {guestPronoun} trong ngày vui của {wePronoun} nhé!',
    successToast: 'Cảm ơn {guestPronoun} đã phản hồi!',
    errorToast: 'Có lỗi xảy ra, vui lòng thử lại.',
    validationError: 'Vui lòng chọn xác nhận tham dự.',
  },
  guestBook: {
    title: 'Sổ lưu bút',
  },
  footer: {
    thankYou: 'Thank you!',
    message:
      'Cảm ơn {guestPronoun} đã dành tình cảm cho {wePronounLowerCase}.\n{wePronoun} vô cùng trân quý khi được chia sẻ niềm hạnh phúc này cùng {guestPronoun}.\nHẹn gặp {guestPronoun} tại buổi lễ nhé!',
  },
  navigation: {
    event: 'Sự kiện',
    gallery: 'Hình ảnh',
    rsvp: 'Phản hồi',
    guestBook: 'Lời chúc',
  },
  saveTheDate: {
    button: 'Thêm vào lịch',
    eventTitle: 'Đám Cưới Thành Mến',
  },
  months: [
    'Tháng Một',
    'Tháng Hai',
    'Tháng Ba',
    'Tháng Tư',
    'Tháng Năm',
    'Tháng Sáu',
    'Tháng Bảy',
    'Tháng Tám',
    'Tháng Chín',
    'Tháng Mười',
    'Tháng Mười Một',
    'Tháng Mười Hai',
  ] as readonly string[],
} as const;

type DeepStringify<T> = T extends readonly (infer U)[]
  ? U extends { time: string; title: string }
    ? readonly { time: string; title: string }[]
    : readonly string[]
  : T extends string
    ? string
    : T extends object
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type TranslationDict = DeepStringify<typeof vi>;
