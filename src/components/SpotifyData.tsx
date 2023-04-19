import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';


const SpotifyData = (props:{access_token:string}) => {
    const [apiData, setApiData] = useState(null)
    const {access_token} = props


    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + (access_token)
        }
        console.log('HEADER:', headers)
        // https://designcode.io/react-hooks-handbook-fetch-data-from-an-api
        if (access_token) {
            axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, { headers: headers })
                .then((response:AxiosResponse) => {
                    console.log('HEADER:', headers, 'RESPONSE', response.data)
                    // if (response.status === 204) {
                    //     axios.get(`https://api.spotify.com/v1/me/player/recently-played?market=US`, { headers: headers })
                    //         .then((response:any) => {
                    //             console.log('RESPONSE', response.data)
                    //             setApiData(response.data)
                    //         }, (error:Error) => {
                    //             console.log(error)
                    //         }
                    //         )
                    // }
                }, (error:Error) => {
                    console.log(error)
                })

        }
    }, [access_token])

    return (
        <div>
            {access_token ? <div>{apiData}</div> : null}
        </div>
    )
}

export default SpotifyData