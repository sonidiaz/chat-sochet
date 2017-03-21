var socket = io.connect('http://192.168.1.180:3000/', {'forceNew': true});

socket.on('messages', function(data){
    render(data);
});


function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `)
    }).join();

    var div_msj = document.getElementById('messages');
    div_msj.innerHTML = html;
    div_msj.scrollTop = div_msj.scrollHeight;
}

function addMessage(e){
    var mjs = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';

    socket.emit('add-message', mjs);
}
