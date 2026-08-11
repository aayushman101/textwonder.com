# AdSense + BuySellAds Implementation Guide

**Goal:** Get both networks running with proper placements, zero conflicts.

**Timeline:** 
- Week 1: Apply to AdSense + BuySellAds
- Week 2: AdSense approval + implement ads
- Week 3-4: Optimize placements + sponsor outreach
- Month 2-3: Add BuySellAds sponsors

**Expected Revenue:**
- Month 1: $40-60 (AdSense only)
- Month 2: $100-150 (AdSense + initial sponsors)
- Month 3: $150-300 (full setup with 1-2 sponsors)

---

## 📋 Phase 1: Application (Week 1)

### **Step 1: Apply to Google AdSense**

**Time:** 5 minutes  
**URL:** https://adsense.google.com

**Steps:**
1. Go to https://adsense.google.com
2. Click "Sign up now" (top right)
3. Sign in with your Google account (create one if needed)
4. Enter your website: `textwonder.com`
5. Select your country: India (since you're based there)
6. Accept terms and conditions
7. Click "Create account"
8. Google will send a verification email
9. Verify your email (click link in email)
10. Add your payment details (bank account for receiving payments)
11. Wait for approval email (5-7 days)

**What happens next:**
- Google sends a verification code to your site
- You'll need to add a meta tag to your site's `<head>` (I'll do this after approval)
- Once verified + approved, you get your AdSense Publisher ID (starts with `ca-pub-`)

**Keep this safe:** Your Publisher ID (`ca-pub-XXXX...`)

---

### **Step 2: Apply to BuySellAds**

**Time:** 10 minutes  
**URL:** https://www.buysellads.com/publishers

**Steps:**
1. Go to https://www.buysellads.com/publishers
2. Click "Get Started" or "Apply Now"
3. Sign up with email or social login
4. Fill in application:
   - **Website URL:** textwonder.com
   - **Monthly Pageviews:** 10,000+ (be honest)
   - **Primary Content:** Utility tools, developers, students
   - **Traffic breakdown:** Explain your audience (India, USA, global)
   - **Placement:** Explain where ads will go (sidebar, between sections, sponsorship boxes)
5. Upload your site logo (if you have one)
6. Describe your site briefly:
   ```
   TextWonder is a collection of 150+ free browser-based utility tools 
   for text processing, PDF editing, developers, calculators, and students. 
   No signup required. Privacy-first approach with ethical advertising.
   ```
7. Submit application
8. Wait for approval (usually 1-3 days)

**What they're looking for:**
- ✅ Real, established website (you have this)
- ✅ Decent traffic (10K pageviews, you qualify)
- ✅ Engaged audience (developers, students, professionals - great niche)
- ✅ Clear placement opportunities (you have multiple sections)

**After approval:**
- You get a BuySellAds account
- Create ad zones (placements on your site)
- Sponsors can target your site
- You get notifications when sponsors bid on your zones

---

## 💻 Phase 2: Implementation (Week 2-3)

### **Step 3: Add AdSense to Your Site**

**After AdSense approval email:**

#### **3a: Update BaseLayout.astro** (add AdSense script)

```astro
--- src/layouts/BaseLayout.astro ---

<head>
  <!-- ... existing code ... -->

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7Q4Q1J205" is:inline></script>
  <script is:inline>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C7Q4Q1J205');
  </script>

  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
      crossorigin="anonymous" is:inline></script>

  <slot name="head" />
</head>
```

**Important:** Replace `ca-pub-YOUR_PUBLISHER_ID` with your actual Publisher ID from AdSense.

---

#### **3b: Create AdSlot Component**

**File:** `src/components/AdSlot.astro`

```astro
---
interface Props {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
}

const { slot, format = 'auto', responsive = true } = Astro.props;
---

<div class="ad-slot">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
       data-ad-slot={slot}
       data-ad-format={format}
       data-full-width-responsive={responsive.toString()}></ins>
  <script is:inline>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>

<style>
  .ad-slot {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    min-height: 60px;
  }

  @media (max-width: 768px) {
    /* Optional: hide on mobile if needed */
    /* .ad-slot { display: none; } */
  }
</style>
```

**Important:** Replace `ca-pub-YOUR_PUBLISHER_ID` here too.

---

#### **3c: Add Ads to Tool Pages** (Highest Revenue)

**File:** `src/layouts/ToolLayout.astro`

Add after the tool UI section:

```astro
  <!-- Tool UI section -->
  <div class="bg-[var(--bg-surface)] border border-slate-800 rounded-2xl p-6 mb-10">
    <slot />
  </div>

  <!-- AD SLOT #1: After Tool UI -->
  {import('astro').then(() => (
    <div class="mb-10">
      <AdSlot slot="SLOT_ID_1" format="rectangle" />
    </div>
  ))}

  <!-- SEO Content -->
  <section class="mb-10 space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-white mb-2">What is {tool.name}?</h2>
      <p class="text-slate-400 leading-relaxed">{tool.descriptionLong}</p>
    </div>
    <!-- ... rest of SEO content ... -->
  </section>

  <!-- AD SLOT #2: Before FAQs -->
  {import('astro').then(() => (
    <div class="mb-10">
      <AdSlot slot="SLOT_ID_2" format="vertical" />
    </div>
  ))}

  <ToolFAQ faqs={tool.faqs} />
```

**Simpler approach** (without async):

```astro
---
import AdSlot from '../components/AdSlot.astro';
---

  <!-- After tool UI -->
  <div class="mb-10">
    <AdSlot slot="SLOT_ID_1" format="rectangle" />
  </div>

  <!-- Your content here -->

  <!-- Before FAQs -->
  <div class="mb-10">
    <AdSlot slot="SLOT_ID_2" format="vertical" />
  </div>
```

---

#### **3d: Add Ads to Homepage**

**File:** `src/pages/index.astro`

Import AdSlot at the top:
```astro
import AdSlot from '../components/AdSlot.astro';
```

Add after category grid (around line 148):
```astro
  </section>

  <!-- AD: After category section -->
  <section class="max-w-5xl mx-auto px-4 pb-8">
    <AdSlot slot="SLOT_ID_3" format="horizontal" />
  </section>

  <!-- Dynamic Category Explorer Dashboard -->
  <section class="max-w-5xl mx-auto px-4 pb-16" id="dashboard-section">
```

Add after dashboard section (around line 231):
```astro
  </div>

  <!-- AD: After dashboard -->
  <section class="max-w-5xl mx-auto px-4 pb-8">
    <AdSlot slot="SLOT_ID_4" format="horizontal" />
  </section>

  <!-- Privacy section -->
  <section class="bg-[var(--bg-surface)] border-y border-slate-800 py-12">
```

---

#### **3e: Add Ads to Blog Posts**

**File:** `src/layouts/BlogLayout.astro`

Add after article intro:
```astro
  <!-- Article Header -->
  <header class="mb-10">
    <!-- ... existing header ... -->
  </header>

  <!-- AD: After blog header, before content -->
  <div class="mb-10">
    <AdSlot slot="SLOT_ID_5" format="rectangle" />
  </div>

  <!-- Article content -->
  <article class="...">
    <slot />
  </article>
```

---

### **Step 4: Get AdSense Slot IDs**

In AdSense dashboard:
1. Go to **Ads** → **Ad units**
2. Click **Create new ad unit**
3. Create 5 ad units with these names:
   - `Tool Page Ad 1` (300x250)
   - `Tool Page Ad 2` (300x600)
   - `Homepage Ad 1` (728x90)
   - `Homepage Ad 2` (728x90)
   - `Blog Ad 1` (300x250)

4. For each, copy the **Slot ID** (looks like: `1234567890`)
5. Replace `SLOT_ID_1`, `SLOT_ID_2`, etc. in your code with these actual IDs

---

### **Step 5: Build & Deploy**

```bash
# Build your site
npm run build

# Deploy to production
npx wrangler pages deploy dist --project-name textwonder --branch main
```

**Wait for AdSense verification:** 
- Google may send a verification code to your site in the next 24-48 hours
- Add it to BaseLayout.astro head if prompted
- Once verified, ads start showing

---

## 🎯 Phase 3: BuySellAds Setup (Week 2-4)

### **Step 6: Create BuySellAds Zone & Get Script**

**After BuySellAds approval:**

1. Log into your BuySellAds account
2. Go to **Zones** → **Create New Zone**
3. Create zones for each placement:
   - **Zone 1: "Sidebar Sponsor"** (300x250 or 300x600)
   - **Zone 2: "Homepage Sponsor"** (728x90)
   - **Zone 3: "Blog Sponsor"** (300x250)

4. For each zone, copy the **JavaScript snippet** (looks like):
```html
<script src="https://s3.buysellads.com/ac/ACCOUNT_ID.js"></script>
<div id="bsa-zone_ZONE_ID" class="bsa-cpc"></div>
```

---

### **Step 7: Create BuySellAds Component**

**File:** `src/components/BuySellAdsSlot.astro`

```astro
---
interface Props {
  zoneId: string;
  accountId: string;
}

const { zoneId, accountId } = Astro.props;
---

<div class="buysellads-slot">
  <script src={`https://s3.buysellads.com/ac/${accountId}.js`}></script>
  <div id={`bsa-zone_${zoneId}`} class="bsa-cpc"></div>
</div>

<style>
  .buysellads-slot {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    background: var(--bg-surface);
    border: 1px dashed var(--border-color);
    border-radius: 0.5rem;
    padding: 1rem;
    min-height: 60px;
  }

  /* Style sponsor box */
  :global(.bsa-box) {
    background: var(--bg-base) !important;
    border: 1px solid var(--border-color) !important;
  }
</style>
```

---

### **Step 8: Add BuySellAds to Placements**

**File:** `src/layouts/ToolLayout.astro`

```astro
import BuySellAdsSlot from '../components/BuySellAdsSlot.astro';

  <!-- Sidebar: Use BuySellAds instead of or alongside AdSense -->
  <div class="mb-10">
    <BuySellAdsSlot 
      accountId="YOUR_ACCOUNT_ID" 
      zoneId="YOUR_SIDEBAR_ZONE_ID" 
    />
  </div>
```

**File:** `src/pages/index.astro`

```astro
import BuySellAdsSlot from '../components/BuySellAdsSlot.astro';

  <!-- After dashboard section -->
  <section class="max-w-5xl mx-auto px-4 pb-8">
    <BuySellAdsSlot 
      accountId="YOUR_ACCOUNT_ID" 
      zoneId="YOUR_HOMEPAGE_ZONE_ID" 
    />
  </section>
```

---

## 📊 Placement Strategy

### **Tool Pages (70% of traffic)**
- **Slot 1:** AdSense 300x250 (after tool, before content)
- **Slot 2:** BuySellAds sponsor box (in sidebar if space, or between sections)
- **Slot 3:** AdSense 300x250 (before FAQs)

**Revenue potential:** $20-40/month

### **Homepage (15% of traffic)**
- **Slot 1:** AdSense 728x90 (after category section)
- **Slot 2:** BuySellAds sponsor banner (after dashboard)

**Revenue potential:** $5-10/month

### **Blog Posts (15% of traffic)**
- **Slot 1:** AdSense 300x250 (after intro, before content)
- **Slot 2:** BuySellAds sponsor link (in-article mention)

**Revenue potential:** $10-15/month

**Total expected:** $35-65/month from AdSense + sponsors

---

## 🎯 Phase 4: Sponsor Outreach (Week 2-4)

### **Step 9: Reach Out to Sponsors**

**Target Companies** (reach out via BuySellAds or direct email):
- PDF tools (Adobe Acrobat, Foxit, iLovePDF)
- Text/document tools (Microsoft Office, Google Workspace)
- Dev tools (GitHub Pro, Stack Overflow Jobs, CodePen)
- Design tools (Canva, Figma, Adobe Creative Suite)
- Courses (Udemy, Coursera, Skillshare)
- Writing/productivity (Grammarly, Notion, Obsidian)

**BuySellAds Sponsorship Tiers** (typical):
- **Tier 1:** $100-300/month (1 small placement)
- **Tier 2:** $300-500/month (2-3 placements)
- **Tier 3:** $500-1,000/month (homepage + multi-page)

**Email Template:**

```
Subject: Sponsorship Opportunity on TextWonder.com

Hi [Sponsor],

I'm reaching out about a sponsorship opportunity on TextWonder.com — 
a free platform with 10,000+ monthly visitors, primarily developers, 
students, and productivity-focused professionals.

Your audience: India (60%), USA (10%), UK (5%), Global (25%)

Placement options:
- Homepage banner (728x90) — 1,500+ impressions/month
- Tool pages sidebar (300x250) — 5,000+ impressions/month
- Blog posts sponsorship — High engagement

Would you be interested in discussing a partnership? We use BuySellAds 
for sponsorships and can work with you through their platform or directly.

Best regards,
[Your name]
textwonder.com
```

---

## ✅ Checklist: Week-by-Week

### **Week 1 (This Week)**
- [ ] Apply to Google AdSense (5 min)
- [ ] Apply to BuySellAds (10 min)
- [ ] Start draft list of potential sponsors
- [ ] Estimate placements needed (how many ad slots)

### **Week 2 (After AdSense approval)**
- [ ] Get AdSense Publisher ID
- [ ] Add AdSense script to BaseLayout.astro
- [ ] Create AdSlot.astro component
- [ ] Add ads to ToolLayout.astro (2 slots)
- [ ] Add ads to index.astro (2 slots)
- [ ] Add ads to BlogLayout.astro (1 slot)
- [ ] Build & deploy to production

### **Week 3 (Monitor & Optimize)**
- [ ] Check AdSense dashboard daily
- [ ] Monitor impressions, clicks, CPM
- [ ] Wait for AdSense verification (if needed)
- [ ] Block low-paying ad categories (optional)
- [ ] Reach out to first batch of sponsors

### **Week 4 (Add Sponsors)**
- [ ] Receive BuySellAds approval (if not already)
- [ ] Create BuySellAds ad zones
- [ ] Create BuySellAdsSlot.astro component
- [ ] Add sponsor placements to pages
- [ ] Deploy new sponsor zones
- [ ] Continue sponsor outreach

---

## 💰 Expected Revenue Timeline

| Week | AdSense | BuySellAds | Total |
|------|---------|-----------|-------|
| 1 | — | — | — |
| 2 | $2-5 (pending) | — | $2-5 |
| 3 | $5-10 | — | $5-10 |
| 4 | $10-15 | $50-100 (1 sponsor) | $60-115 |
| Month 2 | $20-30 | $100-200 (1-2 sponsors) | $120-230 |
| Month 3 | $30-40 | $150-300 (2-3 sponsors) | $180-340 |

---

## ⚠️ Important Notes

### **AdSense Policy**
- ✅ DON'T click your own ads
- ✅ DON'T direct traffic to your own site via ads
- ✅ DON'T place ads in misleading locations
- ✅ DO maintain 200+ words per page (you exceed this)
- ✅ DO ensure ads are clearly visible as ads
- ✅ DO respect user privacy (no tracking beyond Google)

### **BuySellAds Policy**
- ✅ Be honest about traffic (10K pageviews is real)
- ✅ Sponsors can track their campaigns
- ✅ You don't control which sponsors appear
- ✅ Revenue depends on sponsor demand
- ✅ Sponsors want ROI (clicks matter)

### **Site Performance**
- AdSense script adds ~30-50ms to load time
- BuySellAds script adds ~20-30ms to load time
- Total impact: ~50-80ms (acceptable)
- Monitor Core Web Vitals in Google Search Console
- If load time increases significantly, reduce ad density

---

## 🔍 Monitoring Dashboard

### **Daily (First 2 weeks)**
- AdSense: Impressions, clicks, CPM
- BuySellAds: Sponsor status, impressions

### **Weekly**
- AdSense: Earnings, CPM trends
- BuySellAds: Sponsor performance, inquiries

### **Monthly**
- Revenue report
- Top-performing pages
- Audience demographics
- Block underperforming categories

---

## 📞 Support Resources

**AdSense Help:**
- Dashboard: https://adsense.google.com
- Help Center: https://support.google.com/adsense
- Policy Questions: Contact via dashboard

**BuySellAds Help:**
- Dashboard: https://www.buysellads.com
- Help Center: https://help.buysellads.com
- Sponsor Inquiries: Check dashboard notifications

---

## 🚀 Next Steps

**IMMEDIATE (Today/Tomorrow):**
1. ✅ Apply to AdSense
2. ✅ Apply to BuySellAds
3. ✅ Confirm you have your site details ready

**Once approved:**
1. Get Publisher ID from AdSense
2. Update BaseLayout.astro
3. Create AdSlot component
4. Add ads to pages
5. Deploy

**I can help with:**
- Creating the components
- Adding ads to each layout
- Deploying to production
- Monitoring performance

**Ready?** I'm standing by to help implement once you get approval emails!
