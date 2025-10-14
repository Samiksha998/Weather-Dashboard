import os
from flask import Flask, render_template, request, redirect, url_for, flash
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('OPENWEATHER_API_KEY')
if not API_KEY:
    # We'll still allow the app to run; views will show a helpful message
    pass

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET', 'dev-secret')


def get_current_weather(city: str):
    """Return current weather data for a city from OpenWeatherMap (metric units)."""
    if not API_KEY:
        return {'error': 'OPENWEATHER_API_KEY not set in environment'}

    url = 'https://api.openweathermap.org/data/2.5/weather'
    params = {'q': city, 'appid': API_KEY, 'units': 'metric'}
    resp = requests.get(url, params=params, timeout=10)
    if resp.status_code != 200:
        return {'error': resp.json().get('message', 'API error')}
    return resp.json()


def get_forecast(city: str):
    """Return 5 day / 3 hour forecast and aggregate into daily summary (simple)."""
    if not API_KEY:
        return {'error': 'OPENWEATHER_API_KEY not set in environment'}

    url = 'https://api.openweathermap.org/data/2.5/forecast'
    params = {'q': city, 'appid': API_KEY, 'units': 'metric'}
    resp = requests.get(url, params=params, timeout=10)
    if resp.status_code != 200:
        return {'error': resp.json().get('message', 'API error')}
    data = resp.json()

    # Build a simple forecast: next 5 entries (approx next 15 hours) or daily at 12:00
    forecast_list = []
    for item in data.get('list', [])[:8]:  # roughly 24 hours if you want fewer/more
        forecast_list.append({
            'dt_txt': item.get('dt_txt'),
            'temp': item.get('main', {}).get('temp'),
            'humidity': item.get('main', {}).get('humidity'),
            'weather': item.get('weather', [{}])[0].get('description'),
            'icon': item.get('weather', [{}])[0].get('icon'),
        })

    return forecast_list


@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    forecast = None
    city = ''
    if request.method == 'POST':
        city = request.form.get('city', '').strip()
        if not city:
            flash('Please enter a city name', 'warning')
            return redirect(url_for('index'))

        weather = get_current_weather(city)
        if weather and isinstance(weather, dict) and weather.get('error'):
            flash(weather.get('error'), 'danger')
            weather = None
        else:
            forecast = get_forecast(city)
            if isinstance(forecast, dict) and forecast.get('error'):
                flash(forecast.get('error'), 'danger')
                forecast = None

    return render_template('index.html', weather=weather, forecast=forecast, city=city)


if __name__ == '__main__':
    app.run(debug=True)
