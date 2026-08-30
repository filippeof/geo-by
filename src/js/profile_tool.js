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
    //TODO cors issue: sampling from COG tiff instead
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

async function get_elevation_list(coord_list) {
    const promises = coord_list.map(async (coord) => {
        const lng = coord[0];
        const lat = coord[1];
        
        // using absolute path to github
        // ${window.location.origin}/
        const cogUrl = `https://filippeof.github.io/geo-by/src/data/srtm_by_cog.tif`;

        try {
            // Get value
            const px_val = await MaplibreCOGProtocol.locationValues(
                cogUrl,
                { "longitude": lng, "latitude": lat },
                20
            );
            
            // Return val (for rgb: [r,g,b])
            return px_val ? px_val[0] : null; 
            
        } catch (err) {
            // console.error(`Error fetching coordinates [${lng}, ${lat}]:`, err);
            return null; // Return null so each coordinate has an elevation point
        }
    });

    // Wait to get all evevation points
    const results = await Promise.all(promises);
    // console.log("Elevation data:", results);
    return results
    // Filter out null?
    // return results.filter(item => item !== null);
}
    

async function get_feature_info(lng,lat,lyr_def){
// Get WMS feature info
// lyr_def =  {"id": "layer_id", "url": "wms get feature info url", "fields": [list of fields to show as table]}
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
        const result = await response.json(); //TODO: considering geojson. Implement text/plain or xml as fallback?
        try {
            const feature_props = result["features"][0]["properties"]
            // Make table field:val fo
            let out_html= "<table>"
            for (let index = 0; index < fields.length; index++) {
                const k = fields[index];
                let v = feature_props[k] ?? ""
                if (v.Startswith("http")){
                    v = `<a href="${v}"></a>`
                }
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

function download_profile(out_filename='ele_profile.svg'){
    // Download elevation profile as svg
    // Make it svg string
    const profile_svg_str = document.getElementById("ele_profile_svg").outerHTML;
    // Make blob
    const svgBlob = new Blob([profile_svg_str], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = out_filename; // The default filename
    // Download blob 
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
}