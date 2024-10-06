we have build an ai saas platform in which you can manipulate images, khair steps niche diye gaye hai apne laptop me setup krne k liye

after forking this repositary you need to create on file '.env.local' and paste the below items

------------------------------------------------------------------------------------
NEXT_PUBLIC_SERVER_URL=http://localhost:3000


NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_FRONTEND_API=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

MONGODB_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

------------------------------------------------------------------------------------

for "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_FRONTEND_API, CLERK_SECRET_KEY" this three you need to go to clerk.com and login to you account, after that create an project and you will see few steps to setup just copy all the two keys and paste in there respective place also "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY","CLERK_FRONTEND_API" this two will have the same key so keep that in mind

this 4 will remain same just paste it
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

for "MONGODB_URL" you again need to create an mongodb atlas account and create an organization(sometimes by default it creates the organization so keep that in mind).
create an project name it, then you will see an option to create an cluster do it choose the free version (called M0)  create the cluster and let it create 
after cluster being created just copy the code that you will get on creating it and also remember the password that you used while creating the cluster
just paste the code in to our "MONGODB_URL" and replace"<your_password>" with your password

for "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET" this three just create an cloudinary account and paste the api keys that you will get while creating it

