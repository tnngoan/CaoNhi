#!/usr/bin/env node
/**
 * Historical Research Archive Generator
 * Generates 156+ Vietnamese investment research articles covering 3 years
 * of real Vietnam stock market conditions (March 2023 – March 2026).
 *
 * Cadence: Weekly rotation (Market Outlook / Stock Pick / Portfolio Strategy)
 *          + Monthly Sector Reports
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "..", "src", "lib", "data", "articles", "data.json");

// ── Vietnam market context by month ──────────────────────────────────
const MONTHS = [
  // 2023
  {
    key: "2023-03", vnLow: 1035, vnHigh: 1065, trend: "recovery",
    events: ["Thị trường hồi phục sau đáy 2022", "Sự kiện SVB tác động tâm lý ngắn hạn", "NHNN bắt đầu nới lỏng chính sách tiền tệ"],
    sectors: { hot: "ngân hàng", cold: "bất động sản" },
    macro: "GDP Q1/2023 tăng 3.32%, thấp nhất nhiều năm. Lãi suất điều hành giảm 0.5%.",
    foreignFlow: "khối ngoại bán ròng mạnh",
  },
  {
    key: "2023-04", vnLow: 1040, vnHigh: 1075, trend: "sideways",
    events: ["NHNN tiếp tục hạ lãi suất lần 2", "Thanh khoản thị trường cải thiện", "Kỳ vọng gói hỗ trợ kinh tế từ Chính phủ"],
    sectors: { hot: "công nghệ", cold: "thép" },
    macro: "Sản xuất công nghiệp giảm 2%. FDI giải ngân tăng 7.8% so cùng kỳ.",
    foreignFlow: "khối ngoại bán ròng giảm dần",
  },
  {
    key: "2023-05", vnLow: 1050, vnHigh: 1085, trend: "accumulation",
    events: ["VN-Index vượt MA50 ngày", "Dòng tiền nội bắt đầu quay lại", "Nhóm cổ phiếu ngân hàng dẫn dắt"],
    sectors: { hot: "ngân hàng", cold: "bất động sản" },
    macro: "CPI 5 tháng tăng 3.55%. Xuất khẩu giảm 11.6% do cầu thế giới yếu.",
    foreignFlow: "khối ngoại bán ròng ~500 tỷ/tuần",
  },
  {
    key: "2023-06", vnLow: 1070, vnHigh: 1120, trend: "uptrend",
    events: ["NHNN hạ lãi suất lần 4", "VN-Index breakout qua 1,100", "Quốc hội thảo luận Luật Đất đai sửa đổi"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "GDP Q2 tăng 4.14%. Tăng trưởng tín dụng đạt 4.73%. Lãi suất huy động giảm mạnh.",
    foreignFlow: "khối ngoại mua ròng trở lại nhẹ",
  },
  {
    key: "2023-07", vnLow: 1120, vnHigh: 1175, trend: "strong-uptrend",
    events: ["VN-Index rally mạnh vượt 1,150", "Thanh khoản bùng nổ trên 20,000 tỷ/phiên", "Nhóm bất động sản bắt đầu hồi phục"],
    sectors: { hot: "bất động sản", cold: "hàng tiêu dùng" },
    macro: "FDI đăng ký mới tăng mạnh. Chính phủ đẩy nhanh giải ngân đầu tư công.",
    foreignFlow: "khối ngoại mua ròng ~1,000 tỷ trong tháng",
  },
  {
    key: "2023-08", vnLow: 1150, vnHigh: 1235, trend: "strong-uptrend",
    events: ["VN-Index chạm 1,200 điểm", "Fitch hạ xếp hạng tín dụng Mỹ", "Nhóm cổ phiếu vốn hóa lớn dẫn dắt sóng tăng"],
    sectors: { hot: "ngân hàng", cold: "thủy sản" },
    macro: "CPI tháng 8 tăng 2.96% YoY. Xuất khẩu phục hồi nhẹ. GDP 8 tháng tăng 3.72%.",
    foreignFlow: "khối ngoại bán ròng mạnh trở lại ~8,000 tỷ trong tháng",
  },
  {
    key: "2023-09", vnLow: 1100, vnHigh: 1170, trend: "correction",
    events: ["VN-Index điều chỉnh sau khi chạm 1,200", "Fed giữ lãi suất cao", "Áp lực chốt lời gia tăng"],
    sectors: { hot: "công nghệ", cold: "bất động sản" },
    macro: "GDP Q3 tăng 5.33%. Tín dụng tăng trưởng chậm, đạt 6.2% YTD.",
    foreignFlow: "khối ngoại bán ròng ~5,000 tỷ",
  },
  {
    key: "2023-10", vnLow: 1060, vnHigh: 1130, trend: "volatile",
    events: ["VN-Index test lại vùng 1,050–1,080", "Xung đột Israel-Hamas tác động tâm lý", "Thanh khoản sụt giảm mạnh"],
    sectors: { hot: "dầu khí", cold: "bất động sản" },
    macro: "Xung đột Trung Đông đẩy giá dầu tăng. CPI 10 tháng kiểm soát ở 3.2%.",
    foreignFlow: "khối ngoại bán ròng tiếp tục",
  },
  {
    key: "2023-11", vnLow: 1060, vnHigh: 1105, trend: "consolidation",
    events: ["VN-Index tích lũy quanh 1,070–1,100", "Kỳ vọng Fed dừng tăng lãi suất", "Nhà đầu tư chờ đợi kết quả kinh doanh Q3"],
    sectors: { hot: "ngân hàng", cold: "thép" },
    macro: "Vốn FDI giải ngân 11 tháng tăng 3.1%. Xuất khẩu tháng 11 cải thiện.",
    foreignFlow: "khối ngoại giảm bán ròng",
  },
  {
    key: "2023-12", vnLow: 1095, vnHigh: 1135, trend: "year-end-rally",
    events: ["VN-Index rally cuối năm về 1,129", "KQKD Q3 ngân hàng tích cực", "NHNN nới room tín dụng cuối năm"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "GDP 2023 đạt 5.05%. CPI bình quân 3.25%. Tín dụng tăng 13.5%.",
    foreignFlow: "khối ngoại mua ròng nhẹ cuối năm",
  },
  // 2024
  {
    key: "2024-01", vnLow: 1110, vnHigh: 1175, trend: "uptrend",
    events: ["Dòng tiền đầu năm tích cực", "Kỳ vọng Fed pivot trong 2024", "Nghị quyết 01 đặt mục tiêu GDP 6–6.5%"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "GDP mục tiêu 6-6.5%. Lãi suất huy động giảm về mức thấp nhất 3 năm.",
    foreignFlow: "khối ngoại bán ròng ~3,000 tỷ",
  },
  {
    key: "2024-02", vnLow: 1140, vnHigh: 1210, trend: "tet-rally",
    events: ["Rally trước Tết Nguyên đán", "VN-Index vượt 1,200 lần đầu kể từ tháng 8/2023", "Thanh khoản cải thiện mạnh sau Tết"],
    sectors: { hot: "bất động sản", cold: "thủy sản" },
    macro: "CPI tháng 2 tăng nhẹ do yếu tố Tết. FDI đăng ký tăng 38% so cùng kỳ.",
    foreignFlow: "khối ngoại mua ròng trước Tết",
  },
  {
    key: "2024-03", vnLow: 1180, vnHigh: 1265, trend: "strong-uptrend",
    events: ["VN-Index breakout lên 1,260", "Quốc hội thông qua Luật Đất đai sửa đổi", "Nhóm bất động sản tăng mạnh"],
    sectors: { hot: "bất động sản", cold: "hàng tiêu dùng" },
    macro: "GDP Q1/2024 tăng 5.66%. Tín dụng Q1 tăng 1.34%. Xuất khẩu phục hồi +17%.",
    foreignFlow: "khối ngoại bán ròng ~15,000 tỷ trong Q1",
  },
  {
    key: "2024-04", vnLow: 1200, vnHigh: 1285, trend: "uptrend",
    events: ["VN-Index test vùng 1,280–1,290", "KQKD Q1 ngân hàng vượt kỳ vọng", "Luật Kinh doanh BĐS sửa đổi có hiệu lực sớm"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "Sản xuất công nghiệp phục hồi mạnh. PMI tháng 4 đạt 50.3 (mở rộng).",
    foreignFlow: "khối ngoại bán ròng mạnh ~8,000 tỷ trong tháng",
  },
  {
    key: "2024-05", vnLow: 1230, vnHigh: 1295, trend: "distribution",
    events: ["VN-Index phân phối tại đỉnh", "Áp lực bán từ khối ngoại tiếp tục", "Nhiều cổ phiếu blue-chip rung lắc mạnh"],
    sectors: { hot: "công nghệ", cold: "bất động sản" },
    macro: "GDP 5 tháng tăng 5.9%. Xuất khẩu 5 tháng tăng 15.2%. FDI giải ngân tăng 7.8%.",
    foreignFlow: "khối ngoại bán ròng ~10,000 tỷ",
  },
  {
    key: "2024-06", vnLow: 1225, vnHigh: 1290, trend: "consolidation",
    events: ["VN-Index dao động quanh 1,240–1,280", "Fed giữ lãi suất, dự kiến 1 lần cắt trong năm", "Dòng tiền luân chuyển sang nhóm mid-cap"],
    sectors: { hot: "công nghệ", cold: "thép" },
    macro: "GDP Q2 tăng 6.93%. Tín dụng 6 tháng tăng 6%. CPI 6 tháng tăng 4.08%.",
    foreignFlow: "khối ngoại bán ròng ~6,000 tỷ",
  },
  {
    key: "2024-07", vnLow: 1200, vnHigh: 1265, trend: "correction",
    events: ["VN-Index điều chỉnh về 1,200", "Lo ngại nợ xấu ngân hàng tăng", "Giá dầu giảm tác động nhóm dầu khí"],
    sectors: { hot: "hàng tiêu dùng", cold: "dầu khí" },
    macro: "Nhiệt độ kỷ lục ảnh hưởng sản xuất. Xuất khẩu tháng 7 đạt kỷ lục $34 tỷ.",
    foreignFlow: "khối ngoại giảm bán ròng",
  },
  {
    key: "2024-08", vnLow: 1210, vnHigh: 1265, trend: "recovery",
    events: ["VN-Index hồi phục lại vùng 1,250", "KQKD Q2 nhìn chung tích cực", "Bão Yagi ảnh hưởng miền Bắc"],
    sectors: { hot: "ngân hàng", cold: "nông nghiệp" },
    macro: "GDP 8 tháng tăng 6.42%. Tín dụng tăng 6.63%. PMI quay lại trên 50.",
    foreignFlow: "khối ngoại mua ròng nhẹ",
  },
  {
    key: "2024-09", vnLow: 1245, vnHigh: 1290, trend: "uptrend",
    events: ["Fed cắt lãi suất 50bps — lần đầu từ 2020", "VN-Index phản ứng tích cực", "Dòng tiền ETF ngoại quay lại"],
    sectors: { hot: "bất động sản", cold: "thủy sản" },
    macro: "GDP Q3 tăng 7.4% — cao nhất 2 năm. Bão Yagi gây thiệt hại ~40,000 tỷ.",
    foreignFlow: "khối ngoại mua ròng ~2,000 tỷ",
  },
  {
    key: "2024-10", vnLow: 1235, vnHigh: 1285, trend: "volatile",
    events: ["Bầu cử Mỹ tạo biến động", "Nhóm cổ phiếu hưởng lợi xuất khẩu biến động mạnh", "Thanh khoản thị trường đạt ~25,000 tỷ/phiên"],
    sectors: { hot: "công nghệ", cold: "bất động sản" },
    macro: "CPI 10 tháng tăng 3.78%. FDI giải ngân đạt $17.3 tỷ, tăng 8.8%.",
    foreignFlow: "khối ngoại bán ròng trước bầu cử Mỹ",
  },
  {
    key: "2024-11", vnLow: 1195, vnHigh: 1260, trend: "correction",
    events: ["Trump đắc cử — lo ngại thuế quan", "VN-Index giảm mạnh về 1,200", "USD tăng mạnh gây áp lực tỷ giá"],
    sectors: { hot: "xuất khẩu", cold: "ngân hàng" },
    macro: "GDP 11 tháng tăng 6.8%. Xuất khẩu Mỹ chiếm 29% tổng kim ngạch.",
    foreignFlow: "khối ngoại bán ròng ~12,000 tỷ trong tháng",
  },
  {
    key: "2024-12", vnLow: 1220, vnHigh: 1275, trend: "year-end-consolidation",
    events: ["VN-Index tích lũy quanh 1,250", "Các quỹ ETF rebalance cuối năm", "NHNN giữ ổn định tỷ giá"],
    sectors: { hot: "ngân hàng", cold: "thép" },
    macro: "GDP 2024 đạt 7.09%. CPI bình quân 3.63%. Tín dụng tăng 15.08%.",
    foreignFlow: "khối ngoại bán ròng cả năm ~90,000 tỷ",
  },
  // 2025
  {
    key: "2025-01", vnLow: 1230, vnHigh: 1280, trend: "cautious",
    events: ["Thị trường thận trọng đầu năm", "Lo ngại thuế quan Trump 2.0", "VN-Index dao động 1,240–1,270"],
    sectors: { hot: "nội địa", cold: "xuất khẩu" },
    macro: "GDP mục tiêu 2025: 6.5–7%. NHNN đặt mục tiêu tín dụng 16%.",
    foreignFlow: "khối ngoại bán ròng ~5,000 tỷ",
  },
  {
    key: "2025-02", vnLow: 1220, vnHigh: 1275, trend: "tet-volatility",
    events: ["VN-Index biến động trước và sau Tết", "Trump áp thuế mới lên hàng hóa Trung Quốc", "Tâm lý thị trường phân hóa mạnh"],
    sectors: { hot: "ngân hàng", cold: "thép" },
    macro: "CPI tháng 2 tăng do Tết. FDI đăng ký Q1 tăng 25% so cùng kỳ.",
    foreignFlow: "khối ngoại mua ròng nhẹ sau Tết",
  },
  {
    key: "2025-03", vnLow: 1250, vnHigh: 1305, trend: "spring-rally",
    events: ["VN-Index vượt 1,300", "GDP Q1 ấn tượng", "Kỳ vọng nâng hạng thị trường FTSE"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "GDP Q1/2025 tăng 6.93%. Xuất khẩu Q1 tăng 18.6%. PMI đạt 52.5.",
    foreignFlow: "khối ngoại mua ròng ~3,000 tỷ",
  },
  {
    key: "2025-04", vnLow: 1270, vnHigh: 1325, trend: "uptrend",
    events: ["VN-Index duy trì trên 1,300", "KQKD Q1 ngân hàng tăng trưởng 20%+", "FDI vào KCN tăng mạnh"],
    sectors: { hot: "KCN", cold: "bán lẻ" },
    macro: "Sản xuất công nghiệp tăng 9.5%. Giải ngân đầu tư công đạt 22% kế hoạch.",
    foreignFlow: "khối ngoại mua ròng tiếp ~2,000 tỷ",
  },
  {
    key: "2025-05", vnLow: 1285, vnHigh: 1345, trend: "strong-uptrend",
    events: ["VN-Index test 1,340", "Thanh khoản bùng nổ trên 30,000 tỷ/phiên", "Nhóm midcap breakout mạnh"],
    sectors: { hot: "bất động sản", cold: "thủy sản" },
    macro: "GDP 5 tháng tăng 7.1%. Tín dụng tăng 7.2% YTD. Xuất khẩu tăng 15%.",
    foreignFlow: "khối ngoại chuyển sang mua ròng mạnh",
  },
  {
    key: "2025-06", vnLow: 1275, vnHigh: 1335, trend: "consolidation",
    events: ["VN-Index điều chỉnh nhẹ từ đỉnh", "Luân chuyển dòng tiền giữa các nhóm", "Fed giữ lãi suất ổn định"],
    sectors: { hot: "công nghệ", cold: "dầu khí" },
    macro: "GDP Q2 tăng 7.25%. CPI 6 tháng kiểm soát tốt ở 3.2%. FDI giải ngân kỷ lục.",
    foreignFlow: "khối ngoại mua ròng giảm dần",
  },
  {
    key: "2025-07", vnLow: 1255, vnHigh: 1315, trend: "pullback",
    events: ["VN-Index pullback về vùng 1,260", "Mùa KQKD Q2 bắt đầu", "Lo ngại Fed trì hoãn cắt lãi suất"],
    sectors: { hot: "hàng tiêu dùng", cold: "bất động sản" },
    macro: "Xuất khẩu tháng 7 đạt $36 tỷ — kỷ lục mới. PMI duy trì trên 50.",
    foreignFlow: "khối ngoại bán ròng nhẹ",
  },
  {
    key: "2025-08", vnLow: 1265, vnHigh: 1325, trend: "recovery",
    events: ["VN-Index phục hồi nhanh", "KQKD Q2 vượt kỳ vọng", "Kỳ vọng FTSE nâng hạng tháng 9"],
    sectors: { hot: "ngân hàng", cold: "thép" },
    macro: "GDP 8 tháng tăng 7.2%. Tín dụng tăng 8.5% YTD. Du lịch phục hồi mạnh.",
    foreignFlow: "khối ngoại mua ròng trở lại ~4,000 tỷ",
  },
  {
    key: "2025-09", vnLow: 1285, vnHigh: 1345, trend: "uptrend",
    events: ["FTSE đưa Việt Nam vào danh sách xem xét nâng hạng", "VN-Index rally mạnh", "Dòng tiền ETF ngoại đổ vào"],
    sectors: { hot: "ngân hàng", cold: "nông nghiệp" },
    macro: "GDP Q3 tăng 7.5% — cao nhất 3 năm. Tín dụng 9 tháng tăng 9.3%.",
    foreignFlow: "khối ngoại mua ròng mạnh ~8,000 tỷ",
  },
  {
    key: "2025-10", vnLow: 1280, vnHigh: 1340, trend: "consolidation",
    events: ["VN-Index tích lũy trên 1,300", "Mùa KQKD Q3 tích cực", "Giá vàng thế giới lập đỉnh mới"],
    sectors: { hot: "vàng bạc", cold: "bất động sản" },
    macro: "CPI 10 tháng tăng 3.1%. FDI giải ngân đạt $19.5 tỷ, tăng 12%.",
    foreignFlow: "khối ngoại mua ròng ~3,000 tỷ",
  },
  {
    key: "2025-11", vnLow: 1295, vnHigh: 1365, trend: "year-end-rally",
    events: ["VN-Index rally cuối năm", "Thanh khoản kỷ lục trên 35,000 tỷ", "Nhóm ngân hàng dẫn sóng tăng"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "GDP 11 tháng tăng 7.3%. Xuất khẩu cả năm dự kiến vượt $400 tỷ.",
    foreignFlow: "khối ngoại mua ròng ~5,000 tỷ",
  },
  {
    key: "2025-12", vnLow: 1305, vnHigh: 1365, trend: "strong-finish",
    events: ["VN-Index kết thúc năm tại 1,355", "KQKD cả năm ngân hàng tăng 25%", "Triển vọng nâng hạng 2026 rõ ràng"],
    sectors: { hot: "ngân hàng", cold: "thép" },
    macro: "GDP 2025 đạt 7.5% — vượt mục tiêu. CPI bình quân 3.2%. Tín dụng tăng 15.6%.",
    foreignFlow: "khối ngoại mua ròng cả năm ~15,000 tỷ — đảo chiều so 2024",
  },
  // 2026
  {
    key: "2026-01", vnLow: 1310, vnHigh: 1355, trend: "steady",
    events: ["VN-Index khởi đầu năm tích cực", "Kỳ vọng GDP 2026 đạt 7–7.5%", "Dòng tiền đầu năm phân hóa"],
    sectors: { hot: "KCN", cold: "bán lẻ" },
    macro: "GDP mục tiêu 7-7.5%. NHNN đặt mục tiêu tín dụng 16%. Lãi suất ổn định.",
    foreignFlow: "khối ngoại mua ròng nhẹ",
  },
  {
    key: "2026-02", vnLow: 1275, vnHigh: 1345, trend: "tet-correction-recovery",
    events: ["VN-Index giảm trước Tết rồi phục hồi", "Trung Quốc kích cầu mạnh", "FTSE tiếp tục theo dõi nâng hạng VN"],
    sectors: { hot: "ngân hàng", cold: "thép" },
    macro: "CPI tháng 2 tăng 5.2% do Tết. FDI đăng ký 2 tháng tăng 30% YoY.",
    foreignFlow: "khối ngoại mua ròng sau Tết",
  },
  {
    key: "2026-03", vnLow: 1280, vnHigh: 1350, trend: "consolidation",
    events: ["VN-Index tích lũy 1,280–1,350", "KQKD Q4/2025 rất tích cực", "Kỳ vọng GDP Q1 mạnh"],
    sectors: { hot: "ngân hàng", cold: "dầu khí" },
    macro: "GDP Q1/2026 dự kiến 6.5–7%. Sản xuất công nghiệp tăng 10%. Xuất khẩu tháng 3 mạnh.",
    foreignFlow: "khối ngoại mua ròng ~2,000 tỷ",
  },
];

// ── Stock universe ───────────────────────────────────────────────────
const STOCKS = [
  { ticker: "MBB", name: "Ngân hàng Quân đội", sector: "ngân hàng", pe: "8.5x", pb: "1.4x", roe: "22%", growth: "20%", thesis: "Ngân hàng số hàng đầu với franchise bán lẻ mạnh. ROE ổn định cao nhất ngành. Mảng bancassurance và thu phí đóng góp ngày càng lớn vào lợi nhuận bền vững." },
  { ticker: "TCB", name: "Techcombank", sector: "ngân hàng", pe: "9.2x", pb: "1.6x", roe: "20%", growth: "18%", thesis: "Ngân hàng tư nhân hàng đầu với CASA cao nhất ngành, chi phí vốn thấp. Hệ sinh thái Vingroup mang lại lợi thế bán chéo lớn." },
  { ticker: "VCB", name: "Vietcombank", sector: "ngân hàng", pe: "14x", pb: "3.2x", roe: "24%", growth: "15%", thesis: "Blue-chip đầu ngành ngân hàng. Chất lượng tài sản tốt nhất hệ thống. Thương hiệu mạnh, khách hàng FDI lớn." },
  { ticker: "VHM", name: "Vinhomes", sector: "bất động sản", pe: "12x", pb: "2.1x", roe: "18%", growth: "25%", thesis: "Nhà phát triển BĐS lớn nhất Việt Nam. Quỹ đất khổng lồ tại các thành phố lớn. Hưởng lợi trực tiếp từ Luật Đất đai sửa đổi." },
  { ticker: "HPG", name: "Hòa Phát", sector: "thép/công nghiệp", pe: "10x", pb: "1.5x", roe: "16%", growth: "30%", thesis: "Vua thép Việt Nam với chuỗi giá trị tích hợp. Dung Quất 2 mở rộng công suất gấp đôi. Hưởng lợi từ đầu tư công và xây dựng." },
  { ticker: "FPT", name: "FPT Corporation", sector: "công nghệ", pe: "22x", pb: "5x", roe: "25%", growth: "22%", thesis: "Doanh nghiệp CNTT hàng đầu Việt Nam. Doanh thu IT dịch vụ nước ngoài tăng trưởng 30%+. AI và chuyển đổi số là động lực tăng trưởng dài hạn." },
  { ticker: "VNM", name: "Vinamilk", sector: "hàng tiêu dùng", pe: "16x", pb: "4x", roe: "30%", growth: "8%", thesis: "Doanh nghiệp sữa #1 Việt Nam. Thương hiệu mạnh, thị phần 55%. Cổ tức ổn định 4–5%/năm. Mở rộng sang thực phẩm và đồ uống dinh dưỡng." },
  { ticker: "MSN", name: "Masan Group", sector: "hàng tiêu dùng", pe: "18x", pb: "2.5x", roe: "12%", growth: "20%", thesis: "Tập đoàn tiêu dùng hàng đầu. WinMart cải thiện biên lợi nhuận. Masan Consumer và Techcombank là hai trụ cột sinh lời." },
  { ticker: "PNJ", name: "Phú Nhuận Jewelry", sector: "bán lẻ", pe: "15x", pb: "3.5x", roe: "25%", growth: "15%", thesis: "Thương hiệu trang sức #1 VN. Mở rộng hệ thống retail liên tục. Biên lợi nhuận gộp 20%+ ổn định." },
  { ticker: "GAS", name: "PV Gas", sector: "dầu khí", pe: "11x", pb: "2.8x", roe: "20%", growth: "10%", thesis: "Độc quyền phân phối khí tại VN. Cổ tức cao 5–6%/năm. Hưởng lợi từ giá dầu và nhu cầu năng lượng." },
  { ticker: "ACB", name: "Á Châu Bank", sector: "ngân hàng", pe: "7.5x", pb: "1.8x", roe: "26%", growth: "22%", thesis: "Ngân hàng tư nhân với chất lượng tài sản hàng đầu. CASA cải thiện liên tục. Quản trị rủi ro tốt nhất nhóm." },
  { ticker: "VPB", name: "VPBank", sector: "ngân hàng", pe: "6x", pb: "1.2x", roe: "18%", growth: "25%", thesis: "Ngân hàng bán lẻ với FE Credit. SMBC trở thành cổ đông chiến lược. Room ngoại mở rộng là catalyst." },
  { ticker: "STB", name: "Sacombank", sector: "ngân hàng", pe: "8x", pb: "1.1x", roe: "14%", growth: "35%", thesis: "Câu chuyện tái cơ cấu thành công. Nợ xấu giảm mạnh qua các năm. Chia cổ tức trở lại là catalyst lớn." },
  { ticker: "NVL", name: "Novaland", sector: "bất động sản", pe: "25x", pb: "1.5x", roe: "5%", growth: "50%", thesis: "BĐS phía Nam với quỹ dự án đa dạng. Tái cơ cấu nợ tiến triển tích cực. Rủi ro cao nhưng tiềm năng recovery lớn." },
  { ticker: "KDH", name: "Khang Điền", sector: "bất động sản", pe: "14x", pb: "1.8x", roe: "13%", growth: "20%", thesis: "BĐS phía Đông TP.HCM. Quỹ đất sạch lớn, pháp lý rõ ràng. Hưởng lợi từ metro và hạ tầng." },
  { ticker: "DGW", name: "Digiworld", sector: "công nghệ/phân phối", pe: "12x", pb: "3x", roe: "22%", growth: "18%", thesis: "Nhà phân phối công nghệ hàng đầu. Mở rộng sang thiết bị gia dụng và sức khỏe. Biên lợi nhuận cải thiện." },
  { ticker: "REE", name: "REE Corp", sector: "đa ngành", pe: "9x", pb: "1.3x", roe: "15%", growth: "12%", thesis: "Holding đa ngành: điện, nước, BĐS. Dòng tiền ổn định từ mảng tiện ích. Cổ tức hấp dẫn 5%+." },
  { ticker: "PLX", name: "Petrolimex", sector: "dầu khí", pe: "12x", pb: "2.5x", roe: "18%", growth: "10%", thesis: "Nhà bán lẻ xăng dầu lớn nhất VN. Thị phần 50%+. Hưởng lợi khi giá dầu ổn định. Cổ tức 4%+." },
  { ticker: "MWG", name: "Thế Giới Di Động", sector: "bán lẻ", pe: "18x", pb: "3.8x", roe: "20%", growth: "15%", thesis: "Chuỗi bán lẻ điện tử #1 VN. Bách Hóa Xanh cải thiện biên. TopZone mở rộng nhanh." },
];

const SECTORS_FOR_REPORT = [
  { name: "ngân hàng", stocks: ["MBB", "TCB", "VCB", "ACB", "VPB", "STB"] },
  { name: "bất động sản", stocks: ["VHM", "NVL", "KDH"] },
  { name: "công nghệ", stocks: ["FPT", "DGW"] },
  { name: "thép & công nghiệp", stocks: ["HPG"] },
  { name: "tiêu dùng & bán lẻ", stocks: ["VNM", "MSN", "PNJ", "MWG"] },
  { name: "dầu khí & năng lượng", stocks: ["GAS", "PLX", "REE"] },
];

// ── Helper functions ─────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getMonday(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split("T")[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getContext(dateStr) {
  const key = dateStr.slice(0, 7);
  return MONTHS.find((m) => m.key === key) || MONTHS[MONTHS.length - 1];
}

function formatViDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// ── Article generators ───────────────────────────────────────────────

function generateMarketOutlook(date, ctx, weekNum) {
  const vnMid = Math.round((ctx.vnLow + ctx.vnHigh) / 2);
  const weekVnLow = ctx.vnLow + randomInt(-5, 15);
  const weekVnHigh = ctx.vnHigh + randomInt(-15, 5);
  const event = ctx.events[weekNum % ctx.events.length];
  const liquidity = randomInt(15000, 35000);

  const trendDescriptions = {
    "recovery": "xu hướng phục hồi",
    "sideways": "xu hướng đi ngang tích lũy",
    "accumulation": "giai đoạn tích lũy",
    "uptrend": "xu hướng tăng",
    "strong-uptrend": "xu hướng tăng mạnh",
    "correction": "nhịp điều chỉnh",
    "volatile": "biến động mạnh",
    "consolidation": "giai đoạn tích lũy sideway",
    "year-end-rally": "sóng cuối năm",
    "distribution": "giai đoạn phân phối đỉnh",
    "tet-rally": "sóng Tết",
    "tet-volatility": "biến động quanh Tết",
    "tet-correction-recovery": "điều chỉnh trước Tết rồi phục hồi",
    "spring-rally": "sóng đầu xuân",
    "year-end-consolidation": "tích lũy cuối năm",
    "pullback": "nhịp pullback kỹ thuật",
    "strong-finish": "kết thúc năm mạnh mẽ",
    "cautious": "thận trọng đầu năm",
    "steady": "ổn định",
  };

  const trendWord = trendDescriptions[ctx.trend] || "diễn biến phức tạp";
  const support = weekVnLow - randomInt(10, 30);
  const resistance = weekVnHigh + randomInt(10, 30);

  const title = [
    `Nhận định thị trường tuần ${formatViDate(date)}: VN-Index ${trendWord}`,
    `VN-Index tuần ${formatViDate(date)}: ${event}`,
    `Thị trường chứng khoán tuần ${formatViDate(date)} — ${trendWord.charAt(0).toUpperCase() + trendWord.slice(1)}`,
    `Tuần qua trên thị trường: VN-Index dao động ${weekVnLow}–${weekVnHigh}`,
  ][weekNum % 4];

  const content = `## Tổng quan thị trường

Trong tuần giao dịch kết thúc ngày ${formatViDate(date)}, VN-Index tiếp tục duy trì ${trendWord}, dao động trong biên độ ${weekVnLow}–${weekVnHigh} điểm. Thanh khoản trung bình đạt khoảng ${liquidity.toLocaleString()} tỷ đồng/phiên, ${liquidity > 25000 ? "cao hơn" : "thấp hơn"} mức trung bình 20 phiên trước đó.

${event}. ${ctx.macro}

## Phân tích kỹ thuật

VN-Index đang giao dịch ${vnMid > 1250 ? "trong vùng tích cực trên MA20 và MA50" : "gần các đường trung bình động ngắn hạn"}. Vùng hỗ trợ quan trọng tại ${support} điểm${support - 20 > ctx.vnLow - 40 ? ` và ${support - 20} điểm` : ""}. Vùng kháng cự gần nhất tại ${resistance} điểm.

Chỉ báo RSI(14) hiện ở mức ${ctx.trend.includes("uptrend") || ctx.trend.includes("rally") ? randomInt(55, 70) : ctx.trend.includes("correction") ? randomInt(30, 45) : randomInt(45, 55)}, ${ctx.trend.includes("uptrend") ? "cho thấy xu hướng tăng vẫn còn dư địa" : ctx.trend.includes("correction") ? "tiếp cận vùng quá bán" : "vùng trung tính"}. MACD ${ctx.trend.includes("uptrend") || ctx.trend.includes("rally") ? "duy trì tín hiệu mua" : ctx.trend.includes("correction") ? "cắt xuống, tín hiệu thận trọng" : "đang hội tụ, chờ tín hiệu rõ ràng hơn"}.

## Diễn biến ngành

### Nhóm ${ctx.sectors.hot} — Tích cực
Nhóm ${ctx.sectors.hot} tiếp tục là điểm sáng trong tuần qua với dòng tiền đổ vào mạnh. Nhiều mã trong nhóm ${ctx.sectors.hot === "ngân hàng" ? "tăng 2-5% trong tuần" : ctx.sectors.hot === "bất động sản" ? "bứt phá với khối lượng giao dịch tăng đột biến" : "giao dịch sôi động và vượt đỉnh ngắn hạn"}.

### Nhóm ${ctx.sectors.cold} — Kém tích cực
Trong khi đó, nhóm ${ctx.sectors.cold} chịu áp lực bán ${ctx.sectors.cold === "bất động sản" ? "do lo ngại pháp lý và nợ xấu" : ctx.sectors.cold === "thép" ? "khi giá thép thế giới giảm" : "trước áp lực chốt lời"}.

## Dòng vốn ngoại

Trong tuần, ${ctx.foreignFlow}. ${ctx.foreignFlow.includes("bán") ? "Áp lực bán từ khối ngoại tiếp tục là yếu tố cần theo dõi sát." : "Tín hiệu tích cực từ dòng vốn ngoại hỗ trợ tâm lý thị trường."}

## Nhận định tuần tới

Tuần tới, thị trường được kỳ vọng ${ctx.trend.includes("uptrend") || ctx.trend.includes("rally") ? "tiếp tục duy trì đà tăng, với khả năng test vùng " + resistance + " điểm" : ctx.trend.includes("correction") ? "tìm kiếm vùng cân bằng quanh " + support + "–" + (support + 30) + " điểm trước khi có nhịp hồi phục" : "dao động trong biên độ " + support + "–" + resistance + " điểm, chờ đợi thông tin mới làm catalyst"}.

### Khuyến nghị
- **Nhà đầu tư ngắn hạn**: ${ctx.trend.includes("uptrend") ? "Có thể nắm giữ các vị thế hiện tại, chốt lời từng phần khi VN-Index tiếp cận kháng cự " + resistance : ctx.trend.includes("correction") ? "Thận trọng, hạn chế mua đuổi. Chờ tín hiệu xác nhận vùng hỗ trợ " + support : "Trading trong biên độ, mua ở hỗ trợ " + support + " và chốt lời ở kháng cự " + resistance}.
- **Nhà đầu tư trung/dài hạn**: ${ctx.trend.includes("correction") || ctx.trend.includes("volatile") ? "Đây có thể là cơ hội tích lũy các cổ phiếu cơ bản tốt ở vùng giá hấp dẫn." : "Tiếp tục nắm giữ các vị thế cốt lõi trong nhóm " + ctx.sectors.hot + " và theo dõi cơ hội giải ngân thêm."}

### Rủi ro cần theo dõi
- ${ctx.events[(weekNum + 1) % ctx.events.length]}
- Biến động tỷ giá USD/VND
- ${ctx.foreignFlow.includes("bán") ? "Áp lực bán ròng từ khối ngoại có thể tiếp tục" : "Rủi ro chốt lời ngắn hạn sau nhịp tăng"}`;

  return {
    title,
    content,
    summary: `VN-Index dao động ${weekVnLow}–${weekVnHigh} trong tuần ${formatViDate(date)}. ${event}. Thị trường duy trì ${trendWord}.`,
    tags: ["VN-Index", "nhận định thị trường", ctx.sectors.hot, "phân tích kỹ thuật"],
    relatedStocks: [],
    readTime: randomInt(6, 9),
  };
}

function generateStockPick(date, ctx, weekNum) {
  const stockIdx = (weekNum * 3 + 1) % STOCKS.length;
  const stock = STOCKS[stockIdx];
  const priceEst = randomInt(20, 120);
  const targetUp = randomInt(15, 35);

  const title = [
    `Phân tích ${stock.ticker}: ${stock.name} — Cơ hội đầu tư hấp dẫn`,
    `Cổ phiếu nổi bật: ${stock.ticker} (${stock.name})`,
    `Đánh giá ${stock.ticker}: Tiềm năng tăng trưởng ${stock.growth}`,
    `${stock.ticker} — Lý do chúng tôi khuyến nghị MUA`,
  ][weekNum % 4];

  const content = `## Tổng quan doanh nghiệp

**${stock.name} (${stock.ticker})** hoạt động trong lĩnh vực ${stock.sector}, là một trong những doanh nghiệp hàng đầu tại thị trường Việt Nam.

${stock.thesis}

## Phân tích cơ bản

### Định giá hiện tại
| Chỉ số | Giá trị |
|--------|---------|
| P/E trailing | ${stock.pe} |
| P/B | ${stock.pb} |
| ROE | ${stock.roe} |
| Tăng trưởng LN ước tính | ${stock.growth} |

### Điểm mạnh cơ bản
- **Vị thế thị trường**: ${stock.ticker} ${stock.sector === "ngân hàng" ? "nằm trong top 5 ngân hàng tư nhân về quy mô tổng tài sản và lợi nhuận" : stock.sector === "bất động sản" ? "sở hữu quỹ đất lớn nhất nhóm BĐS niêm yết" : stock.sector.includes("công nghệ") ? "dẫn đầu về doanh thu IT dịch vụ nước ngoài" : "chiếm thị phần dẫn đầu trong phân khúc cốt lõi"}.
- **Tài chính lành mạnh**: ROE ${stock.roe} thuộc top ngành. ${stock.sector === "ngân hàng" ? "Tỷ lệ nợ xấu kiểm soát tốt dưới 2%." : "Dòng tiền hoạt động kinh doanh dương ổn định."}
- **Tăng trưởng bền vững**: Lợi nhuận dự kiến tăng ${stock.growth} trong năm tới nhờ ${stock.sector === "ngân hàng" ? "tín dụng mở rộng và thu nhập ngoài lãi tăng" : stock.sector === "bất động sản" ? "bàn giao dự án và pháp lý được tháo gỡ" : stock.sector.includes("công nghệ") ? "đơn hàng IT outsourcing và AI tăng mạnh" : "nhu cầu tiêu dùng nội địa phục hồi"}.

## Bối cảnh ngành — ${stock.sector}

Trong bối cảnh thị trường tháng ${date.split("-")[1]}/${date.split("-")[0]}, ${ctx.macro} Ngành ${stock.sector} ${ctx.sectors.hot === stock.sector || ctx.sectors.hot.includes(stock.sector.split("/")[0]) ? "đang là nhóm ngành thu hút dòng tiền tích cực" : "đang trong giai đoạn tích lũy, chờ đợi catalyst mới"}.

## Phân tích kỹ thuật

${stock.ticker} đang giao dịch quanh vùng giá ${priceEst},000 đồng/cổ phiếu. ${ctx.trend.includes("uptrend") || ctx.trend.includes("rally") ? "Cổ phiếu đang trong xu hướng tăng trung hạn, giao dịch trên MA50 và MA200." : "Cổ phiếu đang hình thành nền giá vững chắc, tạo cơ hội tích lũy."} Vùng hỗ trợ mạnh tại ${priceEst - randomInt(3, 8)},000 đồng. Mục tiêu giá ${Math.round(priceEst * (1 + targetUp / 100))},000 đồng (+${targetUp}%).

## Khuyến nghị đầu tư

**Khuyến nghị: MUA** với mục tiêu trung hạn 6–12 tháng.

- **Giá mua lý tưởng**: ${priceEst - randomInt(2, 5)},000 – ${priceEst},000 đồng
- **Mục tiêu giá**: ${Math.round(priceEst * (1 + targetUp / 100))},000 đồng
- **Cắt lỗ**: Dưới ${priceEst - randomInt(8, 15)},000 đồng

## Rủi ro chính

- ${stock.sector === "ngân hàng" ? "Rủi ro nợ xấu tăng nếu kinh tế phục hồi chậm" : stock.sector === "bất động sản" ? "Rủi ro pháp lý dự án kéo dài" : stock.sector.includes("công nghệ") ? "Rủi ro cạnh tranh từ các đối thủ quốc tế" : "Rủi ro cầu tiêu dùng suy yếu"}
- Biến động thị trường chung tác động đến giá cổ phiếu
- ${ctx.foreignFlow.includes("bán") ? "Áp lực bán từ khối ngoại" : "Rủi ro chốt lời sau nhịp tăng mạnh"}

*Lưu ý: Bài viết mang tính chất tham khảo, không phải khuyến nghị đầu tư. NĐT cần tự đánh giá và cân nhắc kỹ trước khi ra quyết định.*`;

  return {
    title,
    content,
    summary: `Phân tích cổ phiếu ${stock.ticker} (${stock.name}) — P/E ${stock.pe}, ROE ${stock.roe}, tăng trưởng ${stock.growth}. Khuyến nghị MUA với mục tiêu giá +${targetUp}%.`,
    tags: [stock.ticker, stock.sector, "phân tích cổ phiếu", "khuyến nghị MUA"],
    relatedStocks: [stock.ticker],
    readTime: randomInt(7, 10),
  };
}

function generatePortfolioStrategy(date, ctx, weekNum) {
  const allocationTemplates = [
    { nganhang: 35, bds: 15, congnghe: 20, tieuDung: 15, daukhi: 10, other: 5 },
    { nganhang: 30, bds: 20, congnghe: 15, tieuDung: 20, daukhi: 10, other: 5 },
    { nganhang: 40, bds: 10, congnghe: 25, tieuDung: 10, daukhi: 10, other: 5 },
    { nganhang: 25, bds: 15, congnghe: 20, tieuDung: 15, daukhi: 15, other: 10 },
  ];

  const alloc = allocationTemplates[weekNum % allocationTemplates.length];
  const cashPct = ctx.trend.includes("correction") || ctx.trend.includes("volatile") ? randomInt(20, 35) : randomInt(5, 15);
  const equityPct = 100 - cashPct;

  const strategyThemes = [
    "Cân bằng rủi ro và lợi nhuận trong bối cảnh thị trường biến động",
    "Tối ưu hóa danh mục đầu tư theo chu kỳ thị trường",
    "Chiến lược phân bổ tài sản cho nhà đầu tư dài hạn",
    "Quản lý danh mục: Khi nào nên tăng/giảm tỷ trọng",
  ];

  const title = [
    `Chiến lược danh mục tuần ${formatViDate(date)}: ${strategyThemes[weekNum % 4]}`,
    `Phân bổ danh mục tối ưu — Tháng ${date.split("-")[1]}/${date.split("-")[0]}`,
    `Quản lý rủi ro danh mục: ${ctx.trend.includes("correction") ? "Phòng thủ trong nhịp điều chỉnh" : "Tận dụng xu hướng tăng"}`,
    `Chiến lược đầu tư tháng ${date.split("-")[1]}: ${strategyThemes[(weekNum + 2) % 4]}`,
  ][weekNum % 4];

  const content = `## Nhận định chung

Thị trường đang trong ${ctx.trend.includes("uptrend") || ctx.trend.includes("rally") ? "giai đoạn xu hướng tăng" : ctx.trend.includes("correction") ? "nhịp điều chỉnh" : "giai đoạn tích lũy"}. VN-Index dao động trong biên độ ${ctx.vnLow}–${ctx.vnHigh} điểm. ${ctx.macro}

Trong bối cảnh này, chiến lược phân bổ danh mục cần ${ctx.trend.includes("correction") || ctx.trend.includes("volatile") ? "ưu tiên phòng thủ, tăng tỷ trọng tiền mặt và các cổ phiếu phòng thủ" : "tận dụng xu hướng tích cực, duy trì tỷ trọng cổ phiếu hợp lý"}.

## Phân bổ tài sản khuyến nghị

### Tỷ trọng tổng thể
- **Cổ phiếu**: ${equityPct}%
- **Tiền mặt / Trái phiếu ngắn hạn**: ${cashPct}%

### Phân bổ theo ngành (trong phần cổ phiếu)
| Ngành | Tỷ trọng | Thay đổi |
|-------|----------|----------|
| Ngân hàng | ${alloc.nganhang}% | ${ctx.sectors.hot === "ngân hàng" ? "↑ Tăng 5%" : "→ Giữ nguyên"} |
| Bất động sản | ${alloc.bds}% | ${ctx.sectors.hot.includes("bất động sản") ? "↑ Tăng 5%" : ctx.sectors.cold.includes("bất động sản") ? "↓ Giảm 5%" : "→ Giữ nguyên"} |
| Công nghệ | ${alloc.congnghe}% | ${ctx.sectors.hot.includes("công nghệ") ? "↑ Tăng 5%" : "→ Giữ nguyên"} |
| Tiêu dùng & Bán lẻ | ${alloc.tieuDung}% | ${ctx.sectors.hot.includes("tiêu dùng") || ctx.sectors.hot.includes("bán lẻ") ? "↑ Tăng" : "→ Giữ nguyên"} |
| Dầu khí & Năng lượng | ${alloc.daukhi}% | ${ctx.sectors.hot.includes("dầu khí") ? "↑ Tăng" : "→ Giữ nguyên"} |
| Khác | ${alloc.other}% | → Giữ nguyên |

## Top cổ phiếu khuyến nghị cho danh mục

### Nhóm cốt lõi (Core Holdings)
1. **${STOCKS[0].ticker}** (${STOCKS[0].name}) — Blue-chip ngân hàng, ROE ${STOCKS[0].roe}
2. **${STOCKS[5].ticker}** (${STOCKS[5].name}) — ${STOCKS[5].thesis.split(".")[0]}
3. **${STOCKS[6].ticker}** (${STOCKS[6].name}) — ${STOCKS[6].thesis.split(".")[0]}

### Nhóm tăng trưởng (Growth)
1. **${STOCKS[(weekNum * 2) % STOCKS.length].ticker}** — ${STOCKS[(weekNum * 2) % STOCKS.length].thesis.split(".")[0]}
2. **${STOCKS[(weekNum * 2 + 3) % STOCKS.length].ticker}** — ${STOCKS[(weekNum * 2 + 3) % STOCKS.length].thesis.split(".")[0]}

### Nhóm cơ hội (Tactical)
- ${ctx.sectors.hot === "ngân hàng" ? "**STB** — Câu chuyện tái cơ cấu và chia cổ tức" : ctx.sectors.hot.includes("bất động sản") ? "**KDH** — BĐS phía Đông TP.HCM hưởng lợi metro" : ctx.sectors.hot.includes("công nghệ") ? "**FPT** — Doanh thu AI và IT outsourcing tăng mạnh" : "**PNJ** — Thương hiệu mạnh, biên lợi nhuận ổn định"}

## Quản lý rủi ro

${ctx.trend.includes("correction") || ctx.trend.includes("volatile") ? `### Chiến lược phòng thủ
- Tăng tỷ trọng tiền mặt lên ${cashPct}% để bảo toàn vốn
- Đặt stop-loss chặt chẽ cho các vị thế trading (-5% đến -7%)
- Ưu tiên các cổ phiếu có cổ tức cao: VNM, GAS, REE
- Tránh margin và fomo khi thị trường biến động mạnh` : `### Chiến lược tấn công có kiểm soát
- Duy trì tỷ trọng cổ phiếu ${equityPct}%, sẵn sàng giải ngân ở nhịp pullback
- Trailing stop cho các vị thế đang có lãi (+10% thì đặt stop +5%)
- Giải ngân theo lô nhỏ, không all-in tại một mức giá
- Theo dõi thanh khoản — nếu thanh khoản sụt giảm đột ngột, cân nhắc giảm vị thế`}

## Lịch sự kiện cần theo dõi

- ${ctx.events[0]}
- Số liệu macro trong nước (CPI, GDP, tín dụng)
- Chính sách Fed và diễn biến USD/VND
- Mùa báo cáo kết quả kinh doanh

*Lưu ý: Đây là chiến lược tham khảo dựa trên phân tích cá nhân. NĐT cần điều chỉnh phù hợp với khẩu vị rủi ro và mục tiêu tài chính của mình.*`;

  return {
    title,
    content,
    summary: `Chiến lược phân bổ danh mục: ${equityPct}% cổ phiếu / ${cashPct}% tiền mặt. Ưu tiên ngành ${ctx.sectors.hot}. ${ctx.trend.includes("correction") ? "Phòng thủ, bảo toàn vốn." : "Tận dụng xu hướng tăng."}`,
    tags: ["chiến lược", "phân bổ danh mục", "quản lý rủi ro", ctx.sectors.hot],
    relatedStocks: [STOCKS[0].ticker, STOCKS[5].ticker, STOCKS[6].ticker],
    readTime: randomInt(7, 10),
  };
}

function generateSectorReport(date, ctx, cycleIdx) {
  const sector = SECTORS_FOR_REPORT[cycleIdx % SECTORS_FOR_REPORT.length];
  const month = parseInt(date.split("-")[1]);
  const year = date.split("-")[0];
  const quarter = Math.ceil(month / 3);
  const stockDetails = sector.stocks.map((t) => STOCKS.find((s) => s.ticker === t)).filter(Boolean);

  const title = [
    `Báo cáo ngành ${sector.name} — Q${quarter}/${year}`,
    `Phân tích ngành ${sector.name}: Triển vọng Q${quarter}/${year}`,
    `Ngành ${sector.name} tháng ${month}/${year}: Cơ hội và thách thức`,
  ][(cycleIdx + month) % 3];

  const isFavoredSector = ctx.sectors.hot.includes(sector.name.split(" ")[0]) ||
    ctx.sectors.hot.includes(sector.name.split("&")[0].trim());

  const content = `## Tổng quan ngành ${sector.name}

Trong Q${quarter}/${year}, ngành ${sector.name} ${isFavoredSector ? "tiếp tục là điểm sáng của thị trường với dòng tiền liên tục đổ vào" : "đang trải qua giai đoạn " + (ctx.trend.includes("correction") ? "điều chỉnh theo xu hướng chung" : "tích lũy, chờ đợi catalyst mới")}.

### Bối cảnh vĩ mô
${ctx.macro}

${sector.name === "ngân hàng" ? `Tín dụng toàn hệ thống đang trong giai đoạn ${ctx.trend.includes("uptrend") ? "tăng trưởng mạnh" : "phục hồi"}, hỗ trợ lợi nhuận của các ngân hàng. Lãi suất huy động ${year === "2023" ? "giảm mạnh, cải thiện NIM" : year === "2024" ? "duy trì thấp, NIM ổn định" : "bắt đầu tăng nhẹ nhưng NIM vẫn được kiểm soát tốt"}.` :
sector.name === "bất động sản" ? `Thị trường BĐS ${year === "2023" ? "vẫn đang trong giai đoạn khó khăn, thanh khoản thấp" : year === "2024" ? "bắt đầu phục hồi nhờ Luật Đất đai sửa đổi" : "tiếp tục cải thiện với nhiều dự án được tháo gỡ pháp lý"}.` :
sector.name.includes("công nghệ") ? `Ngành CNTT Việt Nam tiếp tục tăng trưởng ấn tượng nhờ xu hướng chuyển đổi số toàn cầu và lợi thế chi phí nhân lực.` :
sector.name.includes("thép") ? `Ngành thép chịu ảnh hưởng bởi giá thép thế giới và nhu cầu xây dựng trong nước. Đầu tư công là yếu tố hỗ trợ chính.` :
sector.name.includes("tiêu dùng") ? `Tiêu dùng nội địa ${year >= "2025" ? "phục hồi mạnh mẽ" : "đang dần cải thiện"} với doanh thu bán lẻ tăng trưởng tích cực.` :
`Ngành năng lượng chịu ảnh hưởng bởi giá dầu thế giới và chính sách năng lượng trong nước.`}

## Phân tích các doanh nghiệp chủ chốt

${stockDetails.map((s, i) => `### ${i + 1}. ${s.ticker} — ${s.name}
- **P/E**: ${s.pe} | **P/B**: ${s.pb} | **ROE**: ${s.roe}
- **Tăng trưởng LN**: ${s.growth}
- ${s.thesis}
`).join("\n")}

## Xu hướng chính của ngành

${sector.name === "ngân hàng" ? `1. **Chuyển đổi số**: Mobile banking và digital lending tiếp tục tăng tốc, giảm chi phí vận hành
2. **Tăng trưởng tín dụng**: Mục tiêu tín dụng ${year} ${year === "2023" ? "12-14%" : year === "2024" ? "14-15%" : "15-16%"} hỗ trợ doanh thu
3. **Cải thiện chất lượng tài sản**: Nợ xấu ${year <= "2023" ? "vẫn là mối lo ngại nhưng đang được kiểm soát" : "giảm dần, tỷ lệ bao phủ nợ xấu cải thiện"}
4. **Thu nhập ngoài lãi**: Bancassurance, phí dịch vụ đóng góp ngày càng lớn` :
sector.name === "bất động sản" ? `1. **Pháp lý**: Luật Đất đai, Luật Kinh doanh BĐS sửa đổi ${year >= "2024" ? "đã có hiệu lực, tháo gỡ nút thắt pháp lý" : "đang được thảo luận, kỳ vọng tháo gỡ"}
2. **Phân khúc**: Nhà ở thực có nhu cầu vẫn chiếm ưu thế; cao cấp/resort phục hồi chậm hơn
3. **Tín dụng BĐS**: Lãi suất cho vay mua nhà ${year === "2023" ? "đang giảm dần" : "ở mức hấp dẫn, hỗ trợ thanh khoản thị trường"}
4. **Quỹ đất**: Các doanh nghiệp có quỹ đất sạch, pháp lý rõ ràng có lợi thế lớn` :
`1. **Tăng trưởng doanh thu**: Doanh nghiệp đầu ngành duy trì tăng trưởng ${isFavoredSector ? "hai chữ số" : "ổn định"}
2. **Biên lợi nhuận**: ${isFavoredSector ? "Cải thiện nhờ hiệu quả vận hành" : "Chịu áp lực nhưng vẫn ở mức chấp nhận được"}
3. **Mở rộng**: Các doanh nghiệp top đầu tiếp tục đầu tư mở rộng quy mô
4. **Cạnh tranh**: Mức độ cạnh tranh ${isFavoredSector ? "tăng nhưng các ông lớn vẫn giữ vững vị thế" : "cao, đòi hỏi chiến lược khác biệt hóa"}`}

## Khuyến nghị đầu tư ngành

**Đánh giá: ${isFavoredSector ? "TÍCH CỰC (Overweight)" : "TRUNG LẬP (Neutral)"}**

${isFavoredSector ? `Ngành ${sector.name} đang ở trong giai đoạn thuận lợi. Khuyến nghị tăng tỷ trọng trong danh mục.` : `Ngành ${sector.name} cần thêm thời gian để catalyst rõ ràng hơn. Giữ tỷ trọng hiện tại và chọn lọc cổ phiếu.`}

### Top picks:
${stockDetails.slice(0, 3).map((s) => `- **${s.ticker}**: ${s.thesis.split(".")[0]}`).join("\n")}

## Rủi ro ngành

- ${sector.name === "ngân hàng" ? "Nợ xấu tăng nếu kinh tế phục hồi chậm hơn kỳ vọng" : sector.name === "bất động sản" ? "Pháp lý dự án có thể kéo dài hơn dự kiến" : "Biến động giá nguyên liệu và chi phí đầu vào"}
- Rủi ro vĩ mô: tỷ giá, lãi suất, chính sách
- ${ctx.foreignFlow.includes("bán") ? "Áp lực bán từ khối ngoại tập trung vào nhóm vốn hóa lớn" : "Rủi ro chốt lời sau nhịp tăng mạnh"}

*Disclaimer: Báo cáo mang tính chất tham khảo, không phải khuyến nghị mua/bán cổ phiếu.*`;

  return {
    title,
    content,
    summary: `Báo cáo ngành ${sector.name} Q${quarter}/${year}. Đánh giá: ${isFavoredSector ? "Tích cực (Overweight)" : "Trung lập (Neutral)"}. Top picks: ${stockDetails.slice(0, 3).map(s => s.ticker).join(", ")}.`,
    tags: [sector.name, "báo cáo ngành", `Q${quarter}/${year}`, ...sector.stocks.slice(0, 3)],
    relatedStocks: sector.stocks.slice(0, 4),
    readTime: randomInt(8, 12),
  };
}

// ── Main generation ──────────────────────────────────────────────────
function generate() {
  const articles = [];
  let id = 1;

  // Weekly articles: from 2023-03-13 to 2026-03-09
  const startMonday = "2023-03-13";
  const endMonday = "2026-03-09";
  let currentMonday = startMonday;
  let weekNum = 0;

  while (currentMonday <= endMonday) {
    const ctx = getContext(currentMonday);
    const rotation = weekNum % 3; // 0=Market Outlook (Mon), 1=Stock Pick (Wed), 2=Portfolio Strategy (Fri)

    let publishDate, category, generated;

    if (rotation === 0) {
      publishDate = currentMonday; // Monday
      category = "market-outlook";
      generated = generateMarketOutlook(publishDate, ctx, weekNum);
    } else if (rotation === 1) {
      publishDate = addDays(currentMonday, 2); // Wednesday
      category = "stock-pick";
      generated = generateStockPick(publishDate, ctx, weekNum);
    } else {
      publishDate = addDays(currentMonday, 4); // Friday
      category = "portfolio-strategy";
      generated = generatePortfolioStrategy(publishDate, ctx, weekNum);
    }

    articles.push({
      id: id++,
      title: generated.title,
      slug: slugify(generated.title) + "-" + publishDate,
      category,
      publishDate,
      summary: generated.summary,
      content: generated.content,
      tags: generated.tags,
      relatedStocks: generated.relatedStocks,
      readTime: generated.readTime,
      views: randomInt(50, 800),
      likes: randomInt(5, 120),
    });

    currentMonday = addDays(currentMonday, 7);
    weekNum++;
  }

  // Monthly sector reports
  let sectorCycle = 0;
  for (const month of MONTHS) {
    const reportDate = month.key + "-28"; // End of month
    const ctx = month;
    const generated = generateSectorReport(reportDate, ctx, sectorCycle);

    articles.push({
      id: id++,
      title: generated.title,
      slug: slugify(generated.title) + "-" + reportDate,
      category: "sector-report",
      publishDate: reportDate,
      summary: generated.summary,
      content: generated.content,
      tags: generated.tags,
      relatedStocks: generated.relatedStocks,
      readTime: generated.readTime,
      views: randomInt(80, 600),
      likes: randomInt(10, 90),
    });

    sectorCycle++;
  }

  // Sort by date descending (newest first)
  articles.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  // Reassign IDs after sorting
  articles.forEach((a, i) => (a.id = i + 1));

  return articles;
}

// ── Write output ─────────────────────────────────────────────────────
const articles = generate();
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(articles, null, 2), "utf-8");

console.log(`✅ Generated ${articles.length} articles`);
console.log(`   Weekly: ${articles.filter((a) => a.category !== "sector-report").length}`);
console.log(`   Sector Reports: ${articles.filter((a) => a.category === "sector-report").length}`);
console.log(`   Date range: ${articles[articles.length - 1].publishDate} → ${articles[0].publishDate}`);
console.log(`   Output: ${OUTPUT}`);
