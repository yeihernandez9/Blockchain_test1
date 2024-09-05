import React, {useState, useEffect} from 'react';
import { getNFTs } from '../../services/ERC721Services';
import { useMetaMask } from '../../contexts/MetaMaskContext';
import { Alert, Container, Spinner, Row, Col, Card } from 'react-bootstrap'

const NftPage = () => {
    const {account} = useMetaMask(); // usamos el contexto de MetaMask para obtener la cuenta conectada
    const [nfts, setNfts] = useState([]); // Estado para almacenar los NFTs obtenidos
    const [loading, SetLoading] = useState(false); // Estado para manejar la carga del NFTs
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(()=>{
        console.log("paso por este lado")
        const fetchNFT = async () =>{
            if(!account) return;
            
            SetLoading(true);
            try {
                const fechedNFTs = await getNFTs(account);
                console.log('obteniendo los NFTS', fechedNFTs);
                setNfts(fechedNFTs);
            } catch (error) {
                setError("Error al obtener los NFTS");
                console.log(error)
            }
            SetLoading(false);
        };
        fetchNFT();
    },[account]);

    if(!account){
        return(
            <Alert variant='warning'>
                Por favor, conecta tu billetera MetaMask para ver tus NFTs
            </Alert>
        )
    }

  return (
    <Container>
      <h1 className='mt-4 text-center'>Galeria de NFTs</h1>
      {
        loading ? (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' role="status">
                    <span className='visually-hidden'>Cargando...</span>
                </Spinner>
            </div>
        ): error ? (
            <Alert variant='danger'>
                {error}
            </Alert>
        ) : nfts.length > 0 ? (
            <Row>
                { nfts.map ((nft)=>
                    <Col md={4} sm={6} xs={12} key={nft.tokenId} className='mb-4'>
                        <Card>
                            {
                                nft.metadata && nft.metadata.image ? (
                                    <Card.Img
                                    variant='top'
                                    src={nft.metadata.image}
                                    alt={`NFT #${nft.tokenId}`}
                                    style={{maxHeight: "200px", objectFit:"cover"}}
                                    />
                                ):(
                                    <Card.Img
                                    variant='top'
                                    src="https://via.placeholder.com/200"
                                    alt="Placeholder"
                                    style={{maxHeight: "200px", objectFit:"cover"}}
                                    />
                                )}

                                <Card.Body>
                                    <Card.Title>NFT #{nft.tokenId}</Card.Title>
                                    <Card.Text>
                                        {nft.metadata ? nft.metadata.name : "Sin nombre"}
                                    </Card.Text>
                                    <Card.Text>
                                        {nft.metadata ? nft.metadata.description : "Sin description"}
                                    </Card.Text>
                                </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        ):(
            <Alert variant='info'>
                No tienes NFT en esta cuenta
            </Alert>
        )
      }
    </Container>
  )
}

export default NftPage
