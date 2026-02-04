// Simple test to verify Next.js project structure
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Next.js Project Setup...\n');

// Check if required files exist
const requiredFiles = [
  'next.config.js',
  'app/layout.jsx',
  'app/page.jsx',
  'app/globals.css',
  'tailwind.config.js',
  '.env.local'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - EXISTS`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check if required directories exist
const requiredDirs = [
  'app',
  'app/components',
  'app/contexts',
  'app/utils',
  'app/data'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/ - EXISTS`);
  } else {
    console.log(`❌ ${dir}/ - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`\n📦 Package: ${packageJson.name}`);
  console.log(`🔧 Scripts: ${Object.keys(packageJson.scripts).join(', ')}`);
  
  if (packageJson.dependencies && packageJson.dependencies.next) {
    console.log(`✅ Next.js dependency found: ${packageJson.dependencies.next}`);
  } else {
    console.log(`❌ Next.js dependency missing`);
    allFilesExist = false;
  }
}

console.log(`\n${allFilesExist ? '🎉 Setup Complete!' : '⚠️  Setup Incomplete'}`);
console.log(`${allFilesExist ? 'Ready for Next.js development!' : 'Some files are missing.'}`);