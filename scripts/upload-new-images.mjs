import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SERVICE_DOMAIN = 'naoki-bike';
const API_KEY = 'mhFrGIyRbMXIIxSI1tyZULZUs8wg2RVZh6NG';
const CONTENT_API = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;
const MANAGEMENT_API = `https://${SERVICE_DOMAIN}.microcms-management.io/api/v1`;

// アップロード対象の定義
const UPLOAD_TARGETS = [
  {
    filePath: '/Users/matsushitashingo/Desktop/nkworksギャラリー/IMG_1312.JPG',
    title: 'Yamaha ビラーゴ カスタム完成車',
    description: '黒×クロームが渋いYamaha ビラーゴのカスタム完成車。クラシカルなスタイルに仕上げました。',
    category: ['カスタム'],
  },
  ...fs.readdirSync('/Users/matsushitashingo/Desktop/nkworksギャラリー/サーキット')
    .filter(f => /\.(jpg|jpeg|JPG|JPEG)$/i.test(f))
    .sort()
    .map((f, i) => ({
      filePath: `/Users/matsushitashingo/Desktop/nkworksギャラリー/サーキット/${f}`,
      title: `サーキット活動 ${String(i + 1).padStart(2, '0')}`,
      description: 'サーキットでのレース活動・マシン製作の様子です。',
      category: ['カスタム'],
    })),
  ...fs.readdirSync('/Users/matsushitashingo/Desktop/nkworksギャラリー/サンドブラスト加工')
    .filter(f => /\.(jpg|jpeg|JPG|JPEG)$/i.test(f))
    .sort()
    .map((f, i) => ({
      filePath: `/Users/matsushitashingo/Desktop/nkworksギャラリー/サンドブラスト加工/${f}`,
      title: `サンドブラスト加工 ${String(i + 1).padStart(2, '0')}`,
      description: 'サンドブラスト処理による金属パーツの下地処理・仕上げ作業です。',
      category: ['カスタム'],
    })),
];

async function uploadMedia(filePath) {
  const fileName = path.basename(filePath).replace(/\.[^.]+$/, '.jpg');
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
  return data.url;
}

async function createGalleryItem({ title, description, category, imageUrl }) {
  const res = await fetch(`${CONTENT_API}/gallery`, {
    method: 'POST',
    headers: { 'X-MICROCMS-API-KEY': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      images: [imageUrl],
      category,
      published: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`コンテンツ作成失敗 (${title}): ${res.status} ${text}`);
  }
}

async function main() {
  console.log(`${UPLOAD_TARGETS.length}枚をアップロードします...\n`);

  for (let i = 0; i < UPLOAD_TARGETS.length; i++) {
    const target = UPLOAD_TARGETS[i];
    try {
      process.stdout.write(`[${i + 1}/${UPLOAD_TARGETS.length}] ${path.basename(target.filePath)} → ${target.title} ...`);
      const imageUrl = await uploadMedia(target.filePath);
      await createGalleryItem({ ...target, imageUrl });
      console.log(' 完了');
    } catch (err) {
      console.error(`\n エラー: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n全て完了しました！');
}

main();
