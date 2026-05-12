# 🎟️ ProofPass Frontend

The frontend web application for **ProofPass** — a blockchain-based event attendance and verification platform built on **Stellar**.

🌐 **Live App:** [https://proofpass-pi.vercel.app](https://proofpass-pi.vercel.app)

---

## 🌟 Overview

ProofPass lets organizers create on-chain events and attendees check in securely via their Stellar wallet. The frontend communicates with Soroban smart contracts on the Stellar network and provides a seamless, Web3-native user experience.

---

## 🛠 Tech Stack

- **Next.js 15** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS v4** + **shadcn/ui** — Styling and components
- **Stellar SDK (stellar-sdk)** — Interact with the Stellar blockchain
- **Freighter Wallet** — Stellar browser wallet integration
- **Soroban Client** — Invoke Soroban smart contract functions

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- [Freighter Wallet](https://freighter.app) browser extension connected to **Stellar Testnet**

### Setup

```bash
# Clone the repository
git clone https://github.com/ProofPass-HQ/proofpass
cd proofpass/frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_CONTRACT_ID=<your-soroban-contract-id>
NEXT_PUBLIC_API_URL=https://proofpass.onrender.com
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## 🔗 Stellar Wallet Integration

ProofPass uses [Freighter](https://freighter.app) for Stellar wallet connection. Key features:

- Connect Stellar wallet (Freighter)
- Sign transactions for event check-in
- Purchase tickets with XLM
- View on-chain attendance history

---

## 📁 Project Structure

```
frontend/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home / landing page
│   ├── events/           # Event listing and detail pages
│   ├── dashboard/        # Organizer dashboard
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
├── lib/                  # Stellar SDK helpers and utilities
│   ├── stellar.ts        # Stellar/Soroban integration
│   └── freighter.ts      # Freighter wallet helpers
├── public/               # Static assets
└── README.md
```

---

## 🔗 Useful Links

- **Stellar Docs:** [https://developers.stellar.org](https://developers.stellar.org)
- **Soroban Docs:** [https://developers.stellar.org/docs/smart-contracts](https://developers.stellar.org/docs/smart-contracts)
- **Freighter Wallet:** [https://freighter.app](https://freighter.app)
- **Next.js Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Stellar Expert Explorer:** [https://stellar.expert](https://stellar.expert)

---

## 🚢 Deploy on Vercel

The easiest way to deploy the ProofPass frontend is using the [Vercel Platform](https://vercel.com):

1. Push your changes to GitHub
2. Import the repository in Vercel
3. Set the environment variables
4. Deploy!

---

Built with ❤️ on Stellar | **Revolutionizing event attendance with on-chain trust and rewards.**
