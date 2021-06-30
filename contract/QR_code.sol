// SPDX-License-Identifier: MIT

pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract QR_code {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: USDC/USD
     * Address: 0xA73b861925E3e220A2254DFD20C507eF21Eb292A
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xA73b861925E3e220A2254DFD20C507eF21Eb292A);
    }
    
    /**
     * Sends event on receive
     */
    event Received(address, uint);
    
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return price;
    }
}
