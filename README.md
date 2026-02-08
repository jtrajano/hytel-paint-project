# Hytel Paint Project - Phase 1

A simple, web-based paint application built with HTML5, CSS3, and vanilla JavaScript.

## Features

- **Drawing Canvas**: 800x600 pixel canvas for creating artwork
- **Color Picker**: Choose any color for drawing
- **Adjustable Brush Size**: Brush size ranging from 1 to 50 pixels
- **Tools**:
  - Brush: Draw with selected color
  - Eraser: Remove parts of your drawing
  - Undo & Redo
- **Clear Canvas**: Reset the canvas to start fresh
- **Touch Support**: Works on mobile devices and tablets

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jtrajano/hytel-paint-project.git
   cd hytel-paint-project
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or simply double-click the `index.html` file.

## Usage

1. **Select a Color**: Click on the color picker to choose your drawing color
2. **Adjust Brush Size**: Use the slider to set your desired brush size
3. **Erase**: Click "Eraser" button to erase mistakes
4. **Draw**: Click and drag on the canvas to draw
5. **Clear**: Click "Clear Canvas" to start over
6. **Undo** and **Redo**: Undo and redo button will let user undo and redo history
7. **Clear**: user can clear the canvas

## Project Structure

```
hytel-paint-project/
├── index.html              # Main HTML file
├── sketch.js               # Javascript 
├── test.js                 # Test components
└── test-framework.js       # Test runner
```

## Technologies Used

- p5.js
- CSS3 (with gradients and flexbox)
- Vanilla JavaScript (ES6+)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements (Phase 2+)

- Additional drawing tools (shapes, lines, text)
- Undo/Redo functionality
- Save and load drawings
- More color palette options
- Background patterns and textures

## License

This project is open source and available for educational purposes.

## Author

Jeffrey Trajano
