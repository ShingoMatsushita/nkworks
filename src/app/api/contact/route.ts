import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  privacyAgreed: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // バリデーション
    if (!body.name || !body.email || !body.category || !body.message || !body.privacyAgreed) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: '正しいメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    const receivedAt = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    // 管理者への通知メール送信
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'shenwusongxia48@gmail.com',
      subject: `【NK Works】お問い合わせ：${body.category}（${body.name} 様）`,
      html: `
        <h2>お問い合わせが届きました</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd; width: 150px;">お名前</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${body.name}</td>
          </tr>
          ${body.furigana ? `
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd;">フリガナ</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${body.furigana}</td>
          </tr>` : ''}
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd;">メールアドレス</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${body.email}</td>
          </tr>
          ${body.phone ? `
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd;">電話番号</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${body.phone}</td>
          </tr>` : ''}
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd;">お問い合わせ種別</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${body.category}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd;">お問い合わせ内容</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd; white-space: pre-wrap;">${body.message}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px 12px; background: #f5f5f5; border: 1px solid #ddd;">受信日時</th>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${receivedAt}</td>
          </tr>
        </table>
      `,
    });

    if (error) {
      console.error('メール送信エラー:', error);
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'お問い合わせを受け付けました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('お問い合わせフォームエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
