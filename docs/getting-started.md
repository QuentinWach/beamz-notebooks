# Getting Started

## Prerequisites

- Python 3.13+
- A JAX-compatible GPU is recommended for faster simulations but not required

## Installation

### Using uv (recommended)

```bash
git clone https://github.com/QuentinWach/beamz-notebooks
cd beamz-notebooks
uv sync
source .venv/bin/activate
```

### Using pip

```bash
git clone https://github.com/QuentinWach/beamz-notebooks
cd beamz-notebooks
pip install -e .
```

## Running the Notebooks

Start Jupyter Lab:

```bash
jupyter lab
```

Then open any of the `.ipynb` files from the file browser.

## Basic Usage

Here's a minimal example of setting up a BEAMZ simulation:

```python
import beamz as bz
import jax.numpy as jnp

# Create a simulation
sim = bz.fdtd(
    shape=(200, 200),
    spacing=0.02,     # 20 nm grid spacing
    wavelength=1.55,  # 1550 nm
)

# Add a waveguide
sim = sim.add(bz.box(
    center=(0, 0),
    size=(10, 0.5),
    permittivity=12.25,  # Silicon
))

# Add a source and run
sim = sim.add(bz.source(center=(-4, 0)))
fields = sim.run(steps=1000)
```

For more details, see the [BEAMZ documentation](https://quentinwach.github.io/beamz/).
