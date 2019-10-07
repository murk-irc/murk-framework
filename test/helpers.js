const { expect } = require('chai');
const sinon = require('sinon');

const { validateOptions } = require('../src/helpers');

const validOptions = {
	host: 'irc.freenode.net',
	port: 6697,
	tls: true,

	nick: 'somedude',
	username: 'somedudeusername',
};

describe('helpers', function() {
	describe('#validateOptions', function() {
		it('Should not throw when passed valid options', function() {
			expect(() => validateOptions(validOptions)).to.not.throw();
		});

		it('Should throw when passed invalid options', function() {
			let invalidOptions;

			const retry = () => expect(() => validateOptions(invalidOptions)).to.throw(TypeError);

			invalidOptions = {...validateOptions, host: null};
			retry();

			invalidOptions = {...validateOptions, port: null};
			retry();

			invalidOptions = {...validateOptions, tls: null};
			retry();

			invalidOptions = {...validateOptions, nick: null};
			retry();

			invalidOptions = {...validateOptions, username: null};
			retry();
		});
	});

	afterEach(function () {
		sinon.restore();
	});
});