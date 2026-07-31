---
name: ui-ux-portfolio
description: Design and build polished personal portfolio websites with strong UI/UX, responsive layout, accessibility, visual hierarchy, project storytelling, recruiter-friendly content, and refined frontend presentation. Use when Codex is asked to create, redesign, audit, or improve a personal portfolio, resume site, developer portfolio, designer portfolio, project showcase, or homepage/about/projects/contact experience.
---

# UI/UX Portfolio

## Overview

Use this skill to shape personal portfolio websites that feel clear, credible, memorable, and easy to navigate. Balance visual personality with recruiter-friendly scanning, fast comprehension, and clean implementation.

## Portfolio Workflow

1. Identify the audience: recruiters, hiring managers, clients, collaborators, or admissions reviewers.
2. Define the first-screen promise: name, role, specialty, location or availability if relevant, and one primary action.
3. Structure the site around proof: selected projects, measurable outcomes, skills, experience, about, resume, and contact.
4. Design mobile-first, then scale up to desktop with stronger composition and richer spacing.
5. Validate readability, contrast, focus states, responsive behavior, and loading performance.

## UX Principles

- Make the person's name, role, and strengths obvious within the first viewport.
- Prefer a focused single-page flow unless the repo already uses routing or the content needs separate pages.
- Keep navigation short: Home, Projects, Skills, About, Contact, Resume.
- Use project cards for scanning, but avoid wrapping entire page sections in card styling.
- Show impact before implementation details: problem, contribution, outcome, then tech stack.
- Include clear calls to action for email, resume download, GitHub, LinkedIn, and live project links.

## Visual Direction

- Choose a distinctive but restrained palette with at least one neutral, one accent, and one supporting color.
- Avoid one-note themes dominated by only purple, dark slate, beige, or orange-brown unless the user explicitly asks.
- Use type scale intentionally: hero headings for identity, compact headings for cards and sections.
- Use real user-provided images when available; otherwise use tasteful generated or coded visuals that support the person's field.
- Use subtle motion for transitions, hover states, and section reveals; respect reduced-motion preferences.
- Keep cards at 8px border radius or less unless the existing design language uses another radius.
- For this portfolio, use `references/neural-vortex-background.md` when building the interactive canvas background.
- For this portfolio, use `references/liquid-glass-components.md` when building glass buttons, controls, and panels.

## Content Standards

- Write concise, specific copy in the user's voice.
- Replace generic claims with evidence: metrics, roles, tools, constraints, or outcomes.
- Present each project with title, short summary, role, stack, result, and links when available.
- Include an approachable about section with background, current focus, and personal signal without becoming long.
- Keep contact friction low with visible email and relevant social links.

## Implementation Standards

- Use semantic HTML landmarks and accessible labels.
- Ensure text does not overflow buttons, cards, nav items, or hero layouts on mobile and desktop.
- Define responsive constraints for fixed-format elements such as nav bars, project grids, buttons, and media frames.
- Use icons for common actions where the existing stack supports an icon library.
- Keep decorative effects purposeful and lightweight.
- Run the most relevant local build, lint, or preview check available before handoff.
