# 🎟️ ProofPass — Blockchain-Powered Event Attendance & Revenue Platform

> On-chain event attendance verification built on Stellar and Soroban.

**Status:** Early development — smart contracts in progress, frontend scaffold live.

Live app: [proofpass-pi.vercel.app](https://proofpass-pi.vercel.app)

---

## What it does

ProofPass lets event organizers create verifiable attendance records on Stellar. When an attendee checks in, the event, the wallet, and the timestamp are recorded on-chain via a Soroban smart contract. The record is permanent, public, and requires no trust in a central database.

**For organizers**
- Create an event on-chain in seconds
- Track check-ins in real time
- Export immutable attendance reports for compliance or proof of engagement

**For attendees**
- Check in via Freighter wallet signature or QR scan
- Build a verifiable on-chain attendance history
- No fake check-ins — every record requires a real wallet signature

---

## Why Stellar

Most event platforms store attendance in a private database. That record can be deleted, altered, or lost. Stellar's finality model means a check-in transaction, once confirmed, cannot be reversed or edited. Soroban's low fees (fractions of a cent per transaction) make per-attendee on-chain records economically viable at any event size — something impractical on higher-fee chains.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui |
| Blockchain | Stellar (testnet / mainnet) |
| Smart contracts | Soroban (Rust) — in progress |
| Wallet | Freighter |

---

## Current state

- [x] Frontend scaffold deployed
- [x] Freighter wallet connection
- [ ] Event registry Soroban contract
- [ ] Ticket / check-in contract
- [ ] Mainnet deployment
- [ ] Organizer dashboard

This project is in active early development. Smart contract code is not yet deployed.

---

## Getting started

**Prerequisites**
- Node.js 18+
- [Freighter Wallet](https://freighter.app) connected to Stellar Testnet

```bash
git clone https://github.com/ProofPass-HQ/proofpass
cd proofpass
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Contributing

Issues and PRs are open. If you're building on Stellar or Soroban and want to contribute to the contract layer, open an issue first to align on approach.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push
4. Open a pull request

---

## License

MIT — see [LICENSE](LICEN
