import React, { useEffect, useState } from 'react';
import './App.css';

const axios = require('axios').default
const API_KEY = "blahblah"
const params = {
  "include-passage-references": false,
  "include-verse-numbers": false,
  "include-short-copyright": false,
  "include-footnotes": false,
  "include-copyright": false,
  "include-headings": false
}
const headers = {
  "Authorization": `Token ${API_KEY}`
}

const BASE_URL = "https://api.esv.org/v3/passage/text/?q=john5"
const QUERY = "john11:35"

console.log(process.env);

function App() {
  const [verseText, setVerseText] = useState()
  const [verseRef, setVerseRef] = useState()
  const [verseLength, setVerseLength] = useState(0)

  useEffect(() => {
    axios.get(BASE_URL, {
      headers: headers,
      params: {
        q: QUERY,
        ...params
      }
    }).then((resp) => {
      const data = resp.data
      console.log("🚀 ~ file: App.tsx ~ line 36 ~ useEffect ~ data", data)
      setVerseLength(data.parsed[0][1] - data.parsed[0][0])
      setVerseText(resp.data.passages[0])
      setVerseRef(resp.data.canonical)
    })
    .catch((err) => {
      console.log("found error", err);
    })
  });

  return (
    <div className="App">
      {verseText} - {verseRef} (ESV)
      {
        verseLength > 2 ?
        <a href={`https://www.esv.org/${verseRef}`}
        target="_blank"
        rel="noreferrer">
          read more on esv.org</a>
        : null
      }
    </div>
  );
}

export default App;
