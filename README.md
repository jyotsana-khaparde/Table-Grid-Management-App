# Table Grid Management App

This project is a table grid management application built using React, where users can drag tables into a grid area and connect columns between tables. The app utilizes drag-and-drop functionality for both tables and columns, allowing dynamic grid management. Additionally, users can remove tables from the grid, and all associated connection lines will be removed automatically.

## Features

- Drag-and-Drop Tables: Users can drag tables from a left panel and drop them into the grid area.
- Column Dragging: Columns can be dragged between tables to establish relationships.
- Dynamic Connection Lines: Connection lines are displayed between tables to indicate column relationships.
- Table Removal: Users can remove tables from the grid, and all associated connection lines will be removed as well.
- Resizable and Draggable Tables: Tables can be resized and repositioned within the grid area.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React DnD: A drag-and-drop library for React that provides the drag-and-drop functionality for tables and columns.
- React RND (Resizable and Draggable): A library for making elements resizable and draggable, used for the tables.
- SVG: Used to draw connection lines between tables, adjusted dynamically as tables are repositioned.

## Why These Technologies?

- React: Provides a component-based architecture and makes it easier to manage state and UI efficiently.
- React DnD: A robust drag-and-drop solution designed for React applications, perfect for our use case where we need to drag and drop tables and columns.
- React RND: Offers simple and flexible resizing and dragging of elements within the React ecosystem.
- SVG: Ideal for drawing and manipulating dynamic, scalable connection lines between tables.

## Setup Instructions

Follow these steps to get the app running locally:

1. Clone the Repository

### `git clone https://github.com/your-username/table-grid-management-app.git`

### `cd table-grid-management-app`

2. Install Dependencies

### `npm install`

3. Run the Application
   After installing the dependencies, you can start the development server:

### `npm start`

The app will be running on http://localhost:3000.
