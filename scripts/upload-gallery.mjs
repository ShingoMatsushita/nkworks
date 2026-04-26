import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SERVICE_DOMAIN = 'naoki-bike';
const API_KEY = 'mhFrGIyRbMXIIxSI1tyZULZUs8wg2RVZh6NG';
const IMAGE_DIR = '/Users/matsushitashingo/Desktop/nkworksギャラリー';

const CONTENT_API = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;
const MANAGEMENT_API = `https://${SERVICE_DOMAIN}.microcms-management.io/api/v1`;

// 画像をmicroCMSメディアにアップロード
async function uploadMedia(filePath) {
  const fileName = path.basename(filePath).replace(/\.[^.]+$/, '.jpg');

  // 長辺1920px以下・品質80%に圧縮
  const fileBuffer = await sharp(filePath)
    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });

  const form = new FormData();
  form.append('file', blob, fileName);

  const res = await fetch(`${MANAGEMENT_API}/media`, {
    method: 'POST',
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`メディアアップロード失敗 (${fileName}): ${res.status} ${text}`);
  }

  const data = await res.json();
  console.log('メディアレスポンス:', JSON.stringify(data));
  return data.url;
}

// ギャラリーコンテンツを作成
async function createGalleryItem(title, imageUrl) {
  const res = await fetch(`${CONTENT_API}/gallery`, {
    method: 'POST',
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description: '説明文を入力してください',
      images: [imageUrl],
      category: ['修理'],
      published: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`コンテンツ作成失敗 (${title}): ${res.status} ${text}`);
  }

  return await res.json();
}

// メイン処理
async function main() {
  const files = fs.readdirSync(IMAGE_DIR).filter(f =>
    /\.(jpg|jpeg|JPG|JPEG)$/i.test(f)
  );

  console.log(`${files.length}枚の画像を処理します...\n`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(IMAGE_DIR, file);
    const title = `ギャラリー ${String(i + 1).padStart(2, '0')}`;

    try {
      process.stdout.write(`[${i + 1}/${files.length}] ${file} をアップロード中...`);
      const imageUrl = await uploadMedia(filePath);
      await createGalleryItem(title, imageUrl);
      console.log(` 完了 (${title})`);
    } catch (err) {
      console.error(`\n エラー: ${err.message}`, err.cause ?? '');
    }

    // レート制限対策
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n全て完了しました！');
}

main();
