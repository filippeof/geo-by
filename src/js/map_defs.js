const layerList = [
    {id: 'by_relief', name: "BY Relief", visible: true},
    {id: 'osm-layer', name: "OSM", visible: true},
    {id: 'by_webkarte', name: "BY Webkarte", visible: true},
    {id: 'by_geo', name: "DGK25", visible: true},
    {id: 'guek250_de', name: "GÜK-250", visible: true},
    // {id: 'profile-layer', name: "Profile", visible: true},
    // {id: 'pt-layer', name: "Point", visible: true},
    {id: 'dc-layer', name: "Drill cores", visible: true} 
];
const profile_w_px = 20; // defined in document as well
const map_style = {
                version: 8,
                sources: {
                    'profile_lyr_src':{
                        type: 'geojson',
                        data: {}//geojson_profile
                    },
                    'dc_lyr_src':{
                        type: 'geojson',
                        data: {},//dc_geojson
                        attribution: 'Bayerisches Landesamt für Umwelt'

                    },    
                    "by_geo":{
                        type: 'raster',
                        tiles: [
                        //    "https://www.lfu.bayern.de/gdi/wms/geologie/gk500?service=WMS&request=GetMap&version=1.1.1&layers=haupteinheitgk500,strukturgk500&srs=EPSG:3857&format=image%2Fpng&transparent=true&styles=&width=256&height=256&bbox={bbox-epsg-3857}"
                        "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?&service=WMS&request=GetMap&layers=geoleinheit_dgk25%2Cstrukturln_dgk25&styles=&format=image%2Fpng32&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}"
                        ],
                        tileSize: 256,
                        attribution: 'Bayerisches Landesamt für Umwelt'

                    },
                    "guek250_de":{
                        type: 'raster',
                        tiles: [
                        "https://services.bgr.de/wms/geologie/guek250/?&service=WMS&request=GetMap&layers=7,10,11&styles=&format=image%2Fpng&transparent=true&version=1.3.0&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
                        ],
                        tileSize: 256,
                        attribution: 'Datenquelle: GÜK250 (WMS), (c) BGR, Hannover, 2019'
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
                        tileSize: 256,
                        attribution: 'Geobasisdaten: Bayerische Vermessungsverwaltung (Daten verändert)'
                    },
                    // "by_vector":{
                    //     type: 'vector',
                    //     tiles: [
                    //         'https://vtod1.bayernwolke.de/styles/by_style_light.json' //TODO
                    //     ]
                    // },
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
                    // "by_relief": {
                    //     type: 'raster',
                    //     tiles: [
                    //         'https://geoservices.bayern.de/od/wms/dgm/v1/relief?&service=WMS&request=GetMap&layers=by_relief_schraeglicht&styles=&format=image%2Fpng&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}'
                    //     ],
                    //     tileSize: 256
                    // },

                    'by_relief':{
                        type: 'raster-dem',
                        url: 'cog://https://filippeof.github.io/geo-by/src/data/srtm_by_cog.tif#dem',
                        //     url: 'cog://src/data/srtm_by_cog.tif#dem',
                        tileSize: 256
                    },
                    'mapterhorn_terrain_src': {
                        type: 'raster-dem',
                        url: 'https://tiles.mapterhorn.com/tilejson.json',
                    },
                    'mapterhorn_hillshade_src': {
                        type: 'raster-dem',
                        url: 'https://tiles.mapterhorn.com/tilejson.json',
                    }
                    
                },
                layers: [
                    // {
                    //     id: 'by_relief',
                    //     type: 'raster',
                    //     source: 'by_relief',
                    //     paint: {}
                    // },
                    // {
                    //     id: 'by_relief',
                    //     source: 'by_relief',
                    //     type: 'hillshade'
                    // },
                    {
                        id: 'mapterhorn_hillshade',
                        type: 'hillshade',
                        source: 'mapterhorn_hillshade_src',
                        paint: { 'hillshade-shadow-color': '#473B24' }
                    },
                    {
                        id: 'osm-layer',
                        type: 'raster',
                        source: 'osm-raster-tiles',
                        minzoom: 0,
                        maxzoom: 12,
                        paint: {
                            'raster-opacity': 0.75 // 75% Opacity
                        }
                    },

                    {
                        id: 'by_webkarte',
                        type: 'raster',
                        source: 'by_webkarte',
                        minzoom: 12,
                        maxzoom: 20,
                        paint: {
                            'raster-opacity': 0.75 // 75% Opacity
                        }
                    },
                    
                    {
                        id: 'by_geo',
                        type: 'raster',
                        source: 'by_geo',
                        paint: {
                            'raster-opacity': 0.75 // 50% Opacity
                        },
                        minzoom: 12,
                        maxzoom: 20,
                    },
                    {
                        id: 'guek250_de',
                        type: 'raster',
                        source: 'guek250_de',
                        paint: {
                            'raster-opacity': 0.75 // 50% Opacity
                        },
                        minzoom: 6,
                        maxzoom: 12,
                    },
                    
                    {
                        id: 'dc-layer',
                        type: 'circle',
                        source: 'dc_lyr_src',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': "#FF000060",     //60% opacity
                            'circle-stroke-color': '#ffffff80', //80% opacity
                            'circle-stroke-width': 1          
                        },
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
                            'line-color': '#00000080',
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
                            'circle-color': '#00ff00' 
                        },
                        filter: ['==', '$type', 'Point']
                    }
                ],
                terrain: {
                    source: 'mapterhorn_terrain_src',
                    // source: 'by_relief',
                    exaggeration: 2
                },
                sky: {}
            };

// Get feture info layers
const feature_info_layers = [
    {"id":"by_geo",
    "url": "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=geoleinheit_dgk25&query_layers=geoleinheit_dgk25&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=application/geojson", 
    "fields": ["Kurzname der Geologischen Einheit", "Geologische Einheit","Gesteinsbeschreibung", "System (ggf. Ärathem)","URI Thesaurus"],
    "fields_alias": ["Geol. Einheit - Kürzel", "Geol. Einheit","Gesteinsbeschreibung", "System /Ärathem","URI Thesaurus"],
    "minzoom":12,
    "maxzoom":18
    },
    {"id":"guek250_de",
    "url": "https://services.bgr.de/wms/geologie/guek250?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=7&query_layers=7&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/xml", 
    "fields": ["Legendenkürzel","Legendentext", "Stratigraphie - gesamt","LithostratigraphieregionaleStratigraphie1", "LithostratigraphieregionaleStratigraphie2"],
    "fields_alias": ["Legenden kürzel","Legenden text", "Stratigraphie","Lithostratigraphie 1", "Lithostratigraphie 2"],
    "minzoom":6,
    "maxzoom":12
    }
]
