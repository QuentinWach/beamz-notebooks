# Example Notebooks for [BEAMZ](https://github.com/quentinwach/beamz)

This repository uses [uv](https://github.com/astral-sh/uv) for fast and reliable dependency management. Get started by cloning the repository, setting up the environment, then just open one of the [Juypter notebooks]():

```bash
git clone https://github.com/QuentinWach/beamz-notebooks
cd beamz-notebooks
uv sync
```
then activate the environment with
```bash
source .venv/bin/activate
```
(or on Windows: `.venv\Scripts\activate`)

## Notebooks

| Name & Link | Image | Notes | Author |
|------|-------|-------|--------|
| [Topology Optimized 90° Bend](./topo_opt_bend.ipynb) | ![Topology Optimized 90° Bend](./imgs/topo_opt_bend_final.png) | Demonstrates topology optimization of a 90° waveguide bend using auto-differentiation in a 2D FDTD simulation | [Quentin Wach](https://github.com/QuentinWach) |
| [Animation Demo](./animation_demo.ipynb) | - | Live preview of the $E_z$ field in a 2D ring resonator simulation. | [Quentin Wach](https://github.com/QuentinWach) |

