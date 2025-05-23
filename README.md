# PhotoFlow 🖼️ - Instagram Clone with Dynamic Data

PhotoFlow is a frontend Instagram clone that replicates Instagram's frontend design for most features available as of the project's creation date. It also uses Faker.js to generate dynamic data.

## Features ✨

- **Dynamic Fake Data 🎭:** Enjoy ever-changing posts and users powered by Faker.js.
- **Home 🏠:** Engage with posts and comments.
- **Create 📸:** Craft and personalize images.
- **Stories 📺:** Watch and comment on stories.
- **Reels 🎞️:** View and comment on videos.
- **Messages 📤:** Send and receive messages.
- **Notifications 🔔:** Stay informed about followers and activity.
- **Search 🔎:** Discover and find other users.
- **Explore 👀:** Uncover user-uploaded content.
- **Emojis 😳:** Express yourself with emojis using the Emoji modal!
- **Responsivity 💙:** Experience an Instagram-like design on various devices.

## Preview 📺
### Login
![Login](./src/assets/images/Demo/demo-login.png)

### Home
![Home](./src/assets/images/Demo/demo-home.png)

### Comment
![Comment](/src/assets/images/Demo/demo-comment.png)

### Create Modal
![Create Modal](/src/assets/images/Demo/demo-create.png)

### Profile
![Profile](/src/assets/images/Demo/demo-profile.png)

### Reels
![Reels](/src/assets/images/Demo/demo-reels.png)

### Messages
![Messages 1](/src/assets/images/Demo/demo-messages-1.png)
![Messages 2](/src/assets/images/Demo/demo-messages-2.png)

### Notification
![Notification](/src/assets/images/Demo/demo-notification.png)

### Explore
![Explore View](/src/assets/images/Demo/demo-explore.png)

### Mobile
![Mobile View](/src/assets/images/Demo/demo-mobile.png)

### Stories
![Stories View](/src/assets/images/Demo/demo-stories.png)

### Dynamic Images 
![Login](/src/assets/images/Demo/demo-login.gif)


## Run Locally

To run this project locally, follow these steps:

Clone the project:

```bash
  git clone https://github.com/Dev-R/PhotoFlow.git
```

Go to the project directory

```bash
  cd PhotoFlow
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```

### Using Docker

You can run PhotoFlow using Docker in either development or production mode:

#### Development Mode

Build the development Docker image:

```bash
  docker build -f Dockerfile.development -t photoflow:dev .
```

Run the development container:

```bash
  docker run -p 5173:5173 photoflow:dev
```

This will start the development server with hot-reload enabled.

#### Production Mode

Build the production Docker image:

```bash
  docker build -f Dockerfile.production -t photoflow:prod .
```

Run the production container:

```bash
  docker run -p 5173:5173 photoflow:prod
```

This will serve the optimized production build using the serve package.

You can access the application at `http://localhost:5173` in both modes.

## Personalize Data Generation 🧬
Since this project uses Faker.js, you have control over the number of posts, stories, and comments rendered. To customize this data, navigate to the SampleGenerator class:

``` bash
cd src\data
```
``` bash
code fakerGenerator.ts
```
## Dynamic Data Disclaimer ⚠️
The data generated is intentionally inconsistent and ever-changing using Faker.js. Each refresh may provide new usernames and content. As such, this project serves more as a template and design showcase.

### Acknowledgements

- Frontend framework used - [Vue + Vite](https://vuejs.org/)
- Fake API Data/ Data generation used - [Faker.js](https://github.com/faker-js/faker)
- CSS framework used - [Tailwind](https://tailwindcss.com/)
- Story Carousel - [Swiper](https://github.com/nolimits4web/swiper)
- Emojis - [vue3-emoji-picker](https://github.com/delowardev/vue3-emoji-picker)
- Deployed at [Vercel](https://vercel.com/)
