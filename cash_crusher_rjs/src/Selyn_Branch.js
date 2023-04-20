import Nav from 'react-bootstrap/Nav';
function TabsExample() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Daily</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Monthly</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Summary" Summary>
          Summary
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default TabsExample;