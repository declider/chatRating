if( !channel ) {
    alert(`НЕ УКАЗАН GOODGAME ID (в ссылке добавить ?channel=ID)\nЕго можно взять в открытом GG плеере в отдельном окне`)
} else {
    let socket = new WebSocket("wss://chat-1.goodgame.ru/chat2/")
    socket.onopen = function(e) {
        socket.send(JSON.stringify(
            {
                type: "join",
                data: {
                    channel_id: channel, // идентификатор канала
                    hidden: 0,            // для модераторов: не показывать ник в списке юзеров
                    mobile: false,        // флаг с какого устройства идет подключение
                    reload: false
                }
            }
        ))
    }

    socket.onmessage = function(e) {
        let message = JSON.parse(e.data)
        if (message.type == "message") {
            messageHandler(message.data.user, message.data.text)
        }
    }
}