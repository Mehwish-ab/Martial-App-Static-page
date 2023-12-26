# Martial School App

Welcome to the Martial School App! This app is built using React, TypeScript, ESLint, Prettier, and Yarn.

## Getting Started

Follow these steps to set up the project:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/your-username/martial-school-app.git
   ```
2. Navigate to the project folder:
    ```bash
    cd martial-school-app
   ```
3. Install dependencies using Yarn:
    ```bash
    yarn install
   ```

### Start the App

To start the app locally, run:
```bash
    yarn start
```

This will launch the app on http://localhost:3000.

### Project Structure
* src/: Contains the source code.
* public/: Contains public assets.

### Additional Notes
* If you encounter package conflicts, it's recommended to use Yarn for dependency management.


## VSCode Settings

** Please install eslint and Prettier ESLint Extension **

To maintain a consistent coding style, use the provided VSCode settings:

1. Open the project in Visual Studio Code.
2. Inside the .vscode folder, create a settings.json file with the following content:
    ```json
        {
            "editor.defaultFormatter": "dbaeumer.vscode-eslint",
            "editor.formatOnSave": true,
            "eslint.alwaysShowStatus": true,
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": "explicit"
            },
            "[typescriptreact]": {
                "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
            },
            "[jsonc]": {
                "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
            },
            "[json]": {
                "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
            },
            "[css]": {
                "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
            }
        }
    ```
3. Save the file.

Now, your VSCode environment is configured to maintain code consistency using ESLint and Prettier.

### Scripts
```shell
    yarn start # Starts the development server.
    yarn build # Builds the production-ready app.
    yarn test # Runs tests.
    yarn lint # Lints the code using ESLint.
    yarn lint:fix # Fix linting issues using ESLint.
    yarn format # format the code using prettier ESLint.
```
Happy coding!