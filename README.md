# Multi-Vendor Admin Dashboard

A modern React-based admin dashboard for managing a multi-vendor platform. Includes modules for user management, ads promotion, support, chat, subscriptions, and more. Built with Vite for fast dev and optimized builds, Ant Design for data-heavy UI, Tailwind CSS utility classes, and React Icons.

## Features
- **Dashboard & Navigation**: Clean layout with a sidebar and top-level pages.
- **Ads Promotion**: Create and update ads with inline image preview and date range.
- **Support**: View tickets in a table; modal shows full row details.
- **One-way Message Modal**: Send a quick message to a user from Support.
- **Chat**: Responsive chat UI with user list, typing indicator, file attach, and color theme.
- **User Management**: Paginated table with actions.

## Tech Stack
- **React** (Vite)
- **Ant Design** (Table, Modal, ConfigProvider)
- **Tailwind CSS** (utility classes)
- **React Icons**

## Project Structure (high level)
```
src/
  components/
    LayoutComponents/
      SideBar.jsx
  page/
    AdPromotion/
      AdPromotion.jsx
    Support/
      Support.jsx
    Chat/
      Chat.jsx
    UserManagement/
      Users.jsx
  Redux/
    api/
      ...
    Slice/
      ...
  shared/
    PageHeading.jsx
```

## Notable Implementations
- `src/page/AdPromotion/AdPromotion.jsx`
  - Add/Update Ads modals with image upload, preview, change/remove actions.
- `src/page/Support/Support.jsx`
  - Table of tickets; view modal renders all row data.
  - Reply button opens a one-way message modal (textarea + send).
- `src/page/Chat/Chat.jsx`
  - Two-tone theme using `#0B704E` and `#14803c` across header, bubbles, buttons.
  - Typing indicator and mock responses for demo.

## Styling & Theme
- Tailwind utility classes.
- Ant Design themed via `ConfigProvider` in pages (e.g., table header colors).
- Chat palette:
  - Primary Deep Green: `#0B704E`
  - Accented Green: `#14803c`


## License
Proprietary. All rights reserved. If you need an open-source license, update this section accordingly.
