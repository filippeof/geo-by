const v_ex = 2 // Vertical exageration
var clickedCoords = []; //PLaceholder coordinates of profile

// Elevation Profile
// const v_ex = 2.5 // Vertical exageration #TODO scale svgw,h # defined in map_defs.js
const svg_horz_margin = 25; // horizontal, vertical margin
const svg_vert_margin = 25;
const svg_w = 950;  // svg width, heigth
const svg_h = 210;
const min_profile_depth = 100; // Minimum extra depth under minimum elevation (m)
const n_elevation_pts = 200; // Number of coordinates to sample elevation along profile line

// const profile_w_px = 20;    //Profile line stroke width in px
var profile_distance = 0; //PLaceholder profile distance from start to end pt (km)
const profile_tool_active = false;
document.profile_tool_active = profile_tool_active; // Profile is active

const dc_w = 10; // Drill core profile width

const min_zoom_feature_info = 8; // min zoom to get info on click for WMS,WFS
// Geojson objects
// const bbox_by_poly = [8.97, 47.27, 13.84, 50.56]
const bbox_by_poly = turf.polygon(
    [
        [
        [9, 47.3],
        [13.8, 47.3],
        [13.8, 50.5],
        [9, 50.5],
        [9, 47.3],
        ],
    ],
    { name: "bbox_by_poly" },
);
const geojson_profile = {
    'type': 'FeatureCollection',
    'features': [
        // LINE
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [[0, 0]]
            }
        },
        // START POINT
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': []
            }
        },
        // END POINT
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': []
            }
        }
    ]
};
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

async function get_elevation_list(map,coord_list) {

    const promises = coord_list.map(async (coord) => {
        // const lng = coord[0];
        // const lat = coord[1];        
        try {
            // Get value
            const px_val = map.queryTerrainElevation(coord)//, {exaggerated: false}); // elevation in m
            // console.log(px_val)
            return px_val? px_val/v_ex : null; //  /v_ex needed when exageration defined in map defs terrain, exagerated=false has no effect..
            
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

async function show_elevation_profile(map){
    // get coordinates along profile, 
    // get elevation at coordinates, 
    // get drill cores that intersect profile (+ buffer), 
    // plot elevation profile and drill cores
    // svg coordinates 
    // |0,0 -----> X
    // |        .
    // v Y       100,100
    // 
    
    // sample coordinates along line (linspaced)
    const start_pt = clickedCoords[0];
    const end_pt = clickedCoords[1];
    const coord_list = make_coord_list(start_pt,end_pt,n_elevation_pts);
    // console.log("Coordinate list ", coord_list);
    
    // Get elevation for coordinate points
    const ele_list = await get_elevation_list(map,coord_list);   
    // const coord_ele_list = await get_elevation_list(coord_list); //rest
    // const ele_list = coord_ele_list.map(ele => ele[2]); // Extract the elevation values [lon,lat,ele]
    const max_ele = Math.max(...ele_list);
    let min_ele = Math.min(...ele_list);
    // Add buffer below min elevation (at least the same distance as elevation diference or min_profile_depth, whatever larger)
    const profile_extra_depth = Math.max(...[(max_ele - min_ele), min_profile_depth]);
    min_ele = min_ele - profile_extra_depth;
    const dh = max_ele - min_ele;
    // TODO calculate svg_h based on given v.ex.?
    // const m2px_v = dh/svg_h;
    // const m2px_h = 1e3*profile_distance/svg_w;
    // console.log(`v ex: ${m2px_h/m2px_v}`)

    var poly_str = `${svg_horz_margin},${svg_h+svg_vert_margin} `;
    for (let i = 0; i < n_elevation_pts; i++) {
        if (ele_list[i]){                   //!= null
            let x = svg_horz_margin + (i * svg_w / (n_elevation_pts-1)); // Scale x to fit within the SVG width
            let y = svg_h+svg_vert_margin - svg_h*((ele_list[i]-min_ele) / dh); // Scale y to fit within the SVG height
            poly_str += `${x},${y} `;                                           // TODO: smooth path?
        }
    }
    poly_str += `${svg_w+svg_horz_margin},${svg_h+svg_vert_margin} `;

    // console.log("Elevation list for profile:", ele_list);
    // Make elevation profile, set clip mask
    const ele_profile =  document.getElementById("ele_profile_svg")
    const polygon = ele_profile.getElementById("elevation_profile_poly");
    const clip_poly = ele_profile.getElementById("profile_clip_poly");
    polygon.setAttribute("points", poly_str);
    clip_poly.setAttribute("points", poly_str);

    // Set min/max elevation text
    let min_ele_txt = ele_profile.querySelector("#min_ele_txt");
    min_ele_txt.textContent = min_ele.toFixed(0);
    min_ele_txt.setAttribute("y", svg_h+svg_vert_margin);
    let max_ele_txt = ele_profile.querySelector("#max_ele_txt");
    max_ele_txt.textContent = max_ele.toFixed(0);
    max_ele_txt.setAttribute("y", svg_vert_margin);
    let max_dist_txt = ele_profile.querySelector("#max_dist_txt");
    max_dist_txt.textContent = `${profile_distance.toFixed(1)} km`
    
    // DRILL CORE
    // Get drill core points within buffer profile
    // Buffer profile 
    // TODO: calculate buffer based on zoom: calculate how many km is profile width in px
    let buffer_profile = (profile_w_px/2)*get_scale(map.getZoom(), start_pt[1]);
    // buffer_profile = 0.5
    const line_buffer = turf.buffer(geojson_profile, buffer_profile, { units: 'kilometers' });

    // Get drill core intersect with buffered profile
    const dc_intersect = turf.pointsWithinPolygon(dc_geojson, line_buffer);
    // TODO: highlight selected?
    let dc_group = ele_profile.getElementById("dc-profile-groups")
    let dc_group_txt = "";
    for (let ii = 0; ii < dc_intersect["features"].length; ii++) {
        const obj =  dc_intersect["features"][ii];
        const obj_id = obj["properties"]["oid"];
        const obj_coords = obj["geometry"]["coordinates"];
        const obj_data =  dc_layer_dict[obj_id];

        let top_h = obj_data["dc_h"]; // current upper limit (will be set to previous units' lower limit)
        const obj_dist = turf.distance(start_pt, obj_coords, {units: "kilometers"});
        const dist_ratio = Math.min(Math.max(obj_dist/profile_distance,0),1)
        let min_x = svg_horz_margin + svg_w*dist_ratio - dc_w/2;
        if (obj_data!=undefined){
            // Crete group containing all units of drill core as rect objects
            dc_group_txt += `<g id="${obj_id}"> <title>${obj_id}</title>` 
            const obj_units = obj_data["units"]
            for (let jj = obj_units.length-1; jj >=0; jj--) {
                const unit = obj_units[jj];
                const lower_h = unit[0];
                const unit_info = formations_dict[unit[1]]
                const unit_long_name = unit_info[1]
                const unit_c = unit_info[2];
                const min_y = svg_h + svg_vert_margin - svg_h*((top_h-min_ele) / dh); // Scale y to fit within the SVG height
                const max_y = svg_h + svg_vert_margin - svg_h*((lower_h-min_ele) / dh);
                const rect_h = (max_y-min_y).toFixed(0)
                if (rect_h>0){
                    dc_group_txt += `<rect x="${min_x.toFixed(0)}" y="${min_y.toFixed(0)}" width="${dc_w}" height="${rect_h}" style="fill:${unit_c};"> 
                                            <title>${unit_long_name}</title> </rect>`
                    }
                // console.log(`${ii}:${obj_id}[${jj}] Lower h:${lower_h}, top h:${top_h} min_y: ${min_y} max_y:${max_y}`)
                top_h = lower_h;
                // if further units are below elevation profile  min depth, stop 
                if (top_h<min_ele){
                    break
                }
            };
            dc_group_txt += `</g>` //finish group

        } 
    }
    dc_group.innerHTML =  dc_group_txt;
    // TODO: if overlapping drill cores in profile, get deepest> get first
    // TODO: export profile? make report (units, legend)
    // TODO: make rectangle profile: interpolate units( simplify by serie?)
}

async function get_feature_info(lng,lat,lyr_def){
// Get WMS feature info
// lyr_def =  {"id": "layer_id", "url": "wms get feature info url", "fields": [list of fields to show as table]}
    try {
        const lyr_id = lyr_def["id"];
        const fields = lyr_def["fields"];
        const fields_alias = lyr_def["fields_alias"];

        const info_url = lyr_def["url"].replace("{bbox}",`${lat-0.0001},${lng-0.0001},${lat+0.0001},${lng+0.0001}`); //v1.1.1: `${lng-0.0001},${lat-0.0001},${lng+0.0001},${lat+0.0001}`);
        // console.log(`Requesting info from ${lyr_id}\n ${info_url}`)
        const response = await fetch(info_url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const response_txt = await response.text();
        // console.log(response_txt)
        let feature_props = {};

        // json
        try {
            const json_txt = JSON.parse(response_txt);
            feature_props = json_txt["features"][0]["properties"]
        } catch (error) {
        // text/xml
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response_txt, 'text/xml');
                // console.log(xmlDoc)
                const data_fields = xmlDoc.querySelector('FIELDS');
                for (const attr of data_fields.attributes) {
                    feature_props[attr.name] = attr.value;
                }
                
            } catch (error) {
                // console.log("text xml error",error)
            }
        }
        // console.log(feature_props)
        // Filter only needed fields and Make table |field|val|
        let out_html= "<table class='info-tbl' >"
        for (let index = 0; index < fields.length; index++) {
            try {
                const k = fields[index];
                let v = feature_props[k] ?? ""
                if (v.startsWith("http")){
                    v = `<a href="${v}">Link</a>`
                }
                if (v && v!="" && String(v).toLowerCase() != "null"){
                    out_html += `<tr><td><strong>${fields_alias[index]}</strong></td> <td>${v}</td></tr>`
                }
            }
            catch (error) {
                console.log("could not parse field")
            }
        }
    
        out_html+= "</table>"
        return out_html
    }
    catch (err_gfi) {
        console.error(err_gfi)
    }

}

function download_profile(out_filename='ele_profile.svg'){
    // Download elevation profile as svg
    // Make it svg string
    const prefix_xml = '<?xml version="1.0" encoding="utf-8"?>'

    const profile_svg_str = prefix_xml+document.getElementById("ele_profile_svg").outerHTML;
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