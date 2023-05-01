import { React, Component} from 'react';
//import './App.css';
import mainTabs from './mainTabs';
import Tab from './Tab';

class tempTab extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: 'Daily'
      }
    }
    setSelected = (tab) => {
      this.setState({ selected: tab });
    }
    render() {
      return (
        <div className="App mt-4">
          <mainTabs tabs={['Daily', 'Calendar', 'Summary']} selected={ this.state.selected } setSelected={ this.setSelected }>
            <Tab isSelected={ this.state.selected === 'Daily' }>
              <p>Some test text</p>
            </Tab>
            <Tab isSelected={ this.state.selected === 'Calendar' }>
              <h1>More test text</h1>
            </Tab>
            <Tab isSelected={ this.state.selected === 'Summary' }>
              <ul>
                <li>List test 1</li>
                <li>List test 2</li>
                <li>List test 3</li>
              </ul>
            </Tab>
          </mainTabs>
        </div>
      );
    }
  }
  export default tempTab;