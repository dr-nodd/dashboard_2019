import React, {useEffect, useState} from 'react';
import '../../App.css';
import API from "../../utils/API.js";

function About() {

    const [json, setJson] = useState(undefined);

    useEffect(
        () => { async function fetchData() {
            let data = await API.about();
            console.log(data);
            setJson(data);
        }
            fetchData();
        }, []);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <pre>{JSON.stringify(json.data, null, 2)}</pre>
                </div>
            );
        }
    };
    return (
        <div>{content(json)}</div>
    )
}

export default About;
