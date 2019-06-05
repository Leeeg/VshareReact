import React, {Component} from 'react';

class ExcelInput extends Component {

    render() {
        return (
            <div>
                <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel}/>
            </div>
        )

    }
}

export default ExcelInput;