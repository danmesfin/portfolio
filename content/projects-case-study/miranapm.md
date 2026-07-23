# MiranaPM: Multi-Tenant Property Management Platform

## Project Overview

**MiranaPM** is a multi-tenant property management platform that centralizes rental operations, automates payment processing, and streamlines maintenance management for landlords, residents, and property managers.

**Role**: Full-Stack Developer
**Development Timeline**: Multi-phase development
**Technology Stack**: Laravel, Blade Templates, Tailwind CSS, Livewire, MySQL, Redis, AWS S3, Lightsail

---

## The Challenge

Property management companies were relying on fragmented tools — one system for rent collection, another for maintenance requests, spreadsheets for financial tracking, and email for tenant communication. This meant duplicated data entry, missed payments, and slow response times on maintenance issues. The platform needed to bring everything into one place while keeping each management company's data completely isolated.

---

## What I Built

I contributed to system design, module architecture, and development of multiple core modules across the full stack.

### Multi-Tenant Architecture

Each property management company operates on an isolated database resolved through subdomain routing. This ensures complete data separation while sharing a single codebase. The middleware layer handles tenant resolution and database switching transparently.

### Role-Based Dashboards

The platform serves four distinct user types, each with a tailored interface. Landlords see portfolio-level financials and occupancy metrics. Residents access a self-service portal for rent payments and maintenance requests. Admins manage system-wide operations. Board advisors have oversight dashboards with approval workflows.

### Automated Financial Operations

The billing engine handles recurring rent charges, late fee calculations, prorated amounts, and multi-gateway payment processing. Financial reports break down revenue, expenses, and profitability per property and unit type. A queue-based background processing system handles the heavy computation without blocking the user interface.

### Maintenance Workflow

Residents submit work orders through the portal, which are routed to the appropriate property manager. The system tracks vendor assignments, scheduling, response times, and costs — giving landlords visibility into maintenance spending and performance.

---

## Technical Highlights

The frontend uses Livewire for reactive dashboard components without the complexity of a separate JavaScript framework. Redis caching keeps dashboard queries fast even with large datasets across multiple properties. Document storage (leases, maintenance photos) runs through AWS S3 with Laravel's filesystem abstraction.

The modular architecture organizes features into self-contained modules — property management, resident management, lease management, financials, maintenance, reporting, and notifications — making the codebase maintainable as the feature set grows.

---

## Impact

The platform automated roughly 70% of manual rent collection tasks and centralized all property operations into a single interface. Landlords gained real-time financial visibility they didn't have before, and the streamlined communication workflow between tenants and managers significantly reduced response times on maintenance issues.

**Technologies Used**: Laravel, Blade Templates, Tailwind CSS, Livewire, MySQL, Redis, AWS S3, AWS Lightsail, Alpine.js

**Live Platform**: [MiranaPM.com](https://miranapm.com)
