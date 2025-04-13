import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(process.cwd(), 'dist');

function verifyBuild() {
  console.log('Verifying build output...');
  console.log('Build directory:', distPath);
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist directory not found!');
    process.exit(1);
  }

  // Check for required files
  const requiredFiles = [
    'index.html',
    'assets/index.css',
    'assets/index.js'
  ];

  let missingFiles = [];
  requiredFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });

  if (missingFiles.length > 0) {
    console.error('❌ Missing required files:', missingFiles);
    process.exit(1);
  }

  // Check file sizes
  const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  const indexJs = fs.readFileSync(path.join(distPath, 'assets/index.js'), 'utf8');
  const indexCss = fs.readFileSync(path.join(distPath, 'assets/index.css'), 'utf8');

  console.log('✅ Build verification complete');
  console.log('📊 Build statistics:');
  console.log(`- index.html: ${indexHtml.length} bytes`);
  console.log(`- index.js: ${indexJs.length} bytes`);
  console.log(`- index.css: ${indexCss.length} bytes`);
}

verifyBuild(); 