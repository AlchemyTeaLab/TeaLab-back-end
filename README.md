![Logo](https://res.cloudinary.com/tealab/image/upload/v1654017908/vector_assets/full_tea_set.png)

# TeaLab

TeaLab is a whimsical full-stack browser-based application built using ReactJS, Cloudinary, CSS, PostgreSQL and Express. Users are able to create and collect teas, that makes learning about tea fun! Users will be able to save, edit and delete their tea recipes on a recipe profile page.

- [Deploy Site](https://tea-lab.netlify.app/)
- [Miro Board](https://miro.com/app/board/uXjVOy8UhI0=/?share_link_id=623813889366)

## Dependencies

- [Cloudinary](https://cloudinary.com/)
- [reactour](https://github.com/elrumordelaluz/reactour)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-modal](https://github.com/reactjs/react-modal)
- [Alchemy Code Lab Bootstrap Template](https://npm.io/package/@alchemycodelab/create-app)

## Team Members

| **Contributing Team Members** | **Github**                                        | **LinkedIn**                                                  |
| ----------------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| Sam Melius Oxford             | [Github](https://github.com/Sam-Melius)           | [LinkedIn](https://www.linkedin.com/in/sam-melius-oxford/)    |
| Clare McDonald                | [Github](https://github.com/ClareMcDonald)        | [LinkedIn](https://www.linkedin.com/in/clare-s-mcdonald/)     |
| Ari Harlem-Caballero          | [Github](https://github.com/ari-harlem-caballero) | [LinkedIn](https://www.linkedin.com/in/ari-harlem-caballero/) |
| Alice Hsing                   | [Github](https://github.com/alicehsing)           | [LinkedIn](https://www.linkedin.com/in/alice-hsing-94603315/) |
| Ryan Flitcroft                | [Github](https://github.com/ryanflitcroft)        | [LinkedIn](https://www.linkedin.com/in/ryanflitcroft/)        |

## Backend API

This app runs on a PostgreSQL database using Node.js/Express.

- [Main Deployment](https://tealab.herokuapp.com)
- [Staging Deployment](https://staged-tealab.herokuapp.com)

### Routes

#### User Routes

- `POST /api/v1/users/`
- `POST /api/v1/users/session`
- `GET /api/v1/users/me`
- `DELETE /api/v1/users/session`

#### Ingredient Routes

- `POST /api/v1/ingredients`
- `GET /api/v1/ingredients`
- `GET /api/v1/ingredients/:id`
- `PATCH /api/v1/ingredients/:id`
- `DELETE /api/v1/ingredients/:id`

#### Recipe Routes

- `GET /api/v1/recipes`
- `GET /api/v1/recipes/count`
- `GET /api/v1/recipes/:id`
- `GET /api/v1/recipes/users/:id`
- `POST /api/v1/recipes`
- `PATCH /api/v1/recipes/:id`
- `DELETE /api/v1/recipes/:id`
