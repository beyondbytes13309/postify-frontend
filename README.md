# Postify Frontend

A modular React frontend for the Postify social platform.  
Handles authentication, posts, comments, reactions, and user profiles with a clean UI and robust state management.

---

## Features

- **🔒 Authentication:**  
  Sign up, log in, and log out with local, Google, or GitHub accounts.

- **🔑 Authorization:**
  Role and owner-based access control for users (e.g., regular user, admin, moderator).

- **📝 Posts:**  
  Create, view, and interact with posts.

- **💬 Comments:**  
  Add, view, and delete comments on posts.

- **😮 Reactions:**  
  Like or react to posts and comments.

- **👥 User Profiles:**  
  View and edit your profile.

- **🖥️ Responsive UI:**  
  Built with modular components and CSS modules for maintainable styling.

---

## 🧰Tech Stack

- ⚛️[React](https://react.dev/)
- ⚡[Vite](https://vitejs.dev/)
- 🔀[React Router](https://reactrouter.com/)
- 🔗[Custom Hooks & Context API](https://react.dev/reference/react/useContext)

---

## ⚙️Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 📥 Installation

```bash
git clone https://github.com/beyondbytes13309/postify-frontend.git
cd postify-frontend
npm install
```

### ▶️ Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 📂Project Structure

```
src/
  assets/           # Images and icons
  components/       # Modular React components
    auth/
    comment/
    common/
    post/
    reaction/
    user/
  contexts/         # React Context providers (e.g., AuthContext)
  hooks/            # Custom React hooks (e.g., useSafeFetch)
  pages/            # Route-level components
  utils/            # Utility functions
  configs/          # Configuration files (e.g., permissions)
  App.jsx           # Main app component
  main.jsx          # Entry point
```

---

## 🌐API Integration

All API endpoints are defined in [`apiRoutes.js`](./apiRoutes.js).  
Network requests are handled via the custom [`useSafeFetch`](./src/hooks/useSafeFetch.jsx) hook for safe, consistent data fetching.

The backend can be found at [postify-backend](https://github.com/beyondbytes13309/postify-backend)

---

## 🤝Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 🎉Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [FontAwesome](https://fontawesome.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Happy Posting!**