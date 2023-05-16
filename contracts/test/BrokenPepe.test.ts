import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";



describe("BrokenPepe", function () {
    async function deployBrokenPepeFixture() {
        const [owner, otherAccount, taxReserve] = await ethers.getSigners();

        const BrokenPepe = await ethers.getContractFactory("BrokenPepe");
        const brokenPepe = await BrokenPepe.deploy(otherAccount.address, { gasLimit: 30000000 });
        await brokenPepe.deployed();

        return { brokenPepe, owner, otherAccount, taxReserve };
    }

    describe("Deployment", function () {
        it("Should have the correct initial distribution", async function () {
            const { brokenPepe, owner } = await loadFixture(deployBrokenPepeFixture);

            console.log(brokenPepe, owner, 'yeahhhh');

            const totalSupply = await brokenPepe.totalSupply();
            const teamAllocation = await brokenPepe.teamAllocation();
            const marketingAllocation = await brokenPepe.marketingAllocation();
            const stakingAllocation = await brokenPepe.stakingAllocation();
            const bottleCapAllocation = await brokenPepe.bottleCapAllocation();

            const publicAllocation = totalSupply.sub(
                teamAllocation.add(marketingAllocation).add(stakingAllocation).add(bottleCapAllocation)
            );

            expect(await brokenPepe.balanceOf(owner.address)).to.equal(publicAllocation);
        });
    });
    /*
    describe("Transfers", function () {
        it("Should not tax exempted accounts", async function () {
            const { brokenPepe, owner, otherAccount } = await loadFixture(deployBrokenPepeFixture);

            const initialBalance = await brokenPepe.balanceOf(otherAccount.address);
            await brokenPepe.transfer(otherAccount.address, 1000);

            expect(await brokenPepe.balanceOf(otherAccount.address)).to.equal(initialBalance.add(1000));
        });

        it("Should tax non-exempted accounts", async function () {
            const { brokenPepe, owner, otherAccount } = await loadFixture(deployBrokenPepeFixture);

            await brokenPepe.setExemptFee(owner.address, false);
            const initialBalance = await brokenPepe.balanceOf(otherAccount.address);

            await brokenPepe.transfer(otherAccount.address, 1000);

            expect(await brokenPepe.balanceOf(otherAccount.address)).to.be.below(initialBalance.add(1000));
        });

        it("Should transfer tax to taxReserve when tokenLiquidityThreshold is met", async function () {
            const { brokenPepe, owner, taxReserve } = await loadFixture(deployBrokenPepeFixture);

            const initialBalance = await ethers.provider.getBalance(taxReserve.address);

            await brokenPepe.setExemptFee(owner.address, false);
            await brokenPepe.transfer(owner.address, brokenPepe.tokenLiquidityThreshold());

            expect(await ethers.provider.getBalance(taxReserve.address)).to.be.above(initialBalance);
        });
    });*/
});
