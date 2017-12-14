
function inChrome() {
  try {
    return !module;
  } catch (e) {
    return true;
  }
}
if (!inChrome()) {
  var _ = require('./lodash.core.js');
}

var TableOfContents = function (stack) {
  this.stack = stack;

  this.generateTOC = function () {
    var sidebar = '<div id="pfr-sidebar" class="sidebar">' +
        '<div id="pfr-collapse"><a id="pfr-collapse-link"></a></div>' +
        '<div id="pfr-sidebar-inner">' +
        this.toList()
    '</div></div>';
    var holder=$('<div id="pfr-holder"><div id="pfr-main-holder"></div></div>');
    var height =$(window).height();

    $('#main').wrap(holder)
    $('#pfr-holder').append(sidebar)

    $('#pfr-sidebar').sidebar({side: 'left'}).on('sidebar:opened', function () {
      $('#pfr-collapse').css('left', '350px')
      $('#pfr-collapse-link').text('<')
    }).on('sidebar:closed', function () {
      $('#pfr-collapse').css('left', '0px')
      $('#pfr-collapse-link').text('>')
    }).trigger("sidebar:close");
    $('#pfr-sidebar-inner').css('max-height', (height -100) + 'px' );
    $('#pfr-collapse').css('top', ((height- 100)/2)+'px');
    $('#pfr-collapse').click(function() {
      $('#pfr-sidebar').trigger('sidebar:toggle')
    });;
  }


  this.toList = function () {
    return this.generateList(this.stack.root, this);
  }

  this.generateList = function (node, that) {
    var children = _(node.children).map(function (child) {
      return that.generateList(child, that);
    }).value().join('');
    var returnValue = '<ul class="pfr-list">'
        + children + '</ul>';
    if (node.text == undefined) {
      return returnValue;
    }

    return '<li>' +
        '<a href="#' + node.headerId + '">' + node.text + '</a>' +
        returnValue
        + '</li>';
  }
};

if (!inChrome()) {
  module.exports = TableOfContents;
}