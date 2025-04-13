import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(process.cwd(), 'dist');

function findHashedFile(directory, prefix) {
  const files = fs.readdirSync(directory);
  return files.find(file => file.startsWith(prefix));
}

function verifyBuild() {
  console.log('Verifying build output...');
  console.log('Build directory:', distPath);
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist directory not found!');
    process.exit(1);
  }

  // Check for required files
  const requiredFiles = ['index.html'];
  const assetsDir = path.join(distPath, 'assets');

  if (!fs.existsSync(assetsDir)) {
    console.error('❌ assets directory not found!');
    process.exit(1);
  }

  let missingFiles = [];
  requiredFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });

  // Check for hashed CSS and JS files
  const cssFile = findHashedFile(assetsDir, 'index-');
  const jsFile = findHashedFile(assetsDir, 'index-');
  const vendorFile = findHashedFile(assetsDir, 'vendor-');

  if (!cssFile || !jsFile) {
    missingFiles.push('assets/index.css', 'assets/index.js');
  }

  if (missingFiles.length > 0) {
    console.error('❌ Missing required files:', missingFiles);
    process.exit(1);
  }

  // Check file sizes
  const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  const indexCss = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  const indexJs = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  const vendorJs = vendorFile ? fs.readFileSync(path.join(assetsDir, vendorFile), 'utf8') : null;

  console.log('✅ Build verification complete');
  console.log('📊 Build statistics:');
  console.log(`- index.html: ${indexHtml.length} bytes`);
  console.log(`- ${cssFile}: ${indexCss.length} bytes`);
  console.log(`- ${jsFile}: ${indexJs.length} bytes`);
  if (vendorJs) {
    console.log(`- ${vendorFile}: ${vendorJs.length} bytes`);
  }
}

verifyBuild(); 