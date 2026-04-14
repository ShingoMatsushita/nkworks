import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, furigana, email, phone, type, message } = body

  if (!name || !furigana || !email || !type || !message) {
    return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 })
  }

  try {
    // 管理者通知メール
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      subject: '【直樹バイク】お問合せが届きました',
      html: `
        <h2>お問合せ内容</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;width:120px"><strong>お名前</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><strong>フリガナ</strong></td><td style="padding:8px;border:1px solid #ddd">${furigana}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><strong>メール</strong></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><strong>電話番号</strong></td><td style="padding:8px;border:1px solid #ddd">${phone || '未記入'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><strong>問合せ種別</strong></td><td style="padding:8px;border:1px solid #ddd">${type}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><strong>内容</strong></td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    })

    // 自動返信メール
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: email,
      subject: '【直樹バイク】お問合せありがとうございます',
      html: `
        <p>${name} 様</p>
        <p>この度は直樹バイクへお問合せいただきありがとうございます。<br>
        内容を確認の上、3営業日以内にご連絡いたします。</p>
        <hr>
        <h3>お問合せ内容（確認用）</h3>
        <p><strong>問合せ種別：</strong>${type}</p>
        <p><strong>内容：</strong><br><span style="white-space:pre-wrap">${message}</span></p>
        <hr>
        <p style="color:#666;font-size:12px">
          直樹バイク<br>
          営業時間：9:00〜18:00（水曜・第2第4日曜定休）
        </p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mail send error:', error)
    return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 })
  }
}
