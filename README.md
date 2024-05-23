# 3D Printer UBL Mesh Tool

## Overview

This React application facilitates the visualization and modification of 3D
printer Unified Bed Leveling (UBL) meshes. Users can dynamically adjust mesh
points, view updates in real-time, and generate G-Code based on the
modifications.

## Play with it

[https://alber70g.github.io/3d-printer-ubl-mesh-tool](https://alber70g.github.io/3d-printer-ubl-mesh-tool)

## Features

- Load and visualize 3D printer bed meshes using the output from `M420 V`
  command.
- Interactive modification of mesh points with immediate visual feedback.
- Options to add or remove rows and columns from the mesh.
- Adjustable fade value for the intensity of the color gradient in the
  visualization.
- Real-time generation of the G-Code for the updated mesh.

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Getting Started

1. Clone the repository:

   ```bash
   git clone git@github.com:alber70g/3d-printer-ubl-mesh-tool.git
   ```

2. Navigate to the project directory:
   ```bash
   cd 3d-printer-ubl-mesh-tool
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Usage

Start the development server:

```bash
npm start
```

This will launch the application on `http://localhost:3000`.

## How to Use

1. Paste the mesh output from your 3D printer in the designated text area and
   click 'Load'.
2. Click on any cell in the first grid to modify its value. The second grid will
   automatically update to reflect changes.
3. Adjust the fade value using the dropdown menu to change the effect the
   buttons have intensity.
4. Use the controls below each grid to modify the mesh by clicking the various +
   and - buttons.
5. View the G-Code output to modify the new mesh in the G-Code section.

## Contributing

Contributions are welcome! For major changes, please open an issue first to
discuss what you would like to change.
