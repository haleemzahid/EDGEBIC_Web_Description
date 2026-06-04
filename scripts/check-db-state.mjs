import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
try {
  const tables = await p.$queryRawUnsafe(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
  );
  console.log('Total tables in public schema:', tables.length);
  console.log('---');
  console.log(tables.map((t) => t.table_name).join('\n'));

  const hasPrismaMigrations = tables.some((t) => t.table_name === '_prisma_migrations');
  console.log('\n_prisma_migrations table exists:', hasPrismaMigrations);

  if (hasPrismaMigrations) {
    const migs = await p.$queryRawUnsafe(
      "SELECT migration_name, applied_steps_count, finished_at FROM _prisma_migrations ORDER BY started_at"
    );
    console.log('\nRecorded migrations:', migs.length);
    for (const m of migs) {
      const status = m.finished_at ? '[OK]' : '[PENDING]';
      console.log(`  ${status} ${m.migration_name} (steps=${m.applied_steps_count})`);
    }
  }
} catch (e) {
  console.error('ERROR:', e.message);
  process.exit(1);
} finally {
  await p.$disconnect();
}
