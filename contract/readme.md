# 🎟️ ProofPass Smart Contracts

A blockchain-based event attendance and verification system built on **Stellar** using **Soroban** smart contracts for fast, low-cost, and profitable on-chain event management.

---

## 🏗️ Architecture

The ProofPass Soroban smart contract suite powers the event lifecycle from creation to check-in and settlement.

### Core Components

- **Event Registry** — Create, manage, and track events on-chain
- **Ticketing System** — Mint and manage event passes as Stellar assets
- **Check-in System** — Verify attendee presence with Stellar account signature or QR scan
- **Revenue Splitter** — Distribute XLM payments between platform and organizer
- **Verification Layer** — Immutable record of attendance stored on Stellar
- **Future Analytics** — Attendance insights and engagement statistics

---

## 📋 Contract Details

### Network Information

- **Blockchain:** Stellar Testnet
- **Contract ID:** `CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` *(replace with deployed contract ID)*
- **Block Explorer:** [Stellar Expert (Testnet)](https://stellar.expert/explorer/testnet)
- **Network RPC:** [https://soroban-testnet.stellar.org](https://soroban-testnet.stellar.org)
- **Horizon URL:** [https://horizon-testnet.stellar.org](https://horizon-testnet.stellar.org)
- **Network Passphrase:** `Test SDF Network ; September 2015`

### Contract Features

- Event creation and on-chain metadata storage
- Ticket minting and XLM purchase tracking
- Secure attendee check-in (QR or Stellar signature-based)
- Automatic revenue split for organizers and platform
- Role-based access control (Owner / Organizer / Attendee)
- Event emission for frontend integration
- Fee-optimized Rust/Soroban implementation

---

## 🚀 Getting Started

### Prerequisites

```bash
# Node.js and npm
node --version  # v18.0.0 or higher
npm --version   # v8.0.0 or higher

# Rust (for compiling Soroban contracts)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Stellar CLI
cargo install --locked stellar-cli --features opt
```

### Installation

```bash
# Clone the repository
git clone https://github.com/ProofPass-HQ/proofpass
cd proofpass/contract

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Configuration

Create a `.env` file with the following variables:

```bash
# Stellar Network Configuration
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Account Configuration
SECRET_KEY=your_deployer_secret_key_here
NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

---

## 🔧 Development

### Compiling Contracts

```bash
# Build the Soroban contract
stellar contract build

# Or using cargo
cargo build --target wasm32-unknown-unknown --release
```

### Testing

```bash
# Run all tests
cargo test
```

### Deployment

```bash
# Deploy to Stellar Testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/proofpass.wasm \
  --source <your-secret-key> \
  --network testnet

# Initialize the contract
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source <your-secret-key> \
  --network testnet \
  -- initialize --admin <admin-address>
```

---

## 📚 Contract API

### Core Functions — Event Management

**`create_event(name: String, price: i128, capacity: u32, sponsor_mode: bool)`**
Creates a new event with defined capacity, price in stroops (XLM), and sponsorship mode.

**`buy_ticket(event_id: u64)`**
Allows attendees to buy event tickets; XLM funds go to escrow until settlement.

**`sponsor_guest(event_id: u64, attendee: Address)`**
Organizer pre-pays for guests (sponsored entry).

**`check_in(event_id: u64, attendee: Address)`**
Marks attendance and emits an `AttendeeCheckedIn` event.

**`settle_event(event_id: u64)`**
Distributes XLM funds between organizer and platform.

---

## 🔗 Useful Links

- **Stellar Testnet Friendbot:** [https://friendbot.stellar.org](https://friendbot.stellar.org)
- **Stellar Expert Explorer:** [https://stellar.expert](https://stellar.expert)
- **Soroban Docs:** [https://developers.stellar.org/docs/smart-contracts](https://developers.stellar.org/docs/smart-contracts)
- **Stellar Docs:** [https://developers.stellar.org](https://developers.stellar.org)
- **Stellar CLI Docs:** [https://developers.stellar.org/docs/tools/developer-tools/cli/stellar-cli](https://developers.stellar.org/docs/tools/developer-tools/cli/stellar-cli)

---

## 📊 Fee Estimation

| Function | Soroban Fee (approx.) | USD Cost* |
|---|---|---|
| Create Event | ~0.1 XLM | ~$0.01 |
| Buy Ticket | ~0.05 XLM | ~$0.005 |
| Check In | ~0.03 XLM | ~$0.003 |
| Settle Event | ~0.05 XLM | ~$0.005 |

*Costs are estimated based on Stellar network conditions and current XLM price.*

---

## 🤝 Contributing Workflow

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your feature
4. Implement your changes
5. Run tests (`cargo test`)
6. Commit and push (`git commit -m 'Add amazing feature'`)
7. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Stellar Development Foundation** — for a developer-friendly and energy-efficient blockchain
- **Soroban** — for the Rust-based smart contract platform
- **Stellar Community** — for resources, feedback, and support

---

Built with ❤️ on Stellar | **Revolutionizing event attendance with on-chain trust and rewards.**
