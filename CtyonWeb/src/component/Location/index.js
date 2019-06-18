import React, {Component} from 'react';
import {getAmapKey} from "../../util/utils";
import {Map, Markers, InfoWindow} from 'react-amap';
import request from "../../api/Net";

const plugins = [
    'MapType',//视图
    'Scale',//比例尺
    // 'OverView',//小地图
    // 'ControlBar', // 3D控制器 v1.1.0 新增
    {
        name: 'ToolBar',
        options: {
            visible: true,  // 不设置该属性默认就是 true
            onCreated(ins) {
                console.log(ins);
            },
        },
    }
];

const parePoint = (point) => ({
    longitude: point[0],
    latitude: point[1]
});

const html = `<div><h4>Greetings</h4><p>This is content of this info window</p></div>`;

class AMap extends Component {

    state = {
        data: [],
        markerPosition: [],
        position: {longitude: 108.941517, latitude: 34.315207},
        visible: false,
        center: {longitude: 108.941517, latitude: 34.315207}
    };

    componentDidMount() {
        this.loadPoints();
    }

    markerEvents = {
        click: (MapsOption) => {
            console.log("markerEvents ： click");
            this.setState({
                position: {longitude: MapsOption.lnglat.lng, latitude: MapsOption.lnglat.lat},
                visible: true
            });
            console.log(MapsOption);
        },
        // ... 支持绑定所有原生的高德 Marker 事件
    };

    infoWindowEvents = {
        close: () => {
            this.setState({
                visible: false
            });
        },
    };

    mapEvents = {
        click: () => {
            if (this.state.visible) {
                this.setState({
                    visible: false
                });
            }
        },
    };

    loadPoints = () => {
        request({
            url: '/impower/admin/getAllLocation',
            method: 'GET',
        })
            .then(data => {
                if (data) {
                    console.log('getAllLocation : ' + JSON.stringify(data));
                    if (data.data) {
                        const dataArr = data.data;
                        let points = [];
                        dataArr.map(record => {
                            const point = record.locationamap.split(',');
                            console.log('getAllLocation : point : ' + point);
                            points.push({position: parePoint(point)});
                        });
                        this.setState({
                            data: dataArr,
                            markerPosition: points,
                        })
                    }
                }
            })
    };

    render() {

        return (
            <div style={{width: '100', height: window.screen.availHeight * 0.75}}>
                <Map
                    events={this.mapEvents}
                    amapkey={getAmapKey()}
                    center={this.state.center}
                    plugins={plugins}
                    zoom={5}>
                    <Markers
                        clickable
                        // events={this.markerEvents}
                        markers={this.state.markerPosition}
                    />
                    <InfoWindow
                        position={this.state.position}
                        visible={this.state.visible}
                        isCustom={false}
                        content={html}
                        events={this.infoWindowEvents}
                    />
                </Map>
            </div>

        )
    }
}

export default AMap;

