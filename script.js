$(document).ready(function() {
  addToList();

  $(document).on('click', '.elimina', function() {
    var thisId = $(this).parent().attr('data-api-id');
    $.ajax(
      {
        url:'http://157.230.17.132:3032/todos/'+ thisId ,
        method:'DELETE',
        success: function(data){
          addToList();

        },
        error: function() {
          alert('si è verificato un errore');
        }

      }
    )
  });

  $('#todo-add').click(function(){
    newToDo();
  });
  $('#todo-text').keypress(function(){
    if(event.keyCode === 13 || event.which === 13){
      newToDo();
    }

  });
    function newToDo() {


      var newText = $('#todo-text').val();

      if(newText.length > 0){
        $.ajax(
          {
            url:'http://157.230.17.132:3032/todos/',
            method:'POST',
            data: {
              text: newText,
            },
            success: function(data){
              console.log(data);
              addToList();

            },
            error: function() {
              alert('si è verificato un errore');
            }
        })
      }

    }


  })

function addToList(){
  $('#todo-list').html('');
  $('#todo-text').val('');
  $.ajax(
    {
      url:'http://157.230.17.132:3032/todos/',
      method:'GET',
      success: function(data){
        console.log(data);
        if (data.length > 0) {
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);

          for (var i = 0; i < data.length; i++) {
            var thisToDo = data[i];
            console.log(data[i]);
            var html = template( thisToDo );
            $('#todo-list').append(html);
          }

        }
      },
      error: function() {
        alert('si è verificato un errore');
      }
  })
};
