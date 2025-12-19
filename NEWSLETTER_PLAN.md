# Newsletter Plan for Arcoiris de Amor

## Website Context

**Arcoiris de Amor** is a portfolio website for **Vanina Starkoff**, an internationally acclaimed children's book illustrator and author with 20+ published books across 10+ countries. The website:
- Is built with Next.js 15 and hosted on Vercel
- Supports 3 languages: English, Spanish, Portuguese
- Uses EmailJS for contact form submissions
- Has an external store on Nuvemshop (Brazil)

---

## Newsletter Strategy

### Purpose & Goals
1. **Monthly Updates**: Keep subscribers informed about the author's work
2. **New Book Announcements**: Notify readers when new books launch
3. **Event Notifications**: Book signings, fairs, exhibitions
4. **Behind-the-Scenes Content**: Illustration process, sketches, stories
5. **International Reach**: Support for 3 languages (EN/ES/PT)

### Target Audience
- Parents and educators interested in children's literature
- Publishers and book industry professionals
- Collectors and fans of children's book illustration
- Bookstore owners and librarians

---

## Recommended Email Service: Mailchimp

### Why Mailchimp?

| Feature | Benefit for Arcoiris de Amor |
|---------|------------------------------|
| Free tier (up to 500 contacts) | Perfect for starting out |
| Multi-language support | Matches website's EN/ES/PT |
| Beautiful templates | Visual appeal for an illustrator |
| Easy automation | Monthly newsletters on schedule |
| Signup form embeds | Easy integration with Next.js |
| Analytics | Track open rates, clicks |
| GDPR compliant | International audience protection |

### Alternative Options

| Service | Free Tier | Best For |
|---------|-----------|----------|
| **Mailchimp** | 500 contacts, 1,000 emails/month | Beginners, visual content |
| **Brevo (ex-Sendinblue)** | 300 emails/day | Budget-conscious, transactional |
| **MailerLite** | 1,000 subscribers, 12,000 emails/month | Clean design, automation |
| **Buttondown** | 100 subscribers | Simple newsletters |
| **ConvertKit** | 1,000 subscribers (limited) | Creators, landing pages |

**Recommendation**: Start with **Mailchimp Free** or **MailerLite Free** - both handle multilingual content well and have generous free tiers.

---

## Implementation Plan

### Phase 1: Setup (Week 1)

#### 1.1 Create Mailchimp Account
- Sign up at mailchimp.com
- Create audience/list: "Arcoiris de Amor Newsletter"
- Set up 3 audience groups for languages: EN, ES, PT
- Configure sender details:
  - From: `newsletter@arcoirisdeamor.com` or `vanina.starkoff@gmail.com`
  - Reply-to: `vanina.starkoff@gmail.com`

#### 1.2 Legal Compliance
- Create/update Privacy Policy page on website
- Add GDPR-compliant signup (double opt-in)
- Include unsubscribe link in all emails (automatic with Mailchimp)

### Phase 2: Website Integration (Week 2)

#### 2.1 Newsletter Signup Component

Create a new React component for the newsletter signup form:

```jsx
// components/NewsletterSignup.js
'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsletterSignup() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Option A: Mailchimp embedded form (simplest)
      // Option B: API route to Mailchimp API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          language: i18n.language
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 py-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-gray-700 mb-6">
          {t('newsletter.description')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.emailPlaceholder')}
            required
            className="flex-1 px-4 py-3 rounded-lg border-2 border-pink-300
                       focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg
                       hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : t('newsletter.subscribe')}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-600 font-medium">
            {t('newsletter.success')}
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 font-medium">
            {t('newsletter.error')}
          </p>
        )}
      </div>
    </section>
  );
}
```

#### 2.2 API Route (if using Mailchimp API)

```javascript
// app/api/newsletter/route.js
import { NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_DC = process.env.MAILCHIMP_DC; // e.g., 'us21'

export async function POST(request) {
  const { email, language } = await request.json();

  const data = {
    email_address: email,
    status: 'pending', // Double opt-in
    merge_fields: {
      LANGUAGE: language.toUpperCase(),
    },
  };

  try {
    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok || response.status === 400) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

#### 2.3 Translation Keys

Add to translation files:

```json
{
  "newsletter": {
    "title": "Stay Updated!",
    "description": "Subscribe to receive monthly updates about new books, behind-the-scenes content, and exclusive news.",
    "emailPlaceholder": "Enter your email",
    "subscribe": "Subscribe",
    "success": "Thank you! Please check your email to confirm.",
    "error": "Something went wrong. Please try again."
  }
}
```

### Phase 3: Email Templates (Week 2-3)

#### 3.1 Monthly Newsletter Template

Create a branded template in Mailchimp with:
- Header: Arcoiris de Amor logo + rainbow illustration
- Color scheme: Pink, yellow, blue (matching website)
- Sections:
  1. **Monthly Greeting** - Personal message from Vanina
  2. **Featured Book** - Spotlight on a book with images
  3. **News & Updates** - Events, awards, publications
  4. **Behind the Scenes** - Sketch or illustration process
  5. **Social Links** - Instagram, Store, Website
  6. **Footer** - Unsubscribe, address, copyright

#### 3.2 New Book Launch Template

Special announcement template for new releases:
- Hero image of book cover
- Book details (publisher, languages, where to buy)
- Sample pages gallery
- Pre-order/purchase links
- Share buttons

### Phase 4: Automation Setup (Week 3)

#### 4.1 Welcome Email Sequence
1. **Immediate**: Welcome email with free digital content (coloring page, wallpaper)
2. **Day 3**: Introduction to the book collection
3. **Day 7**: Behind-the-scenes of illustration process

#### 4.2 Monthly Newsletter Automation
- Schedule: 1st of each month at 10:00 AM (subscriber's timezone)
- Reminder to Vanina: Prepare content by 25th of previous month

---

## Cost Analysis

### Email Service Costs

| Subscribers | Mailchimp | MailerLite | Brevo |
|-------------|-----------|------------|-------|
| 0-500 | **FREE** | FREE | FREE (300/day) |
| 500-1,000 | $13/month | FREE | $25/month |
| 1,000-2,500 | $27/month | $25/month | $25/month |
| 2,500-5,000 | $59/month | $39/month | $35/month |
| 5,000-10,000 | $87/month | $59/month | $49/month |

### Estimated Costs for Arcoiris de Amor

**Year 1 (Starting Phase)**:
- Email service: **$0** (Free tier: 0-500 subscribers)
- Custom domain for email (optional): $0-12/year
- **Total: $0-12/year**

**Year 2+ (Growth Phase - 500-2,000 subscribers)**:
- Email service: $13-27/month = $156-324/year
- **Total: $156-324/year**

---

## What to Charge the Client

### One-Time Setup Fee

| Component | Estimated Hours | Rate | Total |
|-----------|-----------------|------|-------|
| Strategy & Planning | 2 hours | $75/hr | $150 |
| Mailchimp Account Setup | 1 hour | $75/hr | $75 |
| Website Integration (Signup Form) | 3 hours | $75/hr | $225 |
| Email Template Design (2 templates) | 3 hours | $75/hr | $225 |
| Welcome Sequence Setup | 2 hours | $75/hr | $150 |
| Training for Client | 1 hour | $75/hr | $75 |
| **Total Setup** | **12 hours** | | **$900** |

**Recommended Package Price**: **$800-1,200** (depending on market)

### Ongoing Management Options

#### Option A: Full Service (You Manage Everything)
- Monthly newsletter creation and sending
- List management and segmentation
- Analytics reporting
- **Price**: $150-300/month

#### Option B: Partial Service (You Create, Client Reviews)
- You draft newsletter content
- Client reviews and approves
- You send and manage
- **Price**: $100-200/month

#### Option C: Self-Service (Client Does Everything)
- One-time training included in setup
- Optional support hours as needed
- **Price**: $0/month (just setup fee)

---

## Client Training Guide

### How to Send a Newsletter (Mailchimp)

1. **Log into Mailchimp** at mailchimp.com
2. Click **Create** → **Email** → **Regular**
3. Select your audience (language segment if needed)
4. Choose your saved template
5. Edit the content:
   - Add/change images
   - Update text
   - Add links
6. Preview and test (send to yourself first)
7. Schedule or send immediately

### Monthly Content Checklist

- [ ] Personal greeting/message
- [ ] 1-2 book features with images
- [ ] Any news or events
- [ ] Optional: Behind-the-scenes content
- [ ] Check all links work
- [ ] Preview on mobile

### Managing the Email List

**Adding Subscribers**:
- Subscribers add themselves via website form
- Manual import from spreadsheet if needed

**Removing Subscribers**:
- They click "unsubscribe" in any email (automatic)
- Manual removal from Mailchimp dashboard

**Viewing Analytics**:
1. Go to **Campaigns** → Select a sent campaign
2. View: Open rate, click rate, unsubscribes
3. Typical good rates: 20-30% open rate, 2-5% click rate

---

## Integration with Existing Store (Nuvemshop)

The external store (arcoirisdeamor3.lojavirtualnuvem.com.br) can:
1. Have its own newsletter integration
2. Share the same Mailchimp list (if enabled)
3. Sync customers who opt-in during checkout

**Recommendation**: Keep one unified list in Mailchimp, import store customers who consent.

---

## Timeline Summary

| Week | Tasks |
|------|-------|
| 1 | Mailchimp setup, audience configuration, legal compliance |
| 2 | Website integration, signup form component, API route |
| 3 | Email templates, welcome sequence, testing |
| 4 | Client training, documentation, go-live |

---

## Success Metrics

Track these KPIs monthly:
- **Subscriber Growth**: Target 50-100 new subscribers/month initially
- **Open Rate**: Target 25-35% (industry avg: 21%)
- **Click Rate**: Target 3-5% (industry avg: 2.6%)
- **Unsubscribe Rate**: Keep below 0.5% per email

---

## Appendix: Environment Variables Needed

```env
# Add to .env.local for Mailchimp integration
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_LIST_ID=your-list-id-here
MAILCHIMP_DC=us21  # datacenter from API key suffix
```

---

## Next Steps

1. [ ] Client approval of this plan
2. [ ] Choose email service (recommend Mailchimp)
3. [ ] Create account and configure
4. [ ] Implement website signup form
5. [ ] Design email templates
6. [ ] Set up automations
7. [ ] Train client
8. [ ] Launch!

---

*Document created: December 2024*
*For: Arcoiris de Amor - Vanina Starkoff*
