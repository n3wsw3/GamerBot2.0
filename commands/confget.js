const configModel = require("../models/configSchema");

module.exports = {
	name: "confget",
	aliases: [],
	description: "Get config options!",
	usage: [],
	perms: ["adminCmd"],
	async do(client, message, args, Discord) {
		
		//Retreive options
		configData = await configModel.findOne({ id: 0 });
		if (!configData) {
			let config = await configModel.create({
				prefix: ".",
				id: 0
			});
			config.save();
		}
		
		let configData2 = JSON.parse(JSON.stringify(configData));
		configData2.id = undefined;
		configData2._id = undefined;
		configData2.__v = undefined;

		if (args[0]) {
			if (configData2[args[0]] == undefined) {
				return message.channel.send(`Config-variabeln "${args[0]}" är odefinierad.`);
			}
			const embed = new Discord.MessageEmbed()
				.setColor("#f54242")
				.setTitle(`${args[0]} - Config`)
				.setDescription(`Visar värdet av config-variabeln "${args[0]}".`)
				.addFields(
					{ name: "Värde:", value: `${JSON.stringify(configData2[args[0]], null, 4)}` }
				)
			return message.channel.send(embed);
		} else {
			const embed = new Discord.MessageEmbed()
				.setColor("#f54242")
				.setTitle(`Config`)
				.setDescription(`Konfigurationen för boten ser just nu ut såhär!`)
				.addFields(
					{ name: "Konfiguration:", value: `${JSON.stringify(configData2, null, 4)}` }
				)
			return message.channel.send(embed);
		}

	}
}