import express from 'express'
const app = express();

// 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

// Importing Modules
import { Framework } from "@superfluid-finance/sdk-core";
import { Signer, ethers } from "ethers";

// Connecting to a Node Provider
// *** Later try it with Alchemy ***
const provider = new ethers.providers.AlchemyProvider(
  "maticmum",
  "pT8higs6q-wB6c6yrcbMBSkHVoEGu1yF" // This is the API key from Infura - Secret
);

const sf = await Framework.create({
    chainId: 80001,
    provider
  });

const isUserStreaming = async(sender) => {
      // Loading the Super Token you want to use, you can use Daix, Fdaix, anything, just make sure you enter the right addresses or will get errors
    const daix = await sf.loadSuperToken("fDAIx");
    console.log(`Currency is ${daix.address}`);

      // Read flow information
    const flowInfo = await daix.getFlow({
        sender: sender,
        receiver: "0x6eba7Bd536557de0D0038905d7C0a4E0dCdd7ab1",
        providerOrSigner: provider
    });
  console.log("flowInfo", flowInfo.flowRate);
  console.log(typeof(Number(flowInfo.flowRate)));
  console.log(Number(flowInfo.flowRate) > 0);

  if (Number(flowInfo.flowRate) > 0) {
    return true;
  } else {
    return false;
  }
}

// /stream-gated/0x2Ae018789D7f82FedfbfE221C1A8eD58E99511E8/0x6eba7Bd536557de0D0038905d7C0a4E0dCdd7ab1/fDAIx/stream.png
// /stream-gated/0x2Ae018789D7f82FedfbfE221C1A8eD58E99511E8/0x6eba7Bd536557de0D0038905d7C0a4E0dCdd7ab1/ETHx/stream.png

    // Set the response based on streaming status
    res.set('Content-Type', 'image/png');

// Define a route for the stream-gated endpoint
app.get('/stream-gated/:sender/stream.png', async(req, res) => {
    const { sender} = req.params;

    // Check if the user is streaming
    const userIsStreaming = await isUserStreaming(sender);
    console.log(userIsStreaming);


    if (userIsStreaming) {
        // Return an image with full transparency (transparent pixel)
        res.send(Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000006a');
    } else {
        // Return an image with full opacity (solid color)
        res.send(Buffer.from('89504e470d0a1a0a0000000d4948445200000001000000010802000000d9'));
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
