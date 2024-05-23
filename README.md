# 3D Printer UBL Mesh Tool



## Description

The 3D Printer UBL Mesh Tool is a utility that helps you generate Unified Bed Leveling (UBL) mesh files for your 3D printer. UBL mesh files are used to compensate for unevenness in the print bed, resulting in more accurate prints.

## Features

- Generate UBL mesh files for your 3D printer
- Easy-to-use command-line interface
- Customizable mesh resolution and size
- Supports various 3D printer firmware

## Installation

1. Clone the repository:

  ```shell
  git clone https://github.com/alber70g/3d-printer-ubl-mesh-tool.git
  ```

2. Install the required dependencies:

  ```shell
  pip install -r requirements.txt
  ```

## Usage

1. Connect your 3D printer to your computer.

2. Run the tool with the desired options:

  ```shell
  python ubl_mesh_tool.py --resolution 0.2 --size 200x200
  ```

  This will generate a UBL mesh file with a resolution of 0.2mm and a size of 200x200mm.

3. Transfer the generated mesh file to your 3D printer and follow the instructions provided by your printer's firmware.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
