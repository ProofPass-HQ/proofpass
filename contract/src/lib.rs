#![no_std]

use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct ProofPassContract;

#[contractimpl]
impl ProofPassContract {
    pub fn __constructor(_env: Env) {
        // Placeholder entrypoint so the initial scaffold builds cleanly.
    }

    // Functions will be added in follow-up issues
}
