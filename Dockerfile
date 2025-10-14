# Use official lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install build deps for some packages if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . /app

# Expose port
EXPOSE 5000

# Use environment variables to configure
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Run with gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app", "--workers", "2"]
