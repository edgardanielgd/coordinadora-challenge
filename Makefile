up:
	docker-compose up

create-migration:
	npx db-migrate create ${NAME} --migrations-dir=./src/frameworks/database/mysql/migrations --config=./src/frameworks/config/database.ts --sql-file

run-migrations:
	npx db-migrate up --migrations-dir=./src/frameworks/database/mysql/migrations --config=./src/frameworks/config/database.ts

rollback-last-migration:
	npx db-migrate down --migrations-dir=./src/frameworks/database/mysql/migrations --config=./src/frameworks/config/database.ts

rollback-all:
	npx db-migrate reset --migrations-dir=./src/frameworks/database/mysql/migrations --config=./src/frameworks/config/database.ts

dev:
	npm run dev

test:
	npx jest --verbose

seed:
	npm run seed