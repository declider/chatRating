ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    messageHandler(user, message)
}

if( !channel ) {
    alert("НЕ УКАЗАН ТВИЧ КАНАЛ (в ссылке добавить ?channel=КАНАЛ)")
} else {
    ComfyJS.Init(channel)
}