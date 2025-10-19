# preauth-bucket-downloaders

## Whats this about
Create a set of packages to better understand how to create pre-signed URLs from various bucket types in order to bypass Vercel or Cloudflare rules.

When dealing with cloudflare and dealing content to users, as well as in Vercel, you are charged based on what your server transmits.  Think of it like a bridge, everyone goes over the bridge that is Vercel, and so it is all tracked and billable.  If we can bypass this by create a direct relationship from the CLIENT to the bucket, we can allow them to bypass the bridge, saving money.



### Tasks
[x] Create and Set up a AWS Bucket Tool.
[x] Create a Sample for AWS
[x] Create and set up a Cloudflare Bucket Tool
[x] Create a sample for Cloudflare


## AWS Configuration information

There are 3 things we need to ensure is properly set up, in case youre getting 403 errors when attempgint to upload or download files.  This is needed if youre not sure how to set up an AWS Bucket, User, or Policy.  

You dont want to use ROOT user credentials as there could be risk exposing it, which could create a vulnerability and expose information.  This is why you want to create a user and assign it the minimum amount of credentials possible to solve the problem.

### Bucket

You need to set up the buckets you would be needing.  Note, you need to make sure it has respective permissions.  Generally if youre using your own users, you can keep it locked down.

### Policy

You need to set up a policy to apply to users, which enables them to get and put items into a bucket. The policy is tied to a bucket.   After having GetObject and PutObject, you need to set the resources it applies to.   If you create a bucket named `foo` for example, you will need to set up both Bucket AND Object permissions for the specific bucket.  Example: `arn:aws:s3:::foo` or `arn:aws:s3:::foo/*` respectively.

### User

Establishing a user is down within IAM system.  You can create a User.  You can then assign a policy to it.  You can assign the one above to the user.  You would want to add permissions, and then Attach policies directly.  You would filter it by Customer Managed Policies to narrow it.  When the policy is assigned to the user, it can then add and get from the bucket.

Access Keys and Secrets.  You will need to make sure that you set the key and secret so it can be used in this example app, assigned as ENV Variables.

## Cloudflare R2 Datastores

Similar to AWS, you will need a few pieces of information in order to access a specific bucket.

### Account ID

R2 Object Storage Dashboard has the Account ID on the right side of the screen.

### Credentials

Towards the Top Right, there is a button for managing API Tokens.  When clicking on that, create a User API Token.  This will allow you to create read-write access user that will then have the specific environment variables needed.  It will create the ID and Secret for you to apply.

### Region?

Unlike AWS, where you define a region, you will commonly use `auto` as the Bucket Region when creating said bucket.
