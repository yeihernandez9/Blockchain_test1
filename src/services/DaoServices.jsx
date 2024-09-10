import Web3 from 'web3';
import DAOContract from '../contracts/DaoToken.json';

//inicializar web3
const web3 = new Web3(window.ethereum);

//Address del contrato del DAO
const contractAddress = '0xdFD64f996366969BEE27287F9f50d0116D8ed467';
const contractABI = DAOContract.abi;
const daoToken = new web3.eth.Contract(contractABI,contractAddress);

// Crear propuesta
export const createProposal = async (account, description) => {
    try {
        const tx = await daoToken.methods.createProposal(description).send({from: account});
        console.log("Propuesta cread",tx);
        return tx;
    } catch (error) {
        console.error("Error al crear la propuesta", error);
    }
}

// Votar en una propuesta
export const voteProposal = async (account, proposalId) => {
    try {
        const tx = await daoToken.methods.voteOnProposal(proposalId).send({from: account});
        console.log("Voto realizado",tx);
        return tx;
    } catch (error) {
        console.error("Error al votar por la propuesta", error);
    }
}

export const executeProposal = async(account, proposalId) =>{
    try {
        const tx =  await daoToken.methods.executeProposal(proposalId).send(({from: account}));
        console.log("Propuesta ejecutada",tx);
        return tx;
    } catch (error) {
        console.error("Error al ejecutar la propuesta", error)
    }
}

export const getProposalDetails = async(proposalId) =>{
    try {
        const tx = await daoToken.methods.getProposal(proposalId).call();
        console.log("Detalles de la propuesta",tx);
        return tx.toString();
    } catch (error) {
        console.error("Error al obtener los detalles de la propuesta", error);
    }
}
