# Example Notebooks for [BEAMZ](https://github.com/quentinwach/beamz)

## Setup

This repository uses [uv](https://github.com/astral-sh/uv) for dependency management. To get started:

1. Install dependencies and create a virtual environment:
   ```bash
   uv sync
   ```

2. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```

3. Launch Jupyter:
   ```bash
   jupyter notebook
   # or
   jupyter lab
   ```

## Notebooks

| Name & Link | Image | Notes | Author |
|------|-------|-------|--------|
| [Topology Optimized 90° Bend](./topo_opt_bend.ipynb) | ![Topology Optimized 90° Bend](./imgs/topo_opt_bend_final.png) | Demonstrates topology optimization of a 90° waveguide bend using auto-differentiation in a 2D FDTD simulation | [Quentin Wach](https://github.com/QuentinWach) |
