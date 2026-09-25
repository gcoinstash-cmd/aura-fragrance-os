-- ==============================================================================
-- AURA FRAGRANCE OS — SUPABASE RELATIONAL SCHEMA (ENGINE B & ENTERPRISE GRADE)
-- Haute Parfumerie, Custom Formulation Lab & Atelier Operating System
-- ==============================================================================

create extension if not exists "uuid-ossp";

-- 1. MASTER SIGNATURE FRAGRANCES
create table if not exists public.fragrance_formulas (
    id uuid primary key default gen_random_uuid(),
    code text unique not null,
    name text not null,
    tagline text not null,
    story text not null,
    olfactory_character text not null,
    intensity integer not null check (intensity between 1 and 5),
    price numeric(10, 2) not null default 240.00,
    concentration text not null default 'Extrait de Parfum (28%)',
    image_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. MACERATION BATCHES & CELLAR AGING
create table if not exists public.maceration_batches (
    id uuid primary key default gen_random_uuid(),
    batch_code text unique not null,
    name text not null,
    olfactory_family text not null,
    concentration text not null,
    aging_days integer not null default 0,
    status text not null default 'maceration' check (status in ('maceration', 'filtration', 'bottling', 'ready')),
    volume_bottles integer not null default 100,
    cellar_temp text not null default '16°C',
    humidity text not null default '45%',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BESPOKE PERFUME INTAKES (PERFUMER'S LAB)
create table if not exists public.bespoke_intakes (
    id uuid primary key default gen_random_uuid(),
    client_name text not null,
    client_email text not null,
    formulation_title text not null,
    top_notes jsonb not null default '[]'::jsonb,
    heart_notes jsonb not null default '[]'::jsonb,
    base_notes jsonb not null default '[]'::jsonb,
    status text not null default 'submitted' check (status in ('submitted', 'under_review', 'compounding', 'dispatched')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.fragrance_formulas enable row level security;
alter table public.maceration_batches enable row level security;
alter table public.bespoke_intakes enable row level security;

create policy "Allow public read access to formulas" on public.fragrance_formulas for select using (true);
create policy "Allow public read access to batches" on public.maceration_batches for select using (true);
create policy "Allow customer bespoke intake creation" on public.bespoke_intakes for insert with check (true);
create policy "Allow staff full access formulas" on public.fragrance_formulas for all using (auth.role() = 'authenticated');
create policy "Allow staff full access batches" on public.maceration_batches for all using (auth.role() = 'authenticated');
create policy "Allow staff full access intakes" on public.bespoke_intakes for all using (auth.role() = 'authenticated');
