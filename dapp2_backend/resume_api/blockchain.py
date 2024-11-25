# resume_api/blockchain.py
from web3 import Web3
from eth_account import Account
import json
import os
from dotenv import load_dotenv

load_dotenv()

class BlockchainClient:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(os.getenv('BLOCKCHAIN_NODE_URL')))
        self.contract_address = os.getenv('CONTRACT_ADDRESS')
        with open('contract_abi.json', 'r') as f:
            self.contract_abi = json.load(f)
        self.contract = self.w3.eth.contract(
            address=self.contract_address, 
            abi=self.contract_abi
        )

    def get_nonce(self, address):
        return self.w3.eth.get_transaction_count(address)

    def build_transaction(self, function_name, args, sender_address):
        contract_function = getattr(self.contract.functions, function_name)(*args)
        transaction = contract_function.build_transaction({
            'from': sender_address,
            'nonce': self.get_nonce(sender_address),
            'gas': 2000000,
            'gasPrice': self.w3.eth.gas_price
        })
        return transaction

    def sign_and_send_transaction(self, transaction, private_key):
        signed_txn = self.w3.eth.account.sign_transaction(
            transaction, 
            private_key
        )
        tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        return self.w3.eth.wait_for_transaction_receipt(tx_hash)