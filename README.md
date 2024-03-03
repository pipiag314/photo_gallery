# Photo Gallery App

This is a simple photo gallery app built with React and Vite.

## Live Deployment

Follow Link: https://foto-gallery-app.netlify.app/

## Getting Started

To get started with this project on your local machine, follow the steps below:

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1. Clone this repository to your local machine using:

```bash
git clone https://github.com/pipiag314/photo_gallery.git
```
2. Navigate to the project directory:

```bash
cd photo_gallery
```

3. Install dependencies:
```bash
npm install 
# or
yarn install
```

4. Register on Unsplash, Create new application and get access key:

Follow this link: [Unsplash][unsplash-website]

[unsplash-website]: https://unsplash.com/


5. Create .env file: 

```.env
VITE_UNSPLASH_API_BASE_URL = https://api.unsplash.com
VITE_UNSPLASH_ACCESS_KEY = YOUR_ACCESS_KEY
```

### Running the App

Once you've installed all the dependencies, you can run the app using:

```bash
npm run dev
# or
yarn dev
```

This command starts the development server and opens the app in your default web browser. If it does not open automatically you can open it with typing 'o' character, or manually open it with 'http://localhost:5173/':

```bash
  VITE v5.1.4  ready in 913 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

# when it's ready type 'o' and enter
o
```


### Building for Production

To build the app for production, you can run:

```bash
npm run build
# or
yarn build
```

This command generates a production-ready build of your app in the 'dist' directory.


## Features

- SPA
- Display a grid of popular photos
- Clicking on a photo opens modal with statistic's
- Caching recieved requests
- Pagination, Infinit Scroll
- Search photos based on user inputs
- Responsive Design

## Technology Used

- react
- vite
- react-router-dom (for Routing)
- axios