module.exports = function(RED) {
    let node = {};

    const createInstance = async function() {
        try {
            const IPFS = await import("ipfs-core");
            node.ipfs = await IPFS.create();
        } catch(e) {
            console.log("Double Init!");
        }
    }
    function IPFSConfiguration(n) {
      RED.nodes.createNode(this,n);


        this.addPayload = async function(msg) {
            while(typeof node.ipfs == 'undefined') {
                await new Promise(r => setTimeout(r, 300));
            } 
            const res = await node.ipfs.add(JSON.stringify(msg.payload));
            return res.path;
        }

        this.getPayload = async function(msg) {
            while(typeof node.ipfs == 'undefined') {
                await new Promise(r => setTimeout(r, 300));
            } 

            const stream = node.ipfs.cat(msg.payload)
            const decoder = new TextDecoder()
            let data = ''

            for await (const chunk of stream) {
                    // chunks of data are returned as a Uint8Array, convert it back to a string
                     data += decoder.decode(chunk, { stream: true })
            }
            try {
                    data = JSON.parse(data);
            } catch(e) {

            }
            return data;
        }
        createInstance();
    }
    RED.nodes.registerType("ipfs-config",IPFSConfiguration);
}