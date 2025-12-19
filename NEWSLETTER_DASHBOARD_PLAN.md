# Newsletter Dashboard Implementation Plan

## Overview

A simple, intuitive newsletter dashboard for managing subscribers using **Mailchimp API** with **Google OAuth** authentication. Designed for a single admin user to manage up to 500 contacts and send up to 1,000 emails per month (Mailchimp Free Tier limits).

---

## Mailchimp Free Tier Confirmation

| Feature | Limit |
|---------|-------|
| **Contacts** | 500 subscribers |
| **Emails/month** | 1,000 emails |
| **Daily sending limit** | 500 emails |
| **API Access** | Included |
| **Audiences** | 1 audience |
| **Branding** | Mailchimp footer on emails |

Sources:
- [Mailchimp Pricing Plans](https://mailchimp.com/pricing/marketing/)
- [Mailchimp API Documentation](https://mailchimp.com/developer/marketing/docs/fundamentals/)

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (existing) |
| Authentication | NextAuth.js + Google OAuth |
| API | Mailchimp Marketing API v3 |
| Styling | Tailwind CSS (existing) |
| Database | None needed (Mailchimp stores contacts) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Login Page  │  │  Dashboard  │  │  Campaign Creator   │ │
│  │  (Google)   │  │  (Contacts) │  │    (Simple Form)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ /api/auth   │  │/api/contacts│  │  /api/campaigns     │ │
│  │ (NextAuth)  │  │ (CRUD ops)  │  │  (send newsletters) │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Mailchimp API                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  - Audience/List Management                              ││
│  │  - Contact/Member CRUD                                   ││
│  │  - Campaign Creation & Sending                           ││
│  │  - Stats & Analytics                                     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Authentication Setup

**Files to create:**
```
app/
├── admin/
│   ├── layout.js          # Protected layout wrapper
│   ├── page.js             # Dashboard main page
│   └── login/
│       └── page.js         # Login page with Google button
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.js    # NextAuth configuration
```

**Dependencies to install:**
```bash
npm install next-auth @auth/core
```

**Environment variables needed:**
```env
# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate_a_random_secret

# Authorized admin email (her email only)
ADMIN_EMAIL=her-email@gmail.com
```

**Security:** Only allow login from the specific admin email address.

---

### Phase 2: Mailchimp Integration

**Dependencies to install:**
```bash
npm install @mailchimp/mailchimp_marketing
```

**Environment variables needed:**
```env
# Mailchimp API (from Mailchimp account settings)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER_PREFIX=us1  # or whatever your data center is
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

**API Routes to create:**
```
app/api/
├── contacts/
│   ├── route.js           # GET all, POST new contact
│   └── [id]/
│       └── route.js       # GET, PUT, DELETE single contact
├── campaigns/
│   ├── route.js           # GET all, POST new campaign
│   └── [id]/
│       ├── route.js       # GET campaign details
│       └── send/
│           └── route.js   # POST to send campaign
└── stats/
    └── route.js           # GET audience stats
```

---

### Phase 3: Dashboard UI

**Dashboard Pages:**

```
app/admin/
├── page.js                 # Dashboard home (stats overview)
├── contacts/
│   └── page.js             # Contact list with search
├── campaigns/
│   ├── page.js             # Campaign list
│   └── new/
│       └── page.js         # Create new campaign
└── settings/
    └── page.js             # Account info & usage stats
```

**UI Components to create:**
```
components/admin/
├── Sidebar.js              # Navigation sidebar
├── StatsCard.js            # Usage statistics card
├── ContactsTable.js        # Paginated contacts table
├── ContactModal.js         # Add/Edit contact modal
├── CampaignForm.js         # Simple campaign creator
└── UsageBar.js             # Visual usage indicator
```

---

## Dashboard Features

### 1. Home Dashboard
- **Contact count** (X / 500 used)
- **Emails sent this month** (X / 1,000 used)
- **Recent activity** (last 5 subscribers)
- **Quick actions** (Add contact, Create campaign)

### 2. Contacts Page
- **Table view** with name, email, status, date added
- **Search/filter** by name or email
- **Add contact** modal
- **Edit/Delete** contacts
- **Export** contacts to CSV
- **Import** from CSV (bulk add)

### 3. Campaigns Page
- **List of past campaigns** with open/click stats
- **Create new campaign:**
  - Subject line
  - Preview text
  - Email content (simple WYSIWYG or plain text)
  - Send immediately or schedule
- **Preview before sending**

### 4. Settings Page
- **Account info** (connected Mailchimp account)
- **Usage statistics**
- **Danger zone** (clear all contacts, etc.)

---

## File Structure (Complete)

```
arc/
├── app/
│   ├── admin/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── contacts/
│   │   │   └── page.js
│   │   ├── campaigns/
│   │   │   ├── page.js
│   │   │   └── new/
│   │   │       └── page.js
│   │   └── settings/
│   │       └── page.js
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.js
│       ├── contacts/
│       │   ├── route.js
│       │   └── [id]/
│       │       └── route.js
│       ├── campaigns/
│       │   ├── route.js
│       │   └── [id]/
│       │       ├── route.js
│       │       └── send/
│       │           └── route.js
│       └── stats/
│           └── route.js
├── components/
│   └── admin/
│       ├── Sidebar.js
│       ├── StatsCard.js
│       ├── ContactsTable.js
│       ├── ContactModal.js
│       ├── CampaignForm.js
│       ├── RichTextEditor.js
│       └── UsageBar.js
├── lib/
│   └── mailchimp.js        # Mailchimp client wrapper
└── middleware.js           # Protect /admin routes
```

---

## Setup Instructions (For Her)

### Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URI: `https://your-domain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret

### Step 2: Mailchimp Setup
1. Log into [Mailchimp](https://mailchimp.com/)
2. Go to Profile → Extras → API Keys
3. Create a new API key and copy it
4. Note the server prefix from your API key (e.g., `us1` from `abc123-us1`)
5. Go to Audience → Settings → Audience name and defaults
6. Copy the Audience ID

### Step 3: Environment Variables
Add to Vercel project settings or `.env.local`:
```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
NEXTAUTH_URL=https://arcoirisdeamor.com
NEXTAUTH_SECRET=xxx
ADMIN_EMAIL=her-email@gmail.com
MAILCHIMP_API_KEY=xxx
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=xxx
```

---

## Security Considerations

1. **Single Admin Access**: Only the configured email can log in
2. **Protected Routes**: Middleware checks session on all `/admin` routes
3. **API Protection**: All API routes verify session before processing
4. **No Database**: Contacts stored in Mailchimp, no local data exposure
5. **Environment Variables**: All secrets stored in Vercel, not in code

---

## Cost Summary

| Service | Cost |
|---------|------|
| Mailchimp Free Tier | $0/month |
| Google OAuth | Free |
| Vercel Hosting | Already have |
| **Total** | **$0/month** |

---

## Implementation Order

1. [ ] Install dependencies (`next-auth`, `@mailchimp/mailchimp_marketing`)
2. [ ] Set up Google OAuth credentials
3. [ ] Set up Mailchimp API key and audience
4. [ ] Create NextAuth configuration with Google provider
5. [ ] Create middleware to protect `/admin` routes
6. [ ] Create login page with Google sign-in button
7. [ ] Create Mailchimp client wrapper (`lib/mailchimp.js`)
8. [ ] Create API routes for contacts (CRUD)
9. [ ] Create API routes for campaigns
10. [ ] Create API route for stats
11. [ ] Create dashboard layout with sidebar
12. [ ] Create home dashboard with stats
13. [ ] Create contacts page with table
14. [ ] Create add/edit contact modal
15. [ ] Create campaigns list page
16. [ ] Create new campaign page with form
17. [ ] Add usage indicators throughout
18. [ ] Test all functionality
19. [ ] Deploy to Vercel with environment variables

---

## UI Mockup (Text-based)

```
┌────────────────────────────────────────────────────────────────┐
│  🌈 Arcoiris de Amor - Newsletter Dashboard                    │
├──────────────┬─────────────────────────────────────────────────┤
│              │                                                  │
│  📊 Home     │   Welcome back!                                 │
│              │                                                  │
│  👥 Contacts │   ┌─────────────┐  ┌─────────────┐              │
│              │   │ Subscribers │  │ Emails Sent │              │
│  📧 Campaigns│   │   127/500   │  │   450/1000  │              │
│              │   │   ████░░░░  │  │   █████░░░  │              │
│  ⚙️  Settings │   └─────────────┘  └─────────────┘              │
│              │                                                  │
│              │   Recent Subscribers                             │
│              │   ┌─────────────────────────────────────────┐   │
│              │   │ maria@email.com      Dec 15, 2024       │   │
│              │   │ juan@email.com       Dec 14, 2024       │   │
│              │   │ ana@email.com        Dec 13, 2024       │   │
│              │   └─────────────────────────────────────────┘   │
│              │                                                  │
│              │   [+ Add Contact]  [📧 New Campaign]            │
│              │                                                  │
└──────────────┴─────────────────────────────────────────────────┘
```

---

## Questions to Decide Before Implementation

1. **Campaign Templates**: Should we include pre-made email templates, or just a simple text editor?
2. **Language**: Should the dashboard be in Spanish, English, or both?
3. **Subscriber Form**: Should we also add a newsletter signup form to the public website that automatically adds to Mailchimp?
4. **Scheduling**: Does she need to schedule emails for later, or just send immediately?

---

## References

- [Mailchimp Marketing API](https://mailchimp.com/developer/marketing/api/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Mailchimp API - Add Member to List](https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/)
