# BatCore.eu v2 (Legacy Version)

This repository contains the old v2 version of the BatCore.eu website. It was built as a **Next.js** application and served as the main frontend for BatCore's **Minecraft** and **VPS hosting** services.

> ⚠️ This version is no longer maintained and is archived for educational purposes.

---

## 🧠 What It Did

BatCore.eu v2 provided users with:

- 🚀 VPS and Minecraft server hosting plans
- 📦 Product listing and pricing pages
- 📞 Contact and support pages
- 🌐 Multilingual UI (EN/SK/CZ in some cases)
---

## 🛠️ Tech Stack

- **Next.js** – for server-side rendering and frontend routing
- **React** – UI components and logic
- **Tailwind CSS** – styling and responsive layout
- **Simple API calls** – used for status/info fetching

---

## 📚 How It Worked

1. **Routing:**  
   Pages were created inside the `/app` folder — classic Next.js file-based routing.

2. **Dynamic Content:**  
   While there was no CMS, basic data like plan info and pricing were pulled from `.json` files or static configs.

3. **Hosting Offerings:**  
   - **Minecraft:** Showcased server options (RAM, player slots, location, etc.)
   - **VPS:** Focused on performance per price (Ryzen CPUs, NVMe, 1 Gbit)

4. **Deployment:**  
   The app was deployed on BatCore infrastructure using SSH-based deployment and NGINX as a reverse proxy.

---

## 🧪 Educational Notes

- No backend was included in this repo — it interacted with an external billing system.
- This project is a good example of a minimal, server-rendered hosting frontend.
- It used **simple design + direct routing** to create a snappy user experience.

---

## 📦 Status

This version is deprecated in favor of the end of BatCore.  
You can explore this for learning purposes or UI inspiration.

---

## 🧑‍💻 Author

Made with ❤️ by [Tomáš](https://tomasdavidik.sk)

