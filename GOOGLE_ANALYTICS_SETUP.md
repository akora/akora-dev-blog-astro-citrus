# Google Analytics Setup Guide

This guide explains how to set up Google Analytics 4 (GA4) tracking for your Astro blog.

## Prerequisites

- A Google Analytics account
- A GA4 property set up for your website

## Setup Steps

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Admin** > **Property Settings** > **Data Streams**
4. Click on your web data stream
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

1. Open your `.env` file
2. Uncomment and update the `PUBLIC_GA_MEASUREMENT_ID` line:

```bash
# Replace G-XXXXXXXXXX with your actual Measurement ID
PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### 3. Deploy Your Site

The Google Analytics tracking will only be active in production builds. To test:

```bash
# Build and preview your site
pnpm run build
pnpm run preview
```

## How It Works

- **Development**: Google Analytics is disabled during development (`astro dev`)
- **Production**: Google Analytics loads automatically when `PUBLIC_GA_MEASUREMENT_ID` is set
- **Privacy**: The tracking script only loads if the environment variable is configured

## Files Modified

- `astro.config.ts` - Added environment variable schema
- `src/components/GoogleAnalytics.astro` - New component with gtag script
- `src/components/BaseHead.astro` - Integrated GoogleAnalytics component
- `.env` - Added placeholder for GA Measurement ID

## Verification

After deployment, you can verify tracking is working by:

1. Visiting your live site
2. Checking the **Realtime** report in Google Analytics
3. Looking for your visit in the active users count

## Security Notes

- The Measurement ID is public (hence the `PUBLIC_` prefix)
- No sensitive data is exposed in the client-side code
- Tracking only occurs in production builds
