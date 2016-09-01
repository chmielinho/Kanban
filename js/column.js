function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name;
	this.$element = createColumn();
	function createColumn() {
		var $column = $('<div>').addClass('column'),
			$columnTitle = $('<h2>').addClass('column-title' + self.id).text(self.name),
			$columnCardList = $('<ul>').addClass('column-card-list'),
			$columnEdit = $('<button>').addClass('btn-edit').text('edit'),
			$columnDelete = $('<button>').addClass('btn-delete').text('x'),
			$columnAddCard = $('<button>').addClass('btn-add-card').text('Add card');
		$columnDelete.on('click', function () {
			self.removeColumn();
		});
		$columnEdit.on('click', function () {
			var newColumnName = prompt("Write new columns name");
			if (newColumnName === null || newColumnName === '') {
				return;
			}
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/column/' + self.id,
				method: 'PUT',
				data: {
					name: newColumnName,
				},
				success: function(response) {
					$('.column-title' + self.id).replaceWith($('.column-title' + self.id).text(newColumnName));
					
				}
			});
		});
		$columnAddCard.on('click', function () {
			var cardName = prompt("Write card name");
			if (cardName === null || cardName === '') {
				return;
			}
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id					
				},
				success: function(response) {
					var newCard = new Card(response.id, cardName);
					self.addCard(newCard);
				}
			});
		});	$column.append($columnTitle).append($columnDelete).append($columnEdit).append($columnAddCard).append($columnCardList);
		return $column;
	}
}
Column.prototype = {
	addCard: function (card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function () {
		var self = this;
		$.ajax({
		  url: baseUrl + '/column/' + self.id,
		  method: 'DELETE',
		  success: function(response){
			self.$element.remove();
		  }
		});
	}
};