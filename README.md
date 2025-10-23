# Mini ERP System

A modern Enterprise Resource Planning (ERP) system built with React, TypeScript, and Vite, featuring HR and Inventory management modules.

## Features

### HR Module
- Employee Management
- Add, Edit, and Delete employees
- Track employee information including:
  - Name, Position, Department
  - Contact details (Email, Phone)
  - Salary and Join Date
- Clean data table with employee records

### Inventory Module
- Product/Inventory Management
- Add, Edit, and Delete products
- Track inventory information including:
  - Product Name, SKU, Category
  - Quantity and Price
  - Supplier information
  - Last Updated date
- Stock status indicators (In Stock, Low Stock, Out of Stock)
- Color-coded status badges

## Design

- **White Theme**: Clean, professional white background with subtle grays
- **Sharp Corners**: All UI elements use sharp corners (0px border-radius) for a modern, crisp appearance
- **Responsive Layout**: Adapts to different screen sizes
- **Accessible**: Proper semantic HTML and keyboard navigation support

## Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript** - Type safety
- **Vite 7.1.12** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with CSS custom properties

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lati-tibabu/mini-erp.git
cd mini-erp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
mini-erp/
├── src/
│   ├── modules/
│   │   ├── HR/
│   │   │   ├── HRModule.tsx       # HR management component
│   │   │   └── HRModule.css       # HR module styles
│   │   └── Inventory/
│   │       ├── InventoryModule.tsx # Inventory management component
│   │       └── InventoryModule.css # Inventory module styles
│   ├── App.tsx                     # Main app component with routing
│   ├── App.css                     # App-level styles
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles and theme
├── public/                         # Static assets
├── index.html                      # HTML template
└── package.json                    # Dependencies and scripts
```

## License

MIT
