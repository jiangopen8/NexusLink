// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DIDRegistry {
    struct DIDDoc {
        address owner;
        bytes32 ipfsHash;
        bool active;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(bytes32 => DIDDoc) public dids;
    mapping(address => bytes32[]) public ownerDIDs;

    event DIDRegistered(bytes32 indexed didHash, address indexed owner, bytes32 ipfsHash);
    event DIDUpdated(bytes32 indexed didHash, bytes32 ipfsHash);
    event DIDDeactivated(bytes32 indexed didHash);

    function register(bytes32 _didHash, bytes32 _ipfsHash) external {
        require(!dids[_didHash].active, 'DID already registered');
        dids[_didHash] = DIDDoc({
            owner: msg.sender,
            ipfsHash: _ipfsHash,
            active: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        ownerDIDs[msg.sender].push(_didHash);
        emit DIDRegistered(_didHash, msg.sender, _ipfsHash);
    }

    function resolve(bytes32 _didHash) external view returns (DIDDoc memory) {
        return dids[_didHash];
    }

    function update(bytes32 _didHash, bytes32 _ipfsHash) external {
        require(dids[_didHash].active, 'DID not found');
        require(dids[_didHash].owner == msg.sender, 'Not the owner');
        dids[_didHash].ipfsHash = _ipfsHash;
        dids[_didHash].updatedAt = block.timestamp;
        emit DIDUpdated(_didHash, _ipfsHash);
    }

    function deactivate(bytes32 _didHash) external {
        require(dids[_didHash].active, 'DID not found');
        require(dids[_didHash].owner == msg.sender, 'Not the owner');
        dids[_didHash].active = false;
        emit DIDDeactivated(_didHash);
    }

    function getOwnerDIDs(address _owner) external view returns (bytes32[] memory) {
        return ownerDIDs[_owner];
    }
}
