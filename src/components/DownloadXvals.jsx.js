import React, { useState, useEffect } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import {Icon, Menu} from 'semantic-ui-react';
import { json2csv } from "json2csv";

const DownloadXvals  = () => {
  const [crossValInfo, setCrossValInfo] = useState(null);
  const crossValURL = 'http://localhost:8989/crossvals';
  const [downloadData, setDownloadData] = useState(null);

  const fetchCrossVals = async () => {
    try {
      let response = await fetch(crossValURL);
      response = await response.json();
      setCrossValInfo(response);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchCrossVals();
    if(!downloadData){
      setDownloadData(json2csv(crossValInfo._embedded.crossvals));
    }

  }, []);

  return{
    <Menu>
      <Menu.Item
        as="a"
        onClick={() => {
          if (crossValInfo._links.prev != null) {
            setCrossValServiceURL(crossValInfo._links.prev.href);
          }
        }}
        icon
      >
        <CSVLink data={downloadData} >  
          Download
        </CSVLink>;
        <Icon name="download" />
      </Menu.Item>
    </Menu>


  }

}

export default DownloadXvals;