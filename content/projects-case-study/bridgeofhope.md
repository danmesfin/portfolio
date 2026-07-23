# Bridge of Hope Ethiopia: Nonprofit Platform with Multi-Payment Integration

## Project Overview

**Bridge of Hope Ethiopia** is a digital platform for a nonprofit organization that has been supporting vulnerable children and orphans since 2001. The platform handles content management, donation processing, and program operations through a dual-payment system serving both international and local Ethiopian donors.

**Role**: Lead Developer
**Development Timeline**: 6 months
**Technology Stack**: Laravel, Blade Templates, TailwindCSS, MySQL, PayPal API, Chapa API

---

## The Challenge

The organization had outgrown its static website. Staff had to email content updates to a single person who manually edited HTML files, meaning urgent updates about children's needs often went unshared for weeks. More critically, the donation system only supported PayPal — cutting off Ethiopian donors who rely on mobile money and local banking. With programs spanning childcare, community development, and business enterprises, they needed a platform that non-technical staff could manage independently.

---

## What I Built

### Dual Payment Gateway

The most impactful feature was integrating both PayPal for international donors and Chapa — a popular Ethiopian payment processor — for local contributions via mobile money and local banks. This opened an entirely new revenue stream. The unified tracking system reconciles donations from both gateways into a single financial view, handling currency differences and different donation patterns (international donors tend toward larger one-time gifts, while local donors prefer smaller recurring amounts).

### Content Management System

The CMS was designed for non-technical staff. A rich text editor with a draft-to-publish workflow lets content creators prepare stories about the children and programs, have them reviewed, and publish — all without developer involvement. The team went from publishing updates once or twice a month to sharing stories weekly.

### Role-Based Access

Different staff members get different levels of access — content creators publish news articles, program coordinators update project milestones, and admins manage donations and user accounts. Sensitive information stays protected while giving each team member the tools they need.

### Donor Engagement

An automated receipt system sends personalized thank-you emails with tax-deductible receipts, along with updates about how specific donations are being used. This created a stronger connection between donors and the organization's mission.

---

## Technical Highlights

The image optimization system was essential given that many visitors have limited internet connectivity. Uploaded images are automatically processed into multiple sizes, with the appropriate version served based on device and connection speed. The platform includes comprehensive logging and role-based access controls to protect sensitive donor information and financial data.

---

## Impact

Within three months of launch, online donations increased by 60%. The local payment integration through Chapa accounted for 40% of total contributions — revenue that simply didn't exist before. The platform now serves over 1,000 active users including donors, volunteers, and staff, with automated systems handling donation processing and receipt generation so staff can focus on their core mission.

**Technologies Used**: Laravel, Blade Templates, TailwindCSS, MySQL, PayPal API, Chapa API

**Visit the platform**: [boh-eth.org](https://boh-eth.org)
