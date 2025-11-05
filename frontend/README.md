# Social Network Frontend

## Description
This repository contains the **user interface** for a social networking application, built as a Single Page Application (SPA). It interacts with the **Social Network Backend** via a REST API.

---

## Technologies Used
* **Angular** (Version 20.3.0+) for the core application framework.
* **TypeScript** for enhanced code quality and developer experience.
* **Tailwind CSS** (v4.1.13) for utility-first styling.
* **daisyUI** (v5.1.25) as a component library built on top of Tailwind CSS.
* **RxJS** for reactive programming and state management.

---

## Getting Started

### Installation

1.  **Go to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Available Scripts

Use the following scripts to run the application:

* **Development Server (Development API):** Runs the app with a proxy configured for the development backend environment (`proxy.dev.json`).
    ```bash
    npm run start:dev
    ```

* **Development Server (Production API):** Runs the app with a proxy configured for the production backend environment (`proxy.prod.json`).
    ```bash
    npm run start:prod
    ```


## License

[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
