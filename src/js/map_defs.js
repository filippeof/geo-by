const layer_control_list = [
    // {id: "layer group id", id_list: ['layer1 id','layer2 id',...], name: "Group name", visible: starts visible (true/false)},
    // {id: "hillshade", id_list: ['mapterhorn_hillshade'], name: "Hillshade", visible: true},
    {id: "basemap_overview", id_list: ['osm-layer'], name: "OSM", visible: true},
    {id: "satellite", id_list: ['satellite'], name: "Satellite", visible: false},
    // {id: , id_list: 'by_webkarte', name: "BY Webkarte", visible: false},
    {id: "geo_regional", id_list: ['geo_25_de_by',"geo_50_fr","geo_100_it","geo_x_ch"], name: "Geo: Regional", visible: true},
    {id: "geo_overview", id_list: ["geo_250_de","geo_1000_de","geo_1000_fr", "geo_500_at","geo_500_it"], name: "Geo: Overview", visible: true},
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
            clusterRadius: 60,         
            attribution: '<a href="https://www.lfu.bayern.de">Bohrungen, Bayerisches Landesamt für Umwelt (Daten verändert)</a>'
        },  
        // GEO REGIONAL   
        "geo_25_de_by":{
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
        "geo_250_de":{
            type: 'raster',
            tiles: [
            "https://services.bgr.de/wms/geologie/guek250/?&service=WMS&request=GetMap&layers=7,10,11&styles=&format=image%2Fpng&transparent=true&version=1.3.0&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[5.56, 47.1, 15.6, 55.1],
            minzoom: 10,       
            tileSize: 256,
            attribution: 'GÜK250 (WMS), (c) BGR, Hannover, 2019'
        },
        "geo_1000_de":{
            type: 'raster',
            tiles: [
            "https://services.bgr.de/wms/geologie/gk1000/?&service=WMS&request=GetMap&layers=0,2&styles=&format=image%2Fpng&transparent=true&version=1.3.0&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[5.56, 47.1, 15.6, 55.1],
            minzoom: 6,       
            tileSize: 256,
            attribution: 'GK1000 (WMS), (c) BGR, Hannover, 2019'
        },
        "geo_500_at":{
            type: 'raster',
            tiles: [
            "https://gis.geosphere.at/maps/services/geologie/karte_500/MapServer/WMSServer?&service=wms&version=1.3.0&request=GetMap&layers=0,1&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            // "https://gis.geosphere.at/images/rest/services/geologie/karte_50/ImageServer/WMTS/tile/1.0.0/geologie_karte_50/default/GoogleMapsCompatible/{z}/{y}/{x}.png"// scanned maps
            ],
            bounds:[8.9, 45.4, 17.8, 49.7],
            minzoom: 8,       
            tileSize: 256,
            attribution: 'GK500, GeoSphere Austria'
        },
        "geo_50_fr": {
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
        "geo_1000_fr": {
            type: 'raster',
            tiles: [
            "https://geoservices.brgm.fr/geologie?&service=WMS&version=1.3.0&request=GetMap&layers=LITHO_1M_SIMPLIFIEE&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[-5.9, 41.17, 11.1, 51.15],
            minzoom: 6,       
            tileSize: 256,
            attribution: 'BRGM'
        },
        "geo_100_it": {
            type: 'raster',
            tiles: [
            "https://sinacloud.isprambiente.it/arcgisgeo/services/geo/SGI_ISPRA_geologia100K/MapServer/WMSServer?&service=WMS&version=1.3.0&request=GetMap&layers=1,2&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[6.45, 35.2, 19.62, 47.14],
            minzoom: 6,       
            tileSize: 256,
            attribution: 'ISPRAmbiente'
        },
        "geo_500_it": {
            type: 'raster',
            tiles: [
            "https://sinacloud.isprambiente.it/arcgisgeo/services/geo/SGI_ISPRA_geologia100K/MapServer/WMSServer?&service=WMS&version=1.3.0&request=GetMap&layers=0&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[6.45, 35.2, 19.62, 47.14],
            minzoom: 6,       
            tileSize: 256,
            attribution: 'ISPRAmbiente'
        },
        "geo_x_ch": {
            type: 'raster',
            tiles: [
            "https://wms.geo.admin.ch/?&service=WMS&version=1.3.0&request=GetMap&layers=ch.swisstopo.geologie-geocover&styles=&format=image%2Fpng&transparent=true&backgroundColor=%23FFFFFF&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}"
            ],
            bounds:[5.14, 45.39, 11.48, 48.24],
            minzoom: 8,       
            tileSize: 256,
            attribution: '© Data: swisstopo'
        },
        

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
            id: 'geo_25_de_by',
            type: 'raster',
            source: 'geo_25_de_by',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 12,
            maxzoom: 20,
        },
        {
            id: 'geo_250_de',
            type: 'raster',
            source: 'geo_250_de',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 10,
            maxzoom: 12,
        },
        {
            id: 'geo_1000_de',
            type: 'raster',
            source: 'geo_1000_de',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 8,
            maxzoom: 10,
        },
        {
            id: 'geo_500_at',
            type: 'raster',
            source: 'geo_500_at',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 8,
            maxzoom: 12,
        },
        {
            id: 'geo_50_fr',
            type: 'raster',
            source: 'geo_50_fr',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 12,
            maxzoom: 14,
        },
        {
            id: 'geo_1000_fr',
            type: 'raster',
            source: 'geo_1000_fr',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 6,
            maxzoom: 12,
        },
        {
            id: 'geo_100_it',
            type: 'raster',
            source: 'geo_100_it',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 11,
            maxzoom: 14,
        },
        {
            id: 'geo_500_it',
            type: 'raster',
            source: 'geo_500_it',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 6,
            maxzoom: 11,
        },
        {
            id: 'geo_x_ch',
            type: 'raster',
            source: 'geo_x_ch',
            paint: {
                'raster-opacity': 0.5 // 50% Opacity
            },
            minzoom: 8,
            maxzoom: 14,
        },
        {
            id: 'dc_layer_cluster',
            type: 'circle',
            source: 'dc_lyr_src',
            filter: ['has', 'point_count'],
            // maxzoom:12,
            minzoom:6,
            paint: {
                // 'circle-radius': 6,
                'circle-radius': [
                'step',
                ['get', 'point_count'],
                10,10,
                15,50,
                20
                ],
                'circle-color': "#ff1e6260",     //
                'circle-stroke-color': '#00151580', //80% opacity
                'circle-stroke-width': 2          
            },
        },
        {
            id: 'dc-layer',
            type: 'circle',
            source: 'dc_lyr_src',
            filter: ['!has', 'point_count'],
            paint: {
                'circle-radius': 6,
                'circle-color': "#FF000060",     //60% opacity
                'circle-stroke-color': '#ffffff10', //80% opacity
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
                'circle-color': '#02c402' 
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
    {"id":"geo_25_de_by",
        "url": "https://www.lfu.bayern.de/gdi/wms/geologie/dgk25?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=geoleinheit_dgk25&query_layers=geoleinheit_dgk25&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=application/geojson", 
        "fields": ["Geologische Einheit","Gesteinsbeschreibung", "System (ggf. Ärathem)","URI Thesaurus"],
        "fields_alias": ["Geological Unit", "Lithology", "Chronostratigraphy", "Unit Description"],
        "minzoom":12,
        "maxzoom":18,
        "info_format":"geojson",
        "bbox":[9, 47.3, 13.8, 50.5] //minx,miny,maxx,maxy
    },
    {"id":"geo_250_de",
        "url": "https://services.bgr.de/wms/geologie/guek250?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=7&query_layers=7&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/xml", 
        "fields": ["Legendentext", "Stratigraphie - gesamt", "LithostratigraphieregionaleStratigraphie1", "LithostratigraphieregionaleStratigraphie2"],
        "fields_alias": ["Description", "Chronostratigraphy", "Geological Unit 1", "Geological Unit 2"],
        "minzoom":6,
        "maxzoom":12,
        "info_format":"xml",
        "bbox":[5.562778, 47.141228, 15.575523, 55.085090]
    },
    {"id":"geo_500_at",
        "url": "https://gis.geosphere.at/maps/services/geologie/karte_500/MapServer/WMSServer?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=0&query_layers=0&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=5&y=5&height=10&width=10&info_format=text/xml", 
        "fields": ["LEGTEXT_EN","LITHOL_EN","ALTER_EN"], //"ADDTEXT_DE"
        "fields_alias": ["Geological Unit","Lithology", "Chronostratigraphy"],
        "minzoom":6,
        "maxzoom":18,
        "info_format":"xml",
        "bbox":[8.929691, 45.415079, 17.741731, 49.602938]
    },
    {"id":"geo_1000_fr",
        "url": "https://geoservices.brgm.fr/geologie?service=WMS&request=GetFeatureInfo&version=1.3.0&layers=LITHO_1M_SIMPLIFIEE&query_layers=LITHO_1M_SIMPLIFIEE&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=1&y=1&height=2&width=2&&I=0&J=1&info_format=application%2Fvnd.ogc.gml", 
        "fields": ["DESCR","TYPE"],
        "fields_alias": ["Geological Unit", "Lithology"],
        "minzoom":6,
        "maxzoom":18,
        "info_format":"gml",
        "bbox":[-5.86764, 41.1701, 11.0789, 51.1419]
    },
    {"id":"geo_100_it",
        "url": "https://sinacloud.isprambiente.it/arcgisgeo/services/geo/SGI_ISPRA_geologia100K/MapServer/WMSServer?request=GetFeatureInfo&version=1.3.0&layers=1&query_layers=1&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=1&y=1&height=2&width=2&&I=0&J=1&info_format=text/xml", 
        "fields": ["NOME_FORMAZIONE","ETA_FORMAZIONE"],
        "fields_alias": ["Geological Unit", "Chronostratigraphy"],
        "minzoom":6,
        "maxzoom":18,
        "info_format":"xml",
        "bbox":[6.45, 35.2, 19.62, 47.14]
    },
    {"id":"geo_x_ch",
        "url": "https://wms.geo.admin.ch/?&service=WMS&version=1.3.0&request=GetFeatureInfo&version=1.3.0&layers=ch.swisstopo.geologie-geocover&query_layers=ch.swisstopo.geologie-geocover&styles=&bbox={bbox}&crs=EPSG%3A4326&feature_count=1&x=1&y=1&height=2&width=2&&I=0&J=1&info_format=application%2Fvnd.ogc.gml", 
        "fields": ["ch\\.swisstopo\\.geologie-geocover\\.description_de\\.name","ch\\.swisstopo\\.geologie-geocover\\.litho_de\\.name","ch\\.swisstopo\\.geologie-geocover\\.chrono_de\\.name"],
        "fields_alias": ["Geological Unit", "Lithology", "Chronostratigraphy"],
        "minzoom":6,
        "maxzoom":18,
        "info_format":"gml",
        "bbox":[5.14, 45.39, 11.48, 48.24]
    }

]
