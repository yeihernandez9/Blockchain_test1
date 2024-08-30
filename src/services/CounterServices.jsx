import Web3 from 'web3';
import CounterContract from '../contracts/Counter.json'

//inicilizar web3
const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const contractAddress = CounterContract.networks['5777'].address;
const contractABI = CounterContract.abi;
const counterContract = new web3.eth.Contract(contractABI,contractAddress);

export const getCount = async () =>{
    try {
        const count = await counterContract.methods.getCount().call();
        console.log(count);
        return count.toString();
    } catch (error) {
        console.log('Error al consultar el contrato Counter',error);
        return null;
    }
}

export const  incrementCount = async () =>{
    const account = await web3.eth.getAccounts();
    try {
       const increment =  await counterContract.methods.increment().send({from: account[0]});
       return increment
    } catch (error) {
        console.log('Error al consultar el contrato Counter',error);
        return null;
    }
}



export const  decrementCount = async () =>{
    const account = await web3.eth.getAccounts();
    try {
       const decrement =  await counterContract.methods.decrement().send({from: account[0]});
       return decrement
    } catch (error) {
        console.log('Error al consultar el contrato Counter',error);
        return null;
    }
}