process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


migration:
	@npx squid-typeorm-migration generate


codegen:
	@npx squid-typeorm-codegen


typegen:
	@make explore
	@npx squid-substrate-typegen ./typegen/typegen.json


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://wss.api.moonriver.moonbeam.network \
		--archive https://moonriver.archive.subsquid.io/graphql \
		--out ./typegen/versions.jsonl


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down
