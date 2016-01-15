var App = angular.module('pennnametags', []);

App.controller('NametagsController', function($scope, $interval) {

    $interval(function() {
      $.get('https://spreadsheets.google.com/feeds/list/1YIC3ak844JnRNGUF9AFstXCJePea4yCjwSMMIXcaxMA/od6/public/values?alt=json', function (data) {
      var newData = [];
      for (var r = 0; r < data.feed.entry.length; r++) {
        var row = data.feed.entry[r];
        var content = row.content.$t;
        content = content.split(",");
        var entry = {};
        for (var i = 0; i < content.length; i++) {
          var item = content[i];
          var idx = item.indexOf(":");
          var key = item.substring(0, idx).trim();
          var value = item.substring(idx+1, item.length).trim();
          entry[key] = value;
        }

        newData.push(entry);
      }

      $scope.nametags = newData;
      $scope.$apply();
    });
  }, 1000);

  var tables = [];
  for (var i = 1; i < 201; i++) {
  	tables.push({
  		"First": i,
  		"Title": "Table",
  		"image": "exec"
  	});
  }

//$scope.nametags = tables;

});

$(document).ready(function() {
	$(window).load(function() {
		setTimeout(function() {
			$('.name').each(function() {
				if ($(this).height() > 90) {
					$(this).parent().css('top', '50%');
				}
			});
		}, 3000); //excessively long timeout to make sure everything is loaded
	});
	
});