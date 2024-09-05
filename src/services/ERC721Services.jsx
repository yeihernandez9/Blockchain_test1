import Web3 from 'web3';
import ERC721Contract from '../contracts/ERC721Contract.json';

//inicializar web3
const web3 = new Web3(window.ethereum);
//const web3 = new Web3('https://sepolia.infura.io/v3/7fbd08795e5c4718877e2d590695a022');

//Address del contrato del ERC721
const contractAddress = '0x296bf0848ceD267F0Dbfc598bcBca58A3DF55180';

//Crear una instancia del contrato ERC721
const contractABI = ERC721Contract.abi;

//llamar contrato en la web2 enviando el contrato ABI y la direccion del contrato
const erc721Contract = new web3.eth.Contract(contractABI,contractAddress);

// crear una funcion que nos devuelva los NFT del contrato
export const getNFTs = async (account) => {
    try {
        const transferEvent = await erc721Contract.getPastEvents('Transfer',{
            filter: {to: account},
            fromBlock: 0,
            toBlock: 'latest'
        });

        console.log("Transfer event", transferEvent)

        const nftsPromise = transferEvent.map(async (event) =>{
            const tokenId = event.returnValues.tokenId;
            const tokenURI = await erc721Contract.methods.tokenURI(tokenId).call();

            const metadata =  await fetch(tokenURI).then(response => response.json());
            return {
                tokenId,
                metadata,
            };
        });

        const nfts =  await Promise.all(nftsPromise);
        return nfts;
    } catch (error) {
        console.log("Error al obtener los NFTs", error);
        return[];
    }
};