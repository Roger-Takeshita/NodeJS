const socket = io();
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');

//! Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

//! Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
    const $newMessage = $messages.lastElementChild;
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    const visibleHeight = $messages.offsetHeight;
    const containerHeight = $messages.scrollHeight;
    const scrollOffset = $messages.scrollTop + visibleHeight;
    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }
};

socket.on('message', ({ username, text, createdAt }) => {
    const html = Mustache.render(messageTemplate, {
        username,
        message: text,
        createdAt: moment(createdAt).format('hh:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('locationMessage', ({ username, url, createdAt }) => {
    const html = Mustache.render(locationMessageTemplate, {
        username,
        url,
        createdAt: moment(createdAt).format('hh:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    $sidebar.innerHTML = html;
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    const message = e.target.elements.message;

    socket.emit('sendMessage', message.value, (error) => {
        $messageFormButton.removeAttribute('disabled');
        if (error) return console.log(error);
        message.value = '';
        message.focus();
    });
});

$locationButton.addEventListener('click', () => {
    $locationButton.setAttribute('disabled', 'disabled');
    if (!navigator.geolocation) return alert('Geolocation is not supported by your browser');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit(
            'sendLocation',
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            () => {
                $locationButton.removeAttribute('disabled');
            }
        );
    });
});

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});
