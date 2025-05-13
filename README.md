# 📱 Final Project: Dynamic Web Application using Next.js and Tailwind CSS

## 📄 Project Description

In this project, we develop a full-featured, responsive web application using Next.js and Tailwind CSS, demonstrating proficiency in frontend technologies and integrating third-party APIs. In this project, we implement user authentication, data visualization, data fetching from APIs, and deploy the final application to Vercel.

---

## 🛠️ Setup and Installation

### 1. 🧩 Install Required Tools

- 🖥 **Visual Studio Code**: [Download VS Code](https://code.visualstudio.com/download)  
- 🟩 **Node.js (LTS version)**: [Download Node.js](https://nodejs.org/en/download)

### 2. ⚙️ Create a Next.js Project

```bash
npx create-next-app@latest final-project --typescript --eslint --app
cd final-project
```

### 3. 🎨 Install Tailwind CSS with Next.js

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

### 4. ⚙️ Configure PostCSS

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### 5. 💅 Import Tailwind in `globals.css`

```css
@import "tailwindcss";
```
### 6. 🌟 Set Up ShadCN UI
```bash
npx shadcn-ui@latest init
```

Install a sample component to test
```
npx shadcn-ui@latest add button
```

### 7. 📦 Install Additional Dependencies

```bash
npm install framer-motion @tanstack/react-query apexcharts react-apexcharts react-hook-form zod @hookform/resolvers class-variance-authority tailwind-variants lucide-react
```

```bash
npx shadcn-ui@latest add card button
```

### 8. 🚀 Run Development Server

```bash
npm run dev
```

Access the app at: [http://localhost:3000](http://localhost:3000)

---

## 👥 Team Member Contributions

### 👨‍💼 Armenta — Project Leader
- Led the project development, coordinated team tasks, and handled feature integration.

### 💻 Endaya — Frontend Developer
- Built responsive UI/UX components using Tailwind CSS and integrated API data.

### 🛠 Gaupo — Backend Developer
- Worked on data fetching, authentication logic, and API interaction.

### 🎨 Gubat — UI/UX Designer
- Designed user interfaces and created the visual style of the application.

---

## 🔗 Project Links

- 📂 GitHub Repository: [https://github.com/RemRmenta/G8-finalproject](https://github.com/RemRmenta/G8-finalproject)
- 🌐 Deployed Application: [https://g8-finalproject-q3fy.vercel.app]

