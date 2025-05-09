# 🚀 Astro Simple Modal

A **simple** and **highly customizable** modal for Astro — minimal setup, full styling control.

## 🧾 Overview

Astro Simple Modal is a lightweight modal component built specifically for Astro. It renders a simple overlay modal with fade-in and fade-out behavior. It includes no default titles, buttons, or layout — leaving the full content and structure under the developer's control.

## ✅ Features

- Super easy to install and use

- Highly customizable and flexible usage

- Effortless to style

## 📦 Installation

```bash
npm install astro-simple-modal
  # or
yarn add astro-simple-modal
  # or
pnpm add astro-simple-modal
```

## ⚙️ Usage

### Basic usage

```javascript
---
import SimpleModal from 'astro-basic-modal';
---

<button type="button" id="modal-open-btn">Open modal</button>
<SimpleModal id="my-modal">
  <h2>Modal Title</h2>
  <p>This is a basic modal.</p>
  <button type="button" id="modal-close-btn">Close modal</button>
</SimpleModal>

<script>
  import {modalHandler} from "astro-simple-modal"
  
  document.querySelector("#modal-open-btn").addEventListener("click", () => {
    modalHandler.open("my-modal")
  })
  document.querySelector("#modal-close-btn").addEventListener("click", () => {
    modalHandler.close("my-modal")
  })
</script>
```
### Modal handler

Use the **ID of each modal** along with the `modalHandler` methods to control them.

The `open` and `close` methods return a promise that resolves once the fade-in or fade-out transition is complete.

```javascript
import { modalHandler } from "astro-simple-modal"

// Use the open and close methods with the modal ID as the only argument
document.querySelector("#my-modal-open-btn").addEventListener("click", () => {
  modalHandler.open('my-modal').then(() => {
    console.log('Modal opened - .then promise handle')
  })
})

document.querySelector("#my-modal-close-btn").addEventListener("click", async () => {
  await modalHandler.close('my-modal')
  console.log('Modal closed - async handle')
})
```

Use `onOpen` and `onClose` to register global callbacks.

```javascript
import { modalHandler } from "astro-simple-modal"

// onOpen(modal-id, callback)
modalHandler.onOpen('my-modal', () => {
  console.log('Modal opened - global event handler')
})

// onClose(modal-id, callback)
modalHandler.onClose('my-modal', () => {
  console.log('Modal closed - global event handler')
})
```

### Customize styles

```jsx
<SimpleModal id="custom-styles-modal" styles={{
  backgroundOpacity: 0.8,
  transitionDuration: '.8s',
  backgroundColor: '#042940',
  contentBackgroundColor: '#DBF227',
  contentPadding: '1rem 3rem',
  borderRadius: '9999px',
  color: '#005C53'
}}>
   <span>Content</span>
</SimpleModal>
```
