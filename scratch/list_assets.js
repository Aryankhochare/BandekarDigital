const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'Assets');
const outputFilePath = path.join(__dirname, '..', 'src', 'data', 'assetsData.json');

// Ensure data folder exists
const dataDir = path.dirname(outputFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const folders = fs.readdirSync(assetsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const assetsData = folders.map(folderName => {
  const folderPath = path.join(assetsDir, folderName);
  const files = fs.readdirSync(folderPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.tiff', '.bmp'].includes(ext);
    })
    .map(file => `/Assets/${folderName}/${file}`);

  return {
    category: folderName,
    // Human-friendly title: capitalize first letters of words, maybe fix spellings
    title: folderName
      .split(' ')
      .map(word => {
        if (word.toLowerCase() === 'qr') return 'QR';
        if (word.toLowerCase() === 'dtf') return 'DTF';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' '),
    images: files
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(assetsData, null, 2), 'utf-8');
console.log('Successfully generated assetsData.json!');
console.log(`Found ${assetsData.length} folders.`);
assetsData.forEach(item => {
  console.log(`- ${item.category}: ${item.images.length} images`);
});
