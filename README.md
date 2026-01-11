# Aora

A video sharing mobile application built with React Native, Expo, and NativeWind.

## 📱 Features

-   **Authentication**: Secure Sign Up and Sign In screens integrated with Appwrite.
-   **Home Feed**: Browse the latest videos with a seamless scrolling experience.
-   **Trending**: Discover popular and viral videos in a dedicated trending section.
-   **Search**: Find videos easily with real-time search functionality.
-   **Create Content**: Upload and share your own videos.
-   **Profile**: Manage your account and view your shared videos.
-   **Modern UI**: Styled efficiently using NativeWind (Tailwind CSS for React Native).

## 🛠 Tech Stack

-   **Frontend**: React Native, Expo SDK
-   **Navigation**: Expo Router (File-based routing)
-   **Styling**: NativeWind
-   **Backend**: Appwrite (Database, Auth, Storage)

## 📂 Project Structure

The project is structured within the `aora` directory:

-   `app/`: Contains the main screens and navigation layout (Auth, Tabs, Search).
-   `components/`: Reusable UI components like `VideoCard`, `Trending`, `FormField`, etc.
-   `context/`: distinct React Context providers (e.g., `GlobalProvider`) for state management.
-   `lib/`: Configuration styles and backend integration helper functions.
-   `assets/`: Images, icons, and fonts used in the application.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [Expo Go](https://expo.dev/client) on your physical device or an Emulator.

### Installation

1.  Navigate to the project directory:

    ```bash
    cd aora
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npx expo start
    ```

4.  Scan the QR code with **Expo Go** to view the app on your device.
