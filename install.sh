# go to aqua-backend and runn pnpm install
cd aqua-backend
pnpm install

# go to aqua-frontend and runn pnpm install
cd ../aqua-frontend
pnpm install

# go to aqua-frontend and runn pnpm build
pnpm build

# spin up a mongodb instance in docker
docker run -d -p 27017:27017 --name aqua-mongo mongo