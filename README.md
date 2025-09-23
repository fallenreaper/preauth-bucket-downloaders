# preauth-bucket-downloaders

## Whats this about
Create a set of packages to better understand how to create pre-signed URLs from various bucket types in order to bypass Vercel or Cloudflare rules.

When dealing with cloudflare and dealing content to users, as well as in Vercel, you are charged based on what your server transmits.  Think of it like a bridge, everyone goes over the bridge that is Vercel, and so it is all tracked and billable.  If we can bypass this by create a direct relationship from the CLIENT to the bucket, we can allow them to bypass the bridge, saving money.



### Tasks
[x] Create and Set up a AWS Bucket Tool.
[x] Create a Sample for AWS
[x] Create and set up a Cloudflare Bucket Tool
[x] Create a sample for Cloudflare