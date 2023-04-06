FROM python:3.7-slim-buster AS app-builder
WORKDIR /app
ENV PYTHONFAULTHANDLER=1
ENV PYTHONHASHSEED=random
ENV PYTHONUNBUFFERED=1
ENV PIP_DEFAULT_TIMEOUT=100
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PIP_NO_CACHE_DIR=1
ENV POETRY_VERSION=1.1.5
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
RUN apt-get update \
    && apt-get -y install --no-install-recommends gcc build-essential \
    && pip install "poetry==$POETRY_VERSION" \
    && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml /app/pyproject.toml
COPY poetry.lock /app/poetry.lock
RUN poetry config virtualenvs.in-project true \
    && poetry install --no-interaction --no-ansi --no-dev
COPY . /app


FROM python:3.7-slim-buster AS app
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONFAULTHANDLER=1
ENV PYTHONHASHSEED=random
ENV PYTHONUNBUFFERED=1
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
WORKDIR /app
COPY --from=app-builder /app /app
CMD ["uwsgi", "--ini", "uwsgi.ini"]


FROM nginx:1.18-alpine AS web
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
