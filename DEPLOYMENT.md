# Deployment Guide

## Serverless Deployment Options

This landing page is designed to be deployed on serverless platforms for maximum stability and minimal cost.

### 1. Vercel (Recommended)

**Easiest deployment option with automatic CI/CD:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel Dashboard:
1. Go to https://vercel.com
2. Import your Git repository
3. Vercel will auto-detect Next.js
4. Click "Deploy"

**Environment Variables:**
- Add your `.env` variables in Vercel Dashboard → Settings → Environment Variables

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### 3. AWS Amplify

1. Go to AWS Amplify Console
2. Connect your Git repository
3. Amplify will auto-detect Next.js
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy

### 4. Cloudflare Pages

1. Go to Cloudflare Pages Dashboard
2. Connect your Git repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
4. Deploy

## Performance Optimization

### Image Optimization
- Use Next.js Image component for automatic optimization
- Images are served in WebP format when supported
- Lazy loading is enabled by default

### Caching Strategy
- Static assets are cached for 1 year
- API responses are cached for 24 hours
- PWA assets are cached for offline access

### CDN Configuration
All serverless platforms provide automatic CDN distribution:
- **Vercel**: Global Edge Network
- **Netlify**: Global CDN
- **AWS Amplify**: CloudFront CDN
- **Cloudflare Pages**: Cloudflare CDN

## Post-Deployment

### 1. Configure Custom Domain
Set up your custom domain in the platform dashboard.

### 2. Enable HTTPS
All platforms provide automatic SSL/TLS certificates.

### 3. Test PWA Functionality
- Check if service worker is registered
- Test offline functionality
- Verify push notifications (if configured)

### 4. Monitor Performance
Use these tools:
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals monitoring

## Scaling

These serverless platforms automatically scale to handle traffic:
- **Vercel**: Automatic scaling, 100GB bandwidth on free tier
- **Netlify**: Automatic scaling, 100GB bandwidth on free tier
- **AWS Amplify**: Auto-scales with AWS infrastructure
- **Cloudflare Pages**: Unlimited bandwidth, unlimited requests

## Cost Estimation

For a static site like this:
- **Vercel Free Tier**: $0/month (sufficient for most use cases)
- **Netlify Free Tier**: $0/month (sufficient for most use cases)
- **AWS Amplify**: ~$1-5/month (pay for what you use)
- **Cloudflare Pages**: $0/month (free plan)

## Troubleshooting

### Build Failures
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build
```

### PWA Issues
- Ensure manifest.json is accessible
- Check service worker registration in browser DevTools
- Verify HTTPS is enabled (PWA requires HTTPS)

### API Rate Limits
The site uses public Islamic APIs:
- Aladhan API: 25 requests per second
- Quran API: No strict limits
- If issues occur, consider caching responses

## Monitoring

Set up monitoring:
1. **Uptime Monitoring**: UptimeRobot, Pingdom
2. **Error Tracking**: Sentry
3. **Analytics**: Google Analytics, Plausible

## Backup

Your code is version-controlled on GitHub. For additional safety:
1. Enable GitHub branch protection
2. Set up automated backups of your deployment platform
3. Keep a local copy of environment variables

## Support

For deployment issues:
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- AWS Amplify: AWS Support
- Cloudflare: Cloudflare Support
