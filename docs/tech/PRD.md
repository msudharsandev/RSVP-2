## Point of Contact (POC)

- `Title`: [RSVP](https://www.rsvp.kim/)
- `Product (POC)`: Sunny, Anoop
- `Design (POC)`: Anoop, Chandresh, Sanyam
- `Tech (POC)`: Anoop, Chandresh, Sanyam
- `Stack`: [Next.js](https://nextjs.org/), [Astro](https://astro.build/), [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/), [MySQL](https://www.mysql.com/)
- `CI/CD`: [GitHub Actions](https://docs.github.com/en/actions/writing-workflows/quickstart)
- `Deployment Platform`: [Vercel](https://vercel.com/), [Railway](http://railway.com/)

## 🧭 Why

- Simplifies event creation and management for all users.
- Enables real-time attendee tracking and guest list control.
- Offers secure, passwordless login via Magic Link.
- Streamlines ticketing, registration, and check-in processes.
- Enhances event promotion through shareable links and emails.
- Supports attendee engagement with interactive features.
- Provides post-event insights and downloadable reports.
- Scales for both personal and organizational use.

## 📋 Features

- Magic Link authentication for secure login.
- Create, edit, and delete events with ease.
- Central dashboard for managing all events.
- Add co-hosts and assign roles.
- One-step RSVP and registration with email confirmation.
- QR code generation for event check-in.
- View and join trending/popular events.
- Export guest lists in Excel format.
- Automated email notifications for event updates.
- Optimized media handling via Amazon S3.
- API rate limiting to prevent spam.
- Planned: Chat rooms, live Q&A, and surveys.

## Dependencies

- Email service.
- AWS - S3, IAM user.
- Active contributors.


## User Types and Roles

The platform supports three distinct user roles that can be dynamically assigned based on event context and permissions:

### 1. Event Attendee (Regular User)
**What they can do:**
- Find and browse events
- Buy tickets
- Go to events
- See event information and updates
- Keep track of their tickets
- Get event notifications

**Main Features:**
- Search and discover events
- Buy tickets easily
- Keep digital tickets
- Set up their profile

### 2. Event Creator (Main Host)
**What they can do:**
- Create new events
- Add other hosts to help
- Cancel events if needed
- Delete events
- Change event details
- Handle ticket sales
- See how many people are coming
- Send messages to attendees thorough communications

**Main Features:**
- Easy event creation
- Event management dashboard
- Set up different ticket types
- See sales and attendance numbers
- Manage who's coming
- Send updates to attendees
- Add other hosts to help

### 3. Event Manager (Helper Host)
**What they can do:**
- Check tickets at the enterance with ticket scan feature
- allow only authorized users for the private event
- Handle ticket sales
- See how many people are coming
- Send messages to attendees thorough communications

**Main Features:**
- Scan tickets
- Manage guest list
- Check-in system
- Count attendees
