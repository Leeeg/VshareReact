import React, {Component} from 'react';
import AMap from "../../component/Location";
import CustomBreadcrumb from "../../component/CustomBreadcrumb";

class Location extends Component {

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['位置信息']}/>
                <AMap/>
            </div>
        )
    }
}

export default Location;
