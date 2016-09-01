var board = {
	name: 'Kanban Board',
	addColumn: function (column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('.column-container', '#board')
};
function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeHolder: '.card-placeholder'
	}).disableSelection();
}
$('.create-column', '#board').on('click', function () {
	var columnName = prompt('Write column name');
	if (columnName === null || columnName === '') {
		return;
	}
	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {
			name: columnName
		},
		success: function(response){
			var column = new Column(response.id, columnName);
			board.addColumn(column);
		}
	});
});
