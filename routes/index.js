

// --------------------------------------------------------------------
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID});
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();
const superagent = require('superagent');


/*  This route renders posts data */
const edgesArray = data.user.edge_owner_to_timeline_media.edges;
router.get('/:postcode', (req, res) => {
	const postcode = req.params.postcode;
	let selectedPost = null;

	for (var i = 0; i <= edgesArray.length - 1; i++) {
		const post = edgesArray[i];

		if (post.node.shortcode === postcode) {

			selectedPost = post;

			break;
		}
	}

	if (selectedPost === null) {
		res.render('errors',{message: 'Post Not Found!'});
	}

  //create a new user object

	selectedPost['user'] = {
		username: data.user.username,
		icon: data.user.profile_pic_url,
		comment: selectedPost.node.edge_media_to_caption.edges[0].node.text
	};
  // upon sucess route to post page
	console.log('this is the selected post being handed down',selectedPost);
	res.render('post',selectedPost);

});

// -------------------
router.get('/', (req, res) => {

	res.render('index', data);
});

router.get('/:display_url', (req, res) => {
		const display_url = req.params.display_url;

		if (display_url) {
			res.render('post',display_url);
		}
});



module.exports = router;
