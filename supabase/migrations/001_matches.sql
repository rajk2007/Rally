create table matches (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  team1_players text[] not null,
  team2_players text[] not null,
  team1_score integer not null,
  team2_score integer not null,
  match_type text not null check (match_type in ('singles', 'doubles')),
  location_type text check (location_type in ('indoor', 'outdoor')),
  winner text not null check (winner in ('team1', 'team2')),
  duration_seconds integer,
  rallies jsonb,
  user_id uuid references auth.users(id)
);
alter table matches enable row level security;
create policy "Users can view own matches"
  on matches for select using (auth.uid() = user_id);
create policy "Users can insert own matches"
  on matches for insert with check (auth.uid() = user_id);
