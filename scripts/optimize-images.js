import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/img');

async function getImages(dir) {
  let images = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images = images.concat(await getImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }
  return images;
}

async function optimizeImages() {
  console.log('Starting image optimization...');
  const images = await getImages(PUBLIC_DIR);
  
  let totalSaved = 0;

  for (const imagePath of images) {
    try {
      const stats = await fs.stat(imagePath);
      const originalSize = stats.size;
      const ext = path.extname(imagePath).toLowerCase();
      
      console.log(`Processing: ${path.relative(PUBLIC_DIR, imagePath)} (${(originalSize / 1024).toFixed(2)} KB)`);

      const buffer = await fs.readFile(imagePath);
      let optimizedBuffer;

      // Logic: Resize if too big (e.g. > 1200px width), compress strongly.
      // Profile image: specific handling
      if (imagePath.includes('profile')) {
         optimizedBuffer = await sharp(buffer)
          .resize(400, 400, { fit: 'cover', withoutEnlargement: true }) // Max 400x400 for profile
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
      } else {
         // Projects/Backgrounds
         let pipeline = sharp(buffer);
         const metadata = await pipeline.metadata();
         
         if (metadata.width > 1200) {
            pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
         }

         if (ext === '.png') {
            // Convert large PNGs to JPEG if they are photos (heuristic: background_project usually photos)
            // But preserving transparency might be needed for logos?
            // Let's stick to PNG compression for PNGs unless they are huge background images.
            // Actually, many project images are screenshots. WebP would be better but let's stick to same format to avoid code changes in array.js
            // Wait, I can't easily change extension in array.js without parsing it. 
            // So I will optimize in-place (same format).
            optimizedBuffer = await pipeline
              .png({ quality: 80, compressionLevel: 9 })
              .toBuffer();
         } else {
            optimizedBuffer = await pipeline
              .jpeg({ quality: 80, mozjpeg: true })
              .toBuffer();
         }
      }

      if (optimizedBuffer.length < originalSize) {
        await fs.writeFile(imagePath, optimizedBuffer);
        const saved = originalSize - optimizedBuffer.length;
        totalSaved += saved;
        console.log(`  ✓ Optimized: Saved ${(saved / 1024).toFixed(2)} KB`);
      } else {
        console.log(`  - Skipped: Optimization resulted in larger file`);
      }

    } catch (e) {
      console.error(`  X Error processing ${path.basename(imagePath)}:`, e.message);
    }
  }

  console.log(`\nTotal space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
