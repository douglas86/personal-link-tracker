### This Project uses the following Technologies

<br/>
<img src="./public/static/readmeImages/CSS3.png" alt="no image" height="50" width="50">
<img src="./public/static/readmeImages/javascript.png" alt="no image" height="50" width="50">
<img src="./public/static/readmeImages/nextjs.png" alt="no image" height="50" width="50">
<img src="./public/static/readmeImages/prisma.png" alt="no image" height="50" width="50">
<img src="./public/static/readmeImages/aws.png" alt="no image" height="50" width="50">
<img src="./public/static/readmeImages/useSWR.jpeg" alt="no image" height="50" width="50">

css, JavaScript, Nextjs Framework, Prisma with postgres as my database, AWS (Amazon web service), useSWR (Stale while
revalidating) hook for data fetcher
<hr/>

### This is a short description of the design structure

# File structure

order of imports:
   npm packages at the top
   pages directory
   UI components after:
      template
      organism
      molecule
      atom
   assets directory
   util directory
   styling

I have used the atomic design structure for components in this project:<br/>
The meaning of atomic design structure is as follows:<br/>
atom - this is the smallest form which could be a button, input tag, label etc<br/>
molecule - this will consist of atoms together such as input field like a button or search icon etc<br/>
organism - organisms this will be were functionality starts coming together like cards that I have placed on the home page or a map to iterate around molecules<br/>
template - this is where the pages start coming together - this will place components in a layout and demonstrate the design<br/>
<br/>

Structure of the api calling:<br/>
API directory - this is where the api calling gets made - this will call to the api directory in page<br/>
actionTypes directory - this is where all the logic for the api's get done<br/>
actionCreators directory - the helper functions for api's gets called from here<br/>
<br/>

Structure for all endpoints:<br/>
all routes gets done at the base of the directory<br/>
controllers directory - this is for all the logic of the routes<br/>
services directory - these are the helper functions that will help the controllers out<br/>
NOTE: It is also worth mentioning that whenever I use a getServerSideProp or something along those lines, controllers and services will be used, if they are needed<br/>
<br/>

<hr/>

### This is a screenshot of the Home Page on this site

<img src="./public/static/readmeImages/Home Page.png" alt="no image" height="auto" width="100%"><br/>

### This is a screenshot of the Categories page

<img src="./public/static/readmeImages/Category Page.png" alt="no image" height="auto" width="100%"><br/>

#### Description

This page uses prefetch for loading documents from database

## Getting setup on AWS

### Setting up s3 Buckets

1. Add a IAM role to your user:
    1. Go to the top search bar and search for IAM
    2. The first one that pops up should say IAM
    3. when you are on the IAM dashboard
    4. Under the IAM resource section
    5. There should be a heading that says Users
    6. click on users
    7. click on the user that you want to handle the s3 bucket
    8. click on Add permissions
    9. There will be 3 different policies
    10. click on the one that says, "Attach existing policies directly"
    11. in the search bar type s3 which should bring up all existing policies
    12. click on the policy that says, "AmazonS3FullAccess"
    13. which gives full access to the user
    14. keep on clicking the next blue button at the bottom to add the policy
2. Once the policy is added
3. In the search bar at the top type s3 to go to the s3 Dashboard
4. click the button that says create a bucket
5. type the name of the bucket
6. bear in mind that this name needs to be unique across the hole of aws
7. select what region you want your bucket to be in
8. under object ownership select ACL's enabled
9. unselect the Block all public access under the heading Block public access
10. all other setting you can leave as is, just click the orange button at the bottom
11. that says, "Create bucket"
12. once the bucket is created store your environment variables in the .env file
13. connect to the s3 bucket as I did in the server directory

### How to set up SES (Simple Email Service) on AWS

The first thing that I had to do was make sure that I had created a new user on the IAM Dashboard There is a panel on
the left-hand side that says Users, click on the Big blue button on the right hand side that says "Add users On the
form", enter your name and click the checkbox that says Access key - Programmatic access. Then click on Next:
Permissions blue button bottom right You need to now add permissions policy to use AWS SES Click on the Document that
says, "Attach existing policies directly". Once you click on that there will be a list of all the policies that AWS
offers In the search field type: SES this will show all policies related to SES service Click on the checkbox that says
AmazonSESFullAccess Click the Next: Tags big blue button bottom right-hand side Keep on clicking the big blue button
until it says Create user It will then show you a Success Screen with your access key and Secret key Make sure to keep
that safe and backed up. The secret and Access key you need to place in the .env file

AWS_ACCESS_KEY_ID=key goes here AWS_SECRET_KEY=key goes here AWS_REGION=region goes here

The next step would be to go the SES Dashboard. To do that at the top there is a search field type SES in that field SES
should pop up as first result Then I need to Create an Identity to use this service Click on the orange button that
says, "Create identity" Click on the document that says Email address Enter your email address in the input field and
click the orange button that says Create identity It will then send you, an email to the email address provided, which
needs to be verified Click on the link that was sent to you to verify it.

The next step is then to program it out under the server directory in controllers/auth.js If you go onto google and type
AWS SES node It will show you how it is done with nodejs
