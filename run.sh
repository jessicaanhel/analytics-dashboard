#!/bin/bash

# Run backend in background
python3 backend/app.py

# Run frontend
cd frontend
npm start
