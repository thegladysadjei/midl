import { useLocation, useNavigate } from 'react-router-dom'
import './results.page.css'
import React from "react";
import { Loader } from '@googlemaps/js-api-loader';


export const ResultsPage = () => {
    const API_KEY = 'AIzaSyBzXty7sROTRdiGjO3NLiPHRHS0WDV27fg';
    const navigate = useNavigate();
    const location = useLocation();
    const { addresses } = location.state;
    const [googleApi, setGoogleApi] = React.useState({});
    const [places, setPlaces] = React.useState([]);
    const [distances, setDistances] = React.useState([])
    const [radius, setRadius] = React.useState(5)

    //setup map & geocoder & placeservice & distance
    React.useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: "weekly",
            libraries: ['places']
        });

        loader.load().then(() => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 10,
            });
            const geocoder = new window.google.maps.Geocoder();
            const placeService = new window.google.maps.places.PlacesService(map);
            const distanceService = new window.google.maps.DistanceMatrixService()
            setGoogleApi({ ...googleApi, map: map, geocoder: geocoder, placeService: placeService, distanceService: distanceService });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    React.useEffect(() => {
        if (!addresses.join('')) {
            navigate("/search");
        } else if (googleApi.map && googleApi.geocoder) {
            Promise.all(addresses.map(address => {
                return googleApi.geocoder
                    .geocode({ address: address });
            })).then((values) => {
                const bounds = new window.google.maps.LatLngBounds()
                const polygonCoords = values.map(val => val.results[0].geometry.location);
                const polygon = new window.google.maps.Polygon({
                    paths: polygonCoords,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                });
                // const polygonCentroid = polygon.centroid({ 'maxError': 1 });
                for (var i = 0; i < polygonCoords.length; i++) {
                    bounds.extend(polygonCoords[i]);
                    new window.google.maps.Marker({
                        position: { lat: polygonCoords[i].lat(), lng: polygonCoords[i].lng() },
                        map: googleApi.map,
                        title: addresses[i],
                    });
                }

                // The Center of the polygon
                const centroid = bounds.getCenter();
                googleApi.map.setCenter({ lat: centroid.lat(), lng: centroid.lng() })
                const cityCircle = new window.google.maps.Circle({
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    map: googleApi.map,
                    center: { lat: centroid.lat(), lng: centroid.lng() },
                    radius: 1609.34 * 5,
                });
                // polygon.setMap(googleApi.map);

                const request = {
                    location: { lat: centroid.lat(), lng: centroid.lng() },
                    radius: 1609.34 * 5
                };
                googleApi.placeService.nearbySearch(request, (results, status) => {
                    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        googleApi.distanceService.getDistanceMatrix(
                            {
                                origins: results.map(result => result.vicinity),
                                destinations: addresses,
                                travelMode: 'DRIVING'
                            }).then(res => {
                                const distances = res.rows.map(row => { //each origin
                                    var min = row.elements[0].duration;
                                    var max = row.elements[0].duration;
                                    row.elements.forEach((destination) => { //each destination
                                        if (destination.duration.value < min.value) {
                                            min = destination.duration
                                        }
                                        if (destination.duration.value > max.value) {
                                            max = destination.duration
                                        }
                                    })
                                    return `Driving ranges from ${min.text} and ${max.text}`;
                                })
                                setDistances(distances);
                            })
                        setPlaces(results)
                    }
                })
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses, googleApi])

    React.useEffect(() => {

    }, [radius])

    return (<div className="results">
        <div className="spots">
            <div className='pointer m24' onClick={() => {
                navigate('/search')
            }}>Go back to search</div>
            {
                places.map((place, index) => {
                    return (<div key={`places-${index}`} className='flex-row m24'>
                        <img src={place.icon} height={30} />
                        <div>
                            <div>{place.name}</div>
                            <div className='subText'>{place.vicinity}</div>
                            {place.user_ratings_total && <div className='subText'>rating - {place.rating} ({place.user_ratings_total} total reviews)</div>}
                            {distances.length > 0 && distances[index]}
                        </div>
                    </div>);
                })
            }
        </div>
        <div className="map" id="map">
            map here
        </div>
    </div>
    )
}