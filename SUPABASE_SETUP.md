# SUPABASE_SETUP.md — AURA FRAGRANCE OS

## 3-Minute Atelier Database Wiring Guide

AURA FRAGRANCE OS is pre-configured for Supabase PostgreSQL.

### Step 1: Run SQL Schemas
1. Open your Supabase SQL Editor.
2. Run `supabase/schema.sql` to generate `fragrance_formulas`, `maceration_batches`, and `bespoke_intakes`.
3. Run `supabase/seed.sql` to populate sample fragrances and cellar maceration batches.

### Step 2: Environment Variables
Create `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 🔑 Demo Operator Bypass Passkey
- **Route**: `https://your-domain.com/admin` (or click `[ ATELIER PASS ]` in header)
- **Passkey**: `fragrance2026`
