const od_by_h_url = "https://geoservices.bayern.de/bvvapi/od/hoehen/v1/elevation/coord/{srid}/{x}/{y}" // ele for coordinate
const od_by_h_list_url = "https://geoservices.bayern.de/bvvapi/od/hoehen/v1/elevation/list"             // ele for coordinate list
// Profile

function linspace(a,b,n_steps){
    out_list = [];
    step = (b-a)/(n_steps-1);
    for (let ii = 0; ii < n_steps; ii++) {
        out_list.push(a+ii*step)
    }
    return out_list
}

function get_scale(z,lat){
    // Get scale km/px at given latitude and map zoom
    const res = 156.543 * Math.cos(lat*Math.PI/180) / (2 ** z);
    // console.log(z,lat,res)
    return res
}  

function make_coord_list(start_pt, end_pt, n_points){
    const start_lon = start_pt[0];
    const start_lat = start_pt[1];
    const end_lon = end_pt[0];
    const end_lat = end_pt[1];
    const lat_ls = linspace(start_lat, end_lat, n_points);
    const lon_ls = linspace(start_lon, end_lon, n_points);
    coord_list = []
    for (let ii = 0; ii < n_points; ii++) {
        coord_list.push([lon_ls[ii],lat_ls[ii]])
    }
    return coord_list
}

// async function get_elevation_list(coord_list){
//     // Get altitude from list of coordinates
//         // Die Liste muss als JSON übermittelt werden.
//         // Das Feld 'srid' gibt das Koordinatensystem der Eingangskoordinaten an und darf folgende Werte haben: 25832, 25833, 31468, 3857, 4326.
//         // Die einzelnen Koordinaten dürfen bereits eine Höhe haben, diese wird jedoch ignoriert und schlussendlich überschrieben.
//         // Die Liste darf maximal 4000 Punkte beinhalten.
//         // Die Ausgabe erfolgt als JSON im selben Format wie die Eingabe, die Reihenfolge der Punkte bleibt unverändert.
//         // Die Ausgabekoordinaten sind in dem Eingangskoordinatensystem.
//         // Die Höhen sind immer im Höhenbezugssystem DHHN2016.
//         // Die zurückgegebenen Koordinaten und Höhen sind gemäß gängigen Standards gerundet.
//         // Alle Koordinaten, für die keine Höhe ermittelt werden konnte (z.B. weil außerhalb Bayerns), haben in der Rückgabe eine Höhe von 'null'.
//     try {
//         const response = await fetch(od_by_h_list_url, 
//             {  
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     // 'accept': 'application/json',
//                 },
//                 body: JSON.stringify({"srid": 4326,
//                     "coords": coord_list
//                 }),
//             });
//         if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//         }

//         const result = await response.json();
//         return result["coords"];
//     } catch (error) {
//         console.error(error.message);
//     }
//     }

// function get_location(){
//     if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;
//             return ([lon,lat])
//             // console.log(`Rough Latitude: ${lat}, Longitude: ${lon}`);
//         },
//         (error) => {
//             console.warn(`Error (${error.code}): ${error.message}`);
//         },
//         {
//             enableHighAccuracy: false,
//             timeout: 3000,
//             maximumAge: 600000
//         }
//     );
//     } else {
//         console.log("Geolocation is not supported by this browser.");
//     }
//     }


// async function get_elevation_list_multi(coord_list) {
//     // Multiple get requests instead of single post
//     const promises = coord_list.map(async (coord) => {
//         const lng = String(coord[0]);
//         const lat = String(coord[1]);
//         const url = od_by_h_url.replace("{srid}", "4326").replace("{x}", lng).replace("{y}", lat);
        
        
//         try {
//             const response = await fetch(url);
//             if (!response.ok) return null;
            
//             const result = await response.json();
//             return result["coords"][0]; // Keep structure intact
//         } catch (error) {
//             console.error(`Failed fetching coordinate ${lng}, ${lat}:`, error.message);
//             return null; // Return null to keep array alignment accurate
//         }
//     });

//     // Wait for all network requests to finish together
//     const results = await Promise.all(promises);
    
//     // Filter out any failed requests (null values) if desired
//     return results.filter(item => item !== null);
// }
async function get_elevation_list(coord_list) {
    const promises = coord_list.map(async (coord) => {
        const lng = coord[0];
        const lat = coord[1];
        
        // Remember to use your absolute server URL wrapper here so the path resolves!
        const cogUrl = `./src/data/srtm_by_cog.tif`;

        try {
            // Use await directly to catch the value seamlessly
            const px_val = await MaplibreCOGProtocol.locationValues(
                cogUrl,
                { "longitude": lng, "latitude": lat },
                20
            );
            
            // Return the first band array value out of the map iteration loop
            return px_val ? px_val[0] : null; 
            
        } catch (err) {
            console.error(`Error fetching coordinates [${lng}, ${lat}]:`, err);
            return null; // Return null so the index array isn't broken
        }
    });

    // Wait for all processing threads to finish concurrently
    const results = await Promise.all(promises);
    console.log("Extracted Elevation Data Matrix:", results);
    
    // Filter out any failed requests (null values) if desired
    return results.filter(item => item !== null);
}
    

async function get_feature_info(lng,lat,lyr_def){
// Get WMS feature info
    try {
        const lyr_id = lyr_def["id"];
        const fields= lyr_def["fields"];
        const info_url = lyr_def["url"].replace("{bbox}",`${lng-0.0001},${lat-0.0001},${lng+0.0001},${lat+0.0001}`);
        // console.log(`Requesting info from ${lyr_id}\n ${info_url}`)
        // console.log(url)
        const response = await fetch(info_url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        try {
            const feature_data = result["features"][0]["properties"]    //[fields]
            let out_html= "<table>"
            for (let index = 0; index < fields.length; index++) {
                const k = fields[index];
                const v = feature_data[k] ?? ""
                out_html += `<tr><td><strong>${k}</strong></td> <td>${v}</td></tr>`
            }
            out_html+= "</table>"
            return out_html
        } catch (error) {
            return ""
        }
        
    } catch (error) {
        console.error(error.message);
        return ""
    }

}