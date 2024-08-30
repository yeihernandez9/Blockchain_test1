import React, { useEffect, useState } from "react";
import { useMetaMask } from "../../contexts/MetaMaskContext";
import { getCount, incrementCount, decrementCount } from "../../services/CounterServices";
import { Button, Container } from "react-bootstrap";

const CounterPage = () => {
  const [count, setCount] = useState(null);
  const { account, balance } = useMetaMask();

  useEffect(() => {
    const fetchCount = async () => {
      if (account) {
        try {
          const currentCount = await getCount();
          setCount(currentCount);
        } catch (error) {
          console.log("Error al llamar counter", error);
        }
      }
    };
    fetchCount();
  }, [account]);

  const handleIncrement = async() =>{
    if(account){
        try {
            await incrementCount();
            const updatedCount = await getCount();
            setCount(updatedCount);
        } catch (error) {
            console.log('error al incrementar el count',error);
        }
    }
  }

  const handleDecrement = async() =>{
    if(account){
        try {
            await decrementCount();
            const updatedCount = await getCount();
            setCount(updatedCount);
        } catch (error) {
            console.log('error al incrementar el count',error);
        }
    }
  }

  return (
    <Container className="mt-4">
        {account ?( <div>
        CounterPage:
        <h1>{count !== null ? count : "Cargando..."}</h1>
        <Button
            variant="primary"
            onClick={handleIncrement}
        > Incrementar </Button>

        <Button
            variant="danger"
            onClick={handleDecrement}
        > Decrementar </Button>
      </div>):(
        <div>Por favor conectar MetaMask</div>
      )}
     
    </Container>
  );
};

export default CounterPage;
