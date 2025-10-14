# Weather Dashboard (Flask)

Simple Flask app that fetches live weather and forecast from OpenWeatherMap API.

Features
- Search weather by city
- Displays temperature, humidity and a short forecast

Setup

1. Create a virtual environment and install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Create a `.env` file with your OpenWeatherMap API key:

```
OPENWEATHER_API_KEY=your_api_key_here
FLASK_SECRET=change_this
```

3. Run the app:

```powershell
python app.py
```

Then open http://127.0.0.1:5000 in your browser.

Notes
- This example uses the free OpenWeatherMap endpoints. The forecast endpoint returns 5-day/3-hour data and the app shows a small slice of it.

Docker

Build the image from the repository root:

```powershell
docker build -t weather-dashboard:latest .
```

Run the container (map port 5000):

```powershell
docker run --rm -it -p 5000:5000 -e OPENWEATHER_API_KEY=your_key_here weather-dashboard:latest
```

Then open http://127.0.0.1:5000 in your browser.
