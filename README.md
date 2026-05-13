# RALLY 🏓

The Strava of Pickleball.

## Features
- **Score Tracking**: Real-time point tracking for singles and doubles.
- **Serve Rotation**: Automatic serve tracking and player indicators.
- **Match History**: Comprehensive log of all your past games.
- **Stats**: Detailed post-match analytics and win rates.

## Setup Instructions
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Supabase Configuration**:
   Create a Supabase project and set up the `matches` table using the migration in `supabase/migrations/001_matches.sql`.
3. **Environment Variables**:
   Create a `.env` file with:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **EAS Build**:
   Configure EAS and run:
   ```bash
   eas build --platform android --profile preview
   ```

## GitHub Secrets Required
- `EXPO_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Built With
- **Expo** (SDK 51)
- **React Native**
- **Supabase**
