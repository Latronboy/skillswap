# SkillSwap - Peer-to-Peer Skill Exchange Platform

![SkillSwap Banner](https://via.placeholder.com/1200x300/6366f1/ffffff?text=SkillSwap+-+Learn+%26+Teach+Skills)

A modern, full-stack web application that enables users to exchange skills without monetary transactions. Built with Spring Boot (Java) backend and React frontend.

## 🌟 Features

- **User Authentication** - Secure JWT-based authentication
- **Skill Management** - Add, browse, and manage skills you can teach or want to learn
- **User Profiles** - Customizable profiles with bio, location, and skill listings
- **Advanced Search** - Filter and search skills by category, name, or description
- **Responsive Design** - Beautiful UI with Framer Motion animations
- **Real-time Dashboard** - Track your skills, connections, and exchanges

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT authentication
- **Spring Data JPA**
- **H2 Database** (in-memory, easily switchable to PostgreSQL)
- **Maven** for dependency management

### Frontend
- **React 18**
- **React Router** for navigation
- **Axios** for API calls
- **Framer Motion** for animations
- **React Icons** for beautiful icons
- **Tailwind CSS** for styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17 or higher**
  - Download from: https://www.oracle.com/java/technologies/downloads/
  - Verify installation: `java -version`

- **Node.js 16+ and npm**
  - Download from: https://nodejs.org/
  - Verify installation: `node -v` and `npm -v`

- **Maven** (optional, project includes Maven Wrapper)
  - Download from: https://maven.apache.org/download.cgi

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

### 2. Backend Setup

#### Option A: Using the provided batch file (Windows)

```bash
.\run.bat
```

#### Option B: Using Maven Wrapper

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

#### Option C: Using Maven directly

```bash
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

**Default Seeded Users:**
- Username: `user` | Password: `password`
- Username: `admin` | Password: `admin`

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

The frontend will start on **http://localhost:3000**

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:skillswap`
  - Username: `sa`
  - Password: (leave blank)

## 📁 Project Structure

```
skillswap/
├── src/main/java/com/skillswap/     # Backend Java source code
│   ├── config/                       # Configuration classes
│   ├── controller/                   # REST API controllers
│   ├── dto/                          # Data Transfer Objects
│   ├── entity/                       # JPA entities
│   ├── repository/                   # Data repositories
│   ├── security/                     # Security & JWT configuration
│   └── service/                      # Business logic services
├── src/main/resources/
│   └── application.yml               # Application configuration
├── frontend/                         # React frontend
│   ├── public/                       # Static files
│   └── src/
│       ├── components/               # Reusable React components
│       ├── contexts/                 # React Context (Auth)
│       ├── pages/                    # Page components
│       └── App.js                    # Main app component
├── pom.xml                           # Maven dependencies
└── README.md                         # This file
```

## 🔧 Configuration

### Backend Configuration

Edit `src/main/resources/application.yml`:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:skillswap
    username: sa
    password: 
    driver-class-name: org.h2.Driver

jwt:
  secret: your-secret-key-here
  expiration: 86400000  # 24 hours
```

### Frontend Configuration

The frontend is configured to proxy API requests to `http://localhost:8080`. This is set in `frontend/package.json`:

```json
{
  "proxy": "http://localhost:8080"
}
```

## 🗄️ Database

The application uses **H2 in-memory database** by default for easy development. Data is reset on each restart.

### Switching to PostgreSQL

1. Update `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. Update `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/skillswap
    username: your_username
    password: your_password
    driver-class-name: org.postgresql.Driver
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate JWT token

### Users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/search` - Search users

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/search` - Search skills

### User Skills
- `POST /api/user-skills` - Add skill to user
- `GET /api/user-skills/user/{userId}` - Get user's skills
- `PUT /api/user-skills/{id}` - Update user skill
- `DELETE /api/user-skills/{id}` - Delete user skill

## 🚢 Deployment

### Deploying Backend

#### Option 1: Traditional Server (Heroku, AWS, etc.)

1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/skillswap-backend-0.0.1-SNAPSHOT.jar
```

#### Option 2: Docker

Create `Dockerfile` in the root:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

Build and run:
```bash
mvn clean package
docker build -t skillswap-backend .
docker run -p 8080:8080 skillswap-backend
```

### Deploying Frontend to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Navigate to frontend directory**:
```bash
cd frontend
```

3. **Create `vercel.json` in frontend directory**:
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

4. **Update API base URL** in frontend code (create `.env.production`):
```
REACT_APP_API_URL=https://your-backend-url.com
```

5. **Deploy to Vercel**:
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **skillswap**
- In which directory is your code located? **./frontend**
- Override settings? **N**

6. **For production deployment**:
```bash
vercel --prod
```

### Environment Variables for Production

Set these in your deployment platform:

**Backend:**
- `JWT_SECRET` - Your secure JWT secret key
- `SPRING_DATASOURCE_URL` - Database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password

**Frontend (Vercel):**
- `REACT_APP_API_URL` - Backend API URL

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **CORS**: Already configured for localhost:3000 and localhost:3001
3. **Database Console**: Access H2 console at http://localhost:8080/h2-console
4. **API Testing**: Use Postman or curl to test API endpoints

## 🐛 Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed
- Check if port 8080 is available
- Verify `JAVA_HOME` environment variable is set

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Check if port 3000 is available

### Database issues
- For H2: Check H2 console at http://localhost:8080/h2-console
- Verify JDBC URL: `jdbc:h2:mem:skillswap`

### CORS errors
- Ensure backend CORS configuration includes your frontend URL
- Check `SecurityConfig.java` for CORS settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing library
- All contributors who help improve this project

## 📧 Contact

For questions or support, please open an issue on GitHub or contact:
- Email: your.email@example.com
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

**Made with ❤️ by the SkillSwap Team**
