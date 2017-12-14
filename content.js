var bulletExpression = /^((V?I{1,3}V?\.)|([A-Z]\.)|(\d+\.)|([a-z]\.)|(\(\d\))|(\([a-z]\))|(\(v?i{1,3}v?\)))/;
var linkMap = {};

function modifyHeaders() {
  var headers = getHeaders();
  var stack = new Stack();
  headers.each(function (header) {
    stack.modifyStack(header.bullet, header.element.id, header.element.innerHTML)
    var bulletString = stack.toString();
    linkMap[bulletString] = header.element.id;
    var locationLink = ' [<a href="#' + header.element.id + '">' + bulletString + '</a>]'
    header.element.innerHTML = header.element.innerHTML + locationLink;
  }, this);
  (new TableOfContents(stack)).generateTOC();
}

function getHeaders() {
  var headers = _(document.querySelectorAll('h1,h2,h3,h4'));
  return parseIdentifiers(headers);
}


function modifyTableOfContents() {
  var contents = getContents();
  var stack = new Stack();
  parseIdentifiers(_(contents)).each(function (item) {
    stack.modifyStack(item.bullet);
    var bulletString = stack.toString();
    var id = linkMap[bulletString];

    item.element.innerHTML = item.element.innerHTML +
        ' [<a href="#' + id + '">' + bulletString + '</a>]';
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