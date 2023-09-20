import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faTumblrSquare } from '@fortawesome/free-brands-svg-icons';


function App() {
  const [colorState, setColorState] = useState({
    red: 251,
    green: 105,
    blue: 100
  })
  const [quote, setQuote] = useState({
    text: "People often say that motivation doesn’t last. Well, neither does bathing. That’s why we recommend it daily.",
    author: "Zig Ziglar"
  })

  
const [quoteBank, setQuoteBank] = useState([])

function fetchRandomQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      setQuoteBank(data);
    })
    .catch(function (error) {
      console.error("Error fetching quotes:", error);
    });
}

useEffect(() => {
  fetchRandomQuote()
}, [])


function getRandomQuote() {
  const num = Math.floor(Math.random() * quoteBank.length)
  console.log('num: ', num)
  console.log('new quote: ', quoteBank[num])
  setQuote({
    text: quoteBank[num].text,
    author: quoteBank[num].author.replace(/,?\s*type\.fit$/, '')
  })
  
}

function randomColor() {
  
  const red = Math.floor(Math.random() * 255)
  const green = Math.floor(Math.random() * 255)
  const blue = Math.floor(Math.random() * 255)
  setColorState({
  red: red,
  green: green,
  blue: blue
  })
  getRandomQuote()
}

const colorVar = `rgb(${colorState.red}, ${colorState.green}, ${colorState.blue})`
 
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: colorVar}}>
        <div id="quote-box" style={{padding: '50px', border: '1px, solid, transparent', borderRadius: '5px', width: "450px"}}>
          
          <div id="text" style={{color: colorVar, fontFamily: "Raleway, sans-serif", fontSize: '28px', wordWrap: 'break-word'}}><FontAwesomeIcon icon={faQuoteLeft} color={colorVar} style={{height: '4vh'}}></FontAwesomeIcon> {quote.text}</div>
          <div id="author" style={{color: colorVar, display: 'flex', justifyContent: 'right', padding: '20px', fontSize: '0.6em'}}>- {quote.author}</div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between", marginTop: '10px'}}>
            <div >
              <a 
                href={`https://twitter.com/intent/tweet?text=${quote.text} -${quote.author}`}
                target="_blank"
                rel="noopener noreferrer"
                id="tweet-quote" >
                  <FontAwesomeIcon icon={faTwitterSquare} color={colorVar} style={{height: '4vh', marginRight: '8px'}}></FontAwesomeIcon>
              </a>
              <a 
                href={`https://www.tumblr.com/new/text=${quote.text} -${quote.author}`}
                id="tumblr"
                target="_blank"
                rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTumblrSquare} color={colorVar} style={{height: '4vh'}}></FontAwesomeIcon>
              </a>
            </div>
            <button scr="#" id="new-quote" style={{color: '#FFFFFF', backgroundColor: colorVar, border: '1px solid transparent', borderRadius: '3px', cursor: 'pointer', padding: '8px 18px 6px 18px'}}onClick={randomColor}><b>New Quote</b></button>
          </div>
     
        </div>
      </header>
    </div>
  );
}

export default App;
