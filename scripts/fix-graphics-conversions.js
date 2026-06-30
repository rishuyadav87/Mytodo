const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native',
  'ReactCommon',
  'react',
  'renderer',
  'core',
  'graphicsConversions.h'
);

const oldCode = `case YGUnitPercent:
      return std::format("{}%", dimension.value);`;

const newCode = `case YGUnitPercent: {
      char buffer[256];
      std::snprintf(buffer, sizeof(buffer), "%.9g%%", dimension.value);
      return buffer;
    }`;

let content = fs.readFileSync(filePath, 'utf8');

if (content.includes('std::format("{}%"')) {
  content = content.replace(oldCode, newCode);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched graphicsConversions.h');
} else {
  console.log('ℹ️ Already patched or pattern not found, skipping.');
}