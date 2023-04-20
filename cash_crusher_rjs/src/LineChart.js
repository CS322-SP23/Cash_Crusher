import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class LineChart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Plot
                    data={[
                        {
                            x: this.props.allData[0],
                            y: this.props.allData[1],
                            type: 'scatter'
                        }
                    ]}
                    layout={{ width: 1000, height: 500, title: 'Google Stock Data' }}
                />,

                <form method='post' action='/acceptDates'>
                    <input type="text" id='startDate' name='startDate' />
                    <input type='submit' value='submit' />
                </form>
            </div>
        );
    }
}
export default LineChart;