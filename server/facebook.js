/*function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
	var self = this;
	var method = (typeof method === 'undefined') ? 'get' : method;
	var data = Meteor.sync(function(done) {
		self.fb[method](query, function(err, res) {
			done(null, res);
			});
		});
	return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me/photos');
} */ 

Meteor.methods({
    getUserData: function() {
        var token = Meteor.user().services.facebook.accessToken;
        var query = ("q=SELECT description FROM video WHERE vid IN (SELECT vid FROM video_tag WHERE subject IN (SELECT uid2 FROM friend WHERE uid1 = me() LIMIT 20))");
        var fb_url = 'https://graph.facebook.com';
        var path = fb_url + '/fql?' + encodeURI(query) + '&method=GET&metadata=true&format=json&access_token=' + token;
        return (Meteor.http.get(path));
    }
});

