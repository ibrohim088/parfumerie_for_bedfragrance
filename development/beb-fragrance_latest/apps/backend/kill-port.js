const { execSync } = require('child_process');

const PORT = process.env.PORT || 4000;

// 1. Portni bo'shatish
try {
  const result = execSync(`netstat -ano | findstr :${PORT}`, { shell: 'cmd.exe' }).toString();
  const lines = result.trim().split('\n');
  const pids = new Set();
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && pid !== '0') pids.add(pid);
  });
  pids.forEach(pid => {
    try {
      execSync(`taskkill /PID ${pid} /F`, { shell: 'cmd.exe', stdio: 'ignore' });
      console.log(`✅ Port ${PORT} bo'shatildi (PID: ${pid})`);
    } catch (e) {}
  });
} catch (e) {
  console.log(`✅ Port ${PORT} bo'sh`);
}

// 2. Prisma generate
try {
  console.log('⏳ Prisma generate...');
  execSync('npx prisma generate --schema=src/prisma/schema.prisma', {
    shell: 'cmd.exe',
    stdio: 'inherit',
  });
} catch (e) {
  console.error('❌ Prisma generate xatolik:', e.message);
}