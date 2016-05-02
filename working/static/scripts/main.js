app.onSignOut = function(e) {
  e.preventDefault();
  if (navigator.credentials) {
    navigator.credentials.requireUserMediation()
    .then(function() {
      location.href = '/?quote=You are signed out';
    });
  } else {
    location.href = '/?quote=You are signed out';
  }
};

app.onUnreg = function() {
  var csrf_token = document.querySelector('#csrf_token').value;
  var form = new FormData();
  form.append('csrf_token', csrf_token);

  fetch('/unregister', {
    method: 'POST',
    credentials: 'include',
    body: form
  }).then(function(res) {
    if (res.status === 200) {
      if (navigator.credentials) {
        navigator.credentials.requireUserMediation()
        .then(function() {
          location.href = '/?quote=You are signed out';
        });
      } else {
        location.href = '/?quote=You are unregistered';
      }
    } else {
      app.fire('show-toast', {
        text: 'Unregister failed'
      });
    }
  }, function() {
    app.fire('show-toast', {
      text: 'Unregister failed'
    });
  });
};