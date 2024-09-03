import Web3 from 'web3';
import ERC20Token from '../contracts/ERC20Token.json';

//inicializar web3
const web3 = new Web3(window.ethereum);
//const web3 = new Web3('https://sepolia.infura.io/v3/7fbd08795e5c4718877e2d590695a022');

const contractAddress = '0x8EF50807F308Ff3eE8e127BF509E73Ed3d4646f0';
const contractABI = ERC20Token.abi;
const erc20Contract = new web3.eth.Contract(contractABI,contractAddress);

// obtener balance de los TETO
export const getBalanceTeto = async (account) =>{
    try {
        const balanceTeto = await erc20Contract.methods.balanceOf(account).call();
        return balanceTeto.toString();
    } catch (error) {
        console.error('Error al obtener el balace de los TETO', error);
    }
}

// obtener el nombre del Token TETO
export const getTokenName = async () =>{
    try {
        const name = await erc20Contract.methods.name().call();
        console.log(`nombre: ${name}`);
        return name;
    } catch (error) {
        console.error('Error al obtener el nombre del Token', error);
    }
}

// obtener el simbolo del Token TETO
export const getTokenSymbol = async () =>{
    try {
        const symbol = await erc20Contract.methods.symbol().call();
        return symbol;
    } catch (error) {
        console.error('Error al obtener el simbolo del Token', error);
    }
}

// transferir token
export const transferirTokens = async (fromAddress, toAddress, amount) =>{
    try {
        if(!window.ethereum){
            console.error('No se detecta MetaMask');
            return;
        }
        const amountWei =  web3.utils.toWei(amount.toString(), 'ether');
        const transfer = await erc20Contract.methods.transfer(toAddress, amountWei/10000000000000000)
        .send({from: fromAddress});

        return transfer;

    } catch (error) {
        console.error('La transferencia no se pudo realizar',error);
        return null;
    }
}



