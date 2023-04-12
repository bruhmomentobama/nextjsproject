# Init Instructions
- Clone and rename folder $ git clone git@github.com:dented-academy/next-starter.git [your_project_name_here]
- Find and rename all instance of [your_project_name_here] to your actual project name
- Run `$ rm -rf .git && git init`
- Run `$ npm install`
- Run `$ npx prisma init`
- Remove the `.env` file
- Add to `.env.development.local` file (create if not exist)
  ```env
  NEXTAUTH_SECRET="[use `openssl rand -base64 32` to generate a secret]"
  NEXTAUTH_URL="[the link of your website such as `http://localhost:3000`]"
  DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[your_project_name_here]"
  ```
- Run `$ git commit -am 'init'`
- Push to your github repo (create one if none exist)

# Prisma Migration
After adding/modifying your schema use the package script `migrate` to run the migration
- `$ npm run migrate` (this is equivalent to `npx prisma migrate dev`)

# Vercel Deployment
## Supabase
- Create a Supabase account
- Create a new project with the region in `Singapore` (REMEMBER THE PASSWORD! YOU NEED THIS LATER!)
- Once the project has completed the setup, go to `Settings (the cog wheel) -> Database -> Connection info`
- Create and note down the following link:
  - `DATABASE_URL="postgresql://postgres:[the password you used to create the project]@[Host]:5432/postgres"`

## Vercel
- Create a Vercel account
- Create a new project by selecting the appropriate github repo.
- In the project setup screen, add `Environment Variables`
  - Add the `DATABASE_URL` that you generated from Supabase
  - and everything other things in `.env.development.local` except `NEXTAUTH_URL`
- Once it has deployed, add Integrations & select Region to the project
  - Region
    - Go to `Settings -> Functions -> Function Region -> Select Singapore`
  - Integrations
    - Go to `Settings -> Integrations -> Browse Market`
    - Integrate the following:
      - Supabase
      - Checkly
      - Logtails
- Migrations
  - Use the `$ npm run deploy` to deploy manually OR
  - Override vercel's `Settings -> General -> Build & Development Settings -> BUILD COMMAND` to `npm run vercel-build`

> You might need to redeploy for settings to take effect!

## Redeployment
- From your dashboard, go to `[Your project] -> Deployments -> Select the vertical ... of your desire deployment -> Redeploy`

## New Deployment
- Use the command:
  - `$ vercel` to deploy the current branch as `preview`
  - `$ vercel --prod` to deploy the current branch as `production`
- Once you have `linked` your vercel project to your github repo, you can deploy by pushing to the `master` branch

# Heroku Deployment
- Run `$ heroku create` (This create another remote name `heroku` just like `origin`)
- Run `$ heroku addons:create papertrail` (this adds a service that will keep your logs)
- Run `$ heroku addons:create heroku-postgresql:hobby-dev` (this adds a postgresql)
- Add env variables (except `DATABASE_URL`) to heroku
  - Login to heroku dashboard and select your app
  - Go to `Settings -> Config Vars -> Reveal Config Vars`
  - Add all items you have in `.env.development.local` (You should add a different value for keys like S3 & OAuth)
- Add an extra `NODE_ENV=production` env to heroku
- Run `$ git push heroku [branch-name:]master` (add `branch-name:` if you are not in the master branch)
- Run `$ heroku open`
