const layerList = [
    {id: 'mapterhorn_hillshade', name: "Hillshade", visible: true},
    {id: 'osm-layer', name: "OSM", visible: true},
    {id: 'satellite', name: "Satellite", visible: false},
    {id: 'by_webkarte', name: "BY Webkarte", visible: false},
    {id: 'by_geo', name: "Geo 1:25:000", visible: true},
    {id: 'guek250_de', name: "Geo - 1:250.000", visible: true},
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
            attribution: '<a href="www.lfu.bayern.de">Bohrungen, Bayerisches Landesamt für Umwelt</a>'

        },    
        "by_geo":{
            type: 'raster',
            tiles: [
            //    "https://www.lfu.bayern.de/gdi/wms/geologie/gk500?service=WMS&request=GetMap&version=1.1.1&layers=haupteinheitgk500,strukturgk500&srs=EPSG:3857&format=image%2Fpng&transparent=true&styles=&width=256&height=256&bbox={bbox-epsg-3857}"
            "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?&service=WMS&request=GetMap&layers=geoleinheit_dgk25%2Cstrukturln_dgk25&styles=&format=image%2Fpng32&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            tileSize: 256,
            attribution: '<a href="www.lfu.bayern.de">DGK25, Bayerisches Landesamt für Umwelt</a>'

        },
        "guek250_de":{
            type: 'raster',
            tiles: [
            "https://services.bgr.de/wms/geologie/guek250/?&service=WMS&request=GetMap&layers=7,10,11&styles=&format=image%2Fpng&transparent=true&version=1.3.0&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            tileSize: 256,
            attribution: 'GÜK250 (WMS), (c) BGR, Hannover, 2019'
        },
        "gk500_at":{
            type: 'raster',
            tiles: [
            "https://gis.geosphere.at/maps/services/geologie/karte_500/MapServer/WMSServer?&service=wms&version=1.3.0&request=GetMap&layers=0,1&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            // "https://gis.geosphere.at/images/rest/services/geologie/karte_50/ImageServer/WMTS/tile/1.0.0/geologie_karte_50/default/GoogleMapsCompatible/{z}/{y}/{x}.png"
            ],
            tileSize: 256,
            attribution: 'GÜK250 (WMS), (c) BGR, Hannover, 2019'
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
        "satellite": {
                "type": "raster",
                "tiles": [
                    "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg"
                ],
                "tileSize": 256
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
        // "by_relief": {
        //     type: 'raster',
        //     tiles: [
        //         'https://geoservices.bayern.de/od/wms/dgm/v1/relief?&service=WMS&request=GetMap&layers=by_relief_schraeglicht&styles=&format=image%2Fpng&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}'
        //     ],
        //     tileSize: 256
        // },
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
            paint: {                     
            'hillshade-method': 'standard',
            'hillshade-illumination-direction': 315,
            'hillshade-shadow-color': '#000000',
            'hillshade-highlight-color': '#FFFFFF',
            'hillshade-accent-color': '#000000',
            'hillshade-exaggeration': 0.5
            }
        },
        {
            "id": "satellite",
            "type": "raster",
            "source": "satellite"
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
            minzoom: 9,
            maxzoom: 12,
        },
        {
            id: 'gk500_at',
            type: 'raster',
            source: 'gk500_at',
            paint: {
                'raster-opacity': 0.75 // 50% Opacity
            },
            minzoom: 9,
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
        exaggeration:v_ex,
        // source: 'by_relief',
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
    },
    {"id":"gk500_at",
    "url": "https://gis.geosphere.at/maps/services/geologie/karte_500/MapServer/WMSServer?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=0&query_layers=0&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/xml", 
    "fields": ["LEGTEXT_DE","LITHOL_DE","ALTER_DE"], //"ADDTEXT_DE"
    "fields_alias": ["Gol. Einheit","Petrographie", "Stratigraphie"],
    "minzoom":6,
    "maxzoom":12
    }
]
