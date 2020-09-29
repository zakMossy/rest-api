const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const User = require('../../models').User;

async function authenticateUser(req, res, next) {
	let message = null;
	const credentials = auth(req);
	if (credentials)
	{
		const user = await User.findOne({
			where: {
			  	emailAddress: credentials.name
			}
		});
		if (user)
		{
			const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
			if (authenticated)
			{
				req.currentUser = user;
			} else
			{
				message = `Authentication failure for username: ${user.username}`;
			}
		} else
		{
			message = `User not found for username: ${credentials.name}`;
		}
	} else
	{
		message = 'Auth header not found';
	}

	if (message)
	{
		console.warn(message);
		res.status(401).json({ message: 'Access Denied' });
	} else
	{
		next();
	}
};

module.exports = { authenticateUser };
