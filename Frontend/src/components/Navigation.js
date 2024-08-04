import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { ValueContext } from '../provider/SelectedItems';
import LogIn from './LogIn';
import { useNavigate } from 'react-router-dom';
const Navigation = ({ account, setAccount }) => {
  const navigator = useNavigate();
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
    // console.log('value', inputvalue);
  };

  return (
    <>
      <nav>
        <div className="nav__brand">
          <h1>BlockBuy</h1>
        </div>
        <div className="">
          <input
            type="text"
            className="nav__search"
            value={inputvalue}
            onChange={handleValue}
          />
          {account ? (
            <button type="button" className="nav__connect">
              {account.slice(0, 6) + '...' + account.slice(38, 42)}
            </button>
          ) : (
            <button
              type="button"
              className="nav__connect"
              onClick={connectHandler}
            >
              Connect
            </button>
          )}
          <button
            className="nav_signup"
            onClick={() => {
              navigator('/login');
            }}
          >
            SIGN UP
          </button>
        </div>
      </nav>
      {/* <button className="nav_signup">SIGN UP</button> */}
      {/* <div className="nav__links"> */}
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

      {/* </div> */}
      {/* </nav> */}
    </>
  );
};

export default Navigation;
