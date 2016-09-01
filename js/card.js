function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;
	this.id = id;
	this.name = name;
	this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;
	this.$element = createCard();
	function createCard() {
		var $card = $('<li>').addClass('card'),
			$cardName = $('<p>').addClass('card-name' + self.id).text(self.name),
			$cardEdit = $('<button>').addClass('btn-edit').text('edit'),
			$cardDelete = $('<button>').addClass('btn-delete').text('x');
		$cardDelete.on('click', function () {
			self.removeCard();
		});
		$cardEdit.on('click', function () {
			var newCardName = prompt("Write new card name");
			if (newCardName === null || newCardName === '') {
				return;
			}
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: newCardName,								
					bootcamp_kanban_column_id: self.bootcamp_kanban_column_id					
				},
				success: function(response) {
					$('.card-name' + self.id).replaceWith($('.card-name' + self.id).text(newCardName));
				}
			});
		});
		$card.append($cardDelete).append($cardEdit).append($cardName);
		return $card;
	}
}
Card.prototype = {
	removeCard: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
			}
		});
	}
};