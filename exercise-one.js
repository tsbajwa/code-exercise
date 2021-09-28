const fs = require('fs');

/**
 * 
 * THIS IS A PARTIAL SOLUTION DUE TO TIME CONSTRAINTS. SEE EXERCISE TWO FOR FULL SOLUTION
 * 
 * Assumptions
 * Assumed no libraries could be used. 
 * 
 * NOTES
 * In production would probably use a library as from a quick read there seems to be quite a few edge cases with csv
 * Current csv is small so am just reading file. If dealing with larger files, memory issues, or thinking about performance I would look into streaming data in chunks
 * ie createReadStream instead of readFile
 */
fs.readFile('./clickstream-1544745600.csv', 'utf8', (error, data) => {
    if (error) {
        console.log("Error", error)
        return;
    }

    const lines = data.split(/\n/);

    // Start at second line
    for (let i= 1; i < lines.length; i++) {
        const [userId, time, metaData ] = lines[i].split(/\s+/);

        if (!userId) {
            continue;
        }

        const metaVariables = {};
        
        const metaFields = metaData.split(";")

        metaFields.forEach(field => {
            const [variable, value] = field.split("=");
            metaVariables[variable] = value;
        })

        console.log(metaVariables)
    }
    

})