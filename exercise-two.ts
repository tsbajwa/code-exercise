
 let request: any;
 let db: any;
 
 // In production this would be saved as an env variable 
 const TABLE = "TEST_TABLE";

interface RequestReturnObject<data = never> {
    data: data;
    status: number;
    statusText: string;
    url: string; 
    headers: Record<string, string>; // response headers
    request: {      // Usually return the req obj, however note it is not needed for below scenario.
        url?: string;
        method?: string;
        headers?: string;
        data?: any;
        params?: any
        // and so on....
    }  
}


/**
 * QUESTION 2
 * 
 * Assumptions
 * 1. We need all queries to resolve in order before saving to DB, hence used Promise.all instead of Promise.allSettled.
 * 2. We can concurrently write to db, hence used forEach loop which just fires off async requests one after the other
 * If we needed each db save to finish before going to next, i would use a for of loop
 */

const fetchAndSaveData = (urls: string[]) => {
    const promises: Promise<RequestReturnObject>[] = urls.map(url => request.get(url))
    Promise.all(promises).then((results) => {
        results.forEach(result => {
            db.save(TABLE, result);
        })
    }).catch(e => {
        throw new Error("error")
    })
}


/**
 * QUESTION 3
 */


 const fetchAndSaveData1 = (urls: string[]) => {
    const promises: Promise<RequestReturnObject>[] = urls.map(url => request.get(url))
    Promise.all(promises).then((results) => {
        results.forEach(result => {
            db.save(TABLE, result);

            if (result.url.includes('test.com')) {
                console.log(result)
            }
        })
    }).catch(e => {
        throw new Error("error")
    })
}

/** 
 * QUESTION 4 
*/

const getUrlsWhichSetCookies = () => {
    const results: RequestReturnObject[] = db.find(TABLE, 'headers[Set-Cookie]', /[[:ascii:]]/);
    return  results.map(result => result.url)
}