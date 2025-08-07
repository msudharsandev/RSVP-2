import Changelog from '@/types/changelog';

export const changelogs: Changelog[] = [
  {
    releaseDate: new Date('2025-08-06'),
    bannerImageUrl: '/images/version/0.2.0.png',
    version: '0.2.0',
    contributors: [
      'VinayakaHegade',
      'sasidharan19',
      'sudharsan3110',
      'azeemuddinaziz',
      'Pratiyushkumar',
      'hassanrahim26',
      'Himanshu-Dhawale',
      'rudraprasaaad',
    ],
    sections: [
      {
        title: 'Features',
        items: [
          {
            summary: 'Add Google OAuth Login - Implement OAuth authentication for seamless user login experience.',
            contributors: ['VinayakaHegade', 'sasidharan19'],
          },
          {
            summary: 'Public Access to Create Event Page & UI Enhancements - Enable guest users to create events with improved authentication flow and user interface enhancements.',
            contributors: ['sudharsan3110'],
          },
          {
            summary: 'DB Schema Change for better normalization and scaling - Optimize database structure for improved performance and scalability.',
            contributors: ['azeemuddinaziz', 'Pratiyushkumar', 'hassanrahim26'],
          },
        ],
      },
      {
        title: 'Bug Fixes',
        items: [
          {
            summary: 'Social media links validation - Fix validation issues where forms accept invalid or random input data.',
            contributors: ['Himanshu-Dhawale'],
          },
          {
            summary: 'Not able to login in In-app browser - Resolve authentication problems occurring specifically in in-app browser environments.',
            contributors: ['sasidharan19'],
          },
          {
            summary: 'Pagination in Guest list - Fix pagination functionality issues in the guest list display feature.',
            contributors: ['hassanrahim26'],
          },
        ],
      },
      {
        title: 'Enhancements',
        items: [
          {
            summary: 'Add Asterisk and "This Field is Required" Validation - Implement visual indicators and validation for required fields on Profile Page.',
            contributors: ['rudraprasaaad'],
          },
          {
            summary: 'Add Country Code Dropdown to Phone Number Input - Enhance phone number input with country code selection on Profile Page.',
            contributors: ['rudraprasaaad'],
          },
          {
            summary: 'Redirect the new user to events page - Improve user experience by automatically redirecting new users to events page.',
            contributors: ['azeemuddinaziz'],
          },
        ],
      },
    ],
    improvements: [],
    bugFixes: [],
  },
  {
    releaseDate: new Date('2025-07-05'),
    bannerImageUrl: '/images/version/0.1.0.png',
    version: '0.1.0',
    contributors: [
      '0xatulpatil',
      'DeltaDynamo',
      'ManasVerma007',
      'Pratiyushkumar',
      'VinayakaHegade',
      'codezuma',
      'sanyamjain04',
      'sasidharan19',
      'sudharsan3110',
      'theprogrammerinyou',
      'azeemuddinaziz',
      'hassanrahim26',
    ],
    sections: [
      {
        title: 'Event Creation & Management',
        items: [
          {
            summary:
              'Easy Event Creation - Create events effortlessly using a simple event creation form.',
            contributors: ['VinayakaHegade', 'Pratiyushkumar'],
          },
          {
            summary: 'Full Event Control - Create, update, and delete events seamlessly.',
            contributors: ['sanyamjain04 ', '0xatulpatil', 'Pratiyushkumar'],
          },
          {
            summary:
              'Centralized Event Management - View and manage all your planned events in one place.',
            contributors: ['theprogrammerinyou', 'DeltaDynamo'],
          },
          {
            summary:
              'Join Popular Events - Easily view the most popular events and register for them.',
            contributors: ['sudharsan3110'],
          },
        ],
      },
      {
        title: 'Security & Access',
        items: [
          {
            summary: 'Magic Link Authentication - Secure login using an email-based Magic Link.',
            contributors: ['sanyamjain04 '],
          },
          {
            summary:
              'Role-Based Access Control - Manage event permissions with different user roles.',
            contributors: ['ManasVerma007 '],
          },
          {
            summary: 'Co-Host Management - Add or remove co-hosts for better event administration.',
            contributors: ['0xatulpatil', 'sasidharan19'],
          },
        ],
      },
      {
        title: 'Attendee Management',
        items: [
          {
            summary:
              'Automated RSVP System - Attendees can RSVP for events and receive email confirmations.',
            contributors: ['theprogrammerinyou', 'ManasVerma007 '],
          },
          {
            summary:
              'One-Step Event Registration - Register and verify attendance in a single step.',
            contributors: ['ManasVerma007 '],
          },
          {
            summary: 'Guest List Dashboard - View and manage the event guest list in one place.',
            contributors: ['codezuma'],
          },
          {
            summary: 'Download Attendee List - Export guest details as an Excel sheet.',
            contributors: ['codezuma'],
          },
        ],
      },
      {
        title: 'Event Day Operations',
        items: [
          {
            summary:
              'QR Code-Based Check-In - Generate QR codes for event tickets and scan them for quick and secure event entry.',
            contributors: ['VinayakaHegade', 'ManasVerma007 '],
          },
          {
            summary: 'Quick Event Access - Find events easily using event-specific links.',
            contributors: ['sanyamjain04 '],
          },
        ],
      },
      {
        title: 'Communication & Performance',
        items: [
          {
            summary:
              'Email Notifications - Receive email updates for event invitations and changes.',
            contributors: ['theprogrammerinyou', 'DeltaDynamo'],
          },
          {
            summary:
              'Optimized Event Image Handling - Faster image loading and improved processing with efficient Amazon S3 storage for better performance.',
            contributors: ['codezuma'],
          },
          {
            summary: 'API Rate Limiting - Prevent spam with rate-limited API requests.',
            contributors: ['ManasVerma007 '],
          },
        ],
      },
      {
        title: 'Others',
        items: [
          {
            summary: 'Automation, Testing cum Documentation',
            contributors: ['azeemuddinaziz', 'hassanrahim26'],
          },
        ],
      },
    ],
    improvements: [],
    bugFixes: [],
  },
];
