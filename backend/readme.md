# 🧾 ProofPass Backend

The backend API for **ProofPass**, a decentralized event verification and attendance system.
It powers Stellar smart contract interactions, event creation, user verification, and attendance tracking.

🌐 **Live API:** [https://proofpass.onrender.com](https://proofpass.onrender.com)
📦 **Frontend Repo:** [ProofPass Frontend](https://github.com/ProofPass-HQ/proofpass)

---

## 🚀 Features

- Built with **NestJS + TypeORM**
- JWT-based authentication
- Integration with deployed **Stellar Soroban smart contracts**
- PostgreSQL database hosted on **Neon**
- Hosted on **Render**
- Follows clean architecture and modular design

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend Framework | [NestJS](https://nestjs.com) |
| ORM | [TypeORM](https://typeorm.io) |
| Database | [PostgreSQL (Neon)](https://neon.tech) |
| Blockchain | [Stellar SDK + Soroban](https://developers.stellar.org) |
| Hosting | [Render](https://render.com) |
| Environment Variables | [dotenv](https://www.npmjs.com/package/dotenv) |
| Stellar RPC | [Stellar Horizon / Soroban RPC](https://horizon.stellar.org) |

---

## 📂 Backend Structure

```
backend/
├── src/
│   ├── modules/        # Feature modules (auth, users, events, etc.)
│   ├── config/         # Configuration and environment setup
│   ├── main.ts         # Application entry point
│   └── app.module.ts   # Root module
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` file at the root of your backend directory:

```bash
DATABASE_URL=postgres://<username>:<password>@<host>/<database>
PORT=5000
JWT_SECRET=<your-secret-key>
NODE_ENV=production

# Stellar / Soroban configuration
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
CONTRACT_ADDRESS=<your-soroban-contract-id>
TREASURY_SECRET_KEY=<deployer-or-treasury-secret-key>
```

---

## 🛠 Local Setup

```bash
git clone https://github.com/ProofPass-HQ/proofpass.git
cd backend
npm install
```

Start the development server:

```bash
npm run start:dev
```

Then visit: 👉 http://localhost:5000

---

## 🧱 Database (Neon Setup)

1. Create a PostgreSQL database on [Neon](https://neon.tech)
2. Copy your connection string (e.g.):

```
postgres://user:password@ep-rapid-db.neon.tech/proofpass
```

3. Paste it into `.env` as `DATABASE_URL`
4. Synchronize entities automatically (for dev): `npm run start:dev`

---

## 🔗 Stellar Integration

ProofPass uses **Soroban** (Stellar's smart contract platform) for on-chain event and attendance logic.

Key integration points:
- **Event creation** — writes event metadata to a Soroban contract
- **Ticket purchase** — invokes contract to mint attendance record, paid in XLM
- **Check-in** — verifies attendee via Stellar account signature
- **Revenue settlement** — triggers contract to split funds between organizer and platform

Useful Stellar resources:
- [Stellar Docs](https://developers.stellar.org)
- [Soroban Smart Contracts](https://developers.stellar.org/docs/smart-contracts)
- [Stellar Testnet Friendbot](https://friendbot.stellar.org)
- [Stellar Expert Explorer](https://stellar.expert)

---

## 🌐 Backend Deployed At

[https://proofpass.onrender.com](https://proofpass.onrender.com)
