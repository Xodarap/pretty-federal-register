var linkMap = {};

function modifyHeaders() {
  var headers = getHeaders();
  var stack = new Stack();
  var display = new Display();
  headers.each(function (header) {
    stack.modifyStack(header.bullet, header.element.id, header.element.innerText)
    var newElement = stack.currentElement;
    var bulletLink =  display.toHierarchicalLink(newElement);
    linkMap[display.toString(newElement)] = newElement;
    header.element.innerHTML = header.element.innerHTML +
        ' [' + bulletLink + ']';
  }, this);
  (new TableOfContents(stack)).generateTOC();
}

function getHeaders() {
  var headers = _(document.querySelectorAll('h1,h2,h3,h4'));
  return parseIdentifiers(headers);
}

//This function modifies the table of contents at the beginning
//of documents. Note that it does not affect the TOC that we generate
function modifyTableOfContents() {
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

modifyHeaders();
modifyTableOfContents();