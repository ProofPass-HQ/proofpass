# ProofPass Soroban Contract

This directory contains the Rust/Soroban smart contract scaffold for ProofPass.

## Prerequisites

Install the pinned Rust toolchain for this contract:

```bash
rustup toolchain install 1.84.0
```

Install the WebAssembly targets used by Cargo and the Stellar CLI:

```bash
rustup target add wasm32-unknown-unknown --toolchain 1.84.0
rustup target add wasm32v1-none --toolchain 1.84.0
```

Install the Stellar CLI:

```bash
cargo install --locked stellar-cli --features opt
```

## Local Build

From this directory, run either build flow:

```bash
cargo build --target wasm32-unknown-unknown --release
```

```bash
stellar contract build
```

The Cargo build writes the compiled WASM artifact to:

```text
target/wasm32-unknown-unknown/release/
```

The Stellar CLI build uses Soroban's `wasm32v1-none` target internally and writes artifacts under:

```text
target/wasm32v1-none/release/
```

## Notes

- `rust-toolchain.toml` pins the contract to Rust `1.84.0`, which matches the Soroban SDK support window used by this scaffold.
- `stellar contract build` requires the `wasm32v1-none` Rust target in addition to `wasm32-unknown-unknown`.
- `cargo test` is intentionally disabled for the contract library target until host-side Soroban tests are added in a follow-up issue.

## Project Layout

```text
contract/
|-- .cargo/config.toml
|-- Cargo.toml
|-- src/lib.rs
`-- readme.md
```

## Next Steps

The current contract only contains the initial `ProofPassContract` skeleton. Follow-up issues can add storage, events, and public contract methods on top of this scaffold.
