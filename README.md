# Dr. Swati Nagpal — Physiotherapist Website

A production-ready physiotherapist website for **Dr. Swati Nagpal (PT) — MPT Musculoskeletal, DN Specialist**, built with the Next.js App Router and Payload CMS, integrated as a single full-stack application.

## ✨ Features

- **Home** — Hero with doctor intro, CTA buttons (Book / WhatsApp), highlights, testimonials, latest articles preview.
- **About** — Full bio, qualifications, experience, professional imagery.
- **Services / Conditions** — Interactive UI: select multiple symptoms + conditions to see CMS-driven recommended treatments.
- **Articles** — Full blog with SEO-friendly slugs, list page, and individual article pages. Fully managed via the Payload admin.
- **Book Appointment** — Form with name, phone, email, issue, message, and preferred date/time. Saves to Payload and emails the doctor via Nodemailer.
- **Contact** — Click-to-call and WhatsApp deep-link integration.
- **Admin Panel** — Payload CMS at `/admin` for managing articles, appointments, treatments, and media.
- **Responsive** mobile-first design with subtle animations and accessible components.

## 🧱 Tech Stack

| Layer       | Choice                                         |
|-------------|------------------------------------------------|
| Framework   | Next.js 15 (App Router) + React 19             |
| Language    | TypeScript                                     |
| Styling     | Tailwind CSS + shadcn/ui (Radix primitives)    |
| Icons       | lucide-react                                   |
| CMS         | Payload CMS 3 (integrated into Next.js)        |
| Database    | MongoDB (local or Atlas) via Mongoose adapter  |
| Email       | Nodemailer + Gmail SMTP (free)                 |
| WhatsApp    | Direct `wa.me` deep links (no API)             |

All dependencies are free / open-source. No paid APIs, no Stripe, no Twilio.

## 📁 Project Structure

```
src/
├── app/
│   ├── (frontend)/        # Public website (Home, About, Services, Articles, Book, Contact)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── ...
│   └── (payload)/         # Payload admin & REST/GraphQL API
│       ├── admin/[[...segments]]/
│       └── api/
├── actions/
│   └── appointments.ts    # Server action: validate, save, email
├── collections/
│   ├── Articles.ts
│   ├── Appointments.ts
│   ├── Treatments.ts
│   ├── Media.ts
│   └── Users.ts
├── components/            # Navbar, Footer, Hero, ui/* (shadcn), etc.
├── lib/
│   ├── email.ts           # Nodemailer transporter
│   ├── payload.ts         # Server-side Payload instance
│   └── utils.ts           # cn(), site config, links
└── payload.config.ts      # Payload config (collections, db, admin)
```

## 🚀 Local Setup

### 1. Prerequisites

- **Node.js** ≥ 18.20
- **MongoDB** running locally (`mongod`) **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster

### 2. Clone & install

```bash
git clone https://github.com/adityanagpal26/swatinagpal.git
cd swatinagpal
npm install
```

### 3. Configure environment

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Generate a Payload secret:

```bash
openssl rand -base64 32
```

Required variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | MongoDB connection string. Local: `mongodb://127.0.0.1:27017/swatinagpal`. Atlas: `mongodb+srv://...` |
| `PAYLOAD_SECRET` | Long random string — used to sign Payload JWTs |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. `http://localhost:3000` for dev) |
| `NEXT_PUBLIC_SERVER_URL` | Same as above — used for CORS / CSRF |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASSWORD` | A Gmail **App Password** (see below) |
| `SMTP_FROM` | Display name + email used as the “from” address |
| `DOCTOR_EMAIL` | The doctor’s email address — receives appointment notifications |
| `NEXT_PUBLIC_DOCTOR_PHONE` | Phone shown / used for `tel:` links |
| `NEXT_PUBLIC_DOCTOR_WHATSAPP` | Phone digits used for `wa.me` deep links |
| `NEXT_PUBLIC_DOCTOR_EMAIL` | Public-facing email |

> If SMTP variables are not set, the form will still save the appointment but will skip sending the email (a warning is logged).

#### Generating a Gmail App Password

1. Enable 2-Step Verification on your Google account.
2. Visit <https://myaccount.google.com/apppasswords>.
3. Create an app password for "Mail" / "Other (custom)".
4. Use the 16-character generated password as `SMTP_PASSWORD`.

### 4. Run the dev server

```bash
npm run dev
```

- Frontend: <http://localhost:3000>
- Admin:    <http://localhost:3000/admin>

The first visit to `/admin` will prompt you to **create the first admin user** — this becomes the doctor’s login.

### 5. Seed initial content (in the admin)

After logging into `/admin`:

1. **Treatments** — add mappings of symptom × condition → recommended treatment. The Services page reads from this collection.
2. **Articles** — write blog posts with cover images and rich content.
3. **Appointments** — view / update status (pending → confirmed) of submitted requests.

## 🚢 Deployment (Free Tier)

### Database — MongoDB Atlas (free)

1. Create a free [Atlas](https://www.mongodb.com/cloud/atlas/register) cluster (M0).
2. Create a database user with read/write access.
3. Allow access from `0.0.0.0/0` (or restrict to your hosting IPs).
4. Copy the connection string and use it as `DATABASE_URI`.

### Hosting — Vercel (free)

1. Push this repo to GitHub (already done if you’re reading this).
2. Import the repo at <https://vercel.com/new>.
3. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. **Important** — set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SERVER_URL` to your Vercel URL (e.g. `https://your-app.vercel.app`).
5. Deploy.

### Media uploads on Vercel

Vercel’s filesystem is read-only at runtime, so the default local-disk media storage is fine for development but **not for production**. For production you have two free-tier options:

- **Cloudinary free tier** + the Payload Cloudinary plugin (`@payloadcms/storage-s3` or community Cloudinary plugin), or
- **MongoDB GridFS** via a community Payload plugin.

Both are free. Configure your chosen plugin in `src/payload.config.ts`. The app works out-of-the-box with the local adapter for development.

## 📲 WhatsApp Integration

We use the public `wa.me` deep-link — **no WhatsApp Business API**, no token, no cost. The phone number comes from `NEXT_PUBLIC_DOCTOR_WHATSAPP`.

```
https://wa.me/917005454553?text=Hello+Doctor
```

## 🧠 Doctor Details

| | |
|--|--|
| Name | Dr. Swati Nagpal (PT) |
| Qualification | MPT Musculoskeletal, DN Specialist |
| Experience | 8 years |
| Phone | +91 7005454553 |
| Email | nagpals855@gmail.com |

## 🔐 Admin Capabilities

The doctor can, via `/admin`:

- ✅ Add / edit / delete **articles** (rich text + cover images).
- ✅ View **appointment requests** and update their status.
- ✅ Manage the **treatments** mapping (symptom × condition → treatment).
- ✅ Upload and manage **media** assets.

## 🧰 Useful Scripts

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run start            # Run production build
npm run lint             # Lint
npm run generate:types   # Regenerate src/payload-types.ts
```

## 📝 Notes

- No payment gateway is implemented (per requirements). Appointments are request-only.
- The contact form on `/book` posts to a Server Action (`src/actions/appointments.ts`) that uses Zod for validation, persists to Payload, and emails the doctor.
- All branding colours, links and contact details are centralised in `src/lib/utils.ts` (`SITE`).

## License

MIT — built for Dr. Swati Nagpal.
