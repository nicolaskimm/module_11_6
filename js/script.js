$(function() {
    
    
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    function Column(name) {
        var self = this; 
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add task');
            
            $columnDelete.click(function() {
                self.removeColumn();
                
                calcWidth();
            });
            $columnAddCard.click(function() {
                var cardName = prompt('Great! Another task..');
                
                if (cardName == ''){
                    alert('Oops, you didn\'t type anything. Try again.');
                } else { 
                self.addCard(new Card(cardName));
                }
        
                calcWidth();
            });
            
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            return $column;
        }
    }
    
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            $card.append($cardDelete)
	           .append($cardDescription);
                return $card;
        }
    }
    
    Card.prototype = {
	   removeCard: function() {
           this.$element.remove();
       }
    }
    
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column')
        .click(function(){
        var columnName = prompt('Enter a column name');
        
        if (columnName == ''){
            alert('Oops, you didn\'t named your column.');
        } else {
            var column = new Column(columnName);
    	    board.addColumn(column);
        
            calcWidth();
        }
          
    });
    
    
    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    calcWidth();

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    
    function calcWidth() {
        var columns = $('.column');
        var width = (100 / columns.length) + '%';
        
        columns.width(width);     
    }
    
})