import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMapGL, { Marker } from 'react-map-gl';

const AddressMap = () => {
    const [viewport, setViewport] = useState({
        width: "467px",
        height: "450px",
        latitude: 10.03111,
        longitude: 105.75639,
        zoom: 16
    });

    const [address, setAddress] = useState('')
    const [addMarket, setMarket] = useState([])
    const dataAddress = [
        { id: 1, addresss: "123 Nguyễn Văn Trường, Ninh Kiều, Cần Thơ" },
        { id: 2, addresss: "174 Nguyễn Văn Cừ nối dài, An Khánh, Ninh Kiều, Cần Thơ" },
        { id: 3, addresss: "86 Nguyễn Văn Trường, An Bình, Ninh Kiều, Cần Thơ" },
        { id: 4, addresss: "135 Nguyễn Văn Trường, Long Tuyền, Bình Thủy, Cần Thơ" },
        { id: 5, addresss: " Nguyễn Văn Trường, Long Tuyền, Bình Thủy, Cần Thơ" },
    ];
    useEffect(() => {
        const newArray = [];
        dataAddress.map((add) => {
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${add.addresss}.json?access_token=pk.eyJ1IjoidGhhbmgwMDciLCJhIjoiY2t3bTN0M21qMjhkdDJ2dXR4eHliZW9rdSJ9.g0QyW0VbyWuHzQdmomiZ1w`)
                .then(function (response) {
                    // handle success
                    newArray.push({
                        ...add,
                        longitude: response.data.features[0].center[0],
                        latitude: response.data.features[0].center[1]
                    })
                })
                .catch(function (error) { console.log(error); });
        })
        setMarket(newArray)
    }, [])
    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog" style={{ maxWidth: '75%', marginTop: '70px' }} role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Cửa Hàng</h5>
                                    </div>
                                    <div id="pb-select-location-list" className="pb-select-location-list">
                                        {
                                            addMarket.map((add) => (
                                                <div key={add.id} className="pb-select-location-item">
                                                    <div>
                                                        <img
                                                            src="https://sdk-vn.pushdi.com/image/maxlead/widget_icon_location.svg" />
                                                        <span>{add.addresss}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <ReactMapGL
                                        {...viewport}
                                        mapStyle="mapbox://styles/mapbox/streets-v11"
                                        onViewportChange={(viewport) => setViewport(viewport)}
                                        mapboxApiAccessToken="pk.eyJ1IjoidGhhbmgwMDciLCJhIjoiY2t3bTN0M21qMjhkdDJ2dXR4eHliZW9rdSJ9.g0QyW0VbyWuHzQdmomiZ1w"
                                    >
                                        {addMarket.map((add) => (
                                            <Marker key={add.id} latitude={add.latitude}
                                                longitude={add.longitude}
                                                offsetLeft={-20}
                                                offsetTop={-10}>
                                                <img
                                                    src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                                                    style={{ height: 50, width: 50 }} />
                                            </Marker>
                                        ))}
                                    </ReactMapGL>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressMap;