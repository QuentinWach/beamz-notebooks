# BEAMZ Notebooks

Interactive example notebooks for the [BEAMZ](https://github.com/quentinwach/beamz) photonic simulation package.

BEAMZ is a GPU-accelerated 2D/3D FDTD simulator for photonic design, built on JAX with full auto-differentiation support for inverse design and topology optimization.

---

## Examples

### [Topology Optimization - 90° Bend](examples/topo_opt_bend.ipynb)

![Topology Optimized 90° Bend](imgs/topo_opt_bend_final.png)

Demonstrates topology optimization of a 90° waveguide bend using auto-differentiation in a 2D FDTD simulation. Shows the full workflow from setting up the simulation domain to running gradient-based optimization.

### [Ring Resonator Animation](examples/animation_demo.ipynb)

Live preview of the $E_z$ field in a 2D ring resonator simulation. Demonstrates how to create real-time animations of electromagnetic field propagation using BEAMZ.

---

## Quick Start

```bash
git clone https://github.com/QuentinWach/beamz-notebooks
cd beamz-notebooks
uv sync
source .venv/bin/activate
jupyter lab
```

See the [Getting Started](getting-started.md) guide for detailed setup instructions.
