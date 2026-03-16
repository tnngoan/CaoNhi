export interface Testimonial {
  quote: { en: string; vi: string };
  name: string;
  role: { en: string; vi: string };
  rating: number;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "Cao Nhi completely changed how I approach investing. Instead of chasing hot tips, I now have a disciplined strategy based on solid research. My portfolio has grown steadily over the past 2 years.",
      vi: "Cao Nhi đã hoàn toàn thay đổi cách tôi tiếp cận đầu tư. Thay vì chạy theo tin nóng, giờ đây tôi có chiến lược kỷ luật dựa trên nghiên cứu vững chắc. Danh mục của tôi đã tăng trưởng ổn định trong 2 năm qua.",
    },
    name: "Trần Minh Đức",
    role: {
      en: "Entrepreneur, HCMC",
      vi: "Doanh nhân, TP.HCM",
    },
    rating: 5,
    featured: true,
  },
  {
    quote: {
      en: "As someone new to the stock market, I was overwhelmed by all the information out there. Cao Nhi made everything clear and simple. The guidance through MBS account opening to first trades was invaluable.",
      vi: "Là người mới tham gia thị trường chứng khoán, tôi bị choáng ngợp bởi lượng thông tin. Cao Nhi đã giúp mọi thứ rõ ràng và đơn giản. Hướng dẫn từ mở tài khoản MBS đến giao dịch đầu tiên vô cùng giá trị.",
    },
    name: "Nguyễn Thu Hà",
    role: {
      en: "Marketing Manager, Hanoi",
      vi: "Giám đốc Marketing, Hà Nội",
    },
    rating: 5,
  },
  {
    quote: {
      en: "What sets Cao Nhi apart is the deep sector knowledge. The banking sector analysis helped me identify MBB and TCB before their major run-ups. Professional research at a personal level.",
      vi: "Điều khiến Cao Nhi khác biệt là kiến thức ngành sâu rộng. Phân tích ngành ngân hàng đã giúp tôi nhận diện MBB và TCB trước khi chúng tăng mạnh. Nghiên cứu chuyên nghiệp ở cấp độ cá nhân.",
    },
    name: "Lê Hoàng Nam",
    role: {
      en: "Senior Engineer, Da Nang",
      vi: "Kỹ sư cao cấp, Đà Nẵng",
    },
    rating: 5,
  },
  {
    quote: {
      en: "I've been investing for 10 years but never had such a clear framework. The risk management approach alone has saved me from several bad decisions. Highly recommend for anyone serious about investing.",
      vi: "Tôi đã đầu tư 10 năm nhưng chưa bao giờ có khung làm việc rõ ràng như vậy. Riêng phương pháp quản lý rủi ro đã giúp tôi tránh được nhiều quyết định sai lầm. Rất khuyến nghị cho ai nghiêm túc về đầu tư.",
    },
    name: "Phạm Thị Mai",
    role: {
      en: "Business Owner, HCMC",
      vi: "Chủ doanh nghiệp, TP.HCM",
    },
    rating: 5,
  },
  {
    quote: {
      en: "The weekly market reports and stock alerts are incredibly valuable. Cao Nhi always provides actionable insights, not just generic market commentary. My returns have improved significantly.",
      vi: "Báo cáo thị trường hàng tuần và cảnh báo cổ phiếu cực kỳ giá trị. Cao Nhi luôn cung cấp nhận định có thể hành động, không chỉ bình luận thị trường chung chung. Lợi nhuận của tôi đã cải thiện đáng kể.",
    },
    name: "Võ Thanh Bình",
    role: {
      en: "Doctor, HCMC",
      vi: "Bác sĩ, TP.HCM",
    },
    rating: 4,
  },
  {
    quote: {
      en: "Cao Nhi helped me build a balanced portfolio that matches my risk tolerance as a retiree. The focus on dividend stocks and capital preservation gives me peace of mind.",
      vi: "Cao Nhi đã giúp tôi xây dựng danh mục cân bằng phù hợp với khẩu vị rủi ro của người nghỉ hưu. Tập trung vào cổ phiếu cổ tức và bảo toàn vốn mang lại sự an tâm.",
    },
    name: "Đỗ Văn Hưng",
    role: {
      en: "Retired Executive, Hanoi",
      vi: "Giám đốc đã nghỉ hưu, Hà Nội",
    },
    rating: 5,
  },
  {
    quote: {
      en: "The Premium tier is worth every dong. Having direct access to a knowledgeable broker who understands my goals makes all the difference. Response time is always quick.",
      vi: "Gói Cao cấp xứng đáng từng đồng. Có quyền truy cập trực tiếp đến broker am hiểu và hiểu mục tiêu của mình tạo nên sự khác biệt. Thời gian phản hồi luôn nhanh chóng.",
    },
    name: "Hoàng Anh Tuấn",
    role: {
      en: "Tech CEO, HCMC",
      vi: "CEO Công nghệ, TP.HCM",
    },
    rating: 5,
  },
  {
    quote: {
      en: "I was hesitant about investing in Vietnam stocks as a Vietnamese living abroad. Cao Nhi made the process seamless and now I have a well-performing portfolio in the Vietnamese market.",
      vi: "Tôi do dự về việc đầu tư chứng khoán Việt Nam khi sống ở nước ngoài. Cao Nhi đã giúp quy trình trở nên suôn sẻ và giờ tôi có danh mục hoạt động tốt trên thị trường Việt Nam.",
    },
    name: "Nguyễn Quốc Việt",
    role: {
      en: "Software Engineer, Singapore",
      vi: "Kỹ sư phần mềm, Singapore",
    },
    rating: 4,
  },
];
