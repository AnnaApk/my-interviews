import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
// Rename columns
  knex.schema.table('accounts', function(table) {
    table.renameColumn('user_id', 'userId');
    table.renameColumn('provider_id', 'provider');
    table.renameColumn('provider_account_id', 'providerAccountId');
    table.renameColumn('access_token_expires', 'expires_at');
    table.renameColumn('provider_type', 'type');
  });

  knex.schema.table('users', function(table) {
    table.renameColumn('email_verified', 'emailVerified');
  });

  knex.schema.table('sessions', function(table) {
    table.renameColumn('session_token', 'sessionToken');
    table.renameColumn('user_id', 'userId');
  });

// Convert TIMESTAMPTZ columns to BIGINT and then TEXT
  knex.schema.raw(`ALTER TABLE accounts ALTER COLUMN "expires_at" TYPE TEXT USING CAST(extract(epoch FROM "expires_at") AS BIGINT)*1000`);

  knex.schema.raw(`ALTER TABLE users ALTER COLUMN "emailVerified" TYPE TEXT USING CAST(CAST(extract(epoch FROM "emailVerified") AS BIGINT)*1000 AS TEXT)`);

  knex.schema.raw(`ALTER TABLE sessions ALTER COLUMN "expires" TYPE TEXT USING CAST(CAST(extract(epoch FROM "expires") AS BIGINT)*1000 AS TEXT)`);

  knex.schema.raw(`ALTER TABLE verification_tokens ALTER COLUMN "expires" TYPE TEXT USING CAST(CAST(extract(epoch FROM "expires") AS BIGINT)*1000 AS TEXT)`);

// Alter column types (excluding id)
  knex.schema.table('accounts', function(table) {
    table.string('type').notNullable().alter();
    table.string('provider').notNullable().alter();
    table.string('providerAccountId').notNullable().alter();
  });

  knex.schema.table('users', function(table) {
    table.string('name').notNullable().alter();
    table.string('email').notNullable().alter();
    table.string('image').nullable().alter();
  });

  knex.schema.table('sessions', function(table) {
    table.string('sessionToken').notNullable().alter();
  });

  knex.schema.table('verification_tokens', function(table) {
    table.string('identifier').notNullable().alter();
    table.string('token').notNullable().alter();
  });

// Add Foreign Key constraints
  knex.schema.table('accounts', function(table) {
    table.foreign('userId').references('id').inTable('users');
  });

  knex.schema.table('sessions', function(table) {
    table.foreign('userId').references('id').inTable('users');
  });

// Add new columns (optional)
  knex.schema.table('accounts', function(table) {
    table.string('token_type').nullable();
    table.string('scope').nullable();
    table.string('id_token').nullable();
    table.string('session_state').nullable();
  });

// Drop columns (optional)
// do it later
}

export async function down (knex: Knex): Promise<void> {
  
}
