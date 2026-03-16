import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, capital, goals } = body;

    if (!name || !email || !goals) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    // Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured — contact form submission not emailed");
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const capitalLabels: Record<string, string> = {
      under500m: "Dưới 500 triệu VND",
      "500m-2b": "500 triệu – 2 tỷ VND",
      "2b-10b": "2 tỷ – 10 tỷ VND",
      over10b: "Trên 10 tỷ VND",
    };

    const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    await resend.emails.send({
      from: "Cao Nhi Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "nhi.ncpn@gmail.com",
      replyTo: escapeHtml(email),
      subject: `[Website] Yêu cầu tư vấn mới từ ${escapeHtml(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #0a1628; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #c4a44a; margin: 0; font-size: 18px;">📩 Yêu cầu tư vấn mới</h2>
            <p style="color: #8899aa; margin: 6px 0 0; font-size: 13px;">Tin nhắn được gửi từ form liên hệ trên website caonhi.vercel.app</p>
          </div>
          <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;">Họ và tên:</td>
                <td style="padding: 8px 0; font-weight: bold;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Số điện thoại:</td>
                <td style="padding: 8px 0;">${escapeHtml(phone || "Không cung cấp")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Quy mô vốn:</td>
                <td style="padding: 8px 0;">${capital ? escapeHtml(capitalLabels[capital] || capital) : "Chưa chọn"}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <h3 style="margin: 0 0 8px; font-size: 14px; color: #333;">Mục tiêu đầu tư:</h3>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(goals)}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="font-size: 11px; color: #999; margin: 0;">Thời gian gửi: ${escapeHtml(now)} · Bạn có thể trả lời trực tiếp email này để liên hệ khách hàng.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
