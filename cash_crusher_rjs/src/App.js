import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container>
      <Stack direction="horizontal" gap="2" className="mb-4 justify-content-center bg-success">
        <h1 className="text-white p-3">Transactions</h1>
        <Button variant="primary">Refresh</Button> 
      </Stack>
    </Container>
  );
}

export default App;
