# Internship Management Software for Universities

A comprehensive desktop application designed to streamline internship management and tracking for educational institutions. Built with Electron, React, and modern web technologies to provide an intuitive interface for managing intern records, tracking progress, and analyzing internship data.

## Features

-   **Dashboard Analytics**: Visualize internship data with interactive charts and statistics
-   **Record Management**: Add, update, and delete internship records effortlessly
-   **Advanced Search**: Search and filter internship records by multiple criteria
-   **Data Visualization**: Interactive maps, bar charts, and pie charts for data analysis
-   **Modal Dialogs**: User-friendly confirmation and error handling modals
-   **Responsive Design**: Tailwind CSS powered responsive UI

## Tech Stack

-   **Frontend**: React, JavaScript
-   **Desktop Framework**: Electron
-   **Styling**: Tailwind CSS
-   **Build Tool**: Webpack
-   **Database**: JavaScript-based database solution
-   **Routing**: Custom routing implementation

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── button/         # Button component with styling
│   ├── dashboard/      # Dashboard visualization components
│   ├── header/         # Header and navigation components
│   ├── inputField/     # Input field component
│   └── modal/          # Modal dialogs (Delete, Error)
├── pages/              # Application pages
│   ├── Home.jsx        # Home page
│   ├── Search.jsx      # Search functionality
│   ├── Table.jsx       # Records table view
│   ├── AddRecord.jsx   # Add new internship record
│   └── UpdateRecord.jsx # Update existing record
├── constants/          # Application constants
│   ├── cities.jsx      # City data
│   ├── industries.jsx  # Industry categories
│   └── intern-type.jsx # Internship types
├── database.js         # Database configuration
├── main.js             # Electron main process
├── renderer.js         # Electron renderer process
├── preload.js          # IPC preload script
└── router.js           # Client-side routing
```

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn package manager

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/ErenElagz/Internship-Managment-Software-for-Universities.git
    cd Internship-Managment-Software-for-Universities
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Build the application

    ```bash
    npm run build
    ```

4. Start the development server
    ```bash
    npm start
    ```

## Available Scripts

-   `npm start` - Start the application in development mode
-   `npm run build` - Build the project using Webpack
-   `npm run dev` - Run development server with hot reload

## Usage

1. **Home Page**: Start from the home page to access main features
2. **Add Record**: Click the add button to create a new internship record
3. **Search Records**: Use the search page to filter and find internships
4. **View Analytics**: Check the dashboard for visual insights
5. **Update/Delete**: Manage existing records with update and delete functions

## Dependencies

See `package.json` for the complete list of dependencies.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**ErenElagz**

## Support

For support, please open an issue on GitHub.

---

**Note**: This application is designed specifically for university internship management and can be customized based on institutional requirements.
