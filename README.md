<div align="center">

# 🍕 Forno Folle

### Your Pizza. Your Rules.

An interactive pizza builder where you drag and drop ingredients onto a real pizza, and watch your order ticket update live.

[**▶ Live Demo**](https://pizzareia.vercel.app) 

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

![Forno Folle pizza builder](docs/screenshot.png)

</div>

---

## About

**Forno Folle** is a fictional premium pizzeria website. Instead of a boring order form, customers build their pizza like a cooking game: pick a size and crust, drag ingredients onto the dough, and see the price change in real time on a restaurant-style ticket.

The project is a front-end portfolio piece, with a structure ready to plug into a real backend and payment provider later.

## Features

- 🖱️ **Drag and drop** ingredients onto the pizza (powered by dnd-kit), or **tap to add** on mobile
- 🍅 **23 ingredients** in 5 categories: sauces, cheeses, meats, vegetables, extras
- 🎨 Ingredients drawn as **custom SVG illustrations**, no emoji
- 📐 Toppings are **spread evenly and naturally** across the pizza
- 📏 4 sizes and 4 crust types, each one affecting the price
- 🧾 **Live receipt**: quantity controls, remove buttons, animated total
- ↩️ Undo, reset, and rename your creation
- 💾 Your pizza is **saved in the browser** (localStorage), so a refresh never loses it
- ✨ Smooth animations with Framer Motion

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Drag and drop | dnd-kit |
| State management | Zustand (with persistence) |
| Routing | React Router |
| Hosting | Vercel |

## Getting started

You need [Node.js](https://nodejs.org) 20 or higher.

```bash
# 1. Clone the repository
git clone https://github.com/nour-kahlaoui/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open <http://localhost:5173>.

### Other scripts

```bash
npm run build     # production build in /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── components/
│   ├── Pizza.tsx      # Drop zone and pizza rendering
│   ├── Receipt.tsx    # Live order ticket
│   └── Topping.tsx    # SVG ingredient illustrations
├── pages/
│   └── Builder.tsx    # 3-column pizza builder page
├── data.ts            # Ingredients, sizes, crusts, prices
├── store.ts           # Pizza state, pricing logic, undo (Zustand)
├── App.tsx            # Routes and navigation
└── main.tsx
```

## How pricing works

```
Total = size base price + crust supplement + Σ (ingredient price × quantity) + delivery fee
```

All prices live in `src/data.ts`, so changing the menu only means editing one file.

## Roadmap

- [x] Interactive pizza builder (drag and drop, live receipt, undo, persistence)
- [ ] Full homepage (hero, how it works, popular creations, ingredients)
- [ ] Menu page with signature pizzas and "Customize this pizza"
- [ ] Global cart
- [ ] Checkout with form validation and order confirmation
- [ ] Our Story and Contact pages
- [ ] Real backend and payment integration

## Author

**Nour Kahlaoui**: [GitHub](https://github.com/nour-kahlaoui)

---

<div align="center">Made with 🍅 and a lot of cheese.</div>
