@echo off
echo Starting local server for portfolio website...
echo Open your browser and go to: http://localhost:8000
echo Press Ctrl+C to stop the server
python -m http.server 8000
pause