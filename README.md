# 🏙️ SpotlessCity – Smart City Cleanliness Management Platform

**Live Site:** 🌐 [SpotlessCity on Netlify](https://cheery-alfajores-e69632.netlify.app/)  
**Backend API:** ⚙️ [SpotlessCity Server (Vercel)](https://city-server-sigma.vercel.app/)

---

## 🚀 About The Project

**SpotlessCity** is a modern web platform that connects citizens and local authorities to keep the city clean and well-maintained.  
Users can report city issues (garbage, road, water, public space, etc.), view ongoing cleanup drives, and contribute financially to make the city spotless.

---

## ✨ Key Features

- 🗑️ **Report Issues** – Citizens can easily report city cleanliness or infrastructure issues with images and descriptions.  
- 📊 **View All Issues** – Browse all ongoing and resolved issues with filtering by category and status.  
- 💸 **Contribute** – Make online contributions to cleanup campaigns and download detailed PDF receipts.  
- 🔐 **Authentication** – Secure login and user session handling using context API.  
- 📱 **Responsive UI** – Optimized for both desktop and mobile views.  
- 📃 **PDF Download** – Generates downloadable contribution reports using jsPDF.  
- 🔔 **Real-time Toast Notifications** – User feedback with react-hot-toast.

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js, Tailwind CSS, DaisyUI |
| **Backend** | Node.js, Express.js, MongoDB |
| **Authentication** | Context API |
| **PDF Generation** | jsPDF |
| **HTTP Client** | Axios |
| **Notifications** | react-hot-toast |
| **Deployment** | Netlify (client) + Vercel (server) |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pritom-dey1/SpotlessCity-clint.git
cd SpotlessCity-clint
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Development Server
```bash
npm run dev
```

👉 The app will run at: [http://localhost:5173](http://localhost:5173)

---

## 📸 Preview

Add your screenshots here if you want. Example:

```md
![SpotlessCity Homepage](https://i.ibb.co/xyz12345/homepage.png)
```

---

## 🔗 API Endpoints Example

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/issues` | Get all city issues |
| GET | `/api/contributions/user/:email` | Get all user contributions |
| POST | `/api/issues` | Report a new issue |
| POST | `/api/contributions` | Add a contribution |

---

## 💡 Folder Structure

```
SpotlessCity-clint/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧑‍💻 Developer

**👤 Pritom Dey**  
📍 Bangladesh | CST, Sweden Polytechnic Institute  
💼 Fullstack Web Developer (React, Django, C++, Python)  
📧 Email: `pritom1.2.zx@gmail.com`  
🌐 [Live Project Link](https://cheery-alfajores-e69632.netlify.app/)

---

⭐ If you like this project, don’t forget to **star the repository** on GitHub!
