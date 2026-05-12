// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract NSSRegistry {
    struct Skill {
        bytes32 publisherDidHash;
        bytes32 descriptorIpfsHash;
        uint256 priceWei;
        uint256 callCount;
        bool active;
        uint256 createdAt;
    }

    mapping(bytes32 => Skill) public skills;

    event SkillPublished(bytes32 indexed skillId, bytes32 publisherDidHash, bytes32 descriptorIpfsHash, uint256 priceWei);
    event SkillInvoked(bytes32 indexed skillId);
    event SkillDeactivated(bytes32 indexed skillId);

    function publish(bytes32 _skillId, bytes32 _publisherDidHash, bytes32 _descriptorIpfsHash, uint256 _priceWei) external {
        require(!skills[_skillId].active, 'Skill already published');
        skills[_skillId] = Skill({
            publisherDidHash: _publisherDidHash,
            descriptorIpfsHash: _descriptorIpfsHash,
            priceWei: _priceWei,
            callCount: 0,
            active: true,
            createdAt: block.timestamp
        });
        emit SkillPublished(_skillId, _publisherDidHash, _descriptorIpfsHash, _priceWei);
    }

    function invoke(bytes32 _skillId) external {
        require(skills[_skillId].active, 'Skill not found');
        skills[_skillId].callCount += 1;
        emit SkillInvoked(_skillId);
    }

    function resolve(bytes32 _skillId) external view returns (Skill memory) {
        return skills[_skillId];
    }

    function deactivate(bytes32 _skillId) external {
        require(skills[_skillId].active, 'Skill not found');
        skills[_skillId].active = false;
        emit SkillDeactivated(_skillId);
    }
}
