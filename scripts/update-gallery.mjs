import fs from 'fs';

const SERVICE_DOMAIN = 'naoki-bike';
const API_KEY = 'mhFrGIyRbMXIIxSI1tyZULZUs8wg2RVZh6NG';
const CONTENT_API = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

// 画像ファイル名の順番通りに定義（アップロード時と同じ順序）
const GALLERY_DATA = [
  // IMG_0667.jpeg
  { title: 'フレーム分解・エンジン脱着', description: 'フレームからエンジンを取り外し、フルレストアの第一歩。丁寧に分解して各パーツを点検します。', category: ['修理'] },
  // IMG_1762.jpeg
  { title: 'Honda CB750 カスタム完成車', description: '赤×ゴールドのカラーリングが映えるHonda CB750のカスタム完成車。マフラーや足回りをカスタムしました。', category: ['カスタム'] },
  // IMG_2115.jpeg
  { title: 'Kawasaki カスタム完成車', description: 'オレンジのボディが鮮やかなKawasakiのカスタム完成車。すっきりとしたスタイルに仕上げました。', category: ['カスタム'] },
  // IMG_2329.jpeg
  { title: 'レーサー仕様フルカスタム', description: 'サーキット走行を想定したフルカスタム仕様。軽量化と高性能化を両立させた1台です。', category: ['カスタム'] },
  // IMG_2480.jpeg
  { title: 'Kawasaki ZRX 黒×金カスタム', description: '漆黒のボディにゴールドのホイールが映えるKawasaki ZRXのフルカスタム完成車。', category: ['カスタム'] },
  // IMG_3355.jpeg
  { title: 'フレーム塗装（キャンディレッド）', description: '鮮やかなキャンディレッドに仕上げたフレーム塗装。丁寧な下地処理から仕上げまで一貫して行います。', category: ['カスタム'] },
  // IMG_3505.jpeg
  { title: 'Kawasaki ZRX カスタム完成車', description: '黒×ゴールドのカラーリングのKawasaki ZRX。各部パーツのカスタムを施した完成車です。', category: ['カスタム'] },
  // IMG_3753.jpeg
  { title: 'Yamaha XJR1300 カスタム', description: 'Yamaha XJR1300のカスタム完成車。マフラーや足回りをカスタムし、存在感あるスタイルに仕上げました。', category: ['カスタム'] },
  // IMG_3859.jpeg
  { title: 'Kawasaki H2 カスタム完成車', description: 'イエローのカラーリングが印象的なKawasaki H2のカスタム車。当時のスタイルを活かしながらモダンに仕上げました。', category: ['カスタム'] },
  // IMG_5504.JPG
  { title: 'Honda CBR カスタム完成車', description: '緑の丘をバックに映えるHonda CBRのカスタム完成車。ホワイト×ブルーのスタイリッシュな1台です。', category: ['カスタム'] },
  // IMG_5541.jpeg
  { title: 'ホイール・ブレーキ周りカスタム', description: 'ゴールドに仕上げたホイールとブレーキ周りのカスタム作業。細部まで丁寧に仕上げます。', category: ['カスタム'] },
  // IMG_5713.jpeg
  { title: 'フォーク研磨・リストア', description: 'フロントフォークの分解・研磨作業。経年劣化した部品を新品同様に仕上げます。', category: ['修理'] },
  // IMG_5725.jpeg
  { title: 'フレーム塗装（ブラック）', description: 'ピカピカに磨き上げたブラックフレーム。下地処理から仕上げコートまで丁寧に施工します。', category: ['カスタム'] },
  // IMG_5734.jpeg
  { title: 'エンジンカバー塗装（ゴールド）', description: 'BEETエンジンカバーをゴールドに塗装。パーツ単体の塗装・カスタムも承ります。', category: ['カスタム'] },
  // IMG_5792.jpeg
  { title: 'ホイール塗装・リフレッシュ', description: 'ホイールの塗装リフレッシュ作業。ゴールドに仕上げ、足元から印象をガラリと変えます。', category: ['カスタム'] },
  // IMG_5797.JPG
  { title: 'Suzuki GS750 カスタム完成車', description: '青空と水平線をバックに映えるSuzuki GS750のカスタム完成車。', category: ['カスタム'] },
  // IMG_5809.jpeg
  { title: 'フレーム・サスペンション組み込み', description: 'オーリンズサスペンションをフレームへ組み込む作業。丁寧な組み立てで走行性能を最大限に引き出します。', category: ['修理'] },
  // IMG_5810.jpeg
  { title: 'エンジンオーバーホール', description: 'エンジンを全分解し、内部パーツを点検・交換。新品同様のパフォーマンスに仕上げます。', category: ['修理'] },
  // IMG_5816.jpeg
  { title: 'エンジン搭載作業', description: 'オーバーホール済みのエンジンをフレームへ搭載する工程。精密な位置合わせが求められます。', category: ['修理'] },
  // IMG_5834.jpeg
  { title: 'ホイール・スプロケット交換', description: 'ホイールとスプロケットの交換作業。駆動系のリフレッシュで走りが変わります。', category: ['修理'] },
  // IMG_5839.jpeg
  { title: 'フレーム組み立て作業', description: 'フレームへ各パーツを組み上げていく工程。丁寧な作業でフルレストアを進めます。', category: ['修理'] },
  // IMG_5841.jpeg
  { title: 'ホイール・ブレーキ組み立て', description: 'ゴールドホイールとブレーキシステムの組み立て作業。精度の高い組み付けで安全性を確保します。', category: ['修理'] },
  // IMG_6221.jpeg
  { title: 'タンク塗装（ブルー×ゴールド）', description: '深みのあるブルーにゴールドラインを入れたタンク塗装。オーナーのこだわりを形にします。', category: ['カスタム'] },
  // IMG_6278.jpeg
  { title: 'Kawasaki ZRX ブルーカスタム', description: 'ブルー×ゴールドのカラーリングが鮮やかなKawasakiのカスタム完成車。', category: ['カスタム'] },
  // IMG_6402.jpeg
  { title: 'ホイールポリッシュ仕上げ', description: '鏡面仕上げに磨き上げたホイール。地道な研磨作業で輝きを取り戻します。', category: ['修理'] },
];

async function getAllGalleryItems() {
  const res = await fetch(`${CONTENT_API}/gallery?limit=100&orders=createdAt`, {
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
  });
  const data = await res.json();
  return data.contents;
}

async function updateGalleryItem(id, data) {
  const res = await fetch(`${CONTENT_API}/gallery/${id}`, {
    method: 'PATCH',
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`更新失敗 (${id}): ${res.status} ${text}`);
  }
  return await res.json();
}

async function main() {
  console.log('ギャラリーアイテムを取得中...');
  const items = await getAllGalleryItems();

  // "ギャラリー XX" というタイトルのものだけ対象にする
  const targets = items
    .filter(item => /^ギャラリー \d+$/.test(item.title))
    .sort((a, b) => {
      const numA = parseInt(a.title.replace('ギャラリー ', ''));
      const numB = parseInt(b.title.replace('ギャラリー ', ''));
      return numA - numB;
    });

  console.log(`対象: ${targets.length}件\n`);

  for (let i = 0; i < targets.length; i++) {
    const item = targets[i];
    const data = GALLERY_DATA[i];

    if (!data) {
      console.warn(`データ不足: ${item.title} (index ${i})`);
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${targets.length}] ${item.title} → ${data.title} ...`);
      await updateGalleryItem(item.id, data);
      console.log(' 完了');
    } catch (err) {
      console.error(`\n エラー: ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n全て完了しました！');
}

main();
