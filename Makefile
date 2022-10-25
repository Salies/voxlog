database:
	docker-compose up -d

# in /server/ execute "yarn dev" as a background process
web:
	cd server && yarn dev

player:
	docker-compose down -v
