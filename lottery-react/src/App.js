import logo from './logo.svg';
import './App.css';
import React from "react";
import lottery from './lottery';
import web3 from './web3';

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message:'',
    lastWinner:''
  };


  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const lastWinner = await lottery.methods.lastWinner().call();
    this.setState({manager,players, balance,lastWinner});
  }

 onSubmit = async (event) => {
  event.preventDefault();
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

  this.setState({message: 'Waiting on transaction success... '});

  await lottery.methods.enter().send({
    from:accounts[0],
    value: web3.utils.toWei(this.state.value,'ether')
  });

  this.setState({message: 'You have been entered!'});
 };

 onClick = async (event) =>{

  this.setState({message: 'Waiting on transaction success... '});

  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  await lottery.methods.pickWinner().send({
    from:accounts[0]
  })

  this.setState({message: 'A winner has been picked!'});
  const lastWinner = await lottery.methods.lastWinner().call();
  this.setState({lastWinner})
 }

  render() {
    return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by:  {this.state.manager}
        There are currentlly {this.state.players.length} people enter!
        Competing to win {web3.utils.fromWei(this.state.balance,'ether')}
      </p>
      <hr/>
      <form onSubmit={this.onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter </label>
          <input 
            value = {this.state.value}
            onChange = {event => this.setState({value: event.target.value})}>

          </input>
          <button>Enter</button>
        </div>
      </form>
      <hr/>
      <h4>Ready to pick a winner?</h4>
      <button onClick={this.onClick}>Pick a winner! </button>
      <p>
        Winner is: {this.state.lastWinner}
      </p>

      <hr/>
      <h1>{this.state.message}</h1>
    </div>
    );
  }
}
export default App;
