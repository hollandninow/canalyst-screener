exports.login = (user, request) => 
  request
    .post('api/v1/users/login')
    .send(user)
    .then( res => res.body.adminToken );
