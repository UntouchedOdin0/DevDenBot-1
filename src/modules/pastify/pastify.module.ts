import Module from '../module.js'
import {pastify} from './pastify.js'
import {PastifyCommand} from './pastify.command.js'
import {PasteCommand} from './paste.command.js'

export const PastifyModule: Module = {
	name: 'pastify',
	commands: [PastifyCommand, PasteCommand],
	listeners: [{
		async messageCreate(_, message) {
			if (message.channel.isThread()) {
				return // Don't pastify messages in threads since theres nothing to "interrupt"
			}
			const pastified = await pastify(message)
			if (pastified) return message.channel.send({...pastified, flags: 0})
		}
	}]
}

export default PastifyModule
