# unichat

## A modern messaging app built with nextjs

**Technologies used to develop this app** (updating...)

- Nextjs 14.2.7
- React ^18
- Tailwindcss ^3.4
- (Microsoft designer with AI)[https://designer.microsoft.com/]
- Clerk
- (Stream)[https://getstream.io/]
- (T3)[https://env.t3.gg/docs/nextjs]
- Webhooks
- (Expose local services over TLS online)[docs.srv.us]
- (Organize JSON code)[https://jsonformatter.org/#google_vignette]
- (Convert code between different formats)[https://transform.tools/json-to-typescript]
- svix: Service that Clerk uses for its webhooks

### Auxiliary tools:

Run [npx web-push generate-vapid-keys] to generate the VAPID keys for the push notifications. (will obtain the public and private keys)

Fake server for testing purposes:

Run in your terminal [ssh srv.us -R 1:localhost:3000 -R 2:192.168.0.1:80]

You need an SSH key; use ssh-keygen -t ed25519 (defaults work)

### TIP:

When you receive complex JSON data, you can use the JSON formatter to organize it and make it easier to read. After that you can use the JSON to TypeScript converter to convert the JSON data into TypeScript interfaces.

![Modern messaging app](https://github.com/flan02/unichat/blob/main/public/unichat-readme.png)
