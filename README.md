# Cookin' Up 🍲

Welcome to **Cookin' Up** — a web application that recreates the fun of the popular Polish TV show, "Ugotowani." This platform enables you and your friends to create a "Cookin' Up" lobby, where you can:

- Invite friends to join the fun.
- Specify ingredients or foods you dislike.
- Schedule meetups to cook and dine together.
- Upload photos of prepared dishes and rate each other’s creations.
- View a summary of the lobby when everyone has submitted their ratings.

### Live Demo
You can access the demo of this application here: [cookinup.lkrawczyk.pl](https://cookinup.lkrawczyk.pl).

### Technical Overview

#### Tech Stack

- **Client**: The frontend is built using React with Vite, and utilizes Node.js (v20.x) and npm (v10.x).
- **Server**: A .NET 8.0 Web API powers the backend, ensuring efficient and robust API interactions.
- **Cloud Storage**: Azure Blob Storage is integrated for managing user-uploaded images of dishes.
- **Secret Management**: Azure Secrets provides secure storage for sensitive information, enhancing security.

### Getting Started

#### Prerequisites

1. **Node.js** v20.X (use `node -v` to check; for managing multiple versions, use `nvm info`).
2. **npm** v10.X.
3. **Visual Studio Code** for development.
4. **Yarn** for dependency management.

#### Installation Steps

1. **Clone** the repository.
2. Open the project in **Visual Studio Code**.
3. **Install Extensions**: Use the recommended extensions from the `settings.json` file.

#### Installing Yarn

If Yarn is not installed, install it globally via:
```bash
npm i -g yarn
```

Then, navigate to the root project directory and install all dependencies:
```bash
yarn install
```

#### Running the Client

To start the client, use:
```bash
yarn run dev
```
Access the client at [http://localhost:5173](http://localhost:5173).

#### Linter Configuration

To set up and configure ESLint:
1. Press \`Ctrl+Shift+P\` in Visual Studio Code and select "Restart ESLint server."
2. To check for errors, go to \`Output -> ESLint\` (under \`Ctrl+J\`).
3. **Formatting**: Right-click in any \`.js\` file, select \`Format Document With -> Configure Default Formatter\`, and choose ESLint.
4. **Editor Settings**:
   - **Tab Size**: 2
   - **Line Ending**: LF (Select End Of Line Sequence to LF)
