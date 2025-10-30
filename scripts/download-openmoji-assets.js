/**
 * Download OpenMoji SVG Assets
 * Downloads 28 pre-selected OpenMoji SVG files for math worksheet visuals
 *
 * Source: https://openmoji.org/
 * License: CC BY-SA 4.0
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OpenMoji assets organized by theme (28 total)
const ASSETS = {
  food: [
    { id: 'apple', unicode: '1F34E', name: 'Apple' },
    { id: 'banana', unicode: '1F34C', name: 'Banana' },
    { id: 'orange', unicode: '1F34A', name: 'Orange' },
    { id: 'strawberry', unicode: '1F353', name: 'Strawberry' },
    { id: 'cookie', unicode: '1F36A', name: 'Cookie' },
    { id: 'pizza', unicode: '1F355', name: 'Pizza' },
    { id: 'carrot', unicode: '1F955', name: 'Carrot' }
  ],
  animals: [
    { id: 'dog', unicode: '1F436', name: 'Dog' },
    { id: 'cat', unicode: '1F431', name: 'Cat' },
    { id: 'rabbit', unicode: '1F430', name: 'Rabbit' },
    { id: 'bear', unicode: '1F43B', name: 'Bear' },
    { id: 'fish', unicode: '1F41F', name: 'Fish' }
  ],
  nature: [
    { id: 'butterfly', unicode: '1F98B', name: 'Butterfly' },
    { id: 'bee', unicode: '1F41D', name: 'Bee' },
    { id: 'flower', unicode: '1F33C', name: 'Flower' },
    { id: 'tree', unicode: '1F333', name: 'Tree' }
  ],
  space: [
    { id: 'star', unicode: '2B50', name: 'Star' },
    { id: 'sun', unicode: '2600', name: 'Sun' },
    { id: 'moon', unicode: '1F319', name: 'Moon' },
    { id: 'rocket', unicode: '1F680', name: 'Rocket' }
  ],
  other: [
    { id: 'car', unicode: '1F697', name: 'Car' },
    { id: 'book', unicode: '1F4D6', name: 'Book' },
    { id: 'pencil', unicode: '270F', name: 'Pencil' },
    { id: 'circle', unicode: '26AB', name: 'Circle' },
    { id: 'square', unicode: '25FC', name: 'Square' },
    { id: 'triangle', unicode: '1F53A', name: 'Triangle' },
    { id: 'rectangle', unicode: '25AD', name: 'Rectangle' },
    { id: 'heart', unicode: '2764', name: 'Heart' }
  ]
};

// OpenMoji CDN base URL (colored version)
const OPENMOJI_CDN = 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg';

/**
 * Download a single SVG file from OpenMoji CDN
 */
function downloadSVG(unicode, filepath) {
  return new Promise((resolve, reject) => {
    const url = `${OPENMOJI_CDN}/${unicode}.svg`;

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve();
        });

        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete partial file
          reject(err);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, (redirectResponse) => {
          if (redirectResponse.statusCode === 200) {
            const file = fs.createWriteStream(filepath);
            redirectResponse.pipe(file);

            file.on('finish', () => {
              file.close();
              resolve();
            });
          } else {
            reject(new Error(`Failed to download ${url}: ${redirectResponse.statusCode}`));
          }
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Download all OpenMoji assets
 */
async function downloadAllAssets() {
  console.log('🎨 Downloading OpenMoji SVG Assets...\n');

  let totalDownloaded = 0;
  let totalFailed = 0;

  for (const [theme, assets] of Object.entries(ASSETS)) {
    console.log(`📁 Theme: ${theme} (${assets.length} assets)`);

    // Create theme directory
    const themeDir = path.join(__dirname, '..', 'public', 'assets', 'svg', theme);
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }

    // Download each asset
    for (const asset of assets) {
      const filepath = path.join(themeDir, `${asset.id}.svg`);

      try {
        await downloadSVG(asset.unicode, filepath);
        console.log(`  ✅ ${asset.name} (${asset.unicode})`);
        totalDownloaded++;
      } catch (error) {
        console.error(`  ❌ ${asset.name} (${asset.unicode}): ${error.message}`);
        totalFailed++;
      }
    }

    console.log('');
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Downloaded: ${totalDownloaded}/28`);
  console.log(`   ❌ Failed: ${totalFailed}/28`);

  if (totalDownloaded === 28) {
    console.log(`\n🎉 All OpenMoji assets downloaded successfully!`);
  } else if (totalFailed > 0) {
    console.log(`\n⚠️  Some assets failed to download. You may need to download them manually.`);
  }
}

// Run the download
downloadAllAssets().catch(console.error);
