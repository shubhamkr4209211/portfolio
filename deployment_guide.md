# 🚀 Deploying Your Portfolio to Production

Since this application is a **React + Vite** frontend, the best, fastest, and most professional way to deploy it for free so that it stays online 24/7 is by using **Vercel**. 

Because you are a DevOps Engineer, we will set it up using **Continuous Deployment (CD) via GitHub**. This means anytime you make a code change in the future on your computer, your live website will automatically update!

---

### Step 1: Disconnect from the Template Repository
Because you cloned this template from the original author (`MoncyDev`), you currently cannot save your code to GitHub. We need to detach it from his repository first.

Open your terminal in VS Code and run:
```bash
git remote remove origin
```

### Step 2: Save Your Final Code
Now that it's disconnected, let's save all the amazing work and customizations we've done into version control:

```bash
git add .
git commit -m "feat: complete portfolio personalization and DevOps adjustments"
```

### Step 3: Upload to Your Own GitHub
You need a place to host your source code so the deployment servers can see it.
1. Go to [github.com/new](https://github.com/new) and log in.
2. Create a new repository named `portfolio` (leave it Public).
3. Do **NOT** check "Add a README" or any other boxes. Just click **Create repository**.
4. GitHub will show you some commands. Copy and run the commands under **"…or push an existing repository from the command line"**.

It will look exactly like this (but with your username):
```bash
git remote add origin https://github.com/shubhammishra/portfolio.git
git branch -M main
git push -u origin main
```

---

### Step 4: Deploy Live on Vercel
Vercel is the creator of Next.js and the absolute best platform for hosting React web applications. It provides a lightning-fast Global CDN and SSL Certificates entirely for free.

1. Go to [Vercel.com](https://vercel.com/) and click **Sign Up**.
2. Choose **Continue with GitHub** to link your accounts.
3. Once logged in, click the **Add New Project** button.
4. Vercel will show a list of your GitHub repositories. Find the `portfolio` repository you just created and click **Import**.
5. You don't need to change any settings! Vercel automatically detects that you are using Vite and React.
6. Click the blue **Deploy** button.

### 🎉 Success!
Wait about 60 seconds. Vercel will automatically build the site, assign you a fast, secure URL (like `https://portfolio-shubham.vercel.app`), and your website will be live 24/7 for anyone in the world to visit.

Whenever you want to update your resume or change something in your portfolio, just type:
```bash
git add .
git commit -m "Update"
git push
```
...and Vercel will automatically update your live site!
