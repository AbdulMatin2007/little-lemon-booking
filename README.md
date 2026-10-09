# Little Lemon — Table Booking App

A responsive React capstone project for a restaurant table-booking experience. It includes an accessible booking form, client-side validation, confirmation state, and unit tests.

## Features

- Responsive layout for desktop and mobile
- Semantic HTML and accessible form labels
- Date, time, guest count, occasion, and optional special requests
- Client-side validation with clear error messages
- Confirmation message after a valid submission
- Unit tests for validation, available times, and the booking form
- Reduced-motion support and visible keyboard focus styles

## Requirements

- Node.js 18 or newer
- npm

## Run locally

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Run tests

Run tests in watch mode:

```bash
npm test
```

Run once:

```bash
npm run test:run
```

## Create a production build

```bash
npm run build
```

The production files are created in the `dist` folder.

## GitHub submission

Create a new repository on GitHub, then run these commands in this folder (replace the URL with your own repository URL):

```bash
git init
git add .
git commit -m "Complete Little Lemon booking app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If Git is already connected to the correct repository, do not run `git remote add origin` again. Use `git remote -v` to check the existing remote.

## Important project note

This is a front-end demonstration. A successful booking currently displays a local confirmation; it does not contact a restaurant or save a reservation to a server. The available time list is sample data and should be connected to a real booking API in a production app.
