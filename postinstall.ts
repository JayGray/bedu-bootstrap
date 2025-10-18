#!/usr/bin/env bun

console.log('\n🚀 Setting up bedu-bootstrap...\n');

// Create necessary directories
const dirs = ['data', 'drizzle', 'dist'];
for (const dir of dirs) {
    const dirPath = `./${dir}`;
    if (!await Bun.file(dirPath).exists()) {
        await Bun.spawn(['mkdir', '-p', dirPath]).exited;
        console.log(`✓ Created ${dir}/ directory`);
    }
}

// Initialize database
console.log('\n📦 Initializing database...');
try {
    await Bun.spawn(['bun', 'run', 'db:push'], {
        stdout: 'inherit',
        stderr: 'inherit'
    }).exited;
    console.log('✓ Database initialized\n');
} catch (error) {
    console.error('⚠ Warning: Could not initialize database. Run `bun run db:push` manually.\n');
}

console.log('✨ Setup complete! Run `bun dev` to start development.\n');
