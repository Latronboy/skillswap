# SkillSwap - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites Check
```bash
# Check Java (need 17+)
java -version

# Check Node.js (need 16+)
node -v

# Check npm
npm -v
```

If any are missing, install them first!

---

## 🚀 Start the Application

### 1. Clone & Navigate
```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

### 2. Start Backend (Choose ONE method)

**Windows:**
```bash
.\run.bat
```

**Mac/Linux:**
```bash
chmod +x mvnw
./mvnw spring-boot:run
```

✅ Backend running at: **http://localhost:8080**

### 3. Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```

✅ Frontend running at: **http://localhost:3000**

---

## 🎯 First Steps

### 1. Open the App
Navigate to: **http://localhost:3000**

### 2. Create an Account
- Click "Sign Up"
- Fill in your details
- Click "Create Account"

**OR use pre-seeded accounts:**
- Username: `user` | Password: `password`
- Username: `admin` | Password: `admin`

### 3. Add Your First Skill
1. Click "Add New Skill" button
2. Search for a skill (e.g., "Java", "React", "Spanish")
3. If not found, create it by clicking "Create [skill name]"
4. Choose "I want to Teach" or "I want to Learn"
5. Set proficiency level
6. Add description
7. Click "Save Skill"

### 4. Browse Skills
- Click "Browse" in navigation
- Use search and filters
- Explore what others are teaching!

### 5. Update Your Profile
- Click "Profile" in navigation
- Click "Edit Profile"
- Add bio, location, etc.
- Click "Save"

---

## 🔍 Quick Reference

### Default URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:skillswap`
  - Username: `sa`
  - Password: (leave blank)

### Key Features
- ✅ User Authentication
- ✅ Add/Edit Skills
- ✅ Browse & Search
- ✅ User Profiles
- ✅ Dashboard Analytics

---

## 🐛 Common Issues

**Port already in use?**
```bash
# Windows - Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Frontend won't start?**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**Backend errors?**
- Ensure Java 17+ is installed
- Check `JAVA_HOME` environment variable
- Try: `mvn clean install`

---

## 📚 Next Steps

1. **Read the full README**: `README.md`
2. **Deploy your app**: See `DEPLOYMENT.md`
3. **Customize**: Edit colors, add features!
4. **Share**: Deploy and share with friends!

---

## 🎨 Customization Tips

### Change Colors
Edit `frontend/src/index.css`:
```css
:root {
  --primary: #6366f1;    /* Indigo */
  --secondary: #a855f7;  /* Purple */
  /* Change these to your brand colors! */
}
```

### Add More Skills
Access H2 Console and run:
```sql
INSERT INTO skills (name, category, description, is_active, created_at, updated_at) 
VALUES ('Your Skill', 'Category', 'Description', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

---

## 💡 Pro Tips

1. **Keep both terminals open** while developing
2. **Use Chrome DevTools** for debugging frontend
3. **Check backend logs** for API errors
4. **H2 Console** is your friend for database inspection
5. **Hot reload** works for both frontend and backend!

---

## 🆘 Need Help?

- 📖 Check `README.md` for detailed docs
- 🐛 Open an issue on GitHub
- 💬 Join our Discord (if available)
- 📧 Email: support@skillswap.com

---

**Happy Skill Swapping! 🎓✨**
