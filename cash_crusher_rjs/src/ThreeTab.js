import {Nav} from 'react-bootstrap';

function ThreeTabs() {
    return (
        <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  export default TabsExample;

<Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="0">
<Nav.Item>
  <Nav.Link eventKey="0">Tab 1</Nav.Link>
</Nav.Item>
<Nav.Item>
  <Nav.Link eventKey="1">Tab 2</Nav.Link>
</Nav.Item>
<Nav.Item>
  <Nav.Link eventKey="2">Tab 3</Nav.Link>
</Nav.Item>
</Nav>



function TabContent(props){
    if(props.ClickedTab === 0){
      return <div>Tab 1 content.</div>
    }else if(props.ClickedTab === 1) {
      return <div>Tab 2 content.</div>
    }else if(props.ClickedTab === 2){
      return <div>Tab 3 content.</div>
    }
  }

