FROM python:3.10
WORKDIR /
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD label-studio start --host 0.0.0.0 --port $PORT