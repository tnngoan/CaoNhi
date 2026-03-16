export interface Stock {
  company: string;
  ticker: string;
  sector: string;
  sectorKey: string;
  sectorColor: string;
  thesis: { en: string; vi: string };
  risks: { en: string; vi: string };
}

export const stocks: Stock[] = [
  {
    company: "MB Bank",
    ticker: "MBB",
    sector: "Banking",
    sectorKey: "banking",
    sectorColor: "bg-blue-100 text-blue-700",
    thesis: {
      en: "Leading digital bank with strong retail franchise and consistently high ROE. Well-diversified revenue streams with growing bancassurance and fee income contributing to sustainable earnings growth.",
      vi: "Ngân hàng số hàng đầu với mảng bán lẻ mạnh và ROE ổn định cao. Nguồn thu đa dạng với bancassurance và thu nhập phí tăng trưởng đóng góp vào tăng trưởng lợi nhuận bền vững.",
    },
    risks: {
      en: "Interest rate sensitivity, military-linked corporate loan concentration, rising competition in digital banking.",
      vi: "Nhạy cảm lãi suất, tập trung cho vay doanh nghiệp liên quan quân đội, cạnh tranh ngân hàng số tăng.",
    },
  },
  {
    company: "Vinhomes",
    ticker: "VHM",
    sector: "Real Estate",
    sectorKey: "realEstate",
    sectorColor: "bg-emerald-100 text-emerald-700",
    thesis: {
      en: "Vietnam's largest real estate developer with unmatched land bank and brand recognition. Positioned for recovery with diversified project portfolio spanning residential, commercial, and industrial segments.",
      vi: "Chủ đầu tư bất động sản lớn nhất Việt Nam với quỹ đất và thương hiệu vượt trội. Định vị cho phục hồi với danh mục dự án đa dạng bao gồm dân cư, thương mại và công nghiệp.",
    },
    risks: {
      en: "Regulatory delays, high debt levels, dependence on Vingroup ecosystem, property market cyclicality.",
      vi: "Chậm trễ pháp lý, nợ cao, phụ thuộc hệ sinh thái Vingroup, tính chu kỳ thị trường bất động sản.",
    },
  },
  {
    company: "Hoa Phat Group",
    ticker: "HPG",
    sector: "Industrial",
    sectorKey: "industrial",
    sectorColor: "bg-amber-100 text-amber-700",
    thesis: {
      en: "Vietnam's largest steel producer with vertically integrated operations and expanding capacity. Benefiting from infrastructure investment boom and position as low-cost producer in the region.",
      vi: "Nhà sản xuất thép lớn nhất Việt Nam với hoạt động tích hợp dọc và mở rộng công suất. Hưởng lợi từ bùng nổ đầu tư hạ tầng và vị thế nhà sản xuất chi phí thấp trong khu vực.",
    },
    risks: {
      en: "Steel price volatility, China dumping risk, high capital expenditure needs, energy cost fluctuations.",
      vi: "Biến động giá thép, rủi ro bán phá giá từ Trung Quốc, nhu cầu chi tiêu vốn cao, biến động chi phí năng lượng.",
    },
  },
  {
    company: "FPT Corporation",
    ticker: "FPT",
    sector: "Technology",
    sectorKey: "technology",
    sectorColor: "bg-purple-100 text-purple-700",
    thesis: {
      en: "Vietnam's leading technology conglomerate with rapidly growing IT services and digital transformation business. Strong overseas expansion into Japan, US, and European markets with visible revenue growth trajectory.",
      vi: "Tập đoàn công nghệ hàng đầu Việt Nam với dịch vụ CNTT và chuyển đổi số tăng trưởng nhanh. Mở rộng mạnh ra thị trường Nhật Bản, Mỹ và châu Âu với quỹ đạo tăng trưởng doanh thu rõ ràng.",
    },
    risks: {
      en: "Talent retention challenges, currency risk from overseas operations, valuation premium, global IT spending slowdown.",
      vi: "Thách thức giữ chân nhân tài, rủi ro ngoại tệ từ hoạt động nước ngoài, định giá cao, chậm lại chi tiêu CNTT toàn cầu.",
    },
  },
  {
    company: "Vinamilk",
    ticker: "VNM",
    sector: "Consumer",
    sectorKey: "consumer",
    sectorColor: "bg-rose-100 text-rose-700",
    thesis: {
      en: "Dominant dairy company with 50%+ market share and strong distribution network. Stable cash flows and high dividend yield make it an attractive defensive holding with consistent earnings growth.",
      vi: "Công ty sữa thống lĩnh với hơn 50% thị phần và mạng lưới phân phối mạnh. Dòng tiền ổn định và tỷ suất cổ tức cao khiến đây là lựa chọn phòng thủ hấp dẫn với tăng trưởng lợi nhuận ổn định.",
    },
    risks: {
      en: "Raw material price inflation, market saturation risk, increasing competition from imports, slow growth in traditional segments.",
      vi: "Lạm phát giá nguyên liệu, rủi ro bão hòa thị trường, cạnh tranh gia tăng từ hàng nhập khẩu, tăng trưởng chậm ở phân khúc truyền thống.",
    },
  },
  {
    company: "Techcombank",
    ticker: "TCB",
    sector: "Banking",
    sectorKey: "banking",
    sectorColor: "bg-blue-100 text-blue-700",
    thesis: {
      en: "Premium private bank with highest fee income ratio and best-in-class digital platform. CASA ratio leadership and wealth management capabilities drive superior margins and non-interest income generation.",
      vi: "Ngân hàng tư nhân cao cấp với tỷ lệ thu nhập phí cao nhất và nền tảng số hàng đầu. Dẫn đầu tỷ lệ CASA và năng lực quản lý tài sản thúc đẩy biên lợi nhuận và thu nhập ngoài lãi vượt trội.",
    },
    risks: {
      en: "Real estate loan concentration, premium valuation, high competition in wealth management, potential NIM compression.",
      vi: "Tập trung cho vay bất động sản, định giá cao, cạnh tranh mạnh trong quản lý tài sản, tiềm ẩn nén NIM.",
    },
  },
  {
    company: "Masan Group",
    ticker: "MSN",
    sector: "Consumer",
    sectorKey: "consumer",
    sectorColor: "bg-rose-100 text-rose-700",
    thesis: {
      en: "Integrated consumer ecosystem spanning branded consumer goods, modern retail (WinMart), and financial services. Unique positioning to capture Vietnam's consumption upgrade through its platform strategy.",
      vi: "Hệ sinh thái tiêu dùng tích hợp bao gồm hàng tiêu dùng thương hiệu, bán lẻ hiện đại (WinMart) và dịch vụ tài chính. Vị thế độc đáo để nắm bắt nâng cấp tiêu dùng Việt Nam qua chiến lược nền tảng.",
    },
    risks: {
      en: "Complex corporate structure, high leverage, WinMart profitability timeline, execution risk in new segments.",
      vi: "Cấu trúc doanh nghiệp phức tạp, đòn bẩy cao, lộ trình có lãi WinMart, rủi ro thực thi ở phân khúc mới.",
    },
  },
  {
    company: "Phu Nhuan Jewelry",
    ticker: "PNJ",
    sector: "Consumer",
    sectorKey: "consumer",
    sectorColor: "bg-rose-100 text-rose-700",
    thesis: {
      en: "Market leader in branded jewelry retail with strong store expansion and digital initiatives. Benefiting from rising disposable incomes and shift from unbranded to branded jewelry purchasing behavior.",
      vi: "Dẫn đầu thị trường bán lẻ trang sức thương hiệu với mở rộng cửa hàng mạnh và sáng kiến số. Hưởng lợi từ thu nhập khả dụng tăng và chuyển dịch từ mua sắm trang sức không thương hiệu sang thương hiệu.",
    },
    risks: {
      en: "Gold price volatility, consumer sentiment sensitivity, store expansion costs, competition from global brands entering Vietnam.",
      vi: "Biến động giá vàng, nhạy cảm với tâm lý tiêu dùng, chi phí mở rộng cửa hàng, cạnh tranh từ thương hiệu quốc tế vào Việt Nam.",
    },
  },
];
