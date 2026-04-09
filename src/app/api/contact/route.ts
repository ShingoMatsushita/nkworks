import { NextRequest, NextResponse } from 'next/server';

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

    // ここでデータを受信（ログ出力のみ、メール送信はなし）
    console.log('=== お問い合わせフォーム受信 ===');
    console.log('お名前:', body.name);
    console.log('フリガナ:', body.furigana);
    console.log('メールアドレス:', body.email);
    console.log('電話番号:', body.phone);
    console.log('お問い合わせ種別:', body.category);
    console.log('お問い合わせ内容:', body.message);
    console.log('受信日時:', new Date().toLocaleString('ja-JP'));
    console.log('================================');

    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'お問い合わせを受け付けました',
      },
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
