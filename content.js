/**
 * Modifies all the headers in the documents to have  navigation links
 * Also builds up linkMap, which modifiedTableOfContents uses to put
 * links to the headers into the table of contents
 * @returns {Hash} linkMap – a hash associating the blistering with its internal
 * representation
 */
function modifyHeaders() {
  var headers = getHeaders();
  var stack = new Stack();
  var display = new Display();
  var linkMap = {};

  headers.each(function (header) {
    stack.modifyStack(header.bullet, header.element.id, header.element.innerText)
    var newElement = stack.currentElement;
    var bulletLink = display.toHierarchicalLink(newElement);
    linkMap[display.toString(newElement)] = newElement;
    header.element.innerHTML = header.element.innerHTML +
        ' [' + bulletLink + ']';
  }, this);
  (new TableOfContents(stack)).generateTOC();
  return linkMap;
}

function getHeaders() {
  var headers = _(document.querySelectorAll('h1,h2,h3,h4'));
  return parseIdentifiers(headers);
}

//This function modifies the table of contents at the beginning
//of documents. Note that it does not affect the TOC that we generate
function modifyTableOfContents(linkMap) {
  var contents = getContents();
  var stack = new Stack();
  var display = new Display();
  parseIdentifiers(_(contents)).each(function (item) {
    stack.modifyStack(item.bullet);
    var bulletString = display.toString(stack.currentElement);
    var link = display.toLink(linkMap[bulletString]);

    item.element.innerHTML = item.element.innerHTML +
        ' [' + link + ']';
  })
}

function getContents() {
  var start = _(document.getElementsByTagName('h2')).find(function (element) {
    return element.innerText == "Table of Contents";
  })
  if (start == undefined) {
    return [];
  }
  var paragraphs = [];
  var next = start.nextElementSibling;
  while (next.nodeName == 'P') {
    paragraphs.push(next);
    next = next.nextElementSibling;
  }
  return paragraphs;
}

function parseIdentifiers(headers) {
  return headers.map(function (header) {
    var text = header.innerHTML;
    var bullet = bulletExpression.exec(text);
    if (bullet == undefined) {
      return;
    }
    return {bullet: bullet[0], element: header};
  }).compact();
}

function valentine() {
  $('#footer').prepend('<div style="margin: auto;width: 350px;background: rgba(238, 85, 85, 0.9);' +
  'text-align: center;border: 2px solid rgba(238,85,85,1);border-radius: 10px;margin-bottom:10px' +
  'padding-left: 10px; padding-right: 10px;">' +
  '<h1 style="font: 700 2vmax \'Calibri\';color: #eee;margin-top: 13px">' +
  "Happy Valentine's Day Lacey!</h1><div>")
}

//valentine's day message
if((new Date()) >= new Date("2020-2-13") && (new Date()) <= new Date("2020-2-14")){
  valentine();
}

var linkMap = modifyHeaders();
modifyTableOfContents(linkMap);