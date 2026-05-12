# 🎟️ ProofPass — Blockchain-Powered Event Attendance & Revenue Platform

![ProofPass Banner](image.png)

## 🌟 Overview

**ProofPass** is a **blockchain-based event attendance and verification platform** built on **Stellar**, designed to make check-ins **tamper-proof**, **transparent**, and **profitable**.

Organizers can create events on-chain, issue paid or sponsored tickets, and track attendance with immutable blockchain records.
Participants check in securely via wallet signature or QR scan — no fake attendees, no lost records, no manual tracking.

---

## 🎯 Problem & Solution

### Problem

- Event fraud — fake check-ins, proxy attendance, unverifiable records
- Time wasted on manual attendance tracking
- No revenue model for organizers — most tools ignore small events

### Solution

- **Stellar smart contract verification** for trust
- **Automated check-in & reporting**
- **Revenue-sharing model** — organizers earn per attendee or sponsor guests
- **Immutable event history** for transparency and compliance

---

## 🏆 Features

### For Organizers

- Create events on Stellar for fractions of a cent in fees
- Set ticket prices in XLM, define revenue splits, or sponsor guest check-ins
- Track attendance in real-time
- Generate downloadable reports

### For Attendees

- Secure wallet or QR-based check-in
- View personal attendance history
- Transparent proof of participation (NFT ticket optional via Stellar assets)

### For Platforms & Institutions

- Fraud prevention through Stellar blockchain verification
- On-chain proof of engagement
- Compliance-ready immutable records

---

## 🛠 Tech Stack

- **Next.js 15** (React Framework)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Stellar SDK (stellar-sdk)** — Blockchain interaction on Stellar Testnet / Mainnet
- **Soroban Smart Contracts (Rust)** — Event Registry + Ticket Management
- **Freighter Wallet** — Stellar-compatible browser wallet

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- [Freighter Wallet](https://freighter.app) connected to **Stellar Testnet**

### Setup

```bash
# Clone the repo
git clone https://github.com/ProofPass-HQ/proofpass
cd proofpass

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🔗 Useful Links

- **Live App:** [https://proofpass-pi.vercel.app](https://proofpass-pi.vercel.app)
- **Stellar Docs:** [https://developers.stellar.org](https://developers.stellar.org)
- **Soroban Docs:** [https://developers.stellar.org/docs/smart-contracts](https://developers.stellar.org/docs/smart-contracts)
- **Stellar Testnet Friendbot:** [https://friendbot.stellar.org](https://friendbot.stellar.org)
- **Stellar Explorer:** [https://stellar.expert](https://stellar.expert)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ on Stellar | **Revolutionizing event attendance with on-chain trust and rewards.**
