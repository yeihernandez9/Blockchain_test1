import React,{useState, useEffect} from 'react'
import { createProposal, voteProposal, executeProposal, getProposalDetails} from '../../services/DaoServices';
import { useMetaMask } from '../../contexts/MetaMaskContext';


const DaoPage = () => {
    const {account} = useMetaMask();
    const [description, setDescription] = useState("");
    const [proposalId, setProposalId] = useState("");
    const [proposalDetails, setProposalDetails] = useState(null);

    const handleCreateProposal = async () => {
        await createProposal(account, description);
    }

    const handleVoteProposal = async () => {
        await voteProposal(account, proposalId);
    }

    const handleExecuteProposal = async () => {
        await executeProposal(account, proposalId);
    }

    const handleGetProposalDetails = async () => {
        const details = await getProposalDetails(proposalId);
        const formattedDetails = {
            id: details[0].toString(),
            description: details[1],
            votes: details[2].toString(),
            executed: details[3] ? 'Yes' : 'No'
        };
        setProposalDetails(formattedDetails);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dao Page</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreateProposal}>
                    Create Proposal
                </button>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Proposal Id"
                    onChange={(e) => setProposalId(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-secondary" onClick={handleVoteProposal}>
                    Vote Proposal
                </button>
            </div>
            <div className="mb-3">
                <button className="btn btn-success" onClick={handleExecuteProposal}>
                    Execute Proposal
                </button>
            </div>
            <div className="mb-3">
                <button className="btn btn-info" onClick={handleGetProposalDetails}>
                    Get Proposal Details
                </button>
            </div>
            {proposalDetails && (
                <div className="alert alert-secondary mt-3">
                    <p><strong>ID:</strong> {proposalDetails.id}</p>
                    <p><strong>Description:</strong> {proposalDetails.description}</p>
                    <p><strong>Votes:</strong> {proposalDetails.votes}</p>
                    <p><strong>Executed:</strong> {proposalDetails.executed}</p>
                </div>
            )}
        </div>
    );
}

export default DaoPage
