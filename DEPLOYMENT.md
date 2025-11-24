# SkillSwap Deployment Guide

## 📦 Deployment Options

### Option 1: Deploy to Vercel (Frontend) + Render/Railway (Backend)

This is the **recommended** approach for beginners.

#### Step 1: Deploy Backend to Render

1. **Create a Render account** at https://render.com

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: skillswap-backend
     - **Environment**: Java
     - **Build Command**: `mvn clean package`
     - **Start Command**: `java -jar target/skillswap-backend-0.0.1-SNAPSHOT.jar`
     - **Instance Type**: Free

3. **Add Environment Variables**:
   ```
   JWT_SECRET=your-super-secret-jwt-key-min-256-bits
   SPRING_PROFILES_ACTIVE=production
   ```

4. **Wait for deployment** and note your backend URL (e.g., `https://skillswap-backend.onrender.com`)

#### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Update `frontend/vercel.json`**:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://skillswap-backend.onrender.com/api/$1"
       }
     ]
   }
   ```

3. **Update `frontend/.env.production`**:
   ```
   REACT_APP_API_URL=https://skillswap-backend.onrender.com
   ```

4. **Deploy**:
   ```bash
   cd frontend
   vercel --prod
   ```

5. **Follow prompts** and your site will be live!

---

### Option 2: Deploy to Heroku (Full Stack)

#### Backend Deployment

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku app**:
   ```bash
   heroku create skillswap-backend
   ```

4. **Add PostgreSQL** (optional):
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set environment variables**:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

#### Frontend Deployment

Same as Vercel steps above, but update the backend URL to your Heroku URL.

---

### Option 3: Deploy to AWS (Advanced)

#### Backend on AWS Elastic Beanstalk

1. **Install AWS CLI and EB CLI**

2. **Initialize EB**:
   ```bash
   eb init -p java-17 skillswap-backend
   ```

3. **Create environment**:
   ```bash
   eb create skillswap-env
   ```

4. **Deploy**:
   ```bash
   mvn clean package
   eb deploy
   ```

#### Frontend on AWS Amplify

1. **Install Amplify CLI**:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize Amplify**:
   ```bash
   cd frontend
   amplify init
   ```

3. **Add hosting**:
   ```bash
   amplify add hosting
   ```

4. **Publish**:
   ```bash
   amplify publish
   ```

---

## 🔐 Production Checklist

Before deploying to production, ensure:

- [ ] Change JWT secret to a strong, random string (min 256 bits)
- [ ] Update CORS origins to your production domain
- [ ] Set up a production database (PostgreSQL recommended)
- [ ] Enable HTTPS for both frontend and backend
- [ ] Set `spring.jpa.hibernate.ddl-auto` to `validate` or `none`
- [ ] Add proper error handling and logging
- [ ] Set up monitoring (e.g., Sentry, LogRocket)
- [ ] Configure rate limiting
- [ ] Add database backups
- [ ] Test all features in production environment

---

## 🌍 Custom Domain Setup

### For Vercel (Frontend)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Render (Backend)

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records

---

## 📊 Monitoring & Maintenance

### Recommended Tools

- **Error Tracking**: Sentry (https://sentry.io)
- **Analytics**: Google Analytics, Plausible
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Performance**: Lighthouse, WebPageTest

### Database Backups

If using PostgreSQL:

```bash
# Backup
pg_dump -U username -d skillswap > backup.sql

# Restore
psql -U username -d skillswap < backup.sql
```

---

## 🚨 Troubleshooting Deployment

### Common Issues

**1. Backend not starting**
- Check logs: `heroku logs --tail` or Render dashboard
- Verify Java version (must be 17+)
- Check environment variables

**2. Frontend can't connect to backend**
- Verify CORS settings in backend
- Check API URL in frontend environment variables
- Ensure backend is running and accessible

**3. Database connection errors**
- Verify database credentials
- Check if database is running
- Ensure firewall allows connections

**4. Build failures**
- Clear cache and rebuild
- Check for dependency conflicts
- Verify all required files are committed

---

## 💡 Tips for Free Tier Deployments

### Render Free Tier
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Use a cron job to ping your service every 10 minutes to keep it alive

### Vercel Free Tier
- 100GB bandwidth per month
- Unlimited deployments
- Automatic HTTPS

### Heroku Free Tier (Deprecated)
- Consider alternatives: Render, Railway, Fly.io

---

## 📞 Support

If you encounter issues:
1. Check the logs
2. Review this guide
3. Search GitHub issues
4. Create a new issue with details

---

**Happy Deploying! 🚀**
