
module.exports = function(RED) {
       function IpfsGet(config) {
        RED.nodes.createNode(this,config);
        this.ipfs = RED.nodes.getNode(config.wallet);
        var node = this;
        node.on('input', async function(msg) {
            msg.payload = await node.ipfs.getPayload(msg);
            node.send(msg);
        });
    }
    RED.nodes.registerType("ipfs-get",IpfsGet);
}