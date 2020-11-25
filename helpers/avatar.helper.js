const AVATAR = require('../constants/avatar.constants');
const helpers = require('./helpers');

const option = type => helpers.returnRandomElement(type);

module.exports.generateAvatar = () => {
	return `https://avataaars.io/?accessoriesType=${option(
		AVATAR.ACCESSORIES
	)}&avatarStyle=Circle&clotheColor=${option(
		AVATAR.CLOTHES_COLOR
	)}&clotheType=${option(AVATAR.CLOTHES)}&eyeType=${option(
		AVATAR.EYES
	)}&eyebrowType=${option(AVATAR.EYEBROWS)}&facialHairColor=${option(
		AVATAR.FACIAL_HAIR_COLOR
	)}&facialHairType=${option(AVATAR.FACIAL_HAIR)}&hairColor=${option(
		AVATAR.HAIR_COLOR
	)}&hatColor=${option(AVATAR.HAT_COLOR)}&mouthType=${option(
		AVATAR.MOUTH
	)}&skinColor=${option(AVATAR.SKIN)}&topType=${option(AVATAR.TOP)}`;
};
