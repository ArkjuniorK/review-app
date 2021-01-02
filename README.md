# Simple Review App - Front End

Single Page Application with **Vue 3 Composition API**

Used plugins `moment`, `tailwindcss`, `axios`, `gh-pages`

> Using Composition API.

> It's actually pretty good
> And challenging at the same time

## Project Structure

```sh
+-- public
|   +-- favicon.ico
|   +--index.html
+-- src
|   +-- assets
|   +-- components
|       +- Card.vue
|       +- Form.vue
|       +- Rating.vue
|   +-- services
|       +- index.js
|   +-- store
|       +- index.js
|   +-- App.vue
|   +-- main.js
+-- package.json
+-- README.md
+-- tailwind.config.js

```

## Project Explanation

Project backend at https://review-backend.herokuapp.com/api/v1 with couple of endpoint that could be used to access the data.

It use single store at `/store/index.js` with Vue 3 tools like `provide` and `inject` so all components could access the data without passing props down and change the data without using emits.

## Pros

- Turn image stored to `base64` data so it could be rendered much faster
- `POST` and `PATCH` methods in single form

## Cons

- The form not accept JSON at the body to store data at backend
- Updating a review with images would cause the image to dissappear/not stored at the database
