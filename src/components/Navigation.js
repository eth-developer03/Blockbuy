import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { ValueContext } from '../provider/SelectedItems';
const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  const { inputvalue, setvalue } = useContext(ValueContext);

  const handleValue = (e) => {
    setvalue(e.target.value);
    console.log('value', inputvalue);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>BlockBuy</h1>
      </div>

      <input
        type="text"
        className="nav__search"
        value={inputvalue}
        onChange={handleValue}
      />
      {/* <button style={{ padding: '2px', height: '3px', width: '2px' }}>
        Login
      </button> */}
      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#Accessories">Accessories</a>
        </li>
        <li>
          <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
        </li>
        <li>
          <a href="#Toys & Gaming">Toys & Gaming</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
