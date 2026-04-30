// WDC Training Platform — Course & Module Data
// To update a YouTube video: change the `youtubeId` field (11-char ID from the URL).
// If youtubeId is null the module shows a "Search on YouTube" button instead.

export const COURSES = [
  // ─── COURSE 0 — WDC ONBOARDING (pinned first, featured) ─────────────────────
  {
    id: "disaster-hero",
    title: "Becoming a Disaster Hero",
    tagline: "Your complete guide to joining WDC and changing the world",
    description:
      "The official onboarding course for every WDC team member, volunteer, and partner. Understand who we are, what we do, how we do it, and how YOU fit into the mission of saving lives and building resilient communities worldwide.",
    level: "Required — All WDC Members",
    duration: "3.5 hours",
    totalModules: 7,
    color: "bg-amber-500",
    icon: "🦸",
    featured: true,
    modules: [
      {
        id: "dh-1",
        title: "Welcome to WDC — Our Story",
        duration: "30 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "world disaster center WDC disaster management organization overview",
        content: `
## Welcome, Disaster Hero.

You have just joined one of the most purposeful organisations in the world. The World Disaster Center (WDC) exists for one reason: **to protect human lives and build communities that can withstand, recover from, and grow beyond disaster.**

This is your story now. Let us start by understanding where it began.

---

## The WDC Story

### The Problem We Were Created to Solve

Every year, natural and human-made disasters kill hundreds of thousands of people, displace millions, and erase decades of hard-won development. Yet in most cases, disasters are not truly "natural" — they become catastrophic because of preventable failures: inadequate early warning, poor coordination, lack of data, and communities that were never empowered to protect themselves.

The global disaster management system was fragmented. Governments, NGOs, technology companies, and communities were working in silos. Information arrived too late, or not at all. Resources were misallocated. Vulnerable people fell through the gaps.

**WDC was born to fix this.**

### Our Founding Vision

The World Disaster Center was founded on a bold conviction: that **technology, when harnessed with human intelligence and humanitarian values**, can transform disaster management from reactive to predictive — from fragmented to coordinated — from exclusive to inclusive.

Our founder and Executive Director, **Sapiens Ndatabaye Kanyunyi**, built WDC with the vision of creating a truly global centre of excellence — not just for research and policy, but for action. A place where the best minds in technology, humanitarian work, and community resilience come together to serve humanity.

### Who We Are Today

WDC is a global organisation operating across multiple continents, with programmes in disaster risk reduction, early warning systems, humanitarian technology, capacity building, and policy advocacy. We serve:

- **Governments** seeking to strengthen national disaster management systems
- **Communities** in disaster-prone regions who need tools and training to protect themselves
- **Humanitarian organisations** that need better data, coordination, and technology
- **Private sector partners** committed to resilience and social responsibility
- **Individual professionals** — like you — who want to make a difference

### Our Global Reach

WDC works across regions including:
- **Africa** — supporting national platforms, early warning systems, and community resilience from the Sahel to the Great Lakes
- **Asia-Pacific** — engaging with cyclone, flood, and earthquake-prone communities
- **The Americas** — building partnerships in disaster-prone regions
- **Global** — through our digital platforms, training programmes, and policy engagement at the United Nations

### The WDC Brand Promise

Every person who works with, for, or through WDC carries a promise:

> *"We will use our skills, knowledge, and resources to reduce the suffering caused by disasters — guided always by the principles of humanity, impartiality, and respect for the dignity of every person."*

You have just made that promise. Welcome to the team.
        `,
        quiz: {
          question: "What is the core conviction on which WDC was founded?",
          options: [
            "That disasters are natural and unavoidable events",
            "That technology alone can eliminate all disasters",
            "That technology harnessed with human intelligence and humanitarian values can transform disaster management",
            "That only governments can effectively manage disasters",
          ],
          correct: 2,
          explanation:
            "WDC was founded on the conviction that technology — when harnessed with human intelligence and humanitarian values — can transform disaster management from reactive to predictive, and from fragmented to coordinated.",
        },
      },
      {
        id: "dh-2",
        title: "Our Mission, Vision & Values in Action",
        duration: "25 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "humanitarian organization mission values culture team",
        content: `
## What WDC Stands For

Understanding our mission, vision, and values is not just about knowing the words — it is about internalising what they mean for every decision, every action, and every interaction you have as part of this organisation.

---

## Our Mission

> **"To redefine global disaster management by harnessing the transformative power of integrated technologies and collective human intelligence — empowering communities and organisations worldwide with the tools and insights necessary for preemptive action, effective response, and sustainable recovery."**

### What This Means in Practice

**Preemptive action**: We do not wait for disasters to happen. We work to predict them, warn communities in advance, and help build systems that reduce their impact before they strike.

**Effective response**: When disasters do occur, we ensure that responders have the data, tools, and coordination they need to reach people quickly and efficiently.

**Sustainable recovery**: We help communities rebuild in ways that make them stronger, not just restore the status quo that made them vulnerable in the first place.

---

## Our Vision

> **"A world where every community, regardless of location or socioeconomic status, is equipped with the knowledge, tools, and capabilities to effectively manage disasters and transform challenges into catalysts for development."**

This is an ambitious vision — intentionally so. WDC does not accept a world where the poorest and most marginalised communities bear the greatest burden of disaster. We work toward a future of genuine equity in resilience.

---

## Our Core Values

These five values are the non-negotiable foundation of everything WDC does. They are not aspirational posters on a wall — they are lived daily commitments.

### 1. Humanity
We exist to reduce human suffering. Every programme, product, and policy position starts with the question: *Does this serve the most vulnerable people?*

### 2. Integrity
We are honest about what we know and what we don't. We keep our commitments. We acknowledge mistakes and learn from them. We never compromise our principles for funding, convenience, or political pressure.

### 3. Innovation
We challenge the conventional. We believe that better solutions exist and that it is our responsibility to find and apply them. Innovation at WDC is not about technology for its own sake — it is about better outcomes for people.

### 4. Inclusion
Disaster risk is not equally distributed. Neither is our sector's attention. WDC explicitly centres the voices, needs, and capacities of communities that are most often left behind — women, children, persons with disabilities, displaced persons, and indigenous communities.

### 5. Impact
We measure ourselves by results. Not inputs. Not activities. Not good intentions. We invest in monitoring, evaluation, and learning so that we can honestly assess whether our work is making a difference — and change course when it is not.

---

## The WDC Culture

Working at WDC means:
- Being **proactive** — bringing solutions, not just problems
- Being **collaborative** — our strength comes from diverse perspectives working together
- Being **accountable** — to beneficiaries, to partners, and to each other
- Being **curious** — the disaster landscape is always changing; we must always be learning
- Being **kind** — the work is hard; we support each other with empathy and grace
        `,
        quiz: {
          question: "Which WDC value means that we explicitly centre the needs and voices of communities most often left behind?",
          options: ["Humanity", "Innovation", "Inclusion", "Impact"],
          correct: 2,
          explanation:
            "Inclusion is the value that drives WDC to explicitly centre women, children, persons with disabilities, displaced persons, and indigenous communities — those most often left behind in disaster management systems.",
        },
      },
      {
        id: "dh-3",
        title: "The Global Disaster Landscape",
        duration: "30 min",
        type: "video+text",
        youtubeId: "oHg5SJYRHA0",
        youtubeSearch: "global disaster risk landscape 2024 climate humanitarian crisis",
        content: `
## Understanding the World You Are Working In

To do your job effectively at WDC, you need a clear-eyed understanding of the disaster landscape — the scale of the challenge, the key trends, and the systems in which we operate.

---

## The Scale of the Challenge

### By the Numbers

- **350–500 million** people are affected by disasters every year globally
- Over the past 20 years, disasters have cost the world more than **$3 trillion** in economic losses
- **Disaster events are increasing** in frequency — from approximately 100 significant events per year in the 1970s to over 400 per year today
- Climate change is projected to **increase the intensity** of hurricanes, floods, droughts, and wildfires significantly by 2050
- **90% of deaths from natural disasters** occur in low- and middle-income countries despite these countries representing a much smaller share of global GDP

### The Inequality of Disaster Risk

Disaster risk is not distributed fairly. The communities with the **least resources and political power** are typically the most exposed to hazards, the most vulnerable when disaster strikes, and the slowest to recover.

This is the injustice that WDC works to address.

---

## Key Global Frameworks

As a WDC team member, you will frequently encounter these international frameworks. Know them well.

### The Sendai Framework for Disaster Risk Reduction (2015–2030)

Adopted by 187 UN Member States. Sets four priorities:
1. Understanding disaster risk
2. Strengthening disaster risk governance
3. Investing in disaster risk reduction for resilience
4. Enhancing disaster preparedness for effective response

**WDC's work directly contributes to all four priorities.**

### The Paris Agreement (2015)

The global climate agreement. Relevant to WDC because climate change is the single largest driver of increasing disaster risk.

### The Sustainable Development Goals (SDGs)

17 goals for global development by 2030. Disaster risk reduction is embedded across multiple SDGs — particularly SDG 11 (Sustainable Cities), SDG 13 (Climate Action), and SDG 17 (Partnerships).

### The Grand Bargain

A commitment between major humanitarian donors and organisations to channel at least 25% of funding to local and national actors. WDC is committed to localisation.

---

## The Humanitarian System

WDC operates within and alongside the global humanitarian system:

**UN OCHA** (Office for the Coordination of Humanitarian Affairs): Coordinates the global humanitarian response. WDC is aligned with OCHA's values and branding (OCHA Blue).

**The Cluster System**: Organises humanitarian response into sectors (shelter, food, health, education, etc.). WDC supports multiple clusters.

**The Red Cross / Red Crescent Movement**: The world's largest humanitarian network. An important partner for WDC in community-level response.

**UNDRR** (UN Office for Disaster Risk Reduction): The custodian of the Sendai Framework. WDC engages actively with UNDRR processes.

---

## What This Means for Your Work

Every role at WDC — whether you work in technology, communications, programmes, or partnerships — contributes to shifting this landscape. Your work matters. The scale of the problem makes the urgency of doing it well all the greater.
        `,
        quiz: {
          question: "What percentage of deaths from natural disasters occur in low- and middle-income countries?",
          options: ["50%", "70%", "90%", "100%"],
          correct: 2,
          explanation:
            "Approximately 90% of deaths from natural disasters occur in low- and middle-income countries — a stark reflection of the inequality in both disaster risk and resilience. This injustice is central to WDC's mission.",
        },
      },
      {
        id: "dh-4",
        title: "WDC's Programs, Platforms & Global Products",
        duration: "35 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "disaster management technology AI early warning system platform",
        content: `
## What WDC Does — Our Programmes and Products

Understanding WDC's full portfolio helps you connect your role to the bigger picture and collaborate effectively across teams.

---

## Strategic Programme Areas

### 1. Disaster Intelligence & Early Warning

WDC develops and supports **early warning systems** that give communities enough time to act before disasters strike. This includes:
- Integration of satellite data, sensor networks, and meteorological feeds
- AI-powered risk scoring models at national and sub-national level
- Community-level dissemination systems (SMS alerts, radio, community networks)

**Why it matters**: Early warning can reduce disaster mortality by up to **40%** — but only if warnings reach the last mile.

### 2. Humanitarian Technology

WDC builds and implements digital tools that improve the efficiency and equity of humanitarian response:
- **Needs assessment platforms** for rapid field data collection
- **Coordination dashboards** for multi-agency response management
- **Decision support systems** that translate data into actionable recommendations

### 3. Capacity Building & Training

WDC's training programmes — including this platform you are using right now — equip individuals, organisations, and governments with the knowledge and skills to manage disaster risk effectively.

Training is delivered through:
- This online WDC Academy (self-paced, certified)
- In-person workshops and simulations
- Training of Trainers (ToT) programmes
- Technical assistance to national emergency management agencies

### 4. Research & Knowledge Management

WDC produces **applied research** that bridges the gap between academic knowledge and operational practice:
- Situation reports and analysis during active crises
- Post-disaster reviews and lessons-learned reports
- Policy briefs for government and UN audiences
- Data publications on the Humanitarian Data Exchange (HDX)

### 5. Policy & Advocacy

WDC engages in global and regional policy processes to ensure that disaster risk reduction is prioritised and funded:
- Submissions to UN processes
- Technical support to National Disaster Risk Reduction Strategies
- Media engagement and public awareness campaigns

---

## WDC Global Products

### EAGLE — Automated Disaster Assessment Tool

**EAGLE** (Emergency Assessment and Global Land Evaluation) is WDC's flagship technology product. It provides:
- **Real-time automated assessment** of disaster impact using satellite imagery, sensor data, and AI
- **Damage maps** at building level within hours of a disaster
- **Population exposure estimates** for affected areas
- **Situation reports** generated automatically for emergency coordinators

EAGLE is currently operational in select regions and is being scaled globally.

### WDC Intelligence (WDC News)

The **WDC Intelligence platform** curates and publishes disaster-related news, analysis, and community-submitted reports — creating a global open-source intelligence resource for humanitarian actors.

### WDC Training Academy

The platform you are currently using. Open to the public and WDC staff alike, providing certified training in all aspects of disaster management.

### WDC Partnership Network

A global network of governments, NGOs, academic institutions, and private sector actors working together on disaster risk reduction. WDC convenes and facilitates this network.

---

## How Our Products Work Together

Each WDC product serves a different stage of the disaster management cycle:

| Stage | WDC Product / Programme |
|---|---|
| Prevention & Mitigation | Policy advocacy, EAGLE risk modelling |
| Preparedness | Training Academy, capacity building |
| Response | EAGLE assessment, coordination dashboards |
| Recovery | Needs analysis, post-disaster research |
| Learning | Knowledge management, lessons-learned reports |
        `,
        quiz: {
          question: "What does WDC's EAGLE platform primarily provide?",
          options: [
            "A newsletter subscription service for disaster updates",
            "Training certificates for humanitarian workers",
            "Real-time automated disaster impact assessment using satellite imagery and AI",
            "A database of partner organisations",
          ],
          correct: 2,
          explanation:
            "EAGLE (Emergency Assessment and Global Land Evaluation) is WDC's flagship AI-powered platform that provides real-time automated assessment of disaster impact using satellite imagery, sensor data, and AI — generating damage maps and situation reports within hours of a disaster.",
        },
      },
      {
        id: "dh-5",
        title: "Your Role at WDC — How the Organisation Works",
        duration: "30 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "humanitarian organization team structure working culture NGO",
        content: `
## Understanding How WDC Works — and Where You Fit

Every person at WDC — regardless of their role, location, or seniority — is part of one integrated team working toward a shared mission. Understanding how the organisation is structured helps you collaborate effectively and get things done.

---

## WDC's Organisational Principles

### 1. Mission First, Always

Every decision — from strategy to budgeting to daily tasks — should be traceable back to our mission. When in doubt about a decision, ask: *Does this serve the people we exist to protect?*

### 2. Flat Where It Counts, Structured Where It Helps

WDC values open communication and collaborative decision-making. You are expected — and encouraged — to share ideas, raise concerns, and challenge assumptions, regardless of your seniority. At the same time, clear structures and accountabilities exist to ensure things get done.

### 3. Localisation and Partnership Over Delivery

WDC does not impose solutions. We partner, co-design, and build the capacity of local actors. If we are delivering directly, we are also building the pathway toward local ownership.

---

## Core Functions at WDC

WDC's work is organised around these core functions. Understanding each one helps you collaborate across teams:

**Programmes**: Design and implement WDC's field-level and technical interventions. The engine of our impact.

**Technology & Data**: Build, maintain, and improve WDC's digital products and data systems (EAGLE, dashboards, training platforms).

**Communications**: Manage WDC's external presence — website, social media, publications, media relations, and brand.

**Partnerships & Resource Mobilisation**: Develop and manage relationships with donors, governments, UN agencies, and partner organisations.

**Training & Capacity Building**: Design and deliver WDC's learning programmes, including this platform.

**Finance & Operations**: Ensure WDC runs efficiently, compliantly, and sustainably.

**Research & Knowledge Management**: Generate, curate, and share knowledge that advances the field.

---

## Working Across WDC

### Collaboration Norms

- **Communicate proactively**: Do not wait to be asked. Share progress, flag issues early, and loop in relevant colleagues.
- **Document your work**: WDC's value is in its collective knowledge. Write things down, share lessons, and keep records accessible.
- **Respect everyone's time**: Come to meetings prepared. Start and end on time. Follow up on actions.
- **Be direct and kind**: WDC values honest, respectful communication. Avoid passive-aggressive behaviour or office politics.

### Decision-Making at WDC

- **Decisions affecting your direct work**: Make them autonomously, within agreed parameters.
- **Decisions affecting your team or partners**: Consult relevant stakeholders before deciding.
- **Decisions with significant programme, financial, or reputational implications**: Escalate to your manager and document the rationale.

### Communication Tools

WDC uses a combination of email, collaborative document tools, video conferencing, and messaging platforms. Check with your manager for the specific tools used in your team. Always use official WDC communication channels for external communications.

---

## Performance and Growth at WDC

WDC believes in continuous learning and development. Every team member has:
- Regular check-ins with their direct manager
- Access to WDC's training programmes (including this Academy)
- Opportunities to contribute to cross-functional projects
- A performance cycle with clear objectives and honest feedback

Growth at WDC is driven by impact, not tenure. If you are making a difference, you will be supported to do more.
        `,
        quiz: {
          question: "Which principle describes WDC's approach to partnerships and field implementation?",
          options: [
            "WDC delivers all programmes directly to maximise quality control",
            "WDC partners, co-designs, and builds local capacity rather than imposing solutions",
            "WDC only funds other organisations and does not implement directly",
            "WDC focuses exclusively on technology and leaves field work to others",
          ],
          correct: 1,
          explanation:
            "WDC's localisation principle means we partner, co-design, and build the capacity of local actors — not impose solutions from outside. If WDC delivers directly, there is always a pathway toward local ownership built in.",
        },
      },
      {
        id: "dh-6",
        title: "Humanitarian Principles & WDC Code of Conduct",
        duration: "30 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "humanitarian principles humanity neutrality impartiality independence do no harm",
        content: `
## The Rules That Guide Everything

At WDC, we operate within a clear ethical framework. Understanding these principles and commitments is not optional — it is foundational to your work and your identity as a WDC team member.

---

## The Four Humanitarian Principles

These principles, enshrined in UN General Assembly Resolution 46/182 (1991), guide all humanitarian action. WDC is committed to upholding them in all our work.

### 1. Humanity
Human suffering must be addressed wherever it is found. The purpose of humanitarian action is to protect life and health, and to ensure respect for human beings. WDC's mandate is driven entirely by this principle.

### 2. Neutrality
Humanitarian actors must not take sides in hostilities or engage in controversies of a political, racial, religious, or ideological nature. WDC serves all affected people equally, without regard to their politics, ethnicity, or beliefs.

### 3. Impartiality
Humanitarian action must be carried out on the basis of need alone, giving priority to the most urgent cases and making no distinctions based on nationality, race, gender, religious belief, class, or political opinions. WDC allocates resources and attention based solely on need.

### 4. Independence
Humanitarian action must be autonomous from the political, economic, military, or other objectives that any actor may hold with regard to areas where humanitarian action is being implemented. WDC's programming decisions are never subordinated to the interests of donors, governments, or political actors.

---

## WDC Code of Conduct

Every person who works with or for WDC is bound by this code. Violations are taken seriously and may result in termination of engagement.

### What You Must Always Do

- **Treat all people with dignity and respect**, regardless of their background, beliefs, or status
- **Maintain confidentiality** of all personal and operational information entrusted to you
- **Report concerns** — if you witness or suspect misconduct, you have a responsibility to report it through WDC's designated channels
- **Represent WDC accurately** — do not make commitments or statements on behalf of WDC that you do not have authority to make
- **Protect organisational assets** — WDC's resources exist to serve our mission; they are not for personal use

### What You Must Never Do

- **Never exploit or abuse** any person with whom WDC works — this includes beneficiaries, partners, and colleagues
- **Never solicit or accept** gifts, favours, or payments that could create or imply a conflict of interest
- **Never engage in fraud, corruption, or misuse of funds** — WDC has a zero-tolerance policy
- **Never share confidential information** about WDC's operations, partners, or beneficiaries without authorisation
- **Never make personal social media posts** that contradict WDC's values or publicly state positions on behalf of WDC without approval

### Safeguarding

WDC is committed to the protection of all people — especially children and vulnerable adults — from harm, abuse, and exploitation by our staff or partners. Every WDC team member is required to:
- Complete WDC's safeguarding training
- Report any safeguarding concerns immediately
- Follow WDC's safeguarding policies in all programmatic activities

### Whistleblower Protection

WDC has a clear policy: anyone who reports misconduct in good faith will be protected from retaliation. If you witness or suspect a violation of this Code of Conduct, report it. You will be heard, and you will be protected.

---

## Conflict of Interest

A conflict of interest arises when your personal interests — financial, personal, or professional — could improperly influence WDC decisions or actions. Disclose all potential conflicts to your manager in writing. When in doubt, disclose.
        `,
        quiz: {
          question: "Which humanitarian principle requires that WDC allocates resources based solely on need, without discrimination?",
          options: ["Humanity", "Neutrality", "Impartiality", "Independence"],
          correct: 2,
          explanation:
            "Impartiality means that humanitarian action is carried out based on need alone, giving priority to the most urgent cases with no distinctions based on nationality, race, gender, religion, class, or political opinions.",
        },
      },
      {
        id: "dh-7",
        title: "Tools, Systems & Your First 30 Days",
        duration: "20 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "onboarding first 30 days new job checklist remote team",
        content: `
## Getting Started — Your First 30 Days at WDC

Congratulations on completing the substantive training modules. This final module gives you a practical guide to your first 30 days at WDC — and points you to the resources and systems you'll use in your role.

---

## Your First Week

### Day 1–3: Orient Yourself
- Meet your manager and direct team members
- Complete all required HR and administrative onboarding (contracts, IT access, etc.)
- Review WDC's current strategic priorities and your team's workplan
- Read the most recent WDC Annual Report and Situation Reports

### Day 4–7: Understand the Landscape
- Map the key internal and external stakeholders relevant to your role
- Review ongoing projects and programmes in your area
- Identify any tools and systems you will be using (ask your manager for access)
- Begin attending team meetings and regular stand-ups

---

## Your First Month

### Week 2: Listen and Learn
- Schedule 1:1 conversations with colleagues across WDC's functions
- Ask: *What does success look like in your area? What are the biggest challenges? What do you wish you'd known when you started?*
- Review key documents: strategic plans, donor reports, M&E frameworks

### Week 3: Identify Quick Wins
- With your manager, identify 2–3 concrete tasks you can contribute to in the short term
- Demonstrate your commitment through reliable follow-through on these tasks
- Ask for feedback early — you want to know if you are on the right track before 30 days are up

### Week 4: Set Your Objectives
- Agree on clear, measurable objectives with your manager for your first 3 months
- These should connect your specific role to WDC's broader mission and programme goals
- Schedule a formal check-in at the end of month 1 and month 3

---

## Key Tools and Systems

The tools below are commonly used across WDC. Your manager will guide you to those specific to your role.

| Tool | Purpose |
|---|---|
| Email & Calendar | All internal and external communication |
| WDC Training Academy | This platform — ongoing professional development |
| Google Workspace / Microsoft 365 | Document creation, collaboration, storage |
| KoBoToolbox / ODK | Field data collection (Programmes team) |
| EAGLE Platform | Disaster impact assessment (Technology team) |
| Humanitarian Data Exchange (HDX) | Open data publishing and access |
| ReliefWeb | Humanitarian information and job postings |
| Video Conferencing | Remote meetings and webinars |

---

## Reaching Out for Help

**For programme and technical questions**: Your direct manager and team colleagues

**For HR and administrative queries**: Your WDC HR or Operations contact

**For IT and systems access**: Your manager or WDC IT support

**For partnership and donor questions**: WDC Partnerships team

**For any concerns about conduct, safeguarding, or ethics**:
WDC's designated reporting channel — or directly to the Executive Director

**For certificate verification or advanced training enquiries**:
📧 **office@worlddisastercenter.org**

---

## You Are Now a Disaster Hero

You have completed the WDC onboarding course. You understand our story, our mission, our values, our programmes, our ethics, and your role in the organisation.

Now it is time to get to work.

The world needs you. Your communities need you. WDC needs you.

**Welcome to the team. Let's go build a more resilient world.**

— *Sapiens Ndatabaye Kanyunyi, Executive Director, WDC*
        `,
        quiz: {
          question: "Where should you direct enquiries about certificate verification or advanced WDC training?",
          options: [
            "To your direct manager only",
            "To the WDC social media pages",
            "To office@worlddisastercenter.org",
            "There is no verification process for WDC certificates",
          ],
          correct: 2,
          explanation:
            "Certificate verification and enquiries about advanced WDC training should be sent to office@worlddisastercenter.org — where WDC's team can issue verifiable certificates and guide you to further training opportunities.",
        },
      },
    ],
  },
  // ─── OTHER COURSES ───────────────────────────────────────────────────────────
  {
    id: "disaster-preparedness",
    title: "Disaster Preparedness Fundamentals",
    tagline: "Build the foundation every community needs",
    description:
      "Learn how to assess risk, build household and community preparedness plans, and take proactive steps before disaster strikes.",
    level: "Beginner",
    duration: "2 hours",
    totalModules: 4,
    color: "bg-blue-600",
    icon: "🏠",
    modules: [
      {
        id: "dp-1",
        title: "Understanding Disaster Risk",
        duration: "25 min",
        type: "video+text",
        youtubeId: "NpBOsVgBUlI",
        youtubeSearch: "understanding disaster risk UNDRR explained",
        content: `
## What is Disaster Risk?

Disaster risk is not random. It is the product of **hazard**, **exposure**, and **vulnerability** — and understanding each element is the first step to reducing the impact of disasters on communities.

### The Risk Equation

> **Risk = Hazard × Exposure × Vulnerability**

- **Hazard**: A dangerous event or phenomenon — an earthquake, cyclone, flood, drought, or pandemic — that has the potential to cause loss.
- **Exposure**: People, infrastructure, and economic assets located in hazard zones.
- **Vulnerability**: The conditions that make a community susceptible to damage — poverty, weak governance, poor construction standards, and lack of early warning systems.

### Types of Disasters

| Category | Examples |
|---|---|
| Natural — Hydro-meteorological | Floods, storms, droughts, wildfires |
| Natural — Geophysical | Earthquakes, volcanic eruptions, tsunamis |
| Biological | Pandemics, epidemics, pest infestations |
| Technological | Industrial accidents, oil spills, nuclear incidents |
| Complex / Human-induced | Conflict, displacement, food insecurity |

### Why Disaster Risk is Increasing

Climate change is intensifying the frequency and severity of weather-related hazards. Rapid urbanisation places more people in exposed areas. The Sendai Framework for Disaster Risk Reduction (2015–2030), adopted by 187 UN member states, sets the global direction for reducing risk.

### Key Takeaway

Disasters are not inevitable — they become disasters when risk is not managed. Every action taken before an event reduces suffering, saves lives, and cuts the cost of recovery.
        `,
        quiz: {
          question: "What are the three components of disaster risk?",
          options: [
            "Response, Recovery, Mitigation",
            "Hazard, Exposure, Vulnerability",
            "Preparedness, Communication, Logistics",
            "Climate, Geography, Population",
          ],
          correct: 1,
          explanation:
            "Disaster risk is the product of Hazard × Exposure × Vulnerability. Reducing any one of these three factors reduces overall risk.",
        },
      },
      {
        id: "dp-2",
        title: "Household Emergency Planning",
        duration: "30 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "how to make a family emergency plan FEMA ready",
        content: `
## Creating Your Household Emergency Plan

A household emergency plan ensures your family knows what to do, where to go, and who to contact before, during, and after a disaster.

### Step 1 — Know Your Risks

Identify the hazards most likely to affect your area:
- Check local government risk maps
- Talk to your local emergency management office
- Note the specific risks for your street/building (flood zone, fault line proximity, etc.)

### Step 2 — Designate Meeting Points

Choose **two meeting locations**:
1. Directly outside your home (for sudden emergencies like fire)
2. Away from your neighbourhood (if evacuation is needed)

Ensure every household member knows both locations without needing a phone.

### Step 3 — Establish a Communication Plan

- Select an **out-of-area contact** — it is often easier to call long-distance during a local disaster
- Write down key phone numbers (do not rely solely on your phone)
- Identify how you will receive official alerts (radio, SMS, apps)

### Step 4 — Know Your Evacuation Routes

- Identify at least **two routes** out of your neighbourhood
- Know the location of your nearest emergency shelter
- Plan for family members who may need assistance (elderly, children, people with disabilities)

### Step 5 — Assign Roles

Everyone in the household should have a clear role:
- Who calls the out-of-area contact?
- Who picks up children from school?
- Who assists elderly or disabled household members?
- Who turns off utilities (gas, electricity, water) if needed?

### Review & Practice

A plan on paper is not enough. Practice your plan at least twice a year, including an evacuation drill.
        `,
        quiz: {
          question: "How many meeting point locations should a household emergency plan include?",
          options: ["One — directly outside the home", "Two — one near the home, one away from the area", "Three — home, workplace, and school", "None — rely on emergency services to direct you"],
          correct: 1,
          explanation:
            "Two meeting points are recommended: one immediately outside your home for sudden emergencies, and one further away in case your neighbourhood must be evacuated.",
        },
      },
      {
        id: "dp-3",
        title: "Building Your Emergency Kit",
        duration: "25 min",
        type: "video+text",
        youtubeId: "rOgIy4fapNA",
        youtubeSearch: "emergency preparedness kit how to build FEMA 72 hours",
        content: `
## Your 72-Hour Emergency Kit

Authorities may take up to 72 hours (3 days) to reach you after a major disaster. Being self-sufficient during this window saves lives.

### Minimum Kit Contents

**Water & Food**
- At least **4 litres** of water per person per day (for drinking and sanitation)
- 72-hour supply of non-perishable food (canned goods, dried food, energy bars)
- Manual can opener
- Baby formula or food if applicable

**First Aid**
- Fully stocked first aid kit (see Module 1 of the Emergency Response course)
- Supply of prescription medications (at least 1-week supply)
- Copies of prescriptions and medical records

**Documents (waterproof folder)**
- Identification documents (passports, birth certificates, national ID)
- Insurance documents
- Emergency contact list
- Bank account details and some cash

**Tools & Safety**
- Battery-powered or hand-crank radio
- Flashlight with extra batteries
- Whistle (to signal for help)
- Multi-purpose tool / Swiss Army knife
- Dust masks or respirators
- Duct tape and plastic sheeting

**Clothing & Shelter**
- Warm clothing and sturdy closed-toe shoes for every household member
- Emergency blankets
- Rain gear

**Communication**
- Fully charged power bank for phones
- Written copy of emergency contacts

### Maintaining Your Kit

- Check expiry dates every **6 months**
- Replace water supplies every **6–12 months**
- Update documents and medication stocks annually
- Store kit in an easily accessible, secure location
        `,
        quiz: {
          question: "Why is a 72-hour emergency kit recommended?",
          options: [
            "Because most disasters last exactly 3 days",
            "Because emergency responders may take up to 72 hours to reach you",
            "Because water becomes unsafe after 72 hours",
            "Because insurance only covers 72 hours of losses",
          ],
          correct: 1,
          explanation:
            "After a major disaster, emergency services may be overwhelmed. Being self-sufficient for at least 72 hours ensures your survival while help is mobilised.",
        },
      },
      {
        id: "dp-4",
        title: "Community-Level Preparedness",
        duration: "40 min",
        type: "video+text+quiz",
        youtubeId: "1F_AX_HVMBE",
        youtubeSearch: "community disaster preparedness resilience planning",
        content: `
## Why Communities Must Prepare Together

Individual preparedness is essential — but disasters affect entire communities. Collective action before an event dramatically reduces casualties and recovery time.

### Community Preparedness Principles

**1. Map Your Community's Risk**
Work with local leaders, schools, and health workers to create a community risk map showing:
- Flood-prone areas
- Locations of vulnerable populations (elderly, disabled, children)
- Critical infrastructure (water sources, hospitals, shelters)
- Safe evacuation routes

**2. Establish a Community Emergency Team (CET)**
Train volunteers in:
- Search and rescue basics
- First aid
- Fire suppression
- Shelter management
- Communication

**3. Early Warning Systems**
Ensure your community has:
- A clear chain of communication for official warnings
- Local alarm systems (bells, megaphones, SMS trees)
- Practice drills at least twice a year

**4. Inclusion of Vulnerable Groups**
Preparedness plans must explicitly address:
- Persons with disabilities
- Elderly community members
- Pregnant women and nursing mothers
- Children and unaccompanied minors

**5. Links to Formal Systems**
Community teams should coordinate with:
- National and local emergency management authorities
- The Red Cross/Red Crescent
- Local NGOs and faith organisations

### The Sendai Framework Target

The Sendai Framework for Disaster Risk Reduction (2015–2030) calls for a **substantial increase** in community-level risk governance by 2030. WDC supports governments and communities in meeting this target.
        `,
        quiz: {
          question: "Which of the following is a key element of community preparedness?",
          options: [
            "Waiting for the government to issue a preparedness plan",
            "Mapping community risks and vulnerable populations",
            "Ensuring only trained professionals are involved",
            "Limiting preparedness to urban areas",
          ],
          correct: 1,
          explanation:
            "Community risk mapping — identifying hazard-prone areas, critical infrastructure, and vulnerable residents — is a foundational step in collective preparedness.",
        },
      },
    ],
  },

  {
    id: "emergency-response",
    title: "Emergency Response & First Aid",
    tagline: "Save lives with knowledge and calm action",
    description:
      "Gain practical life-saving skills including CPR, wound care, evacuation leadership, search and rescue basics, and psychological first aid.",
    level: "Beginner–Intermediate",
    duration: "3 hours",
    totalModules: 5,
    color: "bg-red-600",
    icon: "🚑",
    modules: [
      {
        id: "er-1",
        title: "Basic Life Support & CPR",
        duration: "35 min",
        type: "video+text",
        youtubeId: "cosVnTKWMjk",
        youtubeSearch: "CPR basic life support tutorial Red Cross",
        content: `
## Basic Life Support (BLS)

Basic Life Support is the foundation of emergency care. It can keep someone alive until professional help arrives.

### The Chain of Survival

1. **Early recognition** — Identify an emergency
2. **Call for help** — Activate emergency services immediately
3. **Early CPR** — Start chest compressions within seconds
4. **Early defibrillation** — Use an AED if available
5. **Advanced care** — Hand over to professional responders

### Cardiopulmonary Resuscitation (CPR)

**When to start CPR**: When a person is unresponsive, not breathing normally, and has no pulse.

**Adult CPR Steps**:
1. Ensure the scene is safe
2. Check for responsiveness (tap shoulders, shout)
3. Call for emergency services / send someone to call
4. Position the person on their back on a firm surface
5. Place the heel of your hand on the centre of the chest
6. Press down at least **5 cm** at a rate of **100–120 compressions per minute**
7. After every 30 compressions, give 2 rescue breaths (if trained)
8. Continue until emergency services arrive or the person recovers

**Compression-only CPR**: If you are not trained in rescue breaths, continuous chest compressions alone are effective.

### Choking — The Heimlich Manoeuvre

**For a conscious adult or child (over 1 year)**:
1. Stand behind the person, wrap your arms around their waist
2. Make a fist with one hand and place it just above the navel
3. Cover the fist with your other hand
4. Give sharp, upward thrusts until the obstruction clears

**For infants (under 1 year)**:
- Use alternating back blows and chest thrusts — never abdominal thrusts

### Automated External Defibrillators (AEDs)

AEDs are found in many public places. They are designed for use by non-medical people:
- Turn on the device — it will give audio instructions
- Attach the pads as shown in the diagrams
- Allow the machine to analyse and shock if instructed
- Resume CPR immediately after each shock
        `,
        quiz: {
          question: "At what rate should chest compressions be delivered during CPR?",
          options: ["60–70 per minute", "80–90 per minute", "100–120 per minute", "140–160 per minute"],
          correct: 2,
          explanation:
            "The internationally recommended CPR compression rate is 100–120 compressions per minute, at a depth of at least 5 cm for adults.",
        },
      },
      {
        id: "er-2",
        title: "Wound Care & Trauma Management",
        duration: "35 min",
        type: "video+text",
        youtubeId: "VXRpwpqBQA0",
        youtubeSearch: "wound care bleeding control first aid trauma",
        content: `
## Managing Wounds and Trauma in the Field

Uncontrolled bleeding is the leading preventable cause of death from trauma. Fast, correct action saves lives.

### Controlling Severe Bleeding

**Step 1 — Apply Direct Pressure**
- Use a clean cloth, bandage, or dressing
- Press firmly and continuously — do not remove the cloth (add more on top if soaked)
- Maintain pressure for at least **10 minutes**

**Step 2 — Elevate if Possible**
- Raise the injured limb above the level of the heart to slow blood flow
- Do not elevate if a fracture is suspected

**Step 3 — Tourniquet (for life-threatening limb bleeding)**
- Apply 5–7 cm above the wound on the upper arm or thigh
- Tighten until bleeding stops
- Note the time of application — write it on the person's skin
- Do NOT remove in the field — this is for professional medics to manage

### Treating Burns

| Burn Degree | Appearance | First Aid |
|---|---|---|
| 1st degree (superficial) | Red, dry, painful | Cool with running water for 20 minutes |
| 2nd degree | Blistered, wet, very painful | Cover with non-stick dressing; do not pop blisters |
| 3rd degree | Charred, leathery, painless | Call emergency services; cover loosely with clean dressing |

**Never**: apply ice, butter, toothpaste, or any household remedy to burns.

### Fractures & Immobilisation

- Do not attempt to straighten a fractured limb
- Immobilise the joint above and below the fracture using a splint and padding
- Monitor circulation below the fracture (check pulses, sensation, movement)
- Treat for shock: keep the person warm, calm, and lying down

### Recognising and Treating Shock

Shock occurs when vital organs receive insufficient blood. Signs:
- Rapid, weak pulse
- Pale, cold, clammy skin
- Confusion and agitation
- Rapid, shallow breathing

**Treatment**: Lay the person flat, raise legs 30 cm (unless head, neck, or chest injury), keep warm, and call for emergency services immediately.
        `,
        quiz: {
          question: "When should a tourniquet be used?",
          options: [
            "For all wounds to the arms or legs",
            "Only when direct pressure has been applied for at least 30 minutes",
            "For life-threatening limb bleeding that cannot be controlled by direct pressure",
            "Never — tourniquets are dangerous and should be avoided",
          ],
          correct: 2,
          explanation:
            "A tourniquet is a last resort for life-threatening limb bleeding that cannot be controlled by direct pressure alone. It should be applied 5–7 cm above the wound and the time recorded.",
        },
      },
      {
        id: "er-3",
        title: "Evacuation Procedures & Leadership",
        duration: "30 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "emergency evacuation procedures leadership disaster",
        content: `
## Leading an Evacuation

Effective evacuation saves lives — but poorly organised evacuations cause additional casualties. Good leadership and clear procedures make the difference.

### Pre-Evacuation Checklist

Before an evacuation becomes necessary:
- Know your primary and secondary evacuation routes
- Identify the location of your nearest official shelter
- Ensure all household or team members know the plan
- Keep vehicles fuelled; know the public transport options

### Initiating an Evacuation

**If time allows**:
1. Alert all people in your area using established signals
2. Account for everyone — use a roster or head count
3. Assist vulnerable individuals first
4. Take emergency kits and critical documents
5. Lock up and turn off utilities if safe to do so
6. Travel in groups when possible

**If immediate evacuation is required**:
- Leave immediately — possessions can be replaced, lives cannot
- Alert neighbours as you leave
- Follow official routes — shortcuts may be unsafe

### Traffic and Crowd Management

During mass evacuations, traffic congestion is a major risk:
- Follow instructions from emergency management officials
- Use contra-flow lanes if established
- Do not return once evacuated until officially cleared
- Avoid mobile phone calls that clog networks — use SMS or apps

### Shelter Identification and Registration

Upon arrival at a shelter:
- Register with the shelter management team
- Report any missing persons
- Identify and report any medical needs
- Follow shelter rules and cooperate with staff

### Accounting for Vulnerable People

Evacuation plans must include specific provisions for:
- Persons with mobility limitations
- People with visual or hearing impairments
- Elderly residents who may need assistance
- Children separated from caregivers
- People with cognitive disabilities
        `,
        quiz: {
          question: "What is the most important priority during a forced evacuation?",
          options: [
            "Securing valuables and property",
            "Ensuring everyone is accounted for before leaving",
            "Leaving immediately and saving lives",
            "Contacting the media",
          ],
          correct: 2,
          explanation:
            "When a forced evacuation is required, leaving immediately is the top priority. Possessions can be replaced — lives cannot. Alert others as you go, but do not delay.",
        },
      },
      {
        id: "er-4",
        title: "Search & Rescue Basics",
        duration: "35 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "community search and rescue basics CERT training",
        content: `
## Community Search & Rescue (SAR)

Trained community members are often the first to begin search and rescue operations before professional teams arrive. This module covers basic techniques for urban search and rescue (USAR) in disaster settings.

### The LAST Framework

- **L — Locate**: Systematically search for survivors using sight, sound, and smell
- **A — Access**: Reach the survivor safely without causing further harm
- **S — Stabilise**: Provide basic first aid and reassurance
- **T — Transport**: Move the survivor safely to a collection point

### Personal Safety First

Never compromise your own safety during a rescue:
- Assess the structural integrity of collapsed buildings before entering
- Watch for secondary collapse, fire, gas leaks, and electrical hazards
- Work in teams of at least two
- Maintain constant communication with your team leader

### Search Techniques

**Voice search**: Call out regularly; stop and listen for responses. Survivors often tap on debris or call out.

**Visual search**: Look for signs of life — movement, hands, clothing, blood trails.

**Systematic grid search**: Divide the search area into grids; search each grid thoroughly before moving on.

### Lifting and Moving Survivors

- Move a survivor ONLY if they are in immediate danger
- Support the head, neck, and spine at all times
- Use a stretcher or improvised stretcher (blanket, jacket) for movement
- For spinal injuries, maintain neutral spine alignment throughout

### Signalling Systems

Use the INSARAG standard:
- **Chalk or spray paint markings** on buildings to indicate: search started, search complete, number of survivors found, number of fatalities
- **Whistle signals**: 3 blasts = help needed; 1 blast = stop noise (listen for survivors)
        `,
        quiz: {
          question: "What does the 'A' stand for in the LAST framework for search and rescue?",
          options: ["Alert", "Access", "Assess", "Assist"],
          correct: 1,
          explanation:
            "In the LAST framework: Locate, Access, Stabilise, Transport. 'Access' means reaching the survivor safely without causing further harm to them or the rescue team.",
        },
      },
      {
        id: "er-5",
        title: "Psychological First Aid",
        duration: "25 min",
        type: "text+quiz",
        youtubeId: "OaOSqZXFJKE",
        youtubeSearch: "psychological first aid training WHO disaster mental health",
        content: `
## Psychological First Aid (PFA)

Disasters cause not only physical harm but profound psychological distress. Psychological First Aid (PFA) is the evidence-based approach to supporting people in the immediate aftermath of an emergency.

### What PFA Is — and Is Not

**PFA IS:**
- Safe, compassionate, practical support
- Listening without pressure to talk
- Connecting people to information, services, and social support
- Respecting dignity, culture, and human rights

**PFA is NOT:**
- Counselling or therapy
- Forcing people to relive their experiences
- Clinical debriefing
- Requiring people to talk about their feelings

### The PFA Core Actions (WHO, 2011)

**1. Look**
- Observe and assess the situation for safety
- Identify who needs help and what kind
- Notice people who are highly distressed

**2. Listen**
- Approach people with care and respect
- Introduce yourself and ask if they need support
- Give full attention; do not rush
- Accept silence — not everyone needs to talk

**3. Link**
- Help people access basic needs (water, food, shelter, medical care)
- Help them connect with loved ones
- Provide information about available services
- Support access to additional help if needed

### Common Reactions After Disaster

Distress is normal after abnormal events. Common reactions include:
- Shock, disbelief, numbness
- Fear and anxiety
- Grief and sadness
- Anger, irritability
- Sleep disturbance, nightmares
- Physical symptoms (headache, fatigue)

Most people recover with time and social support. **Seek professional help** if symptoms persist for more than 4 weeks or significantly impair daily functioning.

### Self-Care for Responders

You cannot pour from an empty cup. Responders must:
- Take regular breaks
- Eat, drink, and rest
- Connect with colleagues
- Seek support from supervisors or mental health professionals
- Recognise and accept limits
        `,
        quiz: {
          question: "Which of the following best describes Psychological First Aid?",
          options: [
            "Providing counselling and therapy to trauma survivors",
            "Forcing survivors to discuss their feelings to process trauma",
            "Offering compassionate, practical support and helping people access services",
            "Clinical debriefing of emergency responders",
          ],
          correct: 2,
          explanation:
            "PFA is about safe, compassionate, practical support — not therapy or forcing people to relive their experiences. The WHO's three core actions are Look, Listen, and Link.",
        },
      },
    ],
  },

  {
    id: "humanitarian-data",
    title: "Humanitarian Data & Technology",
    tagline: "Harness data to drive faster, smarter responses",
    description:
      "Understand how data collection, AI analytics, and digital platforms are transforming disaster management — and how to use them responsibly.",
    level: "Intermediate",
    duration: "2.5 hours",
    totalModules: 4,
    color: "bg-indigo-600",
    icon: "📡",
    modules: [
      {
        id: "hd-1",
        title: "Introduction to Crisis Informatics",
        duration: "35 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "crisis informatics big data humanitarian response",
        content: `
## Crisis Informatics: Data at the Heart of Disaster Response

Crisis informatics is the interdisciplinary study of how information and communication technologies are used — and how information flows — during disasters. It sits at the intersection of computer science, social science, and disaster management.

### Why Data Matters in Disasters

In the first hours of a major disaster, responders face the following questions:
- How many people are affected, and where?
- What are the most urgent needs?
- Which roads and bridges are passable?
- Where is the damage concentrated?

Accurate, timely data answers these questions and drives the allocation of scarce resources.

### Types of Crisis Data

| Data Type | Examples |
|---|---|
| Remote sensing | Satellite imagery, drone footage, aerial photography |
| Social media | Twitter/X reports, Facebook Safety Check, community posts |
| Crowdsourced | Ushahidi reports, OpenStreetMap contributions |
| Official | Government databases, census data, health records |
| Sensor data | River gauges, seismographs, weather stations |
| Ground truth | Field assessments, surveys, interviews |

### The Data Life Cycle in Emergencies

1. **Collection** — gathering raw data from diverse sources
2. **Processing** — cleaning, filtering, and structuring data
3. **Analysis** — identifying patterns, trends, and needs
4. **Dissemination** — sharing actionable information with decision-makers
5. **Feedback** — validating information and updating assessments

### Key Challenges

- **Volume**: Too much data can be as paralyzing as too little
- **Velocity**: Data becomes outdated rapidly in a fast-moving crisis
- **Veracity**: Rumours, misinformation, and unverified reports spread quickly
- **Equity**: Not all affected populations are equally represented in digital data

### WDC's Approach

WDC integrates multi-source data streams — satellite imagery, sensor networks, crowdsourced intelligence, and official reports — into unified dashboards that support real-time decision-making.
        `,
        quiz: {
          question: "Which of the following is NOT a major challenge in crisis data management?",
          options: [
            "Volume of incoming data",
            "Rapid obsolescence of information",
            "Presence of misinformation",
            "Availability of satellite internet",
          ],
          correct: 3,
          explanation:
            "The three V challenges in crisis data are Volume, Velocity, and Veracity (accuracy). Satellite internet availability is a logistics challenge, not a data management challenge.",
        },
      },
      {
        id: "hd-2",
        title: "Data Collection in the Field",
        duration: "40 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "humanitarian data collection kobo toolbox ODK field survey",
        content: `
## Collecting Data in Crisis Settings

Field data collection is the backbone of needs assessments, damage evaluations, and population tracking. Getting it right requires both technical skill and a commitment to ethical practice.

### Digital Data Collection Tools

**KoBoToolbox** (free for humanitarian use):
- Build surveys online and deploy to mobile devices
- Works offline — syncs when connectivity is restored
- Used by UNHCR, WFP, UNICEF, and 14,000+ organisations globally

**ODK (Open Data Kit)**:
- Open-source platform for mobile data collection
- Supports GPS coordinates, photos, barcodes, and complex skip logic
- Widely used in health and disaster settings

**ArcGIS Survey123**:
- Esri's field data tool with native GIS integration
- Strong for spatial data collection

### Designing a Needs Assessment Survey

A good rapid needs assessment covers:
- **Who**: Population count, demographics, vulnerable groups
- **What**: Type and severity of impact (structural damage, injury, displacement)
- **Where**: GPS coordinates, administrative boundary (district, municipality)
- **Needs**: Water, food, shelter, health, protection, education
- **Capacity**: What local resources exist

**Sampling strategy**: In large-scale disasters, use stratified random sampling — divide the affected area into zones and randomly select locations to survey.

### GPS and Mapping

- Collect GPS coordinates for each assessment point
- Use OpenStreetMap (OSM) to create and update base maps
- The Humanitarian Data Exchange (HDX) platform hosts open datasets for crisis contexts

### Ethical Principles in Data Collection

**Do No Harm**: Collecting information about vulnerable people carries risks. Data must be:
- **Purposeful**: Collected only for a defined humanitarian purpose
- **Secure**: Protected from misuse, hacking, or unauthorised access
- **Consented**: Participants must understand how their data will be used
- **Minimised**: Collect only what is necessary
- **Anonymous** where possible: Strip identifying information before sharing

### Quality Control

- Double-check GPS coordinates in the field
- Conduct back-checks (re-survey a random 10% of cases)
- Review data for outliers and logical inconsistencies daily
        `,
        quiz: {
          question: "Which principle requires that personal data is only collected for a specific, defined purpose?",
          options: ["Data minimisation", "Purpose limitation", "Informed consent", "Data anonymisation"],
          correct: 1,
          explanation:
            "Purpose limitation means that data should only be collected and used for a clearly defined humanitarian purpose. Collecting data for one purpose and using it for another violates this principle.",
        },
      },
      {
        id: "hd-3",
        title: "AI & Predictive Analytics for Disaster Management",
        duration: "35 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "artificial intelligence disaster management early warning prediction",
        content: `
## Artificial Intelligence in Disaster Management

Artificial intelligence is transforming how we predict, prepare for, and respond to disasters — but it must be used responsibly, with a clear understanding of its limitations.

### How AI Adds Value

**1. Predictive Risk Modelling**
Machine learning models trained on historical data can predict:
- Flood risk based on rainfall, elevation, and soil type
- Disease outbreak likelihood based on climate and population density
- Wildfire spread given wind speed, humidity, and vegetation data

**2. Rapid Damage Assessment**
AI-powered image classification can analyse satellite imagery to:
- Map building damage within hours of an earthquake
- Identify flooded roads and bridges
- Estimate the population in a displaced persons camp

**3. Needs Forecasting**
Natural language processing (NLP) analyses social media and call centre logs to:
- Identify emerging needs before formal assessments are completed
- Detect geographic hotspots of distress
- Flag misinformation and rumours

**4. Resource Optimisation**
Operations research algorithms optimise:
- Warehouse pre-positioning before a storm
- Supply chain routing after a disaster
- Ambulance and search-and-rescue team deployment

### WDC's AI Applications

WDC's EAGLE platform integrates satellite data, sensor networks, and AI to provide:
- Real-time disaster impact assessments
- Predictive risk scores at district level
- Automated situation reports for decision-makers

### Limitations and Risks

AI is a tool, not a replacement for human judgment:
- **Bias**: Models trained on incomplete or biased data produce biased outputs
- **Opacity**: "Black box" models may not explain their predictions
- **Data gaps**: AI performs poorly in data-sparse environments (common in disasters)
- **Overreliance**: Human oversight is essential at all times

### The Principles for Responsible AI in Humanitarian Action

The ICRC and UN have outlined key principles:
- Transparency: Explain how AI systems reach conclusions
- Accountability: Humans remain responsible for all decisions
- Non-discrimination: Ensure AI does not disadvantage vulnerable groups
- Privacy: Protect personal data used to train and operate models
        `,
        quiz: {
          question: "What is one key risk of using AI systems in humanitarian response?",
          options: [
            "They are too slow to process data",
            "They may produce biased outputs if trained on incomplete data",
            "They cannot be used without internet connectivity",
            "They require large teams to operate",
          ],
          correct: 1,
          explanation:
            "AI models trained on incomplete or biased data will produce biased results. In a humanitarian context, this can mean some affected populations are overlooked, leading to inequitable resource allocation.",
        },
      },
      {
        id: "hd-4",
        title: "Digital Coordination Platforms",
        duration: "40 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "humanitarian coordination platform digital 4W who what where when",
        content: `
## Digital Platforms for Humanitarian Coordination

When dozens of organisations respond to a disaster simultaneously, coordination prevents duplication, fills gaps, and saves lives. Digital platforms are the backbone of modern humanitarian coordination.

### The 4W Matrix

The **4W matrix** (Who does What, Where, and When) is the standard coordination tool used by the UN and humanitarian clusters. It answers:
- **Who** is active (which organisation)
- **What** activities are being implemented
- **Where** (geographic location to the district level)
- **When** (start and end dates of activities)

### Key Coordination Platforms

**ReliefWeb** (OCHA)
- The world's leading humanitarian information portal
- Hosts situation reports, maps, job listings, and guidelines
- URL: reliefweb.int

**Humanitarian Data Exchange (HDX)**
- Open platform for sharing crisis data
- Hosts over 19,000 datasets from 1,000+ organisations
- URL: data.humdata.org

**OCHA's Virtual OSOCC** (On-Site Operations Coordination Centre)
- Real-time coordination platform for search and rescue teams
- Used during major sudden-onset disasters

**ActivityInfo**
- Online tool for 4W reporting, results monitoring, and sector coordination
- Used by UNHCR, UNICEF, and national authorities in 70+ countries

**DHIS2**
- Health information system used in 100+ countries
- Manages routine health data and emergency health surveillance

### Inter-Cluster Coordination

Humanitarian response is organised through **clusters** — groups of organisations working in the same sector (shelter, food, health, education, etc.). Each cluster:
- Meets regularly to coordinate activities
- Prepares joint needs assessments
- Develops sector strategies
- Reports to the Humanitarian Coordinator

### Information Management Best Practices

- Use **standardised data schemas** — everyone uses the same codes for districts, activities, and population groups
- Share data openly on HDX wherever possible
- Update 4W data at least monthly — more frequently during acute phases
- Produce **Situation Reports** (SitReps) that combine data from multiple clusters
        `,
        quiz: {
          question: "What does the 4W matrix stand for in humanitarian coordination?",
          options: [
            "Water, Wash, Welfare, Women",
            "Who, What, Where, When",
            "Warning, Watch, Work, Withdraw",
            "Workers, Workloads, Warehouses, Waste",
          ],
          correct: 1,
          explanation:
            "The 4W matrix — Who does What, Where, and When — is the standard coordination tool used to map humanitarian activities, prevent duplication, and identify geographic and sectoral gaps.",
        },
      },
    ],
  },

  {
    id: "community-resilience",
    title: "Community Resilience Building",
    tagline: "Empower communities to withstand, adapt, and grow",
    description:
      "Explore frameworks and practical tools for building lasting resilience in communities at risk — from risk assessment to stakeholder engagement and local capacity.",
    level: "Intermediate",
    duration: "2 hours",
    totalModules: 4,
    color: "bg-green-600",
    icon: "🌱",
    modules: [
      {
        id: "cr-1",
        title: "Frameworks for Community Resilience",
        duration: "25 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "community resilience framework disaster risk reduction UNDRR",
        content: `
## Understanding Community Resilience

Resilience is the ability of a system, community, or society to **resist, absorb, accommodate, adapt to, transform, and recover** from a hazard in a timely and efficient manner. True resilience goes beyond surviving — it means coming back stronger.

### Key Resilience Dimensions

**Absorptive Capacity**: The ability to cope with a shock and continue basic functions
**Adaptive Capacity**: The ability to adjust strategies and practices based on experience
**Transformative Capacity**: The ability to fundamentally change systems that create risk

### The Sendai Framework's Seven Targets

The Sendai Framework (2015–2030) sets specific targets for disaster risk reduction, including:
1. Reduce global disaster mortality
2. Reduce the number of affected people
3. Reduce direct economic losses
4. Reduce damage to critical infrastructure
5. Increase national and local disaster risk reduction strategies
6. Increase international cooperation to developing nations
7. Increase access to early warning systems

### Measuring Resilience

The **Baseline Resilience Indicators for Communities (BRIC)** measures resilience across six pillars:
- Social
- Economic
- Institutional
- Infrastructural
- Community capital
- Environmental

### What Makes a Community Resilient?

Research consistently shows that resilient communities have:
- Strong social networks and trust
- Diverse economic bases (not dependent on one sector)
- Local leadership and governance capacity
- Access to quality infrastructure
- Robust early warning systems
- A culture of learning from past events
        `,
        quiz: {
          question: "What are the three main resilience capacities?",
          options: [
            "Physical, Mental, Financial",
            "Absorptive, Adaptive, Transformative",
            "Reactive, Proactive, Retroactive",
            "Local, Regional, National",
          ],
          correct: 1,
          explanation:
            "Resilience science identifies three key capacities: Absorptive (withstanding shocks), Adaptive (adjusting strategies), and Transformative (changing underlying systems that create risk).",
        },
      },
      {
        id: "cr-2",
        title: "Community Risk Assessment Methods",
        duration: "35 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "participatory community risk assessment disaster vulnerability",
        content: `
## Conducting a Participatory Community Risk Assessment (PCRA)

A Participatory Community Risk Assessment (PCRA) engages community members as active participants in identifying hazards, mapping vulnerabilities, and uncovering local capacities.

### Why Participation Matters

When communities participate in assessing their own risk:
- They are more likely to act on the findings
- Local knowledge enriches technical assessments
- It builds community ownership of preparedness plans
- It strengthens social cohesion

### PCRA Tools and Techniques

**1. Hazard Mapping**
Draw a map of the community showing:
- Location of hazards (flood zones, landslide-prone slopes, fault lines)
- Critical assets (hospital, school, market, water source)
- Evacuation routes and safe zones

**2. Historical Timeline**
Record past disasters in the community:
- What happened? When?
- What was the impact?
- How did the community respond?
- What worked? What did not?

**3. Seasonal Calendar**
Map hazard patterns against livelihood cycles:
- When are floods, droughts, or storms most likely?
- When is the community most vulnerable (harvest season, planting)?
- When are schools open?

**4. Venn Diagram of Institutions**
Identify organisations and relationships:
- Which institutions exist in or near the community?
- How do they interact?
- Which have influence on disaster management decisions?

**5. Transect Walk**
A guided walk through the community with local guides to:
- Observe physical conditions
- Identify risks not captured in maps
- Validate information from other tools

### Disaggregating Data

Risk assessments must capture differences within communities:
- Women and men often have different vulnerabilities and capacities
- Children, elderly, and persons with disabilities face specific risks
- Marginalised groups may be excluded from mainstream assessments

Always disaggregate data by **sex, age, and disability status** at minimum.
        `,
        quiz: {
          question: "What is the primary advantage of a Participatory Community Risk Assessment?",
          options: [
            "It is faster than technical assessments",
            "It requires no trained facilitators",
            "It builds community ownership and integrates local knowledge",
            "It only needs to be done once",
          ],
          correct: 2,
          explanation:
            "Participatory risk assessments build community ownership of the findings and integrate local knowledge that external technical assessments often miss, making action plans more effective and more likely to be implemented.",
        },
      },
      {
        id: "cr-3",
        title: "Stakeholder Engagement & Partnership",
        duration: "30 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "stakeholder engagement disaster risk reduction community partnership",
        content: `
## Building Effective Partnerships for Resilience

No single organisation or institution can build community resilience alone. Effective partnerships across government, civil society, the private sector, and communities are essential.

### Mapping Your Stakeholders

Use a **Stakeholder Analysis Matrix** to identify:
- Who are the key actors in this community?
- What is their level of influence and interest in resilience?
- What are their capacities and resources?
- What are their priorities and potential concerns?

**High Influence + High Interest** → Key partners — engage closely
**High Influence + Low Interest** → Keep satisfied — address their concerns
**Low Influence + High Interest** → Keep informed — build their capacity
**Low Influence + Low Interest** → Monitor — minimal engagement needed

### Principles of Effective Partnership

**1. Shared Purpose**
All partners must agree on a common goal — reducing disaster risk for the community.

**2. Complementarity**
Partners should bring different resources and capabilities, not duplicate each other.

**3. Accountability**
Define clear roles, responsibilities, and accountability mechanisms in written agreements (MoUs, partnership frameworks).

**4. Mutual Benefit**
Long-lasting partnerships deliver value to all partners, not just the recipient community.

**5. Transparency**
Share information openly, including budgets, decisions, and challenges.

### Working with Government

Government counterparts are essential for:
- Legitimacy and scale
- Policy change and enforcement
- Sustainable funding beyond project cycles

**Tips for government engagement**:
- Align your work with national DRR strategies and priorities
- Communicate in terms of government mandates and budget cycles
- Invest in long-term relationships with technical staff, not only political leaders

### Community Leadership

The most resilient communities are led by strong local organisations:
- Community Disaster Committees (CDC)
- Women's groups and youth associations
- Faith organisations
- Local business associations

Invest in training and supporting these groups, not bypassing them.
        `,
        quiz: {
          question: "In a stakeholder analysis, how should you engage 'high influence, high interest' stakeholders?",
          options: [
            "Monitor with minimal engagement",
            "Keep them informed with regular updates",
            "Keep them satisfied by addressing their concerns",
            "Engage them closely as key partners",
          ],
          correct: 3,
          explanation:
            "Stakeholders with both high influence and high interest in your work should be engaged closely as key partners — they have both the motivation and the power to significantly contribute to or affect your programme.",
        },
      },
      {
        id: "cr-4",
        title: "Sustaining Local Capacity",
        duration: "30 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "local capacity building disaster resilience sustainability",
        content: `
## Building Capacity That Lasts

Capacity building is not about importing external solutions — it is about strengthening what communities already have and enabling them to continue without outside support.

### Defining Capacity

Capacity operates at three levels:

**Individual**: Knowledge, skills, and motivation of community members and leaders
**Organisational**: Systems, processes, and resources of local institutions
**Enabling Environment**: Policies, laws, budgets, and governance frameworks that support action

Sustainable resilience requires working at all three levels simultaneously.

### Training vs. Learning

Training events (workshops, courses) are necessary but not sufficient. Sustainable learning requires:
- **Mentoring** and on-the-job coaching
- **Peer learning** between communities facing similar challenges
- **Documentation** of lessons and good practices
- **Communities of practice** that continue beyond projects

### Common Capacity Building Mistakes

1. **Importing solutions** designed elsewhere without adaptation to local context
2. **Focusing only on training** without addressing systems and incentives
3. **Working with elites** and missing the most vulnerable
4. **Dependency creation** — designing programs that require continued external support
5. **Short time horizons** — building capacity takes years, not months

### Measuring Capacity Development

Use pre- and post-assessments to measure:
- Knowledge gain (test scores before and after training)
- Skill demonstration (practical assessments)
- Organisational strength (institutional capacity assessments)
- Behaviour change (observation of practices over time)
- Community outcomes (reduction in disaster losses over time)

### Localisation and the Grand Bargain

The humanitarian system's **Grand Bargain** commitments (2016) call for greater funding and decision-making authority to flow directly to local and national actors. WDC is committed to:
- Ensuring at least 25% of humanitarian funding reaches local actors
- Providing multi-year, flexible funding to community organisations
- Removing unnecessary compliance requirements that burden small organisations
        `,
        quiz: {
          question: "At which three levels does capacity operate in disaster resilience programmes?",
          options: [
            "National, Regional, Local",
            "Individual, Organisational, Enabling Environment",
            "Technical, Financial, Human",
            "Prevention, Response, Recovery",
          ],
          correct: 1,
          explanation:
            "Capacity operates at three interdependent levels: Individual (people's knowledge and skills), Organisational (institutions' systems and resources), and the Enabling Environment (policies, laws, and governance frameworks). Sustainable resilience requires strengthening all three.",
        },
      },
    ],
  },

  {
    id: "climate-disaster-risk",
    title: "Climate Change & Disaster Risk",
    tagline: "Understand the link between climate and catastrophe",
    description:
      "Explore the science of climate-driven disasters, learn adaptation strategies, and understand the policy landscape for climate resilience.",
    level: "Intermediate",
    duration: "2.5 hours",
    totalModules: 4,
    color: "bg-orange-500",
    icon: "🌡️",
    modules: [
      {
        id: "cc-1",
        title: "Climate Science for Disaster Professionals",
        duration: "35 min",
        type: "video+text",
        youtubeId: "G4LHmS-yMI8",
        youtubeSearch: "climate change science explained IPCC global warming disasters",
        content: `
## The Climate System and Disaster Risk

Climate change is not a future threat — it is reshaping disaster risk today. Understanding the science is essential for effective disaster management.

### The Greenhouse Effect and Global Warming

The Earth's climate is driven by the balance between incoming solar energy and outgoing heat. **Greenhouse gases** (CO₂, CH₄, N₂O, and others) trap heat in the atmosphere, warming the planet.

Since the Industrial Revolution, human activities — burning fossil fuels, deforestation, industrial agriculture — have raised atmospheric CO₂ concentrations from ~280 ppm to over **420 ppm**, driving a global average temperature increase of approximately **1.2°C** above pre-industrial levels.

### The IPCC and Climate Science

The **Intergovernmental Panel on Climate Change (IPCC)** is the United Nations body for assessing climate science. Its Sixth Assessment Report (2022) concluded with **unequivocal certainty** that human influence has warmed the atmosphere, ocean, and land.

### How Climate Change Amplifies Disaster Risk

| Disaster Type | Climate Change Impact |
|---|---|
| Floods | Increased rainfall intensity; faster snowmelt; sea-level rise |
| Droughts | More frequent and prolonged dry periods |
| Hurricanes/Cyclones | More intense storms; higher wind speeds; greater rainfall |
| Wildfires | Longer fire seasons; drier vegetation |
| Heatwaves | More frequent, longer, and more intense |
| Coastal flooding | Sea-level rise; storm surge amplification |

### Tipping Points

Scientists warn of **climate tipping points** — thresholds beyond which changes become self-reinforcing and irreversible:
- Collapse of the West Antarctic Ice Sheet
- Dieback of the Amazon rainforest
- Thawing of Arctic permafrost (releasing stored methane)
- Loss of Arctic summer sea ice

Crossing tipping points could dramatically accelerate disaster risk globally.
        `,
        quiz: {
          question: "What is the approximate current global average temperature increase above pre-industrial levels?",
          options: ["0.5°C", "1.2°C", "2.0°C", "3.5°C"],
          correct: 1,
          explanation:
            "As of 2023, the global average temperature has risen approximately 1.2°C above pre-industrial levels (1850–1900 baseline), according to the IPCC Sixth Assessment Report.",
        },
      },
      {
        id: "cc-2",
        title: "Climate-Driven Disaster Risk Profiles",
        duration: "40 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "climate change extreme weather flooding drought cyclone risk",
        content: `
## Regional Climate-Disaster Risk Profiles

Climate change does not affect all regions equally. Understanding how climate impacts manifest in different geographies is critical for context-specific disaster management.

### Sub-Saharan Africa

**Key risks**: Drought, flooding, heatwaves, shifting rainfall patterns
- 80% of agricultural production is rain-fed, making food security highly climate-sensitive
- Rapid urbanisation is placing more people in flood-prone informal settlements
- Lake levels (Victoria, Chad) are declining, affecting water security for millions

### South and South-East Asia

**Key risks**: Cyclones, floods, landslides, sea-level rise
- Bangladesh, Vietnam, and Myanmar are among the world's most climate-vulnerable nations
- The Bay of Bengal generates some of the world's deadliest tropical cyclones
- Glacial melt in the Himalayas creates glacial lake outburst flood (GLOF) risk

### Small Island Developing States (SIDS)

**Key risks**: Sea-level rise, tropical cyclones, storm surge, coral bleaching
- Some nations (Tuvalu, Marshall Islands) face an existential threat from sea-level rise
- Tourism-dependent economies are highly vulnerable to climate shocks
- Fresh water scarcity worsens with saltwater intrusion

### The Middle East and North Africa

**Key risks**: Extreme heat, water scarcity, desertification, dust storms
- Parts of the Gulf are approaching the human physiological heat tolerance limit
- Water availability is among the lowest per capita in the world
- Climate-induced migration and conflict risk are interlinked

### The Arctic

**Key risks**: Permafrost thaw, sea ice loss, coastal erosion
- Warming at 3–4 times the global average rate
- Infrastructure damage from permafrost thaw affects entire communities
- Changes in ice affect indigenous communities' food security and culture

### Loss and Damage

Beyond adaptation, climate change causes **loss and damage** — economic and non-economic losses that cannot be adapted to. The COP27 agreement (2022) to establish a Loss and Damage fund was a historic milestone for climate justice.
        `,
        quiz: {
          question: "What is 'loss and damage' in the context of climate change?",
          options: [
            "Insurance claims for property damage from natural disasters",
            "Climate impacts that exceed the limits of adaptation",
            "Losses from carbon emissions trading",
            "Damage caused by loss of biodiversity",
          ],
          correct: 1,
          explanation:
            "Loss and damage refers to climate-related impacts that go beyond what people can adapt to — including displacement, cultural losses, and ecosystem destruction. A Loss and Damage fund was established at COP27 in 2022.",
        },
      },
      {
        id: "cc-3",
        title: "Climate Adaptation Strategies",
        duration: "35 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "climate change adaptation strategies community resilience solutions",
        content: `
## Adapting to a Changing Climate

Climate adaptation is the process of adjusting to actual or expected climate change and its effects. Effective adaptation reduces vulnerability and builds resilience.

### Hard vs. Soft Adaptation

**Hard adaptation** (structural/engineering):
- Sea walls and coastal defences
- Flood-control infrastructure (dams, levees, retention ponds)
- Heat-resistant road surfaces and building standards
- Raised platforms for buildings in flood zones

**Soft adaptation** (institutional/behavioural):
- Early warning systems
- Climate-smart agriculture
- Community-based disaster risk management
- Insurance and social protection schemes
- Land-use planning and zoning regulations

### Nature-Based Solutions (NbS)

Nature-based solutions use ecosystems to reduce disaster risk and adapt to climate change:

| Solution | Benefit |
|---|---|
| Mangrove restoration | Coastal storm protection, carbon sequestration |
| Watershed reforestation | Flood regulation, water supply stabilisation |
| Urban green spaces | Heat island reduction, stormwater management |
| Coral reef protection | Coastal erosion and storm surge buffering |
| Wetland conservation | Flood storage, water quality |

**Nature-based solutions** are increasingly recognised as cost-effective alternatives to hard infrastructure — and they provide additional benefits for biodiversity, carbon storage, and livelihoods.

### Climate-Smart Disaster Risk Management

Integrating climate projections into disaster risk management:
1. Use **probabilistic hazard modelling** that accounts for future climate scenarios (RCP2.6, RCP4.5, RCP8.5)
2. Design infrastructure to **30–50 year climate projections**, not historical data alone
3. Update national risk assessments every **5 years** to reflect new IPCC findings
4. Integrate climate risk into **urban planning, building codes, and land use**

### The Adaptation Finance Gap

The UNEP Adaptation Gap Report (2023) estimates that developing countries need **$215–387 billion per year** for adaptation by 2030 — but current international adaptation finance flows are only a fraction of this. WDC advocates for increased adaptation finance from developed nations.
        `,
        quiz: {
          question: "What is an example of a 'nature-based solution' for climate adaptation?",
          options: [
            "Building a sea wall to protect coastlines",
            "Installing weather radar systems",
            "Restoring mangrove forests for coastal storm protection",
            "Developing early warning SMS alert systems",
          ],
          correct: 2,
          explanation:
            "Mangrove restoration is a nature-based solution — it uses ecosystems to reduce disaster risk (coastal storm protection) while providing additional co-benefits like carbon sequestration and fisheries habitat.",
        },
      },
      {
        id: "cc-4",
        title: "Climate Policy & Advocacy",
        duration: "30 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "Paris Agreement climate policy UNFCCC NDC advocacy",
        content: `
## Navigating the Climate Policy Landscape

Effective disaster management increasingly requires engagement with the climate policy architecture. Understanding the key frameworks, negotiations, and advocacy opportunities is essential.

### The Paris Agreement (2015)

Adopted by 196 Parties to the UNFCCC, the Paris Agreement aims to:
- Limit global temperature rise to **well below 2°C** and pursue efforts to limit it to **1.5°C**
- Increase the ability of countries to adapt to climate impacts
- Make finance flows consistent with a pathway to low-carbon, resilient development

**Nationally Determined Contributions (NDCs)**: Each country submits its own climate action plan every 5 years, covering both mitigation (reducing emissions) and adaptation.

### The Sendai-Paris Nexus

The Sendai Framework (DRR) and the Paris Agreement (climate) share the goal of reducing disaster risk and building resilience. Integrating these frameworks at national and local levels avoids duplicated effort and strengthens both.

### Key Annual Processes

**UNFCCC Conference of the Parties (COP)**: Annual climate negotiations. Recent milestones:
- COP21 (Paris, 2015): Paris Agreement adopted
- COP26 (Glasgow, 2021): Glasgow Climate Pact; phase-down of coal
- COP27 (Sharm el-Sheikh, 2022): Loss and Damage fund established
- COP28 (Dubai, 2023): Global Stocktake; agreement to "transition away from fossil fuels"

**Global Platform for DRR**: Biennial forum for Sendai Framework implementation.

### Advocating for Climate-Resilient Communities

Effective advocacy requires:
1. **Evidence**: Use data and case studies to demonstrate the link between climate and disaster risk
2. **Coalition building**: Join or form alliances with other organisations
3. **Engagement at multiple levels**: Local, national, and international
4. **Community voices**: Ensure affected communities lead advocacy efforts
5. **Media engagement**: Work with journalists to communicate the human cost of climate inaction

### WDC's Policy Work

WDC engages in policy advocacy through:
- Submissions to UN processes (UPR, HLPF, Global Platform)
- Technical working groups on national DRR strategies
- Research publications that inform policy debate
- Training government officials in risk-informed decision-making
        `,
        quiz: {
          question: "What temperature target does the Paris Agreement aim to limit global warming to?",
          options: ["1°C above pre-industrial levels", "1.5°C with efforts toward well below 2°C", "2.5°C above 1990 levels", "3°C by 2100"],
          correct: 1,
          explanation:
            "The Paris Agreement aims to limit global temperature rise to well below 2°C above pre-industrial levels, and to pursue efforts to limit it to 1.5°C — the latter being crucial for protecting Small Island States and other highly vulnerable communities.",
        },
      },
    ],
  },

  {
    id: "crisis-communication",
    title: "Crisis Communication in Emergencies",
    tagline: "The right message at the right time saves lives",
    description:
      "Learn how to communicate effectively during crises — from issuing early warnings to working with media, managing rumours, and using digital channels.",
    level: "All levels",
    duration: "1.5 hours",
    totalModules: 3,
    color: "bg-purple-600",
    icon: "📢",
    modules: [
      {
        id: "cc-comm-1",
        title: "Communication Fundamentals in Crisis",
        duration: "30 min",
        type: "video+text",
        youtubeId: null,
        youtubeSearch: "crisis communication emergency public information effective messaging",
        content: `
## Why Communication Is a Lifesaving Tool

In a crisis, what people know — and what they believe — determines how they act. Effective communication:
- Saves lives by prompting protective action
- Reduces panic through accurate, timely information
- Maintains public trust in institutions
- Enables coordinated response

### Core Communication Principles in Emergencies

**1. Accuracy before speed — but act fast**
Never issue false or unverified information. But silence is also dangerous. If you don't know something, say so — and commit to providing updates.

**2. Empathy and respect**
Speak to people as partners, not as passive recipients. Acknowledge fear, grief, and frustration.

**3. Clarity and simplicity**
Use plain language. Avoid jargon, acronyms, and technical terms. Test messages with community members before releasing.

**4. Cultural and linguistic appropriateness**
Translate messages into local languages and adapt them for cultural context. Use community leaders and trusted voices as messengers.

**5. Consistency**
All communication from your organisation must deliver consistent messages. Brief all staff before press conferences and public statements.

### The Communication Cycle

1. **Assess**: What do affected people need to know? What do they currently believe?
2. **Plan**: What messages? Which channels? Who is the spokesperson?
3. **Act**: Produce and disseminate messages
4. **Evaluate**: Are people receiving and acting on the messages? What rumours are circulating?
5. **Adapt**: Refine messages and channels based on feedback

### Common Communication Mistakes

- Issuing messages without consulting affected communities
- Using technical language that confuses rather than informs
- Ignoring rumours until they spread widely
- Failing to acknowledge uncertainty — this destroys trust
- Communicating only during the acute phase and going silent during recovery

### Early Warning Messages

Effective early warning messages include:
- **What** is the hazard?
- **Where** will it affect?
- **When** will it occur?
- **How severe** is it expected to be?
- **What should people do?** (specific, actionable steps)
        `,
        quiz: {
          question: "Which principle says you should communicate honestly even when you don't have all the answers?",
          options: [
            "Cultural appropriateness",
            "Accuracy — acknowledge uncertainty rather than staying silent",
            "Consistency across all channels",
            "Empathy and respect",
          ],
          correct: 1,
          explanation:
            "Acknowledging uncertainty is better than silence or guessing. Saying 'we don't yet know X but we will update you at [time]' maintains trust, whereas false information — or silence — erodes it.",
        },
      },
      {
        id: "cc-comm-2",
        title: "Working with Media & Managing Rumours",
        duration: "25 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "working with media disaster response public information officer rumour management",
        content: `
## Effective Media Relations and Rumour Control

In a disaster, media can be your most powerful ally — or your most dangerous critic. Managing media relations professionally, and actively countering misinformation, is essential.

### Preparing for Media Engagement

**Designate a spokesperson**:
- One official point of contact for all media enquiries
- Brief them on key messages, what is known, and what is unknown
- Practice questions and answers before briefings

**Set up a Joint Information Centre (JIC)**:
- A shared space where all responding organisations coordinate their communications
- Prevents contradictory statements from different agencies

**Key documents to prepare**:
- Media statement (who, what, when, where, response actions taken)
- Frequently Asked Questions (FAQ) sheet
- Contact list for specialist spokespersons (medical, engineering, legal)

### Conducting a Press Conference

1. Start on time and keep to a clear agenda
2. Open with a brief situation update — the most critical facts
3. Express empathy for those affected
4. Describe what actions are being taken
5. What is NOT yet known — be explicit
6. Open for questions — manage politely but firmly
7. Close with a commitment to update (give a specific time)

### Managing Rumours and Misinformation

In every major disaster, rumours spread faster than facts. Effective rumour management:

**Step 1 — Listen and monitor**
- Assign staff to monitor social media, community radio, and community feedback
- Use tools like Talkwalker, CrowdTangle, or manual monitoring
- Track rumours in a log (content, source, reach, potential harm)

**Step 2 — Assess and prioritise**
Not all rumours need a response. Prioritise those that:
- Could cause harmful behaviour (e.g., "the water supply is poisoned")
- Spread rapidly
- Come from credible-seeming sources

**Step 3 — Respond quickly and factually**
- Engage the rumour directly: "We have heard reports that… This is incorrect because…"
- Use the same channels the rumour spread through
- Partner with trusted community voices to carry the correction

**Step 4 — Follow up**
- Track whether the correction is being seen and shared
- Monitor for rumour resurgence
        `,
        quiz: {
          question: "What should you prioritise when deciding which rumours to address publicly?",
          options: [
            "All rumours should be addressed with equal urgency",
            "Only rumours from verified sources",
            "Rumours that could cause harmful behaviour and are spreading rapidly",
            "Rumours that originate from official channels",
          ],
          correct: 2,
          explanation:
            "Prioritise rumours that could cause people to take harmful actions (e.g., drinking contaminated water, fleeing to dangerous areas) and are spreading rapidly. Not all rumours require a public response — focus your resources on those with the highest potential for harm.",
        },
      },
      {
        id: "cc-comm-3",
        title: "Digital Channels & Social Media in Crisis",
        duration: "35 min",
        type: "text+quiz",
        youtubeId: null,
        youtubeSearch: "social media disaster response digital crisis communication strategy",
        content: `
## Using Digital and Social Media Effectively in Crisis

Social media has fundamentally changed crisis communication — citizens are now both information recipients and producers. Understanding how to use digital channels responsibly is essential for modern disaster communicators.

### The Digital Information Ecosystem in Crises

During a disaster, people use social media to:
- Share their experiences and location
- Request or offer help
- Get information about the event
- Connect with lost family members
- Amplify official warnings

Responders can use the same platforms to:
- Disseminate early warnings and safety information
- Monitor emerging needs and rumours
- Coordinate with volunteers
- Collect feedback on response quality

### Platform Selection Guide

| Platform | Best For |
|---|---|
| Twitter / X | Rapid, real-time updates; reaching journalists and officials |
| Facebook | Reaching broader community audiences; community groups |
| WhatsApp | Direct group communication with community leaders |
| Instagram | Visual storytelling; appeals for solidarity |
| YouTube | Longer educational content; safety instruction videos |
| Radio + SMS | Reaching populations with limited internet access |

### Social Media Best Practices During a Crisis

**Frequency**: Post updates at regular, predictable intervals — even if the update is "no new information since [time]"

**Tone**: Empathetic, direct, and clear. Avoid corporate-speak and bureaucratic language.

**Accessibility**: Always add alt text to images; provide captions for videos; use high-contrast visuals for readability.

**Verification before sharing**: Never share unverified information. One false post can cause panic and undermine trust.

**Hashtags**: Use or establish one consistent official hashtag for the event (e.g., #CyclonePreparedness2025).

### Crowdsourcing Crisis Information

Platforms like **Ushahidi** allow organisations to:
- Collect geo-tagged reports from affected communities
- Visualise needs and damage on interactive maps
- Coordinate volunteer response

**OSM (OpenStreetMap)** communities activate during major disasters to rapidly map affected areas for responders.

### Digital Inclusion

Not everyone is online. A comprehensive communication strategy always includes:
- Community radio in local languages
- SMS alerts (which work on all phones)
- Loudspeaker vehicles for remote areas
- Community leaders and faith networks as messengers
        `,
        quiz: {
          question: "Why is it important to include non-digital channels (radio, SMS) in a crisis communication strategy?",
          options: [
            "Radio and SMS are more trustworthy than social media",
            "Because not everyone has internet access, and digital exclusion creates information gaps",
            "Because social media cannot be used for official government communications",
            "To avoid copyright issues with digital platforms",
          ],
          correct: 1,
          explanation:
            "Digital exclusion is a real risk in crisis communication. Relying solely on social media and apps misses people without smartphones or internet access — often the most vulnerable. Radio, SMS, community networks, and loudspeakers must be part of the strategy.",
        },
      },
    ],
  },
];
