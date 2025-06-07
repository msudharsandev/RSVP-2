## Jump To

- [Architecture & System Design](#architecture-and-system-design)
- [API Design](#api-design)
- [Data Model](#data-model)
- [Class UML Diagram](#orm-classes)
- [Endpoints](#endpoints)
- [Security and Authentication](#security-and-authentication)
- [Scalability & Performance](#scalability--performance)
- [Deployment Strategy](#deployment-strategy)
- [Failure Handling & Monitoring](#failure-handling--monitoring)
- [OAuth2 Flow](#oauth2-flow)

### Architecture and System Design

RSVP follows a **monorepo architecture** using **pnpm workspaces** to manage multiple applications in a single repository. This setup enables easier dependency management, code sharing, and streamlined development across the frontend, backend, and help center. The repository contains three main apps:

- **Web**: Frontend app built with React and Next.js.
- **Server**: Backend API built with Express and Node.js.
- **Help Center**: Static site built with Astro.

```bash
/
├── apps/
│ ├── web/ # Next.js frontend
│ ├── server/ # Express backend
│ └── help-center/ # Astro static site
├── docker/ # Docker configuration files
├── docs/ # Project documentation
├── package.json # Root workspace config
└── pnpm-workspace.yaml
```

#### Frontend

- **Framework:** Next.js (with `app/` directory for modern routing)
- **Validation:** Zod (schema validation), React Hook Form (form handling)
- **Data fetching:** React Query (server state and caching)
- **UI:** Shadcn + Radix UI components, styled with Tailwind CSS
- **Testing:** Vitest (with TypeScript support)
- **Why these?**  
  Next.js offers great SSR and static generation capabilities, enabling fast and SEO-friendly pages. Using TypeScript with strict type checking enhances code safety and maintainability. React Query efficiently handles API caching and synchronization with the backend.

#### Backend

- **Framework:** Express (Node.js)
- **Architecture pattern:** Separation into routes, controllers, repositories, and validation layers
- **Validation:** Zod for request body validation
- **Authentication:** Magic Links with JWT tokens for passwordless login
- **ORM & DB:** Prisma ORM with MySQL database
- **Logging:** Winston for centralized logging and error monitoring
- **Testing:** Supertest for API endpoint testing
- **Bundling:** Tsup for efficient TypeScript builds
- **Why these?**  
  Express is lightweight and flexible, allowing rapid API development in JavaScript, which aligns with the frontend language choice, enabling the team to work efficiently with a single language stack. Prisma offers type-safe database access, reducing runtime errors.

#### Help Center

- **Framework:** Astro for fast, static site generation
- **Why?** Astro allows building optimized, content-focused static sites, perfect for documentation or help resources with minimal runtime overhead.

#### Key System Design Decisions

- **Authentication:** Passwordless login via magic links improves user experience and security by avoiding passwords.
- **API Design:** RESTful APIs with versioning and proper HTTP methods for scalability and maintainability.
- **Error Handling:** Centralized error structure with consistent responses, logged via Winston.
- **Logging:** Winston manages logs for easier debugging and monitoring.
- **Type Safety:** Strict TypeScript usage reduces runtime bugs and improves developer productivity.
- **Testing:** Automated tests (Vitest on frontend, Supertest on backend) ensure reliability.

#### Security Considerations

- Passwordless authentication via magic links reduces risks related to password leaks.
- JWT tokens are securely signed and validated.
- All input is validated with Zod to prevent injection attacks.
- Sensitive environment variables are managed securely and not stored in code.
- Centralized logging helps identify suspicious activity.

## API Design

## Data Model

## Class UML Diagram

## Endpoints

## Security and Authentication

## Scalability & Performance

## Deployment Strategy

  - Frontend deployed on **Vercel** for seamless Next.js support and fast global delivery.
  - Backend deployed on **Railway**, a developer-friendly cloud platform.
  - CI/CD pipeline via **GitHub Actions** automates testing, linting, and deployment.

## Failure Handling & Monitoring

Failures are inevitable in production systems, but our setup ensures minimal user impact and fast recovery through structured error handling and real-time monitoring.

#### 🧱 Frontend & Backend Error Handling

- **React**: Error boundaries are implemented to prevent complete UI crashes, and retry logic is used for transient failures such as API issues. **(TODO)**
- **Express**: The backend uses **centralized error handling**, which standardizes error responses and improves log clarity across the app.

#### 📡 Monitoring & Observability

We use **Railway**’s native observability stack to track logs, metrics, and system health:

- Centralized **[Logs](https://docs.railway.com/guides/logs)** for debugging and traceability
- Live **[Metrics](https://docs.railway.com/guides/metrics)** dashboards for performance monitoring
- System-wide **[Observability](https://docs.railway.com/guides/observability)** for proactive issue detection
- Real-time alerts for downtime, high error rates, and slow endpoints **(TODO)**

Together, these tools allow us to monitor the system effectively and respond to issues quickly, even during peak usage.

## OAuth2 Flow
