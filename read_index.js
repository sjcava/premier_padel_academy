const fs = require('fs');
try {
    const content = fs.readFileSync('index.html', 'utf8');
    console.log(content);
} catch (err) {
    console.error('Error reading file:', err);
}
