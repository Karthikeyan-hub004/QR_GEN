# QR Code Generator - MERN Stack Application

A modern, full-stack QR code generation application built with MongoDB, Express.js, React.js, and Node.js.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **QR Code Generation**: Create custom QR codes with various customization options
- **Multiple QR Types**: Support for text, URLs, emails, phone numbers, and WiFi
- **Customization Options**: Color, size, and error correction level settings
- **User Dashboard**: Manage and download generated QR codes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Download & Share**: High-quality PNG downloads with tracking

## 📁 Project Structure

```
c:\Users\karth\OneDrive\Desktop\qr\
├── README.md                          # Project documentation
├── package.json                       # Root package.json for workspace
│
├── backend/                           # Backend API (Node.js + Express)
│   ├── package.json                   # Backend dependencies
│   ├── server.js                      # Main server file
│   ├── .env                          # Environment variables
│   │
│   ├── models/                        # MongoDB models
│   │   ├── User.js                    # User schema
│   │   └── QRCode.js                  # QR code schema
│   │
│   ├── routes/                        # API routes
│   │   ├── auth.js                    # Authentication routes
│   │   └── qr.js                      # QR code routes
│   │
│   └── middleware/                    # Custom middleware
│       └── auth.js                    # JWT authentication middleware
│
└── frontend/                          # Frontend app (React.js)
    ├── package.json                   # Frontend dependencies
    ├── public/                        # Static files
    │   ├── index.html                 # Main HTML template
    │   └── manifest.json              # Web app manifest
    │
    └── src/                           # React source code
        ├── index.js                   # React entry point
        ├── index.css                  # Base styles
        ├── App.js                     # Main App component
        ├── App.css                    # Main styles (TrendyCart theme)
        │
        ├── contexts/                  # React contexts
        │   └── AuthContext.js         # Authentication context
        │
        ├── components/                # Reusable components
        │   ├── Header.js              # Navigation header
        │   └── ProtectedRoute.js      # Route protection
        │
        └── pages/                     # Page components
            ├── Home.js                # Landing page
            ├── Login.js               # Login page
            ├── Register.js            # Registration page
            ├── Generator.js           # QR code generator
            └── Dashboard.js           # User dashboard
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database (MongoDB Atlas)
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **qrcode** - QR code generation library
- **cors** - Cross-origin resource sharing
- **helmet** - Security middleware
- **express-rate-limit** - Rate limiting

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

## 🔧 Environment Configuration

### Backend Environment Variables (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secure_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone the repository
```bash
git clone <repository-url>
cd qr
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install-deps
```

### 3. Environment setup
```bash
# Copy and configure backend environment
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 4. Run the application
```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only
npm run client
```

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user

### QR Code Routes (`/api/qr`)
- `POST /generate` - Generate new QR code
- `GET /my-codes` - Get user's QR codes (paginated)
- `GET /:id` - Get specific QR code
- `DELETE /:id` - Delete QR code
- `POST /:id/download` - Track QR code download

## 🎨 Design Themes

The application supports multiple CSS themes:

1. **TrendyCart** (Current) - Modern e-commerce inspired design
2. **NeonSyntax** - Cyberpunk/coding theme with neon effects
3. **QuirkFrame** - Playful, colorful design with animations
4. **Classic** - Traditional, professional appearance

## 📱 Features in Detail

### QR Code Generation
- **Text QR Codes**: Plain text content
- **URL QR Codes**: Website links
- **Email QR Codes**: Email addresses
- **Phone QR Codes**: Phone numbers
- **WiFi QR Codes**: WiFi network credentials

### Customization Options
- **Colors**: Foreground and background colors
- **Size**: 100px to 1000px
- **Error Correction**: Low (L), Medium (M), Quartile (Q), High (H)

### User Management
- **Secure Authentication**: JWT-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **User Dashboard**: Personal QR code library
- **Download Tracking**: Monitor QR code usage

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Controlled cross-origin requests
- **Helmet Security**: Various HTTP security headers

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  createdAt: Date (default: now)
}
```

### QR Code Model
```javascript
{
  title: String (required)
  content: String (required)
  type: String (enum: text, url, email, phone, wifi)
  customization: {
    color: String
    backgroundColor: String
    size: Number
    errorCorrectionLevel: String
  }
  qrCodeData: String (base64 image)
  userId: ObjectId (ref: User)
  downloadCount: Number (default: 0)
  createdAt: Date (default: now)
  updatedAt: Date (default: now)
}
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Deploy to platforms like Heroku, Vercel, or DigitalOcean
3. Ensure MongoDB Atlas connection

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Configure API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MongoDB URI in `.env`
   - Ensure IP is whitelisted in MongoDB Atlas
   - Verify database credentials

2. **CORS Errors**
   - Check `CLIENT_URL` in backend `.env`
   - Ensure frontend is running on correct port

3. **Authentication Issues**
   - Verify JWT secret is set
   - Check token expiration
   - Clear browser localStorage

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the troubleshooting section

---

**Built with ❤️ using the MERN stack**
