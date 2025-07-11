# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy TechScope to production"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically deploy using the `vercel.json` configuration

## Environment Variables

The app works out of the box without any environment variables. For local development, you can create a `.env` file:

```env
NODE_ENV=development
PORT=5000
VITE_API_BASE_URL=
```

## How It Works

### Local Development
- Frontend: `http://localhost:5000`
- API: `http://localhost:5000/api`
- Uses relative API paths (`/api/articles`)

### Production (Vercel)
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api`
- Uses same relative API paths (`/api/articles`)

## Architecture

### Frontend Build
- Vite builds the React app to `dist/public`
- Static files are served from this directory

### API (Serverless)
- Express.js API in `/api/index.ts`
- Runs as Vercel serverless function
- In-memory storage with sample articles
- CORS enabled for cross-origin requests

### Routing
- `/api/*` → Serverless API function
- `/*` → Static frontend files

## Troubleshooting

### Build Errors
If you get runtime or build errors:
1. Check `vercel.json` uses correct build configuration
2. Verify API function exports properly for serverless
3. Ensure Node.js version is 18+ in Vercel project settings
4. Check that API endpoints return proper responses

### API Not Working
1. Check browser dev tools for CORS errors
2. Verify API endpoints in `/api/index.ts`
3. Test API directly: `https://your-app.vercel.app/api/articles`

## Custom Domain

To use a custom domain:
1. Go to your Vercel project settings
2. Add your domain in the "Domains" section
3. Update DNS records as instructed

## Performance

The app includes:
- Server-side rendering ready
- Optimized static assets
- Serverless API with fast cold starts
- In-memory data for instant responses