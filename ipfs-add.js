
module.exports = function(RED) {
       function IpfsAdd(config) {
        RED.nodes.createNode(this,config);
        this.ipfs = RED.nodes.getNode(config.wallet);
        var node = this;
        node.on('input', async function(msg) {
            msg.payload = await node.ipfs.addPayload(msg);
            node.send(msg);
        });
    }
    RED.nodes.registerType("ipfs-add",IpfsAdd);
}