# SHOES_ARCHIVE // Repository_Structure

This repository is a visual and functional archive of a custom Shopify theme development project. It is structured to separate the core Liquid logic, the React-based UI recreation, and the final production-ready theme output.

---

### ## Directory_Mapping

* **`/liquid`**
  The primary Shopify development environment. This directory contains the Liquid templates, sections, and snippets, with its own `package.json` for managing Shopify-specific build tools and styles.

* **`/react`**
  A standalone React recreation of the shopify liquid project used for live demo (since I can't deploy the shopify theme).

* **`/theme`**
  The clean, compiled output of the shopify liquid theme project. This folder contains the final architecture ready to be zipped and uploaded directly to the Shopify admin as a functional theme.

---

### ## Core_Technologies

* **Shopify Liquid**: Native templating and section architecture.
* **React + Framer Motion**: Advanced interactive components and modals.
* **GSAP**: High-performance, flicker-free scroll animations and staggers.
* **Tailwind CSS**: Utility-first styling used across both Liquid and React environments.
