FROM python:3.10
RUN pip install pipenv
WORKDIR /app
COPY Pipfile Pipfile.lock ./
RUN pipenv install --deploy --system
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]