$(document).ready(function() {
  debugger;

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(){
    $.get('http://localhost:3000/quote', data => {
      let quote = $('#quote');
      quote.append(`<h1>${data}</h1>`);
    })

    //YOUR CODE HERE, Add a GET request
  }

  function addQuote(quote){
    $.post('http://localhost:3000/quote', quote, response => {
      $('form')[0].reset();
      $('#response').text(`thank you for your quote: ${response}`);
    })
    //YOUR CODE HERE, Add a POST request
  }
});
