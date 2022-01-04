import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const Web3 = require('web3');
//引入contract
const treasureMiningContract = require('./ABI/treasureMining.json') 
const treasureMiningContractAdress = "0xac207279dec9C4D90233302cA52EC6b85026b08E";
let web3;
let myContract;

class Game extends Component {

  constructor() {
    super();
    this.state = {
      accounts: []
    }
  }
  //類似Start
  async componentWillMount() {
    //連結帳號
    this.ethEnabled();
    const accounts = await web3.eth.getAccounts();
    this.setState({accounts: accounts});
    //const balance = await web3.eth.getBalance(accounts[0]);
    //console.log(balance);
    web3.eth.Contract.defaultAccount = accounts[0];
    //建立合約
    myContract = new web3.eth.Contract(treasureMiningContract,treasureMiningContractAdress,{from: web3.eth.Contract.defaultAccount});
  }

  //連接網域
  ethEnabled() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    }else{
      //當下沒有就指定特定網域
      web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
    }
  }

  //實作呼叫合約邏輯
  send_A() {
    let a = web3.utils.toWei("0.03", 'ether');

    myContract.methods.mining().send({value:10000},function(result){
      
    });
  }

  send_B() {
    console.log("send_B");
    myContract.methods.getGameData().call({},function(error, result){
      console.log(result);
    });
  }

  send_C() {
    console.log("send_C");
  }

  //UI顯示
  render() {
    return (
      <section className="latest-preview-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="sidebar-option">
                <div className="social-media">
                  <div className="section-title">
                    <h5>Game</h5>
                  </div>
                  <ul>
                    <a href="#" onClick={() => this.send_A()}>
                      <li>
                        <div className="sm-icon"><i className="fa fa-facebook" /></div>
                        <span>Mining</span>
                        <div className="follow">10000 Bet</div>
                      </li>
                    </a>
                    <a href="#" onClick={() => this.send_B()}>
                      <li>
                        <div className="sm-icon"><i className="fa fa-twitter" /></div>
                        <span>Mining</span>
                        <div className="follow">20000 Bet</div>
                      </li>
                    </a>
                    <a href="#" onClick={() => this.send_C()}>
                      <li>
                        <div className="sm-icon"><i className="fa fa-youtube-play" /></div>
                        <span>Mining</span>
                        <div className="follow">30000 Bet</div>
                      </li>
                    </a>
                    <a href="#" onClick={() => this.send_C()}>
                      <li>
                        <div className="sm-icon"><i className="fa fa-instagram" /></div>
                        <span>Mining</span>
                        <div className="follow">40000 Bet</div>
                      </li>
                    </a>
                  </ul>
                </div>
                <div>
                  <img src="img/box.png"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to My Dapp</h2>
      //     <button onClick={() => this.send_A()}>send_A</button>
      //     <br></br>
      //     <button onClick={() => this.send_B()}>send_B</button>
      //     <br></br>
      //     <button onClick={() => this.send_C()}>send_C</button>
      //     {this.state.accounts.map((i,idx) => (
      //         <p key={idx}>帳號{idx}:  {i}</p>
      //     ))}
      //   </div>
      //   <p className="App-intro">

      //   </p>
      // </div>
    );
  }
}

export default Game;