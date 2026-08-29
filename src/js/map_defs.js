const layerList = [
    {id: 'by_relief', name: "BY Relief", visible: true},
    {id: 'osm-layer', name: "OSM", visible: true},
    {id: 'by_webkarte', name: "BY Webkarte", visible: true},
    {id: 'by_geo', name: "BY Geo", visible: true},
    // {id: 'profile-layer', name: "Profile", visible: true},
    // {id: 'pt-layer', name: "Point", visible: true},
    {id: 'dc-layer', name: "Drill cores", visible: true} 
];
const profile_w_px = 20; // defined in document as well
const map_style = {
                version: 8,

                sources: {
                    'dc_lyr_src':{
                        'type': 'geojson',
                        'data': {}//dc_geojson
                    },
                    'profile_lyr_src':{
                        'type': 'geojson',
                        'data': {}//geojson_profile
                    },
                    "by_geo":{
                        type: 'raster',
                        tiles: [
                        //    "https://www.lfu.bayern.de/gdi/wms/geologie/gk500?service=WMS&request=GetMap&version=1.1.1&layers=haupteinheitgk500,strukturgk500&srs=EPSG:3857&format=image%2Fpng&transparent=true&styles=&width=256&height=256&bbox={bbox-epsg-3857}"
                        "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?&service=WMS&request=GetMap&layers=geoleinheit_dgk25%2Cstrukturln_dgk25&styles=&format=image%2Fpng32&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}"
                        ],
                        tileSize: 256
                    },
                    "by_webkarte": {
                        type: 'raster',
                        tiles: [
                            'https://wmtsod1.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod2.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod3.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod4.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod5.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod6.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod7.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod8.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
                            'https://wmtsod9.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}'
                        ],
                        tileSize: 256
                    },
                    'osm-raster-tiles': {
                        type: 'raster',
                        tiles: [
                            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        ],
                        tileSize: 256,
                        opacity: 0.5,
                        attribution: '© OpenStreetMap contributors'
                    },
                    "by_relief": {
                        type: 'raster',
                        tiles: [
                            'https://geoservices.bayern.de/od/wms/dgm/v1/relief?&service=WMS&request=GetMap&layers=by_relief_schraeglicht&styles=&format=image%2Fpng&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}'
                        ],
                        tileSize: 256
                    },
                },
                layers: [
                    {
                        id: 'by_relief',
                        type: 'raster',
                        source: 'by_relief',
                        paint: {}
                    },
                    {
                        id: 'osm-layer',
                        type: 'raster',
                        source: 'osm-raster-tiles',
                        minzoom: 0,
                        maxzoom: 19
                    },

                    {
                        id: 'by_webkarte',
                        type: 'raster',
                        source: 'by_webkarte',
                        minzoom: 6,
                        maxzoom: 18
                    },
                    {
                        id: 'by_geo',
                        type: 'raster',
                        source: 'by_geo',
                        paint: {}
                    },
                    {
                        id: 'profile-layer',
                        type: 'line',
                        source: 'profile_lyr_src',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#00000080', // black linee
                            'line-width': profile_w_px
                        },
                        filter: ['==', '$type', 'LineString']

                    },
                    {
                        id: 'pt-layer',
                        type: 'circle',
                        source: 'profile_lyr_src',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#00ff00' // Green point
                        },
                        filter: ['==', '$type', 'Point']
                    },
                    {
                        id: 'dc-layer',
                        type: 'circle',
                        source: 'dc_lyr_src',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': "#FF000080" // Red point, 80% opacity
                        },
                    }
                    
                ]
            };

// #TODO Feature info
// https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?service=WMS&request=GetCapabilities&f=html
const feature_info_layers ={
    "by_geo":{
        "url": "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?service=WMS&request=GetFeatureInfo&layers=geoleinheit_dgk25&query_layers=geoleinheit_dgk25&styles=&bbox={bbox}srs=EPSG:4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/plain", 
        "fields": []
    }
}