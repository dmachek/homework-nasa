# Meteorite Landings Analyzer

This project analyzes data from NASA's Earth Meteorite Landings dataset. It provides information on the total number of entries, the most massive meteorite, and the most frequent year of meteorite landings.

## Table of Contents

- [Requirements](#requirements)
- [Installation and Running](#installation-and-running)
  - [Running with Node.js](#running-with-nodejs)
  - [Running with Docker](#running-with-docker)
  - [Running with Python](#running-with-python)
- [Environment Variables](#environment-variables)

## Requirements

Before running this project, ensure you have one of the following setups:

- Node.js (v18 or later)
- Docker
- Python 3.7+ and pip

## Installation and Running

### Running with Node.js

1. **Install Node.js dependencies**:
    ```bash
    npm install
    ```

2. **Run the application**:
    ```bash
    node index.js
    ```

### Running with Docker

1. **Build the Docker image**:
    ```bash
    docker build -t meteorite-analyze .
    ```

2. **Run the Docker container**:
    ```bash
    docker run -it --rm meteorite-analyze
    ```

### Running with Python

1. **Install Python dependencies**:
    ```bash
    pip install pandas
    ```

2. **Run the Python script**:
    ```bash
    python3 MeteoriteAnalyzer.py
    ```

## Environment Variables

The application uses the following environment variable:

- `API_URL`: URL to fetch the meteorite landings data. This can be configured in a `.env` file for Docker or directly in your environment.

Example `.env` file:

```plaintext
API_URL=https://data.nasa.gov/resource/y77d-th95.json
