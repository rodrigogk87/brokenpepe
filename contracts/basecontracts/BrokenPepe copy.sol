/**
 * BrokenPepe v1.0
 * designed and engineered by Jscrui && xilom.
 * author: 0xJscrui & xilom.
 * SPDX-License-Identifier: MIT
 *
 * Tokenomics:
 * Liquidity        60%
 * Staking          20%
 * Team             10%
 * Marketing         7%
 * Bottle Caps       3%
 *
 * Taxes
 * POOR             10%
 * LOW CLASS       7.5%
 * MIDDLE CLASS      5%
 * UPPER CLASS     2.5%
 * RICH      No Tax for the rich!
 * Total Supply: 100_000_000_000_000 BPP
 */

pragma solidity ^0.8.17;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) internal _balances;

    mapping(address => mapping(address => uint256)) internal _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * The defaut value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(
            currentAllowance >= amount,
            "ERC20: transfer amount exceeds allowance"
        );
        _approve(sender, _msgSender(), currentAllowance - amount);

        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual returns (bool) {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender] + addedValue
        );
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        _approve(_msgSender(), spender, currentAllowance - subtractedValue);

        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(
            senderBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        _balances[sender] = senderBalance - amount;
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[account] = accountBalance - amount;
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

library Address {
    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _setOwner(_msgSender());
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        _setOwner(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _setOwner(newOwner);
    }

    function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IFactory {
    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair);
}

interface IRouter {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        external
        payable
        returns (uint amountToken, uint amountETH, uint liquidity);

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

import "hardhat/console.sol";

contract BrokenPepe is ERC20, Ownable {
    using Address for address payable;

    IRouter public router;
    address public pair;

    uint256 public tokenLiquidityThreshold = 1000000 * 1e18; //50_000_000_000 * 1e18; //50_000_000_000 tokens = 0.05% of Total Supply

    bool private _liquidityMutex = false;
    bool public providingLiquidity = false;

    address public team = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address public marketing = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    address public stakingReserve = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
    address public bottleCapReserve =
        0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65;
    address public taxReserve = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc;

    uint256 public teamAllocation;
    uint256 public marketingAllocation;
    uint256 public stakingAllocation;
    uint256 public bottleCapAllocation;

    uint256 public genesis_block;

    address public routerAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D; //uniswapv2

    mapping(address => bool) public exemptFee;
    mapping(address => bool) public isBlacklisted;

    // AntiDump
    mapping(address => uint256) private _lastSell;

    uint256 fee;

    // Antiloop
    modifier mutexLock() {
        if (!_liquidityMutex) {
            _liquidityMutex = true;
            _;
            _liquidityMutex = false;
        }
    }

    constructor() ERC20("Broken Pepe", "BPP") {
        uint256 totalSupply = 100_000_000_000_000 * (10 ** decimals()); //1T

        // Initial allocation of tokens
        teamAllocation = (totalSupply * 10) / 100; // 10%
        marketingAllocation = (totalSupply * 7) / 100; // 7%
        stakingAllocation = (totalSupply * 20) / 100; // 20%
        bottleCapAllocation = (totalSupply * 3) / 100; // 3%

        uint256 publicAllocation = totalSupply -
            teamAllocation -
            marketingAllocation -
            stakingAllocation -
            bottleCapAllocation;

        //Mint tokens
        // Transfer allocations
        _mint(team, teamAllocation);
        _mint(marketing, marketingAllocation);
        _mint(stakingReserve, stakingAllocation);
        _mint(bottleCapReserve, bottleCapAllocation);
        _mint(msg.sender, publicAllocation);

        //Define Router
        IRouter _router = IRouter(routerAddress);

        //Create a pair for this new token
        address _pair = IFactory(_router.factory()).createPair(
            address(this),
            _router.WETH()
        );

        //Define router and pair to variables
        router = _router;
        pair = _pair;

        //Add exceptions
        exemptFee[msg.sender] = true;
        exemptFee[address(this)] = true;
        exemptFee[team] = true;
        exemptFee[marketing] = true;
        exemptFee[stakingReserve] = true;
        exemptFee[bottleCapReserve] = true;
        exemptFee[taxReserve] = true;
    }

    function approve(
        address spender,
        uint256 amount
    ) public override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(
            currentAllowance >= amount,
            "ERC20: transfer amount exceeds allowance"
        );
        _approve(sender, _msgSender(), currentAllowance - amount);

        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public override returns (bool) {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender] + addedValue
        );
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public override returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        _approve(_msgSender(), spender, currentAllowance - subtractedValue);

        return true;
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        require(
            amount > 0,
            "Broken Pepe: Transfer amount must be greater than zero"
        );
        require(
            !isBlacklisted[sender] && !isBlacklisted[recipient],
            "Broken Pepe: Blacklisted"
        );

        if (recipient == pair && genesis_block == 0)
            genesis_block = block.number;

        uint256 feeswap;
        //Set fee to 0 if fees in contract are Handled or Exempted
        if (_liquidityMutex || exemptFee[sender] || exemptFee[recipient]) {
            fee = 0;
        } else if (recipient == pair || sender != pair) {
            //sell or between non excluded accounts
            feeswap = calculateFee();
        }

        if (sender != pair && feeswap > 0) {
            handle_fees(); //transfer fee to taxReserve
        }

        // Fee -> total amount of tokens to be substracted
        fee = (amount * feeswap) / 10_000;

        super._transfer(sender, recipient, amount - fee); //transfer to recipient amount minus fees

        console.log("fee", fee);
        console.log("feeswap", feeswap);
        console.log("amount", amount);
        console.log("sender", sender);
        console.log("pair", pair);
        console.log("recipient", recipient);

        if (fee > 0) {
            //Send the fee to the contract
            if (feeswap > 0) {
                uint256 feeAmount = (amount * feeswap) / 10_000;
                super._transfer(sender, address(this), feeAmount);
            }
        }
    }

    function handle_fees() private mutexLock {
        uint256 tokenBalance = balanceOf(address(this));

        if (tokenBalance >= tokenLiquidityThreshold) {
            //Swap
            swapTokensForETH(tokenBalance); //swap the eth fees
            uint256 ethBalance = address(this).balance;

            //Send the eth fee to the taxReserve
            payable(taxReserve).sendValue(ethBalance);
        }
    }

    function swapTokensForETH(uint256 tokenAmount) private {
        console.log("swapTokensForETH", tokenAmount);
        console.log("msg.sender", msg.sender);
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = router.WETH();

        _approve(address(this), address(router), tokenAmount);

        router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function calculateFee() public view returns (uint256) {
        uint256 _balance = balanceOf(msg.sender);
        if (_balance <= 50_000_000 * (10 ** 18)) {
            return 1000; // represents 10.00%
        } else if (_balance <= 500_000_000 * (10 ** 18)) {
            return 750; // represents 7.50%
        } else if (_balance <= 900_000_000 * (10 ** 18)) {
            return 500; // represents 5.00%
        } else if (_balance <= 1_500_000_000 * (10 ** 18)) {
            return 250; // represents 2.50%
        } else {
            return 0;
        }
    }

    function setLiquidityProvide(bool _state) external onlyOwner {
        providingLiquidity = _state;
    }

    function setLiquidityThreshold(
        uint256 _newLiquidityThreshold
    ) external onlyOwner {
        require(
            _newLiquidityThreshold != 0,
            "MrETH: Liquidity threshold can't be 0"
        );
        tokenLiquidityThreshold = _newLiquidityThreshold * 1e18;
    }

    function setRouterAndPair(
        address _newRouter,
        address _newPair
    ) external onlyOwner {
        require(_newRouter != address(0), "MrETH: Router is the zero address");
        require(_newPair != address(0), "MrETH: Pair is the zero address");
        router = IRouter(_newRouter);
        pair = _newPair;
    }

    function setIsBlacklisted(
        address _account,
        bool _state
    ) external onlyOwner {
        require(_account != address(0), "MrETH: Owner can't be blacklisted.");
        isBlacklisted[_account] = _state;
    }

    function setBulkIsBlacklisted(
        address[] calldata accounts,
        bool _state
    ) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; ) {
            isBlacklisted[accounts[i]] = _state;
            unchecked {
                i++;
            }
        }
    }

    function setExemptFee(address _address, bool _state) external onlyOwner {
        exemptFee[_address] = _state;
    }

    function setBulkExemptFee(
        address[] calldata accounts,
        bool _state
    ) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; ) {
            exemptFee[accounts[i]] = _state;
            unchecked {
                i++;
            }
        }
    }

    function getPair() public view returns (address) {
        return pair;
    }

    function rescueETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function rescueBEP20(
        address _tokenAddress,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_tokenAddress).transfer(owner(), _amount);
    }

    receive() external payable {}
}
