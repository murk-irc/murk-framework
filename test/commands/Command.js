const { expect } = require('chai');
const sinon = require('sinon');

const tls = require('tls');

const Client = require('../../src/Client');
const IRCSocket = require('../../src/IRCSocket');
const helpers = require('../../src/helpers');

const { Command } = require('../../src/commands');

describe('Command', function() {
	describe('#toString', function() {
		it('Should return null', function() {
			const cmd = new Command();

			expect(cmd.toString()).to.equal(null);
		});
	});

	describe('#sendTo', function() {
		it('Throws error when passing invalid pipe', function() {
			const cmd = new Command();

			expect(() => cmd.sendTo({})).to.throw(TypeError);
		});

		it('Sends to Client instances correctly', function() {
			sinon.stub(helpers, 'validateOptions');

			const client = new Client({});
			const sendStub = sinon.stub(client, 'send');

			const cmd = new Command();

			expect(() => cmd.sendTo(client)).to.not.throw();
			expect(sendStub).to.be.called;
		});

		it('Sends to IRCSocket instances correctly', function() {
			const fakeSocket = {
				on: () => fakeSocket,
				pipe: () => fakeSocket,
				write: () => fakeSocket,
			};

			sinon.stub(tls, 'connect')
				.returns(fakeSocket);

			const writeStub = sinon.stub(IRCSocket.prototype, 'write');

			const socket = new IRCSocket({ tls: true });
			const cmd = new Command();

			expect(() => cmd.sendTo(socket)).to.not.throw();
			expect(writeStub).to.be.called;
		});
	});

	afterEach(function () {
		sinon.restore();
	});
});