build:
	docker compose -f local.yml up --build -d --remove-orphans

up:
	docker compose -f local.yml up -d

down:
	docker compose -f local.yml down

remove_c_v:
	docker compose -f local.yml down -v

prune_images:
	docker image prune

prune_volumes:
	docker volume prune

logs_api:
	docker compose -f local.yml logs api

logs_flower:
	docker compose -f local.yml logs flower

ebanking_config:
	docker compose -f local.yml config

migrations:
	docker compose -f local.yml run --rm api python manage.py makemigrations

rs:
	docker compose -f local.yml run --rm api python manage.py runserver

shell:
	docker compose -f local.yml run --rm api python manage.py shell

migrate:
	docker compose -f local.yml run --rm api python manage.py migrate

collectstatic:
	docker compose -f local.yml run --rm api python manage.py collectstatic --no-input --clear

su:
	docker compose -f local.yml run --rm api python manage.py createsuperuser

flush:
	docker compose -f local.yml run --rm api python manage.py flush

inspect_network:
	docker network inspect ebanking_local_nw

connect_to_db:
	docker compose -f local.yml exec postgres psql --username=eyram --dbname=ebank