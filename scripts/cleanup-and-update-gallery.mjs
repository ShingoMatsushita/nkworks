const SERVICE_DOMAIN = 'naoki-bike';
const API_KEY = 'mhFrGIyRbMXIIxSI1tyZULZUs8wg2RVZh6NG';
const CONTENT_API = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

const GALLERY_DATA = [
  { num: 1,  title: 'フレーム分解・エンジン脱着',          description: 'フレームからエンジンを取り外し、フルレストアの第一歩。丁寧に分解して各パーツを点検します。',                               category: ['修理'] },
  { num: 2,  title: 'Honda CB750 カスタム完成車',          description: '赤×ゴールドのカラーリングが映えるHonda CB750のカスタム完成車。マフラーや足回りをカスタムしました。',                  category: ['カスタム'] },
  { num: 3,  title: 'Kawasaki カスタム完成車',             description: 'オレンジのボディが鮮やかなKawasakiのカスタム完成車。すっきりとしたスタイルに仕上げました。',                          category: ['カスタム'] },
  { num: 4,  title: 'レーサー仕様フルカスタム',             description: 'サーキット走行を想定したフルカスタム仕様。軽量化と高性能化を両立させた1台です。',                                    category: ['カスタム'] },
  { num: 5,  title: 'Kawasaki ZRX 黒×金カスタム',         description: '漆黒のボディにゴールドのホイールが映えるKawasaki ZRXのフルカスタム完成車。',                                       category: ['カスタム'] },
  { num: 6,  title: 'フレーム塗装（キャンディレッド）',      description: '鮮やかなキャンディレッドに仕上げたフレーム塗装。丁寧な下地処理から仕上げまで一貫して行います。',                    category: ['カスタム'] },
  { num: 7,  title: 'Kawasaki ZRX カスタム完成車',         description: '黒×ゴールドのカラーリングのKawasaki ZRX。各部パーツのカスタムを施した完成車です。',                               category: ['カスタム'] },
  { num: 8,  title: 'Yamaha XJR1300 カスタム',            description: 'Yamaha XJR1300のカスタム完成車。マフラーや足回りをカスタムし、存在感あるスタイルに仕上げました。',                 category: ['カスタム'] },
  { num: 9,  title: 'Kawasaki H2 カスタム完成車',          description: 'イエローのカラーリングが印象的なKawasaki H2のカスタム車。当時のスタイルを活かしながらモダンに仕上げました。',          category: ['カスタム'] },
  { num: 10, title: 'Honda CBR カスタム完成車',            description: '緑の丘をバックに映えるHonda CBRのカスタム完成車。ホワイト×ブルーのスタイリッシュな1台です。',                       category: ['カスタム'] },
  { num: 11, title: 'ホイール・ブレーキ周りカスタム',        description: 'ゴールドに仕上げたホイールとブレーキ周りのカスタム作業。細部まで丁寧に仕上げます。',                              category: ['カスタム'] },
  { num: 12, title: 'フォーク研磨・リストア',               description: 'フロントフォークの分解・研磨作業。経年劣化した部品を新品同様に仕上げます。',                                      category: ['修理'] },
  { num: 13, title: 'フレーム塗装（ブラック）',             description: 'ピカピカに磨き上げたブラックフレーム。下地処理から仕上げコートまで丁寧に施工します。',                            category: ['カスタム'] },
  { num: 14, title: 'エンジンカバー塗装（ゴールド）',        description: 'BEETエンジンカバーをゴールドに塗装。パーツ単体の塗装・カスタムも承ります。',                                    category: ['カスタム'] },
  { num: 15, title: 'ホイール塗装・リフレッシュ',           description: 'ホイールの塗装リフレッシュ作業。ゴールドに仕上げ、足元から印象をガラリと変えます。',                              category: ['カスタム'] },
  { num: 16, title: 'Suzuki GS750 カスタム完成車',         description: '青空と水平線をバックに映えるSuzuki GS750のカスタム完成車。',                                                   category: ['カスタム'] },
  { num: 17, title: 'フレーム・サスペンション組み込み',      description: 'オーリンズサスペンションをフレームへ組み込む作業。丁寧な組み立てで走行性能を最大限に引き出します。',              category: ['修理'] },
  { num: 18, title: 'エンジンオーバーホール',               description: 'エンジンを全分解し、内部パーツを点検・交換。新品同様のパフォーマンスに仕上げます。',                            category: ['修理'] },
  { num: 19, title: 'エンジン搭載作業',                    description: 'オーバーホール済みのエンジンをフレームへ搭載する工程。精密な位置合わせが求められます。',                          category: ['修理'] },
  { num: 20, title: 'ホイール・スプロケット交換',            description: 'ホイールとスプロケットの交換作業。駆動系のリフレッシュで走りが変わります。',                                    category: ['修理'] },
  { num: 21, title: 'フレーム組み立て作業',                description: 'フレームへ各パーツを組み上げていく工程。丁寧な作業でフルレストアを進めます。',                                  category: ['修理'] },
  { num: 22, title: 'ホイール・ブレーキ組み立て',           description: 'ゴールドホイールとブレーキシステムの組み立て作業。精度の高い組み付けで安全性を確保します。',                     category: ['修理'] },
  { num: 23, title: 'タンク塗装（ブルー×ゴールド）',        description: '深みのあるブルーにゴールドラインを入れたタンク塗装。オーナーのこだわりを形にします。',                          category: ['カスタム'] },
  { num: 24, title: 'Kawasaki ZRX ブルーカスタム',         description: 'ブルー×ゴールドのカラーリングが鮮やかなKawasakiのカスタム完成車。',                                           category: ['カスタム'] },
  { num: 25, title: 'ホイールポリッシュ仕上げ',             description: '鏡面仕上げに磨き上げたホイール。地道な研磨作業で輝きを取り戻します。',                                        category: ['修理'] },
];

async function getAllItems() {
  const res = await fetch(`${CONTENT_API}/gallery?limit=100&orders=createdAt`, {
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
  });
  const data = await res.json();
  return data.contents;
}

async function deleteItem(id) {
  const res = await fetch(`${CONTENT_API}/gallery/${id}`, {
    method: 'DELETE',
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
  });
  if (!res.ok) throw new Error(`削除失敗 (${id}): ${res.status}`);
}

async function updateItem(id, data) {
  const res = await fetch(`${CONTENT_API}/gallery/${id}`, {
    method: 'PATCH',
    headers: { 'X-MICROCMS-API-KEY': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`更新失敗 (${id}): ${res.status} ${text}`);
  }
}

async function main() {
  console.log('全アイテム取得中...');
  const all = await getAllItems();
  const targets = all.filter(item => /^ギャラリー \d+$/.test(item.title));

  // 番号ごとにグループ化
  const groups = {};
  for (const item of targets) {
    const num = parseInt(item.title.replace('ギャラリー ', ''));
    if (!groups[num]) groups[num] = [];
    groups[num].push(item);
  }

  // 重複削除（古い方を削除、最新だけ残す）
  let deleteCount = 0;
  for (const [num, items] of Object.entries(groups)) {
    if (items.length > 1) {
      // createdAtが新しいものを残し、古いものを削除
      const sorted = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      for (let i = 1; i < sorted.length; i++) {
        process.stdout.write(`重複削除: ギャラリー ${num} (${sorted[i].id}) ...`);
        await deleteItem(sorted[i].id);
        console.log(' 完了');
        deleteCount++;
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }
  console.log(`\n重複 ${deleteCount}件を削除しました\n`);

  // 更新
  for (const d of GALLERY_DATA) {
    const item = groups[d.num]?.[0];
    if (!item) { console.warn(`ギャラリー ${d.num} が見つかりません`); continue; }
    // 最新のもの（削除後に残ったもの）を使う
    const remaining = groups[d.num].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    process.stdout.write(`[${d.num}/25] ${remaining.title} → ${d.title} ...`);
    try {
      await updateItem(remaining.id, { title: d.title, description: d.description, category: d.category });
      console.log(' 完了');
    } catch (err) {
      console.error(`\n エラー: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n全て完了しました！');
}

main();
