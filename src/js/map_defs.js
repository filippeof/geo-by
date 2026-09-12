const layer_control_list = [
    // {id: "layer group id", id_list: ['layer1 id','layer2 id',...], name: "Group name", visible: starts visible (true/false)},
    // {id: "hillshade", id_list: ['mapterhorn_hillshade'], name: "Hillshade", visible: true},
    {id: "basemap_overview", id_list: ['osm-layer'], name: "OSM", visible: true},
    {id: "satellite", id_list: ['satellite'], name: "Satellite", visible: false},
    // {id: , id_list: 'by_webkarte', name: "BY Webkarte", visible: false},
    {id: "geo_regional", id_list: ['by_geo',"geol50_fr"], name: "Geo: Regional", visible: true},
    {id: "geo_overview", id_list: ["guek250_de","gk1000_de","geol1000_fr", "gk500_at"], name: "Geo: Overview", visible: true},
    // {id: , id_list: 'profile-layer', name: "Profile", visible: true},
    // {id: , id_list: 'pt-layer', name: "Point", visible: true},
    {id: "drill_core_pt", id_list: ['dc-layer'], name: "Drill cores", visible: true} 
];
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
            // bounds:[8.97, 47.27, 13.84, 50.56],
            cluster: true,            
            clusterMaxZoom: 10,       
            clusterRadius: 50,         
            attribution: '<a href="https://www.lfu.bayern.de">Bohrungen, Bayerisches Landesamt für Umwelt (Daten verändert)</a>'
        },  
        // GEO REGIONAL   
        "by_geo":{
            type: 'raster',
            tiles: [
            //    "https://www.lfu.bayern.de/gdi/wms/geologie/gk500?service=WMS&request=GetMap&version=1.1.1&layers=haupteinheitgk500,strukturgk500&srs=EPSG:3857&format=image%2Fpng&transparent=true&styles=&width=256&height=256&bbox={bbox-epsg-3857}"
            "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?&service=WMS&request=GetMap&layers=geoleinheit_dgk25%2Cstrukturln_dgk25&styles=&format=image%2Fpng32&transparent=true&version=1.1.1&backgroundColor=%23FFFFFF&width=256&height=256&srs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[8.97, 47.27, 13.84, 50.56],
            minzoom: 12,       
            tileSize: 256,
            attribution: '<a href="https://www.lfu.bayern.de">DGK25, Bayerisches Landesamt für Umwelt</a>'

        },
        // GEO OVERVIEW
        "guek250_de":{
            type: 'raster',
            tiles: [
            "https://services.bgr.de/wms/geologie/guek250/?&service=WMS&request=GetMap&layers=7,10,11&styles=&format=image%2Fpng&transparent=true&version=1.3.0&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[5.56, 47.1, 15.6, 55.1],
            minzoom: 10,       
            tileSize: 256,
            attribution: 'GÜK250 (WMS), (c) BGR, Hannover, 2019'
        },
        "gk1000_de":{
            type: 'raster',
            tiles: [
            "https://services.bgr.de/wms/geologie/gk1000/?&service=WMS&request=GetMap&layers=0,2&styles=&format=image%2Fpng&transparent=true&version=1.3.0&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[5.56, 47.1, 15.6, 55.1],
            minzoom: 6,       
            tileSize: 256,
            attribution: 'GK1000 (WMS), (c) BGR, Hannover, 2019'
        },
        "gk500_at":{
            type: 'raster',
            tiles: [
            "https://gis.geosphere.at/maps/services/geologie/karte_500/MapServer/WMSServer?&service=wms&version=1.3.0&request=GetMap&layers=0,1&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            // "https://gis.geosphere.at/images/rest/services/geologie/karte_50/ImageServer/WMTS/tile/1.0.0/geologie_karte_50/default/GoogleMapsCompatible/{z}/{y}/{x}.png"
            ],
            bounds:[8.9, 45.4, 17.8, 49.7],
            minzoom: 8,       
            tileSize: 256,
            attribution: 'GK500, GeoSphere Austria'
        },
        "geol50_fr": {
            type: 'raster',
            tiles: [
            "https://geoservices.brgm.fr/geologie?&service=WMS&version=1.3.0&request=GetMap&layers=SCAN_H_GEOL50&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
                //SCAN_F_GEOL250, SCAN_D_GEOL50, SCAN_F_GEOL1M
            ],
            bounds:[-5.9, 41.17, 11.1, 51.15],
            minzoom: 12,       
            tileSize: 256,
            attribution: 'BRGM'
        },
        "geol1000_fr": {
            type: 'raster',
            tiles: [
            "https://geoservices.brgm.fr/geologie?&service=WMS&version=1.3.0&request=GetMap&layers=LITHO_1M_SIMPLIFIEE&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
                //SCAN_F_GEOL250, SCAN_D_GEOL50, SCAN_F_GEOL1M
            ],
            bounds:[-5.9, 41.17, 11.1, 51.15],
            minzoom: 6,       
            tileSize: 256,
            attribution: 'BRGM'
        },
        // "by_webkarte": {
        //     type: 'raster',
        //     tiles: [
        //         'https://wmtsod1.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod2.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod3.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod4.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod5.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod6.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod7.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod8.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}',
        //         'https://wmtsod9.bayernwolke.de/wmts/by_webkarte/smerc/{z}/{x}/{y}'
        //     ],
        //     tileSize: 256,
        //     attribution: 'Geobasisdaten: Bayerische Vermessungsverwaltung (Daten verändert)'
        // },
        // "by_vector":{
        //     type: 'vector',
        //     tiles: [
        //         'https://vtod1.bayernwolke.de/styles/by_style_light.json' //TODO
        //     ]
        // },
        "satellite": {
                "type": "raster",
                "tiles": [
                    "https://a.tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg",
                    "https://b.tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg",
                    "https://c.tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg",
                    "https://d.tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg",
                    ],
                minzoom: 8,       
                maxzoom: 14,       
                tileSize: 256,
                attribution: '<a href="https://cloudless.eox.at"> EOxCloudless - EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2025)</a>'

        },
        'osm-raster-tiles': {
            type: 'raster',
            tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
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
            tileSize: 256,
            maxzoom: 12,       
        },
        'mapterhorn_hillshade_src': {
            type: 'raster-dem',
            url: 'https://tiles.mapterhorn.com/tilejson.json',
            tileSize: 256,
            maxzoom: 12,  
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
                'hillshade-shadow-color': '#2e1f1f',
                'hillshade-highlight-color': '#FFFFFF',
                'hillshade-accent-color': '#000000',
                'hillshade-exaggeration': 0.5
            }
        },
        {
            id: "satellite",
            type: "raster",
            source: "satellite",
            maxzoom: 16,
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            visibility: "none",

        },
        {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-raster-tiles',
            minzoom: 0,
            maxzoom: 18,
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            }
        },
        
        {
            id: 'by_geo',
            type: 'raster',
            source: 'by_geo',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 12,
            maxzoom: 20,
        },
        {
            id: 'guek250_de',
            type: 'raster',
            source: 'guek250_de',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 10,
            maxzoom: 12,
        },
        {
            id: 'gk1000_de',
            type: 'raster',
            source: 'gk1000_de',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 8,
            maxzoom: 10,
        },
        {
            id: 'gk500_at',
            type: 'raster',
            source: 'gk500_at',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 8,
            maxzoom: 12,
        },
        {
            id: 'geol50_fr',
            type: 'raster',
            source: 'geol50_fr',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 12,
            maxzoom: 14,
        },
        {
            id: 'geol1000_fr',
            type: 'raster',
            source: 'geol1000_fr',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 6,
            maxzoom: 12,
        },
        {
            id: 'dc-layer',
            type: 'circle',
            source: 'dc_lyr_src',
            filter: ['has', 'point_count'],
            paint: {
                // 'circle-radius': 6,
                'circle-radius': [
                'step',
                ['get', 'point_count'],
                6,
                50,
                10,
                100,
                14
                ],
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
        "maxzoom":18,
        "info_format":"geojson",
        "bbox":[9, 47.3, 13.8, 50.5] //minx,miny,maxx,maxy
    },
    {"id":"guek250_de",
        "url": "https://services.bgr.de/wms/geologie/guek250?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=7&query_layers=7&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/xml", 
        "fields": ["Legendentext", "Stratigraphie - gesamt", "LithostratigraphieregionaleStratigraphie1", "LithostratigraphieregionaleStratigraphie2"],
        "fields_alias": ["Chronostratigraphie", "Stratigraphie", "Lithostratigraphie 1", "Lithostratigraphie 2"],
        "minzoom":6,
        "maxzoom":12,
        "info_format":"xml",
        "bbox":[5.562778, 47.141228, 15.575523, 55.085090]
    },
    {"id":"gk500_at",
        "url": "https://gis.geosphere.at/maps/services/geologie/karte_500/MapServer/WMSServer?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=0&query_layers=0&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/xml", 
        "fields": ["LEGTEXT_DE","LITHOL_DE","ALTER_DE"], //"ADDTEXT_DE"
        "fields_alias": ["Gol. Einheit","Petrographie", "Stratigraphie"],
        "minzoom":6,
        "maxzoom":12,
        "info_format":"xml",
        "bbox":[8.929691, 45.415079, 17.741731, 49.602938]
    },
    {"id":"geol1000_fr",
        // http://geoservices.brgm.fr/geologie?language=fre&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX=44.55907688971603875%2C5.40725381867864652%2C44.58781088727501185%2C5.44406402946037726&CRS=EPSG%3A4326&WIDTH=2&HEIGHT=2&LAYERS=LITHO_1M_SIMPLIFIEE&STYLES=&FORMAT=image%2Fpng&QUERY_LAYERS=LITHO_1M_SIMPLIFIEE&INFO_FORMAT=application%2Fvnd.ogc.gml&I=0&J=1&FEATURE_COUNT=10
        "url": "https://geoservices.brgm.fr/geologie?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=LITHO_1M_SIMPLIFIEE&query_layers=LITHO_1M_SIMPLIFIEE&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=1&y=1&height=2&width=2&&I=0&J=1&info_format=application%2Fvnd.ogc.gml", 
        "fields": ["DESCR","TYPE"],
        "fields_alias": ["Description", "Type"],
        "minzoom":6,
        "maxzoom":12,
        "info_format":"gml",
        "bbox":[-5.86764, 41.1701, 11.0789, 51.1419]
    }
]
